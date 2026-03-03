import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FileText, CheckCircle2, Clock, MessageSquare, User, Calendar, Filter, Grid, List } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useElasticScroll } from '../hooks/useElasticScroll';

const Imihigo = () => {
    const navigate = useNavigate();
    const [selectedSector, setSelectedSector] = useState('All');
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
    const scrollRef = useElasticScroll();

    const sectors = [
        'All',
        'Agriculture',
        'Health',
        'Education',
        'Infrastructure',
        'Social Welfare',
        'Economic Development',
        'Environment',
    ];

    const allGoals = [
        {
            id: 1,
            title: 'Improve Healthcare Infrastructure',
            description: 'Build 5 new health centers and upgrade 10 existing facilities',
            leader: 'Mayor of Gasabo District',
            territory: 'Gasabo District',
            status: 'completed',
            progress: 100,
            startDate: '2025-01-01',
            deadline: '2025-12-31',
            comments: 15,
            category: 'Health',
            image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80'
        },
        {
            id: 2,
            title: 'Increase Agricultural Production by 30%',
            description: 'Implement modern farming techniques and provide training to 500 farmers',
            leader: 'Executive Secretary - Remera Sector',
            territory: 'Remera Sector',
            status: 'in-progress',
            progress: 65,
            startDate: '2025-06-01',
            deadline: '2026-06-30',
            comments: 23,
            category: 'Agriculture',
            image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80'
        },
        {
            id: 3,
            title: 'Build 10 New Primary Schools',
            description: 'Construct modern school facilities to accommodate 5000 students',
            leader: 'Mayor of Nyarugenge District',
            territory: 'Nyarugenge District',
            status: 'in-progress',
            progress: 40,
            startDate: '2025-03-01',
            deadline: '2026-12-31',
            comments: 18,
            category: 'Education',
            image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80'
        },
        {
            id: 4,
            title: 'Reduce Poverty Rate by 20%',
            description: 'Create job opportunities and provide vocational training programs',
            leader: 'Village Chief - Kimironko',
            territory: 'Kimironko Village',
            status: 'in-progress',
            progress: 25,
            startDate: '2025-01-15',
            deadline: '2027-12-31',
            comments: 12,
            category: 'Social Welfare',
            image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80'
        },
        {
            id: 5,
            title: 'Improve Road Infrastructure',
            description: 'Pave 50km of rural roads and repair 30km of existing roads',
            leader: 'Mayor of Kicukiro District',
            territory: 'Kicukiro District',
            status: 'pending',
            progress: 10,
            startDate: '2026-01-01',
            deadline: '2027-06-30',
            comments: 5,
            category: 'Infrastructure',
            image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80'
        },
        {
            id: 6,
            title: 'Promote Sustainable Farming Practices',
            description: 'Train 1000 farmers on modern and sustainable agricultural methods',
            leader: 'Executive Secretary - Remera',
            territory: 'Remera Sector',
            status: 'in-progress',
            progress: 55,
            startDate: '2025-02-01',
            deadline: '2026-08-31',
            comments: 20,
            category: 'Agriculture',
            image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80'
        },
        {
            id: 7,
            title: 'Environmental Conservation Program',
            description: 'Plant 50,000 trees and establish 5 community forests',
            leader: 'District Environmental Officer',
            territory: 'Gasabo District',
            status: 'in-progress',
            progress: 70,
            startDate: '2025-01-01',
            deadline: '2026-12-31',
            comments: 15,
            category: 'Environment',
            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80'
        },
        {
            id: 8,
            title: 'Small Business Development Initiative',
            description: 'Provide microloans and training to 500 entrepreneurs',
            leader: 'Economic Development Officer',
            territory: 'Kigali City',
            status: 'in-progress',
            progress: 45,
            startDate: '2025-04-01',
            deadline: '2026-12-31',
            comments: 18,
            category: 'Economic Development',
            image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80'
        },
    ];

    // Filter goals by selected sector
    const goals = selectedSector === 'All'
        ? allGoals
        : allGoals.filter(goal => goal.category === selectedSector);

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'text-success';
            case 'in-progress': return 'text-primary';
            case 'pending': return 'text-gray-500';
            default: return 'text-gray-500';
        }
    };

    const getStatusBg = (status) => {
        switch (status) {
            case 'completed': return 'bg-success/10';
            case 'in-progress': return 'bg-primary/10';
            case 'pending': return 'bg-gray-200';
            default: return 'bg-gray-200';
        }
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Health': 'bg-red-100 text-red-600',
            'Agriculture': 'bg-green-100 text-green-600',
            'Education': 'bg-blue-100 text-blue-600',
            'Social Welfare': 'bg-purple-100 text-purple-600',
            'Infrastructure': 'bg-orange-100 text-orange-600',
        };
        return colors[category] || 'bg-gray-100 text-gray-600';
    };

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="Imihigo Platform" />

                <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8">
                    <div className="mb-4 sm:mb-6 md:mb-8">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">Imihigo Platform</h2>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600">Audit and track leadership commitments and achievements</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
                        <div
                            onClick={() => setSelectedSector('All')}
                            className="bg-background rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-neumorphism hover:shadow-neumorphism-sm transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center">
                                    <FileText className="text-primary" size={18} />
                                </div>
                                <div>
                                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">247</p>
                                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">Total Imihigo</p>
                                </div>
                            </div>
                        </div>

                        <div
                            onClick={() => navigate('/contributions')}
                            className="bg-background rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-neumorphism hover:shadow-neumorphism-sm transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-success/10 flex items-center justify-center">
                                    <CheckCircle2 className="text-success" size={18} />
                                </div>
                                <div>
                                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">168</p>
                                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">Completed</p>
                                </div>
                            </div>
                        </div>

                        <div
                            onClick={() => setSelectedSector('All')}
                            className="bg-background rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-neumorphism hover:shadow-neumorphism-sm transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Clock className="text-primary" size={18} />
                                </div>
                                <div>
                                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">64</p>
                                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">In Progress</p>
                                </div>
                            </div>
                        </div>

                        <div
                            onClick={() => setSelectedSector('All')}
                            className="bg-background rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-neumorphism hover:shadow-neumorphism-sm transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gray-300/50 flex items-center justify-center">
                                    <Clock className="text-gray-500" size={18} />
                                </div>
                                <div>
                                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">15</p>
                                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">Pending</p>
                                </div>
                            </div>
                        </div>

                        <div
                            onClick={() => navigate('/contributions')}
                            className="bg-background rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-neumorphism hover:shadow-neumorphism-sm transition-all col-span-2 sm:col-span-1 cursor-pointer"
                        >
                            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-success/10 flex items-center justify-center">
                                    <div className="text-success font-bold text-base sm:text-lg">68%</div>
                                </div>
                                <div>
                                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">Success Rate</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-background rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-neumorphism mb-4 sm:mb-6">
                        <div className="flex flex-col gap-3 sm:gap-4">
                            {/* Sector Filters */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                <Filter size={16} className="text-gray-600 sm:w-5 sm:h-5 flex-shrink-0" />
                                <span className="text-xs sm:text-sm font-medium text-gray-700">Filter by Sector:</span>
                                {sectors.map((sector) => (
                                    <button
                                        key={sector}
                                        onClick={() => setSelectedSector(sector)}
                                        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-neumorphism-sm text-xs sm:text-sm transition-all ${selectedSector === sector
                                            ? 'bg-primary text-white'
                                            : 'bg-background text-gray-600 hover:shadow-neumorphism'
                                            }`}
                                    >
                                        {sector}
                                    </button>
                                ))}
                            </div>

                            {/* View Toggle and Add Button */}
                            <div className="flex items-center justify-between gap-2">
                                {/* View Toggle */}
                                <div className="flex items-center gap-1 bg-background rounded-lg shadow-neumorphism-sm p-1">
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-primary text-white shadow-neumorphism-sm' : 'text-gray-600'}`}
                                        title="List View"
                                    >
                                        <List size={18} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary text-white shadow-neumorphism-sm' : 'text-gray-600'}`}
                                        title="Grid View"
                                    >
                                        <Grid size={18} />
                                    </button>
                                </div>

                                {/* Add New Button */}
                                <button
                                    onClick={() => navigate('/create-goal')}
                                    className="px-3 py-2 sm:px-6 sm:py-2 bg-primary text-white rounded-lg sm:rounded-xl shadow-neumorphism-sm hover:shadow-neumorphism transition-all flex items-center gap-2 text-xs sm:text-sm flex-shrink-0"
                                >
                                    <FileText size={16} className="flex-shrink-0" />
                                    <span className="hidden sm:inline">Add New Igihango</span>
                                    <span className="sm:hidden">Add New</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mb-4">
                        <p className="text-sm text-gray-600">
                            Showing <span className="font-semibold text-gray-800">{goals.length}</span> {selectedSector !== 'All' ? `${selectedSector}` : ''} goal{goals.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    {/* Goals List or Grid */}
                    {viewMode === 'list' ? (
                        <div className="space-y-3 sm:space-y-4">
                            {goals.map((goal) => (
                                <div key={goal.id} className="bg-background rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-neumorphism">
                                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 sm:gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                                                <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg text-[10px] sm:text-xs font-medium ${getCategoryColor(goal.category)}`}>
                                                    {goal.category}
                                                </span>
                                                <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg text-[10px] sm:text-xs font-medium ${getStatusBg(goal.status)} ${getStatusColor(goal.status)}`}>
                                                    {goal.status === 'in-progress' ? 'In Progress' : goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                                                </span>
                                            </div>
                                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-1 sm:mb-2">{goal.title}</h3>
                                            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">{goal.description}</p>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
                                                <div className="flex items-center gap-2">
                                                    <User size={14} className="text-gray-400 sm:w-4 sm:h-4" />
                                                    <div>
                                                        <p className="text-[10px] sm:text-xs text-gray-500">Leader</p>
                                                        <p className="text-xs sm:text-sm font-medium text-gray-700 truncate">{goal.leader}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={14} className="text-gray-400 sm:w-4 sm:h-4" />
                                                    <div>
                                                        <p className="text-[10px] sm:text-xs text-gray-500">Timeline</p>
                                                        <p className="text-xs sm:text-sm font-medium text-gray-700">{goal.startDate} → {goal.deadline}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MessageSquare size={14} className="text-gray-400 sm:w-4 sm:h-4" />
                                                    <div>
                                                        <p className="text-[10px] sm:text-xs text-gray-500">Comments</p>
                                                        <p className="text-xs sm:text-sm font-medium text-gray-700">{goal.comments} discussions</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex items-center justify-between mb-1 sm:mb-2">
                                                    <span className="text-[10px] sm:text-xs text-gray-500">Progress</span>
                                                    <span className="text-xs sm:text-sm font-bold text-gray-700">{goal.progress}%</span>
                                                </div>
                                                <div className="h-2 sm:h-3 bg-background rounded-full shadow-neumorphism-inset overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all ${goal.status === 'completed' ? 'bg-success' :
                                                            goal.status === 'in-progress' ? 'bg-primary' :
                                                                'bg-gray-400'
                                                            }`}
                                                        style={{ width: `${goal.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-row lg:flex-col gap-2 self-start">
                                            <button
                                                onClick={() => navigate(`/task/${goal.id}`)}
                                                className="flex-1 lg:flex-none px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-background shadow-neumorphism-sm hover:shadow-neumorphism transition-all text-xs sm:text-sm text-gray-700"
                                            >
                                                View Details
                                            </button>
                                            <button
                                                onClick={() => navigate('/communications')}
                                                className="flex-1 lg:flex-none px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-background shadow-neumorphism-sm hover:shadow-neumorphism transition-all text-xs sm:text-sm text-gray-700 flex items-center justify-center gap-1 sm:gap-2"
                                            >
                                                <MessageSquare size={14} />
                                                <span>Comment</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {goals.map((goal) => (
                                <div
                                    key={goal.id}
                                    onClick={() => navigate(`/task/${goal.id}`)}
                                    className="bg-background rounded-xl sm:rounded-2xl overflow-hidden shadow-neumorphism hover:shadow-neumorphism-sm transition-all cursor-pointer group"
                                >
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={goal.image}
                                            alt={goal.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute top-3 right-3 flex gap-2">
                                            <span className={`px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-sm ${getCategoryColor(goal.category)}`}>
                                                {goal.category}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusBg(goal.status)} ${getStatusColor(goal.status)}`}>
                                                {goal.status === 'in-progress' ? 'In Progress' : goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-4">
                                        <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-2">{goal.title}</h3>
                                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{goal.description}</p>

                                        {/* Progress */}
                                        <div className="mb-3">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-gray-500">Progress</span>
                                                <span className="text-sm font-bold text-gray-700">{goal.progress}%</span>
                                            </div>
                                            <div className="h-2 bg-background rounded-full shadow-neumorphism-inset overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${goal.status === 'completed' ? 'bg-success' :
                                                        goal.status === 'in-progress' ? 'bg-primary' :
                                                            'bg-gray-400'
                                                        }`}
                                                    style={{ width: `${goal.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Meta Info */}
                                        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-200">
                                            <div className="flex items-center gap-1">
                                                <User size={12} />
                                                <span className="truncate">{goal.leader.split(' ')[0]}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MessageSquare size={12} />
                                                <span>{goal.comments}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Imihigo;
