import React, { useState, useEffect, useRef } from 'react';
import { generateLicenseKey } from '@/lib/license';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    RefreshCw, Search, Smartphone, MapPin, User, Building2, Copy, AlertTriangle,
    BarChart3, Settings, Download, Upload, TrendingUp, DollarSign, Users, Lock, LogOut, History
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface KeyHistory {
    id: string;
    date: string;
    machineId: string;
    type: string;
    duration: string;
    key: string;
    shopName: string;
    ownerName: string;
    phone: string;
    address: string;
    status: 'ACTIVE' | 'TRANSFERRED' | 'EXPIRED' | 'RENEWED';
    transferredTo?: string;
    price?: number; // Added for revenue tracking
}

const PRICE_MAP: Record<string, number> = {
    '0.006944': 0, // 10 Mins
    '2': 0,        // 2 Days
    '30': 1000,    // Monthly
    '180': 5000,   // Silver
    '365': 7000,   // Gold
    '3650': 15000  // Lifetime
};

const SecretAdminKeyGen: React.FC = () => {
    // Login State
    const [isAdmin, setIsAdmin] = useState(false);
    const [password, setPassword] = useState('');

    // Settings State
    const [currentAdminPassword, setCurrentAdminPassword] = useState('ShyamAdmin2026');
    const [newPassword, setNewPassword] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form State
    const [targetMachineId, setTargetMachineId] = useState('');
    const [duration, setDuration] = useState('180');
    const [shopName, setShopName] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    // Result State
    const [generatedKey, setGeneratedKey] = useState('');
    const [history, setHistory] = useState<KeyHistory[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    // Transfer Dialog State
    const [transferDialogOpen, setTransferDialogOpen] = useState(false);
    const [selectedLicense, setSelectedLicense] = useState<KeyHistory | null>(null);
    const [newMachineId, setNewMachineId] = useState('');

    // Renew/Change Plan State
    const [renewDialogOpen, setRenewDialogOpen] = useState(false);
    const [renewalDuration, setRenewalDuration] = useState('365');
    const [selectedRenewalLicense, setSelectedRenewalLicense] = useState<KeyHistory | null>(null);

    // History Dialog State
    const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
    const [selectedHistoryMachineId, setSelectedHistoryMachineId] = useState<string>('');

    useEffect(() => {
        // Load custom password
        const savedPassword = localStorage.getItem('kps_admin_password');
        if (savedPassword) setCurrentAdminPassword(savedPassword);

        // Fetch initial data
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('licenses')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching licenses:', error);
            toast.error('Failed to load data from database');
        } else {
            // Map Supabase fields to our KeyHistory interface
            const mappedHistory = data.map((item: any) => {
                const created = new Date(item.created_at);
                const durationDays = parseFloat(item.duration);
                const expiryDate = new Date(created.getTime() + durationDays * 24 * 60 * 60 * 1000);
                const isExpired = new Date() > expiryDate;

                // Dynamic Status Calculation: overwrite ACTIVE if time passed
                let displayStatus = item.status;
                if (item.status === 'ACTIVE' && isExpired) {
                    displayStatus = 'EXPIRED';
                }

                return {
                    id: item.id,
                    date: created.toLocaleString(),
                    machineId: item.machine_id,
                    type: item.type,
                    duration: item.duration,
                    key: item.key,
                    shopName: item.shop_name,
                    ownerName: item.owner_name,
                    phone: item.phone,
                    address: item.address,
                    status: displayStatus,
                    transferredTo: item.transferred_to,
                    price: item.price
                };
            });
            setHistory(mappedHistory);
        }
        setLoading(false);
    };

    const handleLogin = () => {
        if (password === currentAdminPassword) {
            setIsAdmin(true);
            fetchHistory(); // Refresh on login
        } else {
            toast.error('Wrong Password');
        }
    };

    const handleChangePassword = () => {
        if (!newPassword) return;
        localStorage.setItem('kps_admin_password', newPassword);
        setCurrentAdminPassword(newPassword);
        setNewPassword('');
        toast.success("Admin Password Updated!");
    };

    const handleGenerate = async () => {
        if (!targetMachineId) {
            toast.error('Enter Machine ID');
            return;
        }

        // Auto-calculate price based on duration
        const price = PRICE_MAP[duration] || 0;

        const key = generateLicenseKey(targetMachineId, parseFloat(duration), 'PRO');
        setGeneratedKey(key);

        // Insert into Supabase
        const { error } = await supabase.from('licenses').insert({
            machine_id: targetMachineId,
            type: 'PRO',
            duration: duration,
            key: key,
            shop_name: shopName || 'Unknown',
            owner_name: ownerName || '-',
            phone: phone || '-',
            address: address || '-',
            status: 'ACTIVE',
            price: price,
            created_at: new Date().toISOString()
        });

        if (error) {
            toast.error("Database Error: " + error.message);
        } else {
            toast.success("License Generated & Saved to Database!");
            fetchHistory(); // Refresh list
        }
    };

    const handleTransfer = async () => {
        if (!selectedLicense || !newMachineId) return;

        const createdDate = new Date(selectedLicense.date);
        const expiryDate = new Date(createdDate);
        expiryDate.setTime(expiryDate.getTime() + parseFloat(selectedLicense.duration) * 24 * 60 * 60 * 1000);

        const now = new Date();
        const diffTime = expiryDate.getTime() - now.getTime();
        const remainingDays = Math.max(0, diffTime / (1000 * 60 * 60 * 24));

        if (remainingDays <= 0) {
            toast.error("License has already expired. Cannot transfer.");
            return;
        }

        const newKey = generateLicenseKey(newMachineId, remainingDays, 'PRO');

        // 1. Mark old license as transferred
        const { error: updateError } = await supabase
            .from('licenses')
            .update({ status: 'TRANSFERRED', transferred_to: newMachineId })
            .eq('id', selectedLicense.id);

        if (updateError) {
            toast.error("Failed to update old license");
            return;
        }

        // 2. Create new license
        const { error: insertError } = await supabase.from('licenses').insert({
            machine_id: newMachineId,
            type: 'PRO (Transfer)',
            duration: remainingDays.toFixed(4),
            key: newKey,
            shop_name: selectedLicense.shopName,
            owner_name: selectedLicense.ownerName,
            phone: selectedLicense.phone,
            address: selectedLicense.address,
            status: 'ACTIVE',
            price: 0 // Transfer is free usually
        });

        if (insertError) {
            toast.error("Failed to create new license record");
        } else {
            toast.success(`License Transferred! New Key for ${remainingDays.toFixed(1)} days.`);
            setTransferDialogOpen(false);
            setNewMachineId('');
            fetchHistory();
        }
    };

    const handleBackup = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "kps_backup_" + new Date().toISOString().slice(0, 10) + ".json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        toast.success("Backup Downloaded!");
    };

    const handleRestore = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileReader = new FileReader();
        if (event.target.files && event.target.files[0]) {
            fileReader.readAsText(event.target.files[0], "UTF-8");
            fileReader.onload = async (e) => {
                try {
                    const parsed = JSON.parse(e.target?.result as string);
                    if (Array.isArray(parsed)) {
                        // Ask user if they want to upload to DB
                        const confirmUpload = window.confirm(`Restore: Found ${parsed.length} records. Upload these to the live database?`);

                        if (confirmUpload) {
                            // Map local history format to Supabase format
                            const dbRecords = parsed.map(p => ({
                                machine_id: p.machineId,
                                type: p.type,
                                duration: p.duration,
                                key: p.key,
                                shop_name: p.shopName,
                                owner_name: p.ownerName,
                                phone: p.phone,
                                address: p.address,
                                status: p.status,
                                price: p.price,
                                created_at: p.date ? new Date(p.date).toISOString() : new Date().toISOString()
                            }));

                            const { error } = await supabase.from('licenses').insert(dbRecords);

                            if (error) {
                                toast.error("Restore Failed: " + error.message);
                            } else {
                                toast.success("Database Restored Successfully!");
                                fetchHistory();
                            }
                        }
                    } else {
                        toast.error("Invalid Backup File");
                    }
                } catch (err) {
                    toast.error("Failed to parse file");
                }
            };
        }
    };

    const handleRenew = async () => {
        if (!selectedRenewalLicense) return;

        const price = PRICE_MAP[renewalDuration] || 0;
        const key = generateLicenseKey(selectedRenewalLicense.machineId, parseFloat(renewalDuration), 'PRO');

        // 1. Mark old as RENEWED
        await supabase
            .from('licenses')
            .update({ status: 'RENEWED' })
            .eq('id', selectedRenewalLicense.id);

        // 2. Insert new record
        const { error } = await supabase.from('licenses').insert({
            machine_id: selectedRenewalLicense.machineId,
            type: 'PRO (Renewal)',
            duration: renewalDuration,
            key: key,
            shop_name: selectedRenewalLicense.shopName,
            owner_name: selectedRenewalLicense.ownerName,
            phone: selectedRenewalLicense.phone,
            address: selectedRenewalLicense.address,
            status: 'ACTIVE',
            price: price
        });

        if (error) {
            toast.error("Renewal Error: " + error.message);
        } else {
            toast.success("Plan Renewed/Changed Successfully!");
            setRenewDialogOpen(false);
            setGeneratedKey(key); // Show the new key to admin
            fetchHistory();
        }
    };

    // Analytics Calculations
    // Analytics Calculations
    const totalRevenue = history.reduce((acc, curr) => {
        const price = curr.price !== undefined ? curr.price : (PRICE_MAP[curr.duration] || 0);
        return acc + price;
    }, 0);
    const activeLicenses = history.filter(h => h.status === 'ACTIVE').length;
    const uniqueCustomers = new Set(history.map(h => h.shopName)).size;

    const filteredHistory = history.filter(h =>
        h.shopName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.machineId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.phone?.includes(searchTerm)
    );

    // Group by unique Machine ID, taking the latest ACTIVE entry, or just the latest if none active
    const groupedHistory = React.useMemo(() => {
        const groups: Record<string, KeyHistory[]> = {};

        filteredHistory.forEach(item => {
            if (!groups[item.machineId]) groups[item.machineId] = [];
            groups[item.machineId].push(item);
        });

        return Object.values(groups).map(group => {
            // Sort by date descending (assuming date string is comparable or latest added is first). 
            // Better: use the one that is ACTIVE. If multiple ACTIVE, use latest.
            // If no ACTIVE, use latest by date.

            // Note: date is locale string which is bad for sorting, but new items are unshifted to top of history array
            // so index 0 of the group (if preserving order) might be latest if we filtered correctly.
            // Let's rely on the fact that we prepend new entries.

            const active = group.find(g => g.status === 'ACTIVE');
            return active || group[0];
        });
    }, [filteredHistory]);

    const getHistoryForMachine = (machineId: string) => {
        return history.filter(h => h.machineId === machineId);
    };

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>Admin Login</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input
                            type="password"
                            placeholder="Admin Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button className="w-full" onClick={handleLogin}>Login</Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 font-sans text-slate-900 pb-20">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Top Bar */}
                <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div>
                        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center gap-2">
                            <User className="w-6 h-6 text-yellow-600" />
                            KPS Super Admin
                        </h1>
                        <div className="flex gap-4 text-xs text-slate-500 mt-1">
                            <span>Version 2.0 (CRM Edition)</span>
                            <span className="text-green-600">• System Online</span>
                        </div>
                    </div>
                    <Button variant="ghost" onClick={() => setIsAdmin(false)} className="text-red-600 hover:text-red-700 hover:bg-red-50 gap-2">
                        <LogOut className="w-4 h-4" /> Logout
                    </Button>
                </div>

                <Tabs defaultValue="dashboard" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-white p-1 h-14 border border-gray-200">
                        <TabsTrigger value="dashboard" className="gap-2 h-full data-[state=active]:bg-gray-100 data-[state=active]:text-slate-900">
                            <BarChart3 className="w-4 h-4" /> Dashboard
                        </TabsTrigger>
                        <TabsTrigger value="generate" className="gap-2 h-full data-[state=active]:bg-gray-100 data-[state=active]:text-slate-900">
                            <RefreshCw className="w-4 h-4" /> New License
                        </TabsTrigger>
                        <TabsTrigger value="history" className="gap-2 h-full data-[state=active]:bg-gray-100 data-[state=active]:text-slate-900">
                            <Users className="w-4 h-4" /> Customers
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="gap-2 h-full data-[state=active]:bg-gray-100 data-[state=active]:text-slate-900">
                            <Settings className="w-4 h-4" /> Settings
                        </TabsTrigger>
                    </TabsList>

                    {/* 1. DASHBOARD TAB */}
                    <TabsContent value="dashboard" className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="bg-white border-gray-200 shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-slate-500">Total Revenue</CardTitle>
                                    <DollarSign className="w-4 h-4 text-green-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</div>
                                    <p className="text-xs text-slate-500 mt-1">Lifetime earnings</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white border-gray-200 shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-slate-500">Active Licenses</CardTitle>
                                    <TrendingUp className="w-4 h-4 text-blue-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-blue-600">{activeLicenses}</div>
                                    <p className="text-xs text-slate-500 mt-1">Currently running shops</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white border-gray-200 shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-slate-500">Total Customers</CardTitle>
                                    <Building2 className="w-4 h-4 text-orange-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-orange-600">{uniqueCustomers}</div>
                                    <p className="text-xs text-slate-500 mt-1">Unique shops registered</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Activity */}
                        <Card className="bg-white border-gray-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-slate-900">Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {history.slice(0, 5).map((h, i) => (
                                        <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-2 h-2 rounded-full ${h.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'}`} />
                                                <div>
                                                    <p className="font-medium text-slate-900">{h.shopName}</p>
                                                    <p className="text-xs text-slate-500">Generated {h.type} Key</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-green-600">+₹{h.price !== undefined ? h.price : (PRICE_MAP[h.duration] || 0)}</p>
                                                <p className="text-xs text-slate-500">{h.date.split(',')[0]}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* 2. GENERATE TAB (Existing Content Refined) */}
                    <TabsContent value="generate">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="bg-white border-gray-200 text-slate-900 h-fit shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-blue-600 text-lg">1. License Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Customer Machine ID</Label>
                                        <Input
                                            placeholder="e.g. SHOP-X7Y8-Z9A0"
                                            value={targetMachineId}
                                            onChange={(e) => setTargetMachineId(e.target.value.toUpperCase())}
                                            className="font-mono bg-white border-gray-300 text-slate-900 uppercase"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Plan Duration</Label>
                                        <Select value={duration} onValueChange={setDuration}>
                                            <SelectTrigger className="bg-white border-gray-300 text-slate-900">
                                                <SelectValue placeholder="Select duration" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0.006944">Trial (10 Mins) - Free</SelectItem>
                                                <SelectItem value="2">Trial (2 Days) - Free</SelectItem>
                                                <SelectItem value="30">Monthly (30 Days) - ₹1,000</SelectItem>
                                                <SelectItem value="180">Silver Plan (6 Months) - ₹5,000</SelectItem>
                                                <SelectItem value="365">Gold Plan (1 Year) - ₹7,000</SelectItem>
                                                <SelectItem value="3650">Lifetime (10 Years) - ₹15,000</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-gray-200 text-slate-900 h-fit shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-orange-600 text-lg">2. Customer Info (CRM)</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Shop Name</Label>
                                            <Input placeholder="Laxmi Fashion" className="bg-white border-gray-300" value={shopName} onChange={e => setShopName(e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Owner Name</Label>
                                            <Input placeholder="Raju Bhai" className="bg-white border-gray-300" value={ownerName} onChange={e => setOwnerName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Phone</Label>
                                            <Input placeholder="9876543210" className="bg-white border-gray-300" value={phone} onChange={e => setPhone(e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>City</Label>
                                            <Input placeholder="Surat" className="bg-white border-gray-300" value={address} onChange={e => setAddress(e.target.value)} />
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold h-12 mt-4"
                                        onClick={handleGenerate}
                                    >
                                        Generate Key
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {generatedKey && (
                            <Card className="bg-gray-900 border-green-500 mt-6 animate-in fade-in zoom-in duration-300">
                                <CardContent className="p-8 text-center">
                                    <p className="text-sm text-green-400 mb-2 font-medium tracking-wide">LICENSE KEY GENERATED SUCCESSFULLY</p>
                                    <code className="text-4xl font-mono font-bold text-white tracking-widest break-all">
                                        {generatedKey}
                                    </code>
                                    <div className="mt-6 flex justify-center gap-4">
                                        <Button variant="outline" className="border-green-600 text-green-400 hover:bg-green-900/20" onClick={() => navigator.clipboard.writeText(generatedKey)}>
                                            <Copy className="w-4 h-4 mr-2" /> Copy Key
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    {/* 3. HISTORY TAB (Existing Content) */}
                    <TabsContent value="history">
                        <Card className="bg-white border-gray-200 text-slate-900 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Customer Database</CardTitle>
                                    <CardDescription className="text-slate-500">History of all licenses and customers.</CardDescription>
                                </div>
                                <div className="relative w-64">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                                    <Input
                                        placeholder="Search..."
                                        className="pl-8 bg-white border-gray-300"
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border border-gray-200">
                                    <Table>
                                        <TableHeader className="bg-gray-50">
                                            <TableRow className="border-gray-200 hover:bg-gray-100">
                                                <TableHead className="text-slate-600">Customer</TableHead>
                                                <TableHead className="text-slate-600">Machine ID</TableHead>
                                                <TableHead className="text-slate-600">Plan</TableHead>
                                                <TableHead className="text-slate-600">Status</TableHead>
                                                <TableHead className="text-right text-slate-600">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {groupedHistory.map((entry, i) => (
                                                <TableRow key={entry.id || i} className="border-gray-100 hover:bg-gray-50">
                                                    <TableCell>
                                                        <div className="font-medium text-slate-900">{entry.shopName}</div>
                                                        <div className="text-xs text-slate-500">{entry.phone}</div>
                                                    </TableCell>
                                                    <TableCell className="font-mono text-xs text-blue-600 font-semibold">{entry.machineId}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className="border-yellow-600 text-yellow-700 bg-yellow-50">
                                                            {parseFloat(entry.duration) < 1
                                                                ? `${(parseFloat(entry.duration) * 24 * 60).toFixed(0)} Mins`
                                                                : `${parseInt(entry.duration)} Days`
                                                            }
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge className={entry.status === 'ACTIVE' ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}>{entry.status}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right flex justify-end gap-2">
                                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => navigator.clipboard.writeText(entry.key)} title="Copy Key">
                                                            <Copy className="w-4 h-4 text-slate-400" />
                                                        </Button>
                                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-600 hover:text-slate-800 hover:bg-slate-100" onClick={() => { setSelectedHistoryMachineId(entry.machineId); setHistoryDialogOpen(true); }} title="View History">
                                                            <History className="w-4 h-4" />
                                                        </Button>
                                                        {entry.status === 'ACTIVE' && (
                                                            <>
                                                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50" onClick={() => { setSelectedRenewalLicense(entry); setRenewDialogOpen(true); }} title="Renew/Change Plan">
                                                                    <RefreshCw className="w-4 h-4" />
                                                                </Button>
                                                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-orange-600 hover:text-orange-700 hover:bg-orange-50" onClick={() => { setSelectedLicense(entry); setTransferDialogOpen(true); }} title="Transfer">
                                                                    <Smartphone className="w-4 h-4" />
                                                                </Button>
                                                            </>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* 4. SETTINGS TAB (New) */}
                    <TabsContent value="settings">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Backup / Restore */}
                            {/* Backup / Restore */}
                            <Card className="bg-white border-gray-200 text-slate-900 shadow-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Download className="w-5 h-5 text-blue-600" />
                                        Data Backup & Restore
                                    </CardTitle>
                                    <CardDescription>Save your customer database to a file or restore it.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Button onClick={handleBackup} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                        <Download className="w-4 h-4 mr-2" /> Download Backup (.json)
                                    </Button>
                                    <div className="relative">
                                        <Input
                                            type="file"
                                            accept=".json"
                                            ref={fileInputRef}
                                            onChange={handleRestore}
                                            className="hidden"
                                        />
                                        <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full border-gray-300 text-slate-600 hover:bg-gray-50 mt-2">
                                            <Upload className="w-4 h-4 mr-2" /> Restore Database
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Security */}
                            {/* Security */}
                            <Card className="bg-white border-gray-200 text-slate-900 shadow-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Lock className="w-5 h-5 text-red-600" />
                                        Security Settings
                                    </CardTitle>
                                    <CardDescription>Change your admin access password.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>New Admin Password</Label>
                                        <Input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="bg-white border-gray-300"
                                            placeholder="Enter new password"
                                        />
                                    </div>
                                    <Button onClick={handleChangePassword} className="w-full bg-red-600 hover:bg-red-700 text-white">
                                        Update Password
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                </Tabs>

            </div>

            {/* Transfer Dialog */}
            <Dialog open={transferDialogOpen} onOpenChange={setTransferDialogOpen}>
                <DialogContent className="bg-white border-gray-200 text-slate-900">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-orange-600">
                            <Smartphone className="w-5 h-5" />
                            Recover / Transfer License
                        </DialogTitle>
                        <DialogDescription className="text-slate-500">
                            Generate NEW key for remaining time.
                            <br />
                            <strong>Transferring from:</strong> {selectedLicense?.shopName}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>New Machine ID</Label>
                            <Input
                                value={newMachineId}
                                onChange={(e) => setNewMachineId(e.target.value.toUpperCase())}
                                className="font-mono bg-white border-gray-300 text-slate-900 uppercase"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleTransfer} className="bg-orange-600 hover:bg-orange-700 text-white">
                            Confirm Transfer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Renew / Change Plan Dialog */}
            <Dialog open={renewDialogOpen} onOpenChange={setRenewDialogOpen}>
                <DialogContent className="bg-white border-gray-200 text-slate-900">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-blue-600">
                            <RefreshCw className="w-5 h-5" />
                            Renew or Change Plan
                        </DialogTitle>
                        <DialogDescription className="text-slate-500">
                            Create a new license key for this customer.
                            <br />
                            <strong>Customer:</strong> {selectedRenewalLicense?.shopName} ({selectedRenewalLicense?.machineId})
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Select New Plan Duration</Label>
                            <Select value={renewalDuration} onValueChange={setRenewalDuration}>
                                <SelectTrigger className="bg-white border-gray-300 text-slate-900">
                                    <SelectValue placeholder="Select duration" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0.006944">Trial (10 Mins) - Free</SelectItem>
                                    <SelectItem value="2">Trial (2 Days) - Free</SelectItem>
                                    <SelectItem value="30">Monthly (30 Days) - ₹1,000</SelectItem>
                                    <SelectItem value="180">Silver Plan (6 Months) - ₹5,000</SelectItem>
                                    <SelectItem value="365">Gold Plan (1 Year) - ₹7,000</SelectItem>
                                    <SelectItem value="3650">Lifetime (10 Years) - ₹15,000</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleRenew} className="bg-blue-600 hover:bg-blue-700 text-white">
                            Generate Renewal Key
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* History Dialog */}
            <Dialog open={historyDialogOpen} onOpenChange={setHistoryDialogOpen}>
                <DialogContent className="bg-white border-gray-200 text-slate-900 max-w-3xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-slate-700">
                            <History className="w-5 h-5" />
                            License History
                        </DialogTitle>
                        <DialogDescription className="text-slate-500">
                            History for Machine: <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-blue-600">{selectedHistoryMachineId}</span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Plan</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Key</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {getHistoryForMachine(selectedHistoryMachineId).map((h, i) => (
                                    <TableRow key={h.id || i}>
                                        <TableCell className="text-xs">{h.date}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="border-gray-200 text-gray-700">
                                                {parseFloat(h.duration) < 1
                                                    ? `${(parseFloat(h.duration) * 24 * 60).toFixed(0)} Mins`
                                                    : `${parseInt(h.duration)} Days`
                                                }
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={
                                                h.status === 'ACTIVE' ? "bg-green-100 text-green-700" :
                                                    h.status === 'RENEWED' ? "bg-blue-50 text-blue-600" :
                                                        h.status === 'EXPIRED' ? "bg-red-50 text-red-600" :
                                                            "bg-gray-100 text-gray-700"
                                            }>{h.status}</Badge>
                                        </TableCell>
                                        <TableCell className="font-mono text-xs max-w-[200px] truncate" title={h.key}>
                                            {h.key}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SecretAdminKeyGen;
