
// Simple XOR encryption with a salt for offline license keys
// This is not military-grade but sufficient for a local shop software protection.

const SALT = "KURTI-PROMPT-STUDIO-SECRET-SALT-2026";

/**
 * Generates a persistent Machine ID for the browser.
 * In a real desktop app (Electron), we would use hardware info.
 * For web/local, we create a UUID and store it in localStorage if not present.
 */
export const getMachineId = (): string => {
    let machineId = localStorage.getItem("kps_machine_id");
    if (!machineId) {
        // Generate a largely unique ID
        machineId = 'SHOP-' + Math.random().toString(36).substring(2, 8).toUpperCase() +
            '-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        localStorage.setItem("kps_machine_id", machineId);
    }
    return machineId;
};

/**
 * Encrypts data into a License Key.
 * Format: KPS-{MachineID}-{ExpiryTimestamp}-{Plan}-{Signature}
 * Note: In a real app, use a proper crypto library. This is a manual obfuscation for demo.
 */
export const generateLicenseKey = (machineId: string, daysValid: number, plan: string = 'SILVER'): string => {
    const expiryDate = new Date();
    // Use setTime to allow fractional days (e.g. 0.007 days = 10 mins)
    expiryDate.setTime(expiryDate.getTime() + daysValid * 24 * 60 * 60 * 1000);
    const timestamp = expiryDate.getTime().toString(36).toUpperCase();

    // Simple signature generation
    const dataToSign = `${machineId}-${timestamp}-${plan}-${SALT}`;
    const signature = simpleHash(dataToSign);

    return `KPS-${machineId}-${timestamp}-${plan}-${signature}`.toUpperCase();
};

/**
 * Validates a License Key.
 * Returns { valid: boolean, message: string, expiry: Date }
 */
export const validateLicenseKey = (key: string, currentMachineId: string): { valid: boolean, message: string, expiry?: Date, plan?: string } => {
    try {
        const parts = key.split('-');
        // Expected format: KPS - MACHINE_ID_PART1 - MACHINE_ID_PART2 - TIMESTAMP - PLAN - SIGNATURE
        // But our machineID might have dashes. Let's rely on position assuming KPS prefix.

        if (parts[0] !== 'KPS') return { valid: false, message: "Invalid License Format" };

        const signature = parts.pop(); // Last part is always signature
        const plan = parts.pop();
        const timestampStr = parts.pop();

        // Reconstruct Machine ID (everything between KPS and Timestamp)
        const keyMachineId = parts.slice(1).join('-');

        // 1. Check Machine ID
        if (keyMachineId !== currentMachineId) {
            return { valid: false, message: "This key is for a different machine." };
        }

        // 2. Verify Signature
        const dataToSign = `${keyMachineId}-${timestampStr}-${plan}-${SALT}`;
        const calculatedSignature = simpleHash(dataToSign);

        if (signature !== calculatedSignature) {
            return { valid: false, message: "Invalid Key Signature (Tampered)" };
        }

        // 3. Check Expiry
        const expiryTimestamp = parseInt(timestampStr!, 36);
        const expiryDate = new Date(expiryTimestamp);

        if (new Date() > expiryDate) {
            return { valid: false, message: "License Expired", expiry: expiryDate };
        }

        return { valid: true, message: "Success", expiry: expiryDate, plan: plan };

    } catch (e) {
        return { valid: false, message: "Error reading key" };
    }
};

// A simple string hashing function (DJB2 variant) for signature
const simpleHash = (str: string): string => {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i); /* hash * 33 + c */
    }
    // Return a 4-char string representation
    return (hash >>> 0).toString(36).substring(0, 4).toUpperCase();
};
