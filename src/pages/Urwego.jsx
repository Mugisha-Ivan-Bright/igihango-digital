import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Users, Target, CheckCircle, Send, ListTodo, Bell, TrendingUp, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useElasticScroll } from '../hooks/useElasticScroll';

const Urwego = () => {
    const navigate = useNavigate();
    const scrollRef = useElasticScroll();

    const hierarchyTree = [
        {
            level: 'District',
            name: 'Mayor of Gasabo District',
            avatar: 'MG',
            tasks: 25,
            completed: 20,
            contributionScore: 85,
            subordinates: [
                {
                    level: 'Sector',
                    name: 'Executive Secretary - Remera',
                    avatar: 'ES',
                    tasks: 18,
                    completed: 15,
                    contributionScore: 78,
                    subordinates: [
                        { level: 'Cell', name: 'Cell Chief - Rukiri', avatar: 'CC', tasks: 12, completed: 10, contributionScore: 82 },
                        { level: 'Cell', name: 'Cell Chief - Nyarutarama', avatar: 'CN', tasks: 10, completed: 8, contributionScore: 75 },
                    ]
                },
                {
                    level: 'Sector',
                    name: 'Executive Secretary - Kimironko',
                    avatar: 'EK',
                    tasks: 20,
                    completed: 16,
                    contributionScore: 80,
                    subordinates: [
                        { level: 'Cell', name: 'Cell Chief - Kibagabaga', avatar: 'CK', tasks: 15, completed: 12, contributionScore: 79 },
                        { level: 'Cell', name: 'Cell Chief - Biryogo', avatar: 'CB', tasks: 11, completed: 9, contributionScore: 81 },
                    ]
                },
            ]
        }
    ];

    const tasks = [
        {
            id: 1,
            title: 'Complete Agricultural Survey',
            description: 'Conduct comprehensive survey of all farming activities in the sector',
            assignee: 'Executive Secretary - Remera',
            sector: 'Agriculture',
            deadline: '2026-04-15',
            budget: '5,000,000',
            progress: 65,
            status: 'in-progress',
            impact: 'Will help identify farming challenges and opportunities for 500+ farmers',
            evidence: [
                { name: 'Survey_Report_Draft.pdf', date: '2026-03-01' },
                { name: 'Field_Photos.zip', date: '2026-03-02' }
            ],
            comments: [
                { author: 'Mayor of Gasabo', text: 'Good progress! Please ensure all villages are covered.', time: '2 hours ago' },
                { author: 'Executive Secretary - Remera', text: 'Will complete remaining 3 villages by next week.', time: '1 hour ago' }
            ],
            canUpdateStatus: true
        },
        {
            id: 2,
            title: 'Organize Community Health Campaign',
            description: 'Organize vaccination and health awareness campaign for children under 5',
            assignee: 'Cell Chief - Rukiri',
            sector: 'Health',
            deadline: '2026-03-20',
            budget: '2,500,000',
            progress: 90,
            status: 'in-progress',
            impact: 'Expected to reach 300+ children and improve community health awareness',
            evidence: [
                { name: 'Campaign_Photos.jpg', date: '2026-03-10' },
                { name: 'Attendance_List.xlsx', date: '2026-03-10' }
            ],
            comments: [
                { author: 'Executive Secretary - Remera', text: 'Excellent turnout! Keep up the good work.', time: '3 hours ago' }
            ],
            canUpdateStatus: false
        },
        {
            id: 3,
            title: 'Infrastructure Maintenance Report',
            description: 'Submit detailed report on road conditions and required repairs',
            assignee: 'Executive Secretary - Kimironko',
            sector: 'Infrastructure',
            deadline: '2026-03-25',
            budget: '15,000,000',
            progress: 30,
            status: 'pending',
            impact: 'Will improve transportation and access to markets for local businesses',
            evidence: [],
            comments: [],
            canUpdateStatus: true
        }
    ];

    const notifications = [
        { type: 'evidence', message: 'Cell Chief - Rukiri submitted evidence for Health Campaign', time: '10 min ago', unread: true },
        { type: 'comment', message: 'New comment on Agricultural Survey task', time: '1 hour ago', unread: true },
        { type: 'deadline', message: 'Infrastructure Report due in 3 days', time: '2 hours ago', unread: false },
    ];

    const sectorPerformance = [
        { sector: 'Agriculture', score: 78, tasks: 12, completed: 9 },
        { sector: 'Health', score: 85, tasks: 8, completed: 7 },
        { sector: 'Education', score: 72, tasks: 10, completed: 7 },
        { sector: 'Infrastructure', score: 68, tasks: 15, completed: 10 },
        { sector: 'Social Welfare', score: 80, tasks: 6, completed: 5 },
    ];



    const LeaderCard = ({ leader, level = 0 }) => {
        const progress = Math.round((leader.completed / leader.tasks) * 100);

        return (
            <div className={`${level > 0 ? 'ml-6 sm:ml-8 md:ml-12' : ''}`}>
                <div className="bg-background rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-neumorphism mb-3 sm:mb-4 hover:shadow-neumorphism-sm transition-all cursor-pointer"
                    onClick={() => navigate(`/leader/${leader.name.toLowerCase().replace(/\s+/g, '-')}/tasks`)}
                >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold shadow-neumorphism-sm text-sm sm:text-base flex-shrink-0">
                                {leader.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                                    <span className="px-2 py-0.5 sm:px-2 sm:py-1 rounded-lg bg-primary/10 text-primary text-[10px] sm:text-xs font-medium">
                                        {leader.level}
                                    </span>
                                    <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 truncate">{leader.name}</h4>
                                </div>
                                <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 mt-2">
                                    <div>
                                        <p className="text-[10px] sm:text-xs text-gray-500">Tasks</p>
                                        <p className="text-sm sm:text-base md:text-lg font-bold text-gray-800">{leader.tasks}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] sm:text-xs text-gray-500">Completed</p>
                                        <p className="text-sm sm:text-base md:text-lg font-bold text-success">{leader.completed}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] sm:text-xs text-gray-500">Contribution Score</p>
                                        <div className="flex items-center gap-1">
                                            <Award size={14} className="text-primary" />
                                            <p className="text-sm sm:text-base md:text-lg font-bold text-primary">{leader.contributionScore}%</p>
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-[100px]">
                                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Progress</p>
                                        <div className="h-1.5 sm:h-2 bg-background rounded-full shadow-neumorphism-inset overflow-hidden">
                                            <div
                                                className="h-full bg-success rounded-full"
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 self-start lg:self-auto" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={() => navigate(`/leader/${leader.name.toLowerCase().replace(/\s+/g, '-')}/tasks`)}
                                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-background shadow-neumorphism-sm hover:shadow-neumorphism transition-all text-xs sm:text-sm text-gray-700 flex items-center gap-1 sm:gap-2"
                            >
                                <ListTodo size={14} className="sm:w-4 sm:h-4" />
                                <span className="hidden sm:inline">Tasks</span>
                            </button>
                            <button
                                onClick={() => navigate('/task/assign')}
                                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-primary text-white shadow-neumorphism-sm hover:shadow-neumorphism transition-all text-xs sm:text-sm flex items-center gap-1 sm:gap-2"
                            >
                                <Send size={14} className="sm:w-4 sm:h-4" />
                                <span className="hidden sm:inline">Assign</span>
                            </button>
                        </div>
                    </div>
                </div>

                {leader.subordinates && leader.subordinates.length > 0 && (
                    <div className="relative">
                        <div className="absolute left-3 sm:left-4 md:left-6 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                        {leader.subordinates.map((sub, index) => (
                            <div key={index} className="relative">
                                <div className="absolute left-3 sm:left-4 md:left-6 top-3 sm:top-5 w-3 sm:w-6 h-0.5 bg-gray-300"></div>
                                <LeaderCard leader={sub} level={level + 1} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="Urwego Platform" />

                <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8">
                    <div className="mb-4 sm:mb-6 md:mb-8">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">Urwego Platform</h2>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600">Centralized leadership hierarchy and task management</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
                        <div
                            onClick={() => navigate('/urwego')}
                            className="bg-background rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-neumorphism hover:shadow-neumorphism-sm transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Users className="text-primary" size={18} />
                                </div>
                                <div>
                                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">89</p>
                                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">Total Leaders</p>
                                </div>
                            </div>
                        </div>

                        <div
                            onClick={() => navigate('/urwego')}
                            className="bg-background rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-neumorphism hover:shadow-neumorphism-sm transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-success/10 flex items-center justify-center">
                                    <Target className="text-success" size={18} />
                                </div>
                                <div>
                                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">247</p>
                                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">Active Tasks</p>
                                </div>
                            </div>
                        </div>

                        <div
                            onClick={() => navigate('/urwego')}
                            className="bg-background rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-neumorphism hover:shadow-neumorphism-sm transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-success/10 flex items-center justify-center">
                                    <CheckCircle className="text-success" size={18} />
                                </div>
                                <div>
                                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">168</p>
                                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">Completed</p>
                                </div>
                            </div>
                        </div>

                        <div
                            onClick={() => navigate('/contributions')}
                            className="bg-background rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-neumorphism hover:shadow-neumorphism-sm transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Award className="text-primary" size={18} />
                                </div>
                                <div>
                                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">79%</p>
                                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">Avg Score</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
                        {/* Leadership Hierarchy */}
                        <div className="xl:col-span-2">
                            <div className="bg-background rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-neumorphism mb-4 sm:mb-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">Leadership Hierarchy Tree</h3>
                                </div>

                                {hierarchyTree.map((leader, index) => (
                                    <LeaderCard key={index} leader={leader} />
                                ))}
                            </div>

                            {/* Sector Performance */}
                            <div className="bg-background rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-neumorphism">
                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Sector Performance</h3>
                                <div className="space-y-3 sm:space-y-4">
                                    {sectorPerformance.map((sector, idx) => (
                                        <div key={idx} className="bg-background rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-neumorphism-sm">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <TrendingUp size={16} className="text-primary" />
                                                    <h4 className="text-sm sm:text-base font-semibold text-gray-800">{sector.sector}</h4>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs sm:text-sm text-gray-500">{sector.completed}/{sector.tasks} tasks</span>
                                                    <span className="text-base sm:text-lg font-bold text-primary">{sector.score}%</span>
                                                </div>
                                            </div>
                                            <div className="h-1.5 sm:h-2 bg-background rounded-full shadow-neumorphism-inset overflow-hidden">
                                                <div
                                                    className="h-full bg-primary rounded-full"
                                                    style={{ width: `${sector.score}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="space-y-4 sm:space-y-6">
                            {/* Notifications */}
                            <div className="bg-background rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-neumorphism">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-base sm:text-lg font-bold text-gray-800 flex items-center gap-2">
                                        <Bell size={18} />
                                        Notifications
                                    </h3>
                                    <span className="px-2 py-0.5 bg-danger text-white rounded-full text-xs font-bold">
                                        {notifications.filter(n => n.unread).length}
                                    </span>
                                </div>

                                <div className="space-y-2 sm:space-y-3">
                                    {notifications.map((notif, idx) => (
                                        <div key={idx} className={`bg-background rounded-lg p-2.5 sm:p-3 shadow-neumorphism-sm ${notif.unread ? 'border-l-4 border-l-primary' : ''}`}>
                                            <p className="text-xs sm:text-sm text-gray-800 mb-1">{notif.message}</p>
                                            <p className="text-[10px] sm:text-xs text-gray-400">{notif.time}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Tasks */}
                            <div className="bg-background rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-neumorphism">
                                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4">Recent Tasks</h3>

                                <div className="space-y-2 sm:space-y-3">
                                    {tasks.slice(0, 3).map((task) => (
                                        <div
                                            key={task.id}
                                            onClick={() => navigate(`/task/${task.id}`)}
                                            className="bg-background rounded-lg p-2.5 sm:p-3 shadow-neumorphism-sm cursor-pointer hover:shadow-neumorphism transition-all"
                                        >
                                            <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 line-clamp-1">{task.title}</p>
                                            <p className="text-[10px] sm:text-xs text-gray-500 mb-2">{task.assignee}</p>
                                            <div className="flex items-center justify-between">
                                                <span className={`px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium ${task.status === 'completed' ? 'bg-success/10 text-success' :
                                                    task.status === 'in-progress' ? 'bg-primary/10 text-primary' :
                                                        'bg-orange-100 text-orange-600'
                                                    }`}>
                                                    {task.status.replace('-', ' ')}
                                                </span>
                                                <span className="text-[10px] sm:text-xs text-gray-500">{task.progress}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Urwego;
