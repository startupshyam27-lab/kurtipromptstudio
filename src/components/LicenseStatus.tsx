import React from 'react';
import { useLicense } from '@/contexts/LicenseContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Phone, RefreshCcw } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export const LicenseStatus: React.FC = () => {
    const { expiryDate, plan } = useLicense();

    if (!expiryDate) return null;

    const now = new Date();
    const diffTime = expiryDate.getTime() - now.getTime();
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.ceil(diffTime / (1000 * 60 * 60));
    const minutesLeft = Math.ceil(diffTime / (1000 * 60));

    const isCritical = daysLeft < 7;
    const isWarning = daysLeft < 30;

    let timeLeftText = `${daysLeft} days left`;
    if (daysLeft <= 1) {
        if (hoursLeft > 1) {
            timeLeftText = `${hoursLeft} hours left`;
        } else {
            timeLeftText = `${minutesLeft} mins left`;
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={`flex items-center gap-2 border-2 ${isCritical ? 'border-red-500 bg-red-50 text-red-600' :
                        isWarning ? 'border-yellow-500 text-yellow-700' :
                            'border-green-500 text-green-700'
                        }`}
                >
                    <CalendarDays className="w-4 h-4" />
                    <span className="font-bold capitalize">{timeLeftText}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${isCritical ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                            <RefreshCcw className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-semibold">Business License</h4>
                            <p className="text-sm text-muted-foreground">{plan} Plan Active</p>
                        </div>
                    </div>

                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                            <span>Status:</span>
                            <span className="font-medium text-green-600">Active</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Expires on:</span>
                            <span className="font-medium">{expiryDate.toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div className="bg-muted p-3 rounded-md flex items-start gap-3">
                        <Phone className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                            <p className="text-sm font-medium">Need to Renew?</p>
                            <p className="text-xs text-muted-foreground mb-2">Contact Shyam to extend your plan.</p>
                            <a href="https://wa.me/919265180118" target="_blank" rel="noreferrer" className="text-primary text-sm font-bold hover:underline">
                                +91 92651 80118
                            </a>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};
