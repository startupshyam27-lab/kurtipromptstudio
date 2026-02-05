import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMachineId, validateLicenseKey } from '@/lib/license';

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
    activateLicense: (key: string) => { success: boolean; message: string };
    checkLicense: (currentId?: string) => void;
    updateProfile: (profile: Partial<UserProfile>) => void;
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

    const updateProfile = (newProfile: Partial<UserProfile>) => {
        const updated = { ...userProfile, ...newProfile };
        setUserProfile(updated);
        localStorage.setItem('kps_user_profile', JSON.stringify(updated));
    };

    const checkLicense = (currentId?: string) => {
        const id = currentId || machineId;
        const savedKey = localStorage.getItem('kps_license_key');

        if (savedKey) {
            const result = validateLicenseKey(savedKey, id);
            if (result.valid) {
                setIsLicensed(true);
                setExpiryDate(result.expiry || null);
                setPlan(result.plan || null);
            } else {
                setIsLicensed(false);
                // Don't remove key immediately, let them see why it failed (e.g. expiry)
            }
        } else {
            setIsLicensed(false);
        }
        setLoading(false);
    };

    const activateLicense = (key: string): { success: boolean; message: string } => {
        const result = validateLicenseKey(key, machineId);
        if (result.valid) {
            localStorage.setItem('kps_license_key', key);
            setIsLicensed(true);
            setExpiryDate(result.expiry || null);
            setPlan(result.plan || null);
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
            updateProfile
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
