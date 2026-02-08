import React, { useState } from 'react';
import { useLicense } from '@/contexts/LicenseContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, ShieldCheck, AlertTriangle } from 'lucide-react';

export interface LicenseBarrierProps {
    className?: string;
    inline?: boolean;
}

export const LicenseBarrier: React.FC<LicenseBarrierProps> = ({ className = '', inline = false }) => {
    const { machineId, activateLicense } = useLicense();
    const [inputKey, setInputKey] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleActivate = async () => {
        setError('');
        setSuccess('');

        if (!inputKey.trim()) {
            setError('Please enter a license key');
            return;
        }

        const result = await activateLicense(inputKey.trim());
        if (result.success) {
            setSuccess(result.message);
            // Optional: Could prompt for shop name here, but we'll let them do it in the app profile.
            setTimeout(() => window.location.reload(), 1500); // Reload to clear any state
        } else {
            setError(result.message);
        }
    };

    const containerClasses = inline
        ? `w-full flex items-center justify-center p-4 ${className}`
        : `min-h-screen w-full flex items-center justify-center bg-gray-900 text-white p-4 ${className}`;

    return (
        <div className={containerClasses}>
            <Card className="w-full max-w-md bg-white text-black">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                        <Lock className="w-8 h-8 text-red-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-red-600">Software Locked</CardTitle>
                    <CardDescription>
                        This application requires a valid business license to operate.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-gray-100 p-4 rounded-lg border text-center">
                        <p className="text-sm text-gray-500 mb-1">Your Machine ID</p>
                        <code className="text-lg font-mono font-bold tracking-wider select-all cursor-pointer text-blue-600">
                            {machineId}
                        </code>
                        <p className="text-xs text-gray-400 mt-1">(Share this ID with Shyam to get your key)</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Enter License Key</label>
                        <Input
                            placeholder="KPS-XXXX-XXXX-XXXX"
                            value={inputKey}
                            onChange={(e) => setInputKey(e.target.value.toUpperCase())}
                            className="font-mono uppercase text-center"
                        />
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
                            <AlertTriangle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-md">
                            <ShieldCheck className="w-4 h-4" />
                            {success}
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleActivate}>
                        Activate License
                    </Button>
                    <div className="text-center text-gray-500 text-xs">
                        <p>Contact Support:</p>
                        <p className="font-bold text-gray-700">+91 92651 80118</p>
                        <p className="text-gray-500">startupshyam27@gmail.com</p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};
