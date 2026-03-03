import { Home, Users, Target, TrendingUp, MessageSquare, MapPin, BarChart3, HelpCircle, Plus, Menu, X, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { icon: Home, label: 'Dashboard', path: '/' },
        { icon: Users, label: 'Urwego Platform', path: '/urwego' },
        { icon: Target, label: 'Imihigo Platform', path: '/imihigo' },
        { icon: TrendingUp, label: 'Contribution Hub', path: '/contributions' },
        { icon: MessageSquare, label: 'Communications', path: '/communications' },
        { icon: MapPin, label: 'Territories', path: '/territories' },
        { icon: BarChart3, label: 'Reports & Analytics', path: '/reports' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-background rounded-xl shadow-neumorphism flex items-center justify-center"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`fixed lg:static inset-y-0 left-0 z-40 w-64 h-screen bg-background p-4 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}>
                {/* Logo */}
                <div className="flex items-center gap-2 mb-8 px-2 mt-12 lg:mt-0">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-neumorphism-sm">
                        <span className="text-white font-bold text-sm">IG</span>
                    </div>
                    <div>
                        <span className="text-lg font-bold text-gray-800 block leading-tight">IGIHANGO</span>
                        <span className="text-xs text-gray-500">DIGITAL</span>
                    </div>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-white shadow-neumorphism text-primary'
                                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={20} />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </div>
                                {item.hasAdd && (
                                    <Plus size={16} className="text-gray-400" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Create Goal Button */}
                <Link
                    to="/create-goal"
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-primary text-white py-3 rounded-xl shadow-neumorphism hover:shadow-neumorphism-sm transition-all flex items-center justify-center gap-2 mb-4"
                >
                    <Plus size={20} />
                    <span className="font-medium">Add New Goal</span>
                </Link>

                {/* Help */}
                <Link
                    to="/help"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-xl transition-all"
                >
                    <HelpCircle size={20} />
                    <span className="text-sm font-medium">Help and Support</span>
                </Link>
            </div>
        </>
    );
};

export default Sidebar;
