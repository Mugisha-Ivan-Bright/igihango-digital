import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { MapPin, TrendingUp, Award, Users, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useElasticScroll } from '../hooks/useElasticScroll';

const Contributions = () => {
    const navigate = useNavigate();
    const scrollRef = useElasticScroll();
    const provinces = [
        { name: 'Kigali City', progress: 85, rank: 1, goals: 45, completed: 38, population: '1.2M', color: 'from-green-400 to-green-600' },
        { name: 'Eastern Province', progress: 72, rank: 2, goals: 38, completed: 27, population: '2.8M', color: 'from-blue-400 to-blue-600' },
        { name: 'Southern Province', progress: 68, rank: 3, goals: 42, completed: 29, population: '2.6M', color: 'from-purple-400 to-purple-600' },
        { name: 'Western Province', progress: 61, rank: 4, goals: 35, completed: 21, population: '2.5M', color: 'from-orange-400 to-orange-600' },
        { name: 'Northern Province', progress: 58, rank: 5, goals: 40, completed: 23, population: '1.9M', color: 'from-red-400 to-red-600' },
    ];

    const categories = [
        { name: 'Health', contribution: 78, color: 'bg-red-500' },
        { name: 'Education', contribution: 85, color: 'bg-blue-500' },
        { name: 'Infrastructure', contribution: 65, color: 'bg-orange-500' },
        { name: 'Agriculture', contribution: 72, color: 'bg-green-500' },
        { name: 'Social Welfare', contribution: 68, color: 'bg-purple-500' },
    ];

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="Contribution Hub" />

                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="mb-6 md:mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Goals Accomplishment & Contribution Hub</h2>
                        <p className="text-sm md:text-base text-gray-600">Track territorial contributions to national development</p>
                    </div>

                    {/* National Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                        <div
                            onClick={() => navigate('/territories')}
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
                            onClick={() => navigate('/imihigo')}
                            className="bg-background rounded-2xl p-4 md:p-6 shadow-neumorphism hover:shadow-neumorphism-sm transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-success/10 flex items-center justify-center">
                                    <TrendingUp className="text-success" size={20} />
                                </div>
                                <div>
                                    <p className="text-xl md:text-2xl font-bold text-gray-800">69%</p>
                                    <p className="text-xs md:text-sm text-gray-500">Avg Progress</p>
                                </div>
                            </div>
                        </div>

                        <div
                            onClick={() => navigate('/imihigo')}
                            className="bg-background rounded-2xl p-4 md:p-6 shadow-neumorphism hover:shadow-neumorphism-sm transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Target className="text-primary" size={20} />
                                </div>
                                <div>
                                    <p className="text-xl md:text-2xl font-bold text-gray-800">200</p>
                                    <p className="text-xs md:text-sm text-gray-500">Total Goals</p>
                                </div>
                            </div>
                        </div>

                        <div
                            onClick={() => navigate('/imihigo')}
                            className="bg-background rounded-2xl p-4 md:p-6 shadow-neumorphism hover:shadow-neumorphism-sm transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-success/10 flex items-center justify-center">
                                    <Award className="text-success" size={20} />
                                </div>
                                <div>
                                    <p className="text-xl md:text-2xl font-bold text-gray-800">138</p>
                                    <p className="text-xs md:text-sm text-gray-500">Completed</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Provincial Rankings */}
                    <div className="bg-background rounded-2xl p-4 md:p-6 shadow-neumorphism mb-6 md:mb-8">
                        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">Provincial Development Rankings</h3>

                        <div className="space-y-4">
                            {provinces.map((province) => (
                                <div
                                    key={province.name}
                                    onClick={() => navigate('/territories')}
                                    className="bg-background rounded-xl p-4 md:p-5 shadow-neumorphism-sm hover:shadow-neumorphism transition-all cursor-pointer"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${province.color} flex items-center justify-center text-white font-bold text-lg md:text-2xl shadow-neumorphism-sm`}>
                                                #{province.rank}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-base md:text-lg font-semibold text-gray-800 mb-1">{province.name}</h4>
                                                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Users size={14} />
                                                        {province.population}
                                                    </span>
                                                    <span>{province.goals} goals</span>
                                                    <span className="text-success">{province.completed} completed</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 md:gap-6">
                                            <div className="flex-1 md:w-48">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-xs text-gray-500">Progress</span>
                                                    <span className="text-sm font-bold text-gray-700">{province.progress}%</span>
                                                </div>
                                                <div className="h-2 bg-background rounded-full shadow-neumorphism-inset overflow-hidden">
                                                    <div
                                                        className={`h-full bg-gradient-to-r ${province.color} rounded-full`}
                                                        style={{ width: `${province.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl md:text-3xl font-bold text-gray-800">{province.progress}%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Category Contributions */}
                    <div className="bg-background rounded-2xl p-4 md:p-6 shadow-neumorphism">
                        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">Contribution by Category</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            {categories.map((category) => (
                                <div
                                    key={category.name}
                                    onClick={() => navigate('/imihigo')}
                                    className="bg-background rounded-xl p-4 shadow-neumorphism-sm hover:shadow-neumorphism transition-all text-center cursor-pointer"
                                >
                                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${category.color} mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-neumorphism-sm`}>
                                        {category.contribution}%
                                    </div>
                                    <p className="text-sm md:text-base font-semibold text-gray-800">{category.name}</p>
                                    <p className="text-xs text-gray-500 mt-1">National Contribution</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contributions;
