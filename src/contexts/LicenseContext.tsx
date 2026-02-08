import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMachineId, validateLicenseKey } from '@/lib/license';
import { supabase } from '@/lib/supabase';

interface UserProfile {
    shopName: string;
    ownerName: string;
    phone: string;
    address: string;
}

interface LicenseContextType {
    isLicensed: boolean;
    machineId: string;
    expiryDate: Date | null;
    plan: string | null;
    userProfile: UserProfile;
    activateLicense: (key: string) => Promise<{ success: boolean; message: string }>;
    checkLicense: (currentId?: string) => void;
    isProfileComplete: boolean;
    updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
}

const LicenseContext = createContext<LicenseContextType | undefined>(undefined);

export const LicenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLicensed, setIsLicensed] = useState<boolean>(false);
    const [machineId, setMachineId] = useState<string>('');
    const [expiryDate, setExpiryDate] = useState<Date | null>(null);
    const [plan, setPlan] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<UserProfile>({
        shopName: '',
        ownerName: '',
        phone: '',
        address: ''
    });

    const isProfileComplete = Boolean(
        userProfile.shopName &&
        userProfile.ownerName &&
        userProfile.phone &&
        userProfile.address
    );

    useEffect(() => {
        // Initialize Machine ID
        const id = getMachineId();
        setMachineId(id);
        checkLicense(id);
        loadProfile();
    }, []);

    const loadProfile = () => {
        const savedProfile = localStorage.getItem('kps_user_profile');
        if (savedProfile) {
            try {
                setUserProfile(JSON.parse(savedProfile));
            } catch (e) {
                console.error("Failed to parse profile");
            }
        }
    };

    const updateProfile = async (newProfile: Partial<UserProfile>) => {
        const updated = { ...userProfile, ...newProfile };
        setUserProfile(updated);
        localStorage.setItem('kps_user_profile', JSON.stringify(updated));

        // Sync to Supabase
        if (machineId) {
            try {
                const { error } = await supabase
                    .from('licenses')
                    .update({
                        shop_name: updated.shopName,
                        owner_name: updated.ownerName,
                        phone: updated.phone,
                        address: updated.address
                    })
                    .eq('machine_id', machineId);

                if (error) console.error("Failed to sync profile to Supabase:", error);
            } catch (err) {
                console.error("Error syncing profile:", err);
            }
        }
    };

    const checkLicense = async (currentId?: string) => {
        const id = currentId || machineId;
        const savedKey = localStorage.getItem('kps_license_key');

        if (savedKey) {
            // First validation is just mathematical (signature check) - instant
            const localResult = validateLicenseKey(savedKey, id);

            if (localResult.valid) {
                // Second verification: Check if this key actually exists in Supabase and is ACTIVE
                // This prevents people from just generating valid keys offline if we don't want them to.
                // However, for "offline-first" feel, we might trust the signature.
                // Let's add an amorphous check:

                const { data, error } = await supabase
                    .from('licenses')
                    .select('status')
                    .eq('key', savedKey)
                    .eq('machine_id', id)
                    .single();

                if (data && data.status === 'ACTIVE') {
                    setIsLicensed(true);
                    setExpiryDate(localResult.expiry || null);
                    setPlan(localResult.plan || null);
                } else if (data && data.status !== 'ACTIVE') {
                    // Key exists but revoked/expired in DB
                    setIsLicensed(false);
                    console.warn("License key revoked or expired in database.");
                } else {
                    // Key not found in DB (maybe local-only mode or offline?)
                    // For now, let's trust the signature if DB is unreachable, 
                    // BUT if DB *is* reachable and returns null, it's a fake key.
                    if (!error) {
                        setIsLicensed(false); // DB reachable, key not found -> Fake
                    } else {
                        // DB error (offline), fallback to signature trust
                        setIsLicensed(true);
                        setExpiryDate(localResult.expiry || null);
                        setPlan(localResult.plan || null);
                    }
                }
            } else {
                setIsLicensed(false);
            }
        } else {
            setIsLicensed(false);
        }
        setLoading(false);
    };

    const activateLicense = async (key: string): Promise<{ success: boolean; message: string }> => {
        const result = validateLicenseKey(key, machineId);
        if (result.valid) {
            localStorage.setItem('kps_license_key', key);
            setIsLicensed(true);
            setExpiryDate(result.expiry || null);
            setPlan(result.plan || null);

            // Sync to Supabase (Upsert to ensure Admin sees it)
            // Calculate approximate duration for DB record if needed
            let duration = '30'; // Default
            if (result.expiry) {
                const diffTime = result.expiry.getTime() - new Date().getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                duration = diffDays.toString();
            }

            try {
                const { error } = await supabase
                    .from('licenses')
                    .upsert({
                        machine_id: machineId,
                        key: key,
                        type: result.plan || 'Standard',
                        duration: duration,
                        status: 'ACTIVE', // If they have a valid key, they are active
                        created_at: new Date().toISOString(),
                        // Initialize profile fields if they don't exist, or keep existing? 
                        // Upsert will update if exists. We should probably accept whatever is in profile state if valid, or default to '-'
                        shop_name: userProfile.shopName || 'Unknown',
                        owner_name: userProfile.ownerName || '-',
                        phone: userProfile.phone || '-',
                        address: userProfile.address || '-'
                    }, { onConflict: 'machine_id' }); // Assuming machine_id is unique or we want one license per machine

                if (error) console.error("Supabase Sync Error:", error);

            } catch (err) {
                console.error("Supabase Sync Exception:", err);
            }

            return { success: true, message: 'License Activated Successfully!' };
        }
        return { success: false, message: result.message };
    };

    return (
        <LicenseContext.Provider value={{
            isLicensed,
            machineId,
            expiryDate,
            plan,
            userProfile,
            activateLicense,
            checkLicense,
            updateProfile,
            isProfileComplete
        }}>
            {!loading && children}
        </LicenseContext.Provider>
    );
};

export const useLicense = () => {
    const context = useContext(LicenseContext);
    if (context === undefined) {
        throw new Error('useLicense must be used within a LicenseProvider');
    }
    return context;
};
