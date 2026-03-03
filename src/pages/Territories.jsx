import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { MapPin, Users, Target, TrendingUp, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useElasticScroll } from '../hooks/useElasticScroll';

const Territories = () => {
    const navigate = useNavigate();
    const scrollRef = useElasticScroll();
    const territories = [
        {
            province: 'Kigali City',
            districts: [
                { name: 'Gasabo', leaders: 25, goals: 45, completed: 38, progress: 84 },
                { name: 'Kicukiro', leaders: 20, goals: 35, completed: 28, progress: 80 },
                { name: 'Nyarugenge', leaders: 22, goals: 40, completed: 32, progress: 80 },
            ]
        },
        {
            province: 'Eastern Province',
            districts: [
                { name: 'Rwamagana', leaders: 18, goals: 30, completed: 22, progress: 73 },
                { name: 'Kayonza', leaders: 16, goals: 28, completed: 20, progress: 71 },
                { name: 'Kirehe', leaders: 15, goals: 25, completed: 18, progress: 72 },
            ]
        },
    ];

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="Territories" />

                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="mb-6 md:mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Territory Management</h2>
                        <p className="text-sm md:text-base text-gray-600">Manage and monitor all territorial units</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                        <div
                            onClick={() => navigate('/contributions')}
                            className="bg-background rounded-2xl p-4 md:p-6 shadow-neumorphism hover:shadow-neumorphism-sm transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <MapPin className="text-primary" size={20} />
                                </div>
                                <div>
                                    <p className="text-xl md:text-2xl font-bold text-gray-800">5</p>
                                    <p className="text-xs md:text-sm text-gray-500">Provinces</p>
                                </div>
                            </div>
                        </div>

                        <div
                            onClick={() => navigate('/urwego')}
                            className="bg-background rounded-2xl p-4 md:p-6 shadow-neumorphism hover:shadow-neumorphism-sm transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Building2 className="text-primary" size={20} />
                                </div>
                                <div>
                                    <p className="text-xl md:text-2xl font-bold text-gray-800">30</p>
                                    <p className="text-xs md:text-sm text-gray-500">Districts</p>
                                </div>
                            </div>
                        </div>

                        <div
                            onClick={() => navigate('/urwego')}
                            className="bg-background rounded-2xl p-4 md:p-6 shadow-neumorphism hover:shadow-neumorphism-sm transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-success/10 flex items-center justify-center">
                                    <Users className="text-success" size={20} />
                                </div>
                                <div>
                                    <p className="text-xl md:text-2xl font-bold text-gray-800">416</p>
                                    <p className="text-xs md:text-sm text-gray-500">Sectors</p>
                                </div>
                            </div>
                        </div>

                        <div
                            onClick={() => navigate('/urwego')}
                            className="bg-background rounded-2xl p-4 md:p-6 shadow-neumorphism hover:shadow-neumorphism-sm transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-success/10 flex items-center justify-center">
                                    <TrendingUp className="text-success" size={20} />
                                </div>
                                <div>
                                    <p className="text-xl md:text-2xl font-bold text-gray-800">2,148</p>
                                    <p className="text-xs md:text-sm text-gray-500">Cells</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Territories List */}
                    <div className="space-y-6">
                        {territories.map((territory, index) => (
                            <div key={index} className="bg-background rounded-2xl p-4 md:p-6 shadow-neumorphism">
                                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2">
                                    <MapPin className="text-primary" size={24} />
                                    {territory.province}
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {territory.districts.map((district, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => navigate('/urwego')}
                                            className="bg-background rounded-xl p-4 shadow-neumorphism-sm hover:shadow-neumorphism transition-all cursor-pointer"
                                        >
                                            <h4 className="text-base md:text-lg font-semibold text-gray-800 mb-3">{district.name}</h4>

                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-500">Leaders</span>
                                                    <span className="font-semibold text-gray-800">{district.leaders}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-500">Goals</span>
                                                    <span className="font-semibold text-gray-800">{district.goals}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-500">Completed</span>
                                                    <span className="font-semibold text-success">{district.completed}</span>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-xs text-gray-500">Progress</span>
                                                    <span className="text-sm font-bold text-gray-700">{district.progress}%</span>
                                                </div>
                                                <div className="h-2 bg-background rounded-full shadow-neumorphism-inset overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-primary to-success rounded-full"
                                                        style={{ width: `${district.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Territories;
