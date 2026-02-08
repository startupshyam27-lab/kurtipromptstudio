import React, { useState } from 'react';
import { useLicense } from '@/contexts/LicenseContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { User, Store, Phone, MapPin, Calendar, HardDrive, ShieldCheck, Edit2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface UserProfileDialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export const UserProfileDialog: React.FC<UserProfileDialogProps> = ({ open, onOpenChange }) => {
    const { userProfile, updateProfile, machineId, expiryDate, plan } = useLicense();
    const [isEditing, setIsEditing] = useState(false);

    // Local state for form
    const [shopName, setShopName] = useState(userProfile.shopName);
    const [ownerName, setOwnerName] = useState(userProfile.ownerName);
    const [phone, setPhone] = useState(userProfile.phone);
    const [address, setAddress] = useState(userProfile.address);

    const handleSave = () => {
        updateProfile({ shopName, ownerName, phone, address });
        setIsEditing(false);
        toast.success("Profile Updated Successfully!");
    };

    // Calculate days left
    const daysLeft = expiryDate
        ? Math.ceil((expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
        : 0;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100" title="User Profile">
                    <User className="w-5 h-5 text-slate-700" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <Store className="w-6 h-6 text-primary" />
                        {userProfile.shopName || "My Shop Profile"}
                    </DialogTitle>
                    <DialogDescription>
                        Manage your shop details and view license information.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                    {/* Left: License Info */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm text-slate-500 uppercase tracking-wider">Plan Details</h3>
                        <Card className="bg-slate-50 border-slate-200">
                            <CardContent className="p-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-slate-700">
                                        <ShieldCheck className="w-4 h-4 text-green-600" />
                                        <span className="font-medium">Status</span>
                                    </div>
                                    <Badge className="bg-green-600 hover:bg-green-700">Active</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-slate-700">
                                        <Calendar className="w-4 h-4" />
                                        <span className="font-medium">Expiry</span>
                                    </div>
                                    <span className="text-sm font-bold text-slate-900">
                                        {expiryDate?.toLocaleDateString()}
                                        <span className="text-xs font-normal text-slate-500 ml-1">({daysLeft} days left)</span>
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-slate-700">
                                        <span className="font-medium">Plan Type</span>
                                    </div>
                                    <span className="text-sm font-bold text-slate-900">{plan}</span>
                                </div>
                                <div className="pt-2 border-t border-slate-200">
                                    <div className="text-xs text-slate-500 mb-1">Machine ID (Unique)</div>
                                    <code className="block bg-white p-2 rounded border font-mono text-xs break-all text-slate-600">
                                        {machineId}
                                    </code>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: User Details */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-sm text-slate-500 uppercase tracking-wider">Shop Information</h3>
                            {!isEditing && (
                                <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="h-6 text-xs text-primary">
                                    <Edit2 className="w-3 h-3 mr-1" /> Edit
                                </Button>
                            )}
                        </div>

                        {isEditing ? (
                            <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="space-y-1">
                                    <Label className="text-xs">Shop Name</Label>
                                    <Input value={shopName} onChange={e => setShopName(e.target.value)} placeholder="Enter Shop Name" />
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs">Owner Name</Label>
                                    <Input value={ownerName} onChange={e => setOwnerName(e.target.value)} placeholder="Enter Your Name" />
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs">Phone Number</Label>
                                    <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Contact Number" />
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs">Address</Label>
                                    <Input value={address} onChange={e => setAddress(e.target.value)} placeholder="City, State" />
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <Button onClick={handleSave} className="flex-1 bg-green-600 hover:bg-green-700">Save</Button>
                                    <Button onClick={() => setIsEditing(false)} variant="outline" className="flex-1">Cancel</Button>
                                </div>
                            </div>
                        ) : (
                            <Card className="bg-white border-slate-200 h-full">
                                <CardContent className="p-4 space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Store className="w-5 h-5 text-slate-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-slate-500">Shop Name</p>
                                            <p className="font-medium text-slate-900">{userProfile.shopName || "Not Set"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <User className="w-5 h-5 text-slate-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-slate-500">Owner</p>
                                            <p className="font-medium text-slate-900">{userProfile.ownerName || "Not Set"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Phone className="w-5 h-5 text-slate-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-slate-500">Phone</p>
                                            <p className="font-medium text-slate-900">{userProfile.phone || "Not Set"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-slate-500">Address</p>
                                            <p className="font-medium text-slate-900">{userProfile.address || "Not Set"}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
