import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { ArrowLeft, Target, CheckCircle, Clock, AlertCircle, Filter } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useElasticScroll } from '../hooks/useElasticScroll';

const LeaderTasks = () => {
    const navigate = useNavigate();
    const { leaderId } = useParams();
    const [filterStatus, setFilterStatus] = useState('all');
    const scrollRef = useElasticScroll();

    // Mock data - in real app, fetch based on leaderId
    const leader = {
        name: 'Executive Secretary - Remera',
        avatar: 'ES',
        level: 'Sector',
        contributionScore: 78,
    };

    const allTasks = [
        { id: 1, title: 'Complete Agricultural Survey', sector: 'Agriculture', status: 'in-progress', progress: 65, deadline: '2026-04-15', priority: 'high' },
        { id: 2, title: 'Organize Community Health Campaign', sector: 'Health', status: 'completed', progress: 100, deadline: '2026-03-20', priority: 'medium' },
        { id: 3, title: 'Submit Infrastructure Report', sector: 'Infrastructure', status: 'pending', progress: 30, deadline: '2026-03-25', priority: 'high' },
        { id: 4, title: 'Education Quality Assessment', sector: 'Education', status: 'in-progress', progress: 45, deadline: '2026-04-10', priority: 'medium' },
        { id: 5, title: 'Social Welfare Program Review', sector: 'Social Welfare', status: 'not-done', progress: 0, deadline: '2026-03-15', priority: 'low' },
    ];

    const tasks = filterStatus === 'all' ? allTasks : allTasks.filter(t => t.status === filterStatus);

    const stats = {
        total: allTasks.length,
        completed: allTasks.filter(t => t.status === 'completed').length,
        inProgress: allTasks.filter(t => t.status === 'in-progress').length,
        pending: allTasks.filter(t => t.status === 'pending').length,
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-success/10 text-success';
            case 'in-progress': return 'bg-primary/10 text-primary';
            case 'pending': return 'bg-orange-100 text-orange-600';
            case 'not-done': return 'bg-danger/10 text-danger';
            default: return 'bg-gray-200 text-gray-600';
        }
    };

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="Leader Tasks" />

                <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8">
                    <div className="max-w-6xl mx-auto">
                        <button
                            onClick={() => navigate('/urwego')}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 sm:mb-6"
                        >
                            <ArrowLeft size={20} />
                            <span className="text-sm sm:text-base">Back to Urwego</span>
                        </button>

                        {/* Leader Info */}
                        <div className="bg-background rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-neumorphism mb-4 sm:mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-neumorphism-sm">
                                    {leader.avatar}
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">{leader.name}</h2>
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                                            {leader.level}
                                        </span>
                                        <span className="text-sm text-gray-600">
                                            Contribution Score: <span className="font-bold text-primary">{leader.contributionScore}%</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                            <div
                                onClick={() => setFilterStatus('all')}
                                className="bg-background rounded-xl p-4 shadow-neumorphism hover:shadow-neumorphism-sm transition-all cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Target className="text-primary" size={18} />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                                        <p className="text-xs text-gray-500">Total Tasks</p>
                                    </div>
                                </div>
                            </div>

                            <div
                                onClick={() => setFilterStatus('completed')}
                                className="bg-background rounded-xl p-4 shadow-neumorphism hover:shadow-neumorphism-sm transition-all cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                                        <CheckCircle className="text-success" size={18} />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-800">{stats.completed}</p>
                                        <p className="text-xs text-gray-500">Completed</p>
                                    </div>
                                </div>
                            </div>

                            <div
                                onClick={() => setFilterStatus('in-progress')}
                                className="bg-background rounded-xl p-4 shadow-neumorphism hover:shadow-neumorphism-sm transition-all cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Clock className="text-primary" size={18} />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-800">{stats.inProgress}</p>
                                        <p className="text-xs text-gray-500">In Progress</p>
                                    </div>
                                </div>
                            </div>

                            <div
                                onClick={() => setFilterStatus('pending')}
                                className="bg-background rounded-xl p-4 shadow-neumorphism hover:shadow-neumorphism-sm transition-all cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                                        <AlertCircle className="text-orange-600" size={18} />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-800">{stats.pending}</p>
                                        <p className="text-xs text-gray-500">Pending</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Filter */}
                        <div className="bg-background rounded-xl p-3 sm:p-4 shadow-neumorphism mb-4 sm:mb-6">
                            <div className="flex items-center gap-3">
                                <Filter size={16} className="text-gray-600" />
                                <span className="text-sm font-medium text-gray-700">Showing:</span>
                                <span className="text-sm font-bold text-primary capitalize">{filterStatus === 'all' ? 'All Tasks' : filterStatus.replace('-', ' ')}</span>
                                <span className="text-sm text-gray-500">({tasks.length} tasks)</span>
                            </div>
                        </div>

                        {/* Tasks List */}
                        <div className="space-y-3 sm:space-y-4">
                            {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    onClick={() => navigate(`/task/${task.id}`)}
                                    className="bg-background rounded-xl p-4 sm:p-5 shadow-neumorphism hover:shadow-neumorphism-sm transition-all cursor-pointer"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getStatusColor(task.status)}`}>
                                                    {task.status.replace('-', ' ').toUpperCase()}
                                                </span>
                                                <span className="px-3 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary">
                                                    {task.sector}
                                                </span>
                                                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${task.priority === 'high' ? 'bg-danger/10 text-danger' :
                                                    task.priority === 'medium' ? 'bg-orange-100 text-orange-600' :
                                                        'bg-gray-200 text-gray-600'
                                                    }`}>
                                                    {task.priority} priority
                                                </span>
                                            </div>
                                            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">{task.title}</h3>
                                            <p className="text-xs sm:text-sm text-gray-500">Deadline: {task.deadline}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs text-gray-500">Progress</span>
                                            <span className="text-sm font-bold text-gray-700">{task.progress}%</span>
                                        </div>
                                        <div className="h-2 bg-background rounded-full shadow-neumorphism-inset overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${task.status === 'completed' ? 'bg-success' :
                                                    task.status === 'in-progress' ? 'bg-primary' :
                                                        'bg-gray-400'
                                                    }`}
                                                style={{ width: `${task.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaderTasks;
