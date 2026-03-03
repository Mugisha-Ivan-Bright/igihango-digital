import { Search, Bell, ChevronDown, User as UserIcon, Mail, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const Header = ({ title = "Dashboard" }) => {
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const menuRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        // Add logout logic here (clear tokens, session, etc.)
        console.log('User logged out');
        navigate('/login');
    };

    return (
        <div className="bg-background px-4 md:px-8 py-4 flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 ml-12 lg:ml-0">{title}</h1>

            <div className="flex items-center gap-2 md:gap-4">
                {/* Search Bar - Hidden on mobile */}
                <div className="relative hidden md:block">
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="w-48 lg:w-80 px-4 py-2 pl-10 rounded-xl bg-background shadow-neumorphism-inset text-sm focus:outline-none"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>

                {/* Check-in Button - Hidden on small screens */}
                <button className="hidden lg:flex px-6 py-2 bg-success text-white rounded-xl shadow-neumorphism-sm hover:shadow-neumorphism transition-all items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-sm font-medium">Check-in</span>
                    <span className="text-xs opacity-90">12:03:40 pm</span>
                </button>

                {/* Notification */}
                <div className="relative">
                    <button className="w-10 h-10 rounded-xl bg-background shadow-neumorphism flex items-center justify-center hover:shadow-neumorphism-sm transition-all">
                        <Bell size={20} className="text-gray-600" />
                    </button>
                    <div className="absolute top-0 right-0 w-2 h-2 bg-danger rounded-full"></div>
                </div>

                {/* User Avatar with Dropdown */}
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-2 px-2 py-1 rounded-xl bg-background shadow-neumorphism hover:shadow-neumorphism-sm transition-all"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 shadow-neumorphism-sm overflow-hidden">
                            <img src="https://i.pravatar.cc/150?img=12" alt="User" className="w-full h-full object-cover" />
                        </div>
                        <ChevronDown size={16} className={`text-gray-600 hidden sm:block transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {showUserMenu && (
                        <div className="absolute right-0 mt-2 w-64 bg-background rounded-xl shadow-neumorphism p-3 z-50">
                            {/* User Info */}
                            <div className="px-3 py-2 border-b border-gray-200 mb-2">
                                <p className="text-sm font-bold text-gray-800">Mayor of Gasabo District</p>
                                <p className="text-xs text-gray-500">District Leader</p>
                                <p className="text-xs text-gray-500 mt-1">mayor.gasabo@gov.rw</p>
                            </div>

                            {/* Menu Items */}
                            <div className="space-y-1">
                                <button
                                    onClick={() => {
                                        navigate('/profile');
                                        setShowUserMenu(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/50 transition-all text-left"
                                >
                                    <UserIcon size={18} className="text-gray-600" />
                                    <span className="text-sm text-gray-700">View Profile</span>
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-danger/10 transition-all text-left"
                                >
                                    <LogOut size={18} className="text-danger" />
                                    <span className="text-sm text-danger">Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
