import { Target, CheckCircle, Clock, TrendingUp, Users, MapPin, MessageSquare, Award } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import { useNavigate } from 'react-router-dom';
import { useElasticScroll } from '../hooks/useElasticScroll';

const Dashboard = () => {
    const navigate = useNavigate();
    const scrollRef = useElasticScroll();
    const territoryContributions = [
        { name: 'Kigali City', progress: 85, goals: 45, completed: 38, development: 'High' },
        { name: 'Eastern Province', progress: 72, goals: 38, completed: 27, development: 'Medium' },
        { name: 'Southern Province', progress: 68, goals: 42, completed: 29, development: 'Medium' },
        { name: 'Western Province', progress: 61, goals: 35, completed: 21, development: 'Medium' },
        { name: 'Northern Province', progress: 58, goals: 40, completed: 23, development: 'Low' },
    ];

    const recentActivities = [
        { leader: 'Mayor of Gasabo', action: 'Completed goal: Build 5 Health Centers', time: '2 hours ago', type: 'completed' },
        { leader: 'Executive Secretary - Remera', action: 'Updated progress on Agricultural Development', time: '5 hours ago', type: 'update' },
        { leader: 'Village Chief - Kimironko', action: 'Added comment on Infrastructure Project', time: '1 day ago', type: 'comment' },
        { leader: 'Mayor of Nyarugenge', action: 'Assigned new task to subordinate leaders', time: '2 days ago', type: 'assigned' },
    ];

    const upcomingDeadlines = [
        { goal: 'Complete Road Construction Phase 2', leader: 'District Mayor', daysLeft: 5, priority: 'high' },
        { goal: 'Submit Quarterly Development Report', leader: 'Sector Executive', daysLeft: 12, priority: 'medium' },
        { goal: 'Finalize Community Health Program', leader: 'Village Chief', daysLeft: 18, priority: 'medium' },
    ];

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />

                <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8">
                    <div className="mb-4 sm:mb-6 md:mb-8">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">Good morning, Mayor</h2>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600">Track leadership commitments and national development progress</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
                        <div onClick={() => navigate('/imihigo')} className="cursor-pointer">
                            <StatCard
                                icon={Target}
                                title="Total Goals"
                                amount="247"
                                percentage="+12.5%"
                                isPositive={true}
                            />
                        </div>
                        <div onClick={() => navigate('/imihigo')} className="cursor-pointer">
                            <StatCard
                                icon={CheckCircle}
                                title="Completed Goals"
                                amount="168"
                                percentage="+18.3%"
                                isPositive={true}
                            />
                        </div>
                        <div onClick={() => navigate('/imihigo')} className="cursor-pointer">
                            <StatCard
                                icon={Clock}
                                title="In Progress"
                                amount="64"
                                percentage="-5.2%"
                                isPositive={false}
                            />
                        </div>
                        <div onClick={() => navigate('/urwego')} className="cursor-pointer">
                            <StatCard
                                icon={Users}
                                title="Active Leaders"
                                amount="89"
                                percentage="+3.1%"
                                isPositive={true}
                            />
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6 md:mb-8">
                        {/* Territory Contributions */}
                        <div className="lg:col-span-2 bg-background rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-neumorphism">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-3 sm:mb-6">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-background shadow-neumorphism-inset flex items-center justify-center">
                                        <MapPin size={16} className="text-primary sm:w-5 sm:h-5" />
                                    </div>
                                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">Territorial Development</h3>
                                </div>
                                <button
                                    onClick={() => navigate('/contributions')}
                                    className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-background shadow-neumorphism-sm text-xs sm:text-sm text-gray-600 hover:shadow-neumorphism transition-all self-start sm:self-auto"
                                >
                                    View All
                                </button>
                            </div>

                            <div className="space-y-2 sm:space-y-3 md:space-y-4">
                                {territoryContributions.map((territory, index) => (
                                    <div
                                        key={index}
                                        onClick={() => navigate('/contributions')}
                                        className="bg-background rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 shadow-neumorphism-sm hover:shadow-neumorphism transition-all cursor-pointer"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
                                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                    <MapPin size={12} className="text-primary sm:w-4 sm:h-4" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 truncate">{territory.name}</h4>
                                                    <p className="text-[10px] sm:text-xs text-gray-500">{territory.goals} goals • {territory.completed} completed</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 sm:gap-3 self-start sm:self-auto">
                                                <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded text-[10px] sm:text-xs font-medium ${territory.development === 'High' ? 'bg-success/10 text-success' :
                                                    territory.development === 'Medium' ? 'bg-primary/10 text-primary' :
                                                        'bg-gray-300 text-gray-600'
                                                    }`}>
                                                    {territory.development}
                                                </span>
                                                <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">{territory.progress}%</span>
                                            </div>
                                        </div>
                                        <div className="h-1.5 sm:h-2 bg-background rounded-full shadow-neumorphism-inset overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-primary to-success rounded-full transition-all"
                                                style={{ width: `${territory.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Upcoming Deadlines */}
                        <div className="bg-background rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-neumorphism">
                            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-background shadow-neumorphism-inset flex items-center justify-center">
                                    <Clock size={16} className="text-danger sm:w-5 sm:h-5" />
                                </div>
                                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">Deadlines</h3>
                            </div>

                            <div className="space-y-2 sm:space-y-3">
                                {upcomingDeadlines.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => navigate('/imihigo')}
                                        className={`bg-background rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 shadow-neumorphism-sm border-l-4 cursor-pointer hover:shadow-neumorphism transition-all ${item.priority === 'high' ? 'border-l-danger' : 'border-l-primary'
                                            }`}
                                    >
                                        <p className="text-xs sm:text-sm font-medium text-gray-800 mb-1 sm:mb-2 line-clamp-2">{item.goal}</p>
                                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1 sm:mb-2">{item.leader}</p>
                                        <div className="flex items-center justify-between">
                                            <span className={`text-[10px] sm:text-xs font-semibold ${item.daysLeft <= 7 ? 'text-danger' : 'text-primary'
                                                }`}>
                                                {item.daysLeft} days left
                                            </span>
                                            <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[10px] sm:text-xs ${item.priority === 'high' ? 'bg-danger/10 text-danger' : 'bg-primary/10 text-primary'
                                                }`}>
                                                {item.priority}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Activities & Quick Stats */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                        {/* Recent Activities */}
                        <div className="lg:col-span-2 bg-background rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-neumorphism">
                            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-background shadow-neumorphism-inset flex items-center justify-center">
                                    <TrendingUp size={16} className="text-success sm:w-5 sm:h-5" />
                                </div>
                                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">Recent Activities</h3>
                            </div>

                            <div className="space-y-2 sm:space-y-3">
                                {recentActivities.map((activity, index) => (
                                    <div
                                        key={index}
                                        onClick={() => navigate('/urwego')}
                                        className="bg-background rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 shadow-neumorphism-sm hover:shadow-neumorphism transition-all flex items-start gap-2 sm:gap-3 md:gap-4 cursor-pointer"
                                    >
                                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${activity.type === 'completed' ? 'bg-success/10' :
                                            activity.type === 'update' ? 'bg-primary/10' :
                                                activity.type === 'comment' ? 'bg-purple-100' :
                                                    'bg-orange-100'
                                            }`}>
                                            {activity.type === 'completed' && <CheckCircle size={16} className="text-success sm:w-5 sm:h-5" />}
                                            {activity.type === 'update' && <TrendingUp size={16} className="text-primary sm:w-5 sm:h-5" />}
                                            {activity.type === 'comment' && <MessageSquare size={16} className="text-purple-600 sm:w-5 sm:h-5" />}
                                            {activity.type === 'assigned' && <Users size={16} className="text-orange-600 sm:w-5 sm:h-5" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs sm:text-sm font-medium text-gray-800 mb-0.5 sm:mb-1 truncate">{activity.leader}</p>
                                            <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 mb-0.5 sm:mb-1 line-clamp-2">{activity.action}</p>
                                            <p className="text-[10px] sm:text-xs text-gray-400">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Performance Overview */}
                        <div className="bg-background rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-neumorphism">
                            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-background shadow-neumorphism-inset flex items-center justify-center">
                                    <Award size={16} className="text-primary sm:w-5 sm:h-5" />
                                </div>
                                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">Performance</h3>
                            </div>

                            <div className="space-y-2 sm:space-y-3 md:space-y-4">
                                <div
                                    onClick={() => navigate('/imihigo')}
                                    className="text-center p-2.5 sm:p-3 md:p-4 bg-background rounded-lg sm:rounded-xl shadow-neumorphism-sm hover:shadow-neumorphism transition-all cursor-pointer"
                                >
                                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-success mb-0.5 sm:mb-1">68%</p>
                                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">Overall Completion Rate</p>
                                </div>

                                <div
                                    onClick={() => navigate('/imihigo')}
                                    className="text-center p-2.5 sm:p-3 md:p-4 bg-background rounded-lg sm:rounded-xl shadow-neumorphism-sm hover:shadow-neumorphism transition-all cursor-pointer"
                                >
                                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-0.5 sm:mb-1">15</p>
                                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">Goals Due This Month</p>
                                </div>

                                <div
                                    onClick={() => navigate('/communications')}
                                    className="text-center p-2.5 sm:p-3 md:p-4 bg-background rounded-lg sm:rounded-xl shadow-neumorphism-sm hover:shadow-neumorphism transition-all cursor-pointer"
                                >
                                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-0.5 sm:mb-1">234</p>
                                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">Active Discussions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
