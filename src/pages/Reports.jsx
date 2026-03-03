import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { BarChart3, Download, Calendar, Filter, TrendingUp, FileText } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useElasticScroll } from '../hooks/useElasticScroll';

const Reports = () => {
    const navigate = useNavigate();
    const scrollRef = useElasticScroll();

    // Projects data for the chart
    const projectsData = [
        { day: '1', value: 32 },
        { day: '2', value: 28 },
        { day: '3', value: 35 },
        { day: '4', value: 42 },
        { day: '5', value: 38 },
        { day: '6', value: 45 },
        { day: '7', value: 40 },
        { day: '8', value: 48 },
        { day: '9', value: 35 },
        { day: '10', value: 30 },
        { day: '11', value: 28 },
        { day: '12', value: 32 },
        { day: '13', value: 38 },
        { day: '14', value: 35 },
        { day: '15', value: 42 },
        { day: '16', value: 48 },
        { day: '17', value: 52 },
        { day: '18', value: 45 },
        { day: '19', value: 40 },
        { day: '20', value: 38 },
        { day: '21', value: 35 },
        { day: '22', value: 32 },
    ];

    const calendarEvents = [
        { title: 'Meeting with supplier', time: '8 AM - 10 AM', color: 'bg-blue-500' },
        { title: 'Meeting with stakeholders', time: '10:30 AM - 12PM', color: 'bg-orange-500' },
        { title: 'Discussion with the team', time: '4 PM - 5 PM', color: 'bg-purple-500' },
    ];
    const reports = [
        { title: 'Q1 2026 Development Report', date: '2026-03-01', type: 'Quarterly', status: 'Published', downloads: 245 },
        { title: 'Annual Performance Review 2025', date: '2026-01-15', type: 'Annual', status: 'Published', downloads: 532 },
        { title: 'Infrastructure Progress Report', date: '2026-02-20', type: 'Monthly', status: 'Published', downloads: 189 },
        { title: 'Agricultural Development Summary', date: '2026-02-28', type: 'Monthly', status: 'Draft', downloads: 0 },
        { title: 'Health Sector Achievements', date: '2026-02-15', type: 'Quarterly', status: 'Published', downloads: 312 },
    ];

    const stats = [
        { label: 'Total Reports', value: '156', trend: '+12%', color: 'primary' },
        { label: 'Published', value: '142', trend: '+8%', color: 'success' },
        { label: 'In Draft', value: '14', trend: '+4', color: 'gray' },
        { label: 'Downloads', value: '12.5K', trend: '+23%', color: 'primary' },
    ];

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="Reports & Analytics" />

                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="mb-6 md:mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Reports & Analytics</h2>
                        <p className="text-sm md:text-base text-gray-600">Generate and view performance reports</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                onClick={() => navigate('/imihigo')}
                                className="bg-background rounded-2xl p-4 md:p-6 shadow-neumorphism hover:shadow-neumorphism-sm transition-all cursor-pointer"
                            >
                                <p className="text-xs md:text-sm text-gray-500 mb-2">{stat.label}</p>
                                <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
                                <p className="text-xs md:text-sm text-success font-medium flex items-center gap-1">
                                    <TrendingUp size={14} />
                                    {stat.trend}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                        {/* Projects Chart */}
                        <div className="bg-background rounded-2xl p-4 md:p-6 shadow-neumorphism">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base md:text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <BarChart3 size={20} />
                                    Projects
                                </h3>
                                <div className="flex items-center gap-3">
                                    <button className="px-3 py-1.5 rounded-lg bg-background shadow-neumorphism-sm text-xs text-gray-600 hover:shadow-neumorphism transition-all flex items-center gap-1">
                                        <Calendar size={14} />
                                        23 Nov 22
                                    </button>
                                    <button
                                        onClick={() => navigate('/imihigo')}
                                        className="px-3 py-1.5 rounded-lg bg-background shadow-neumorphism-sm text-xs text-gray-600 hover:shadow-neumorphism transition-all"
                                    >
                                        View
                                    </button>
                                </div>
                            </div>

                            <div className="h-64 md:h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={projectsData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis
                                            dataKey="day"
                                            stroke="#9ca3af"
                                            style={{ fontSize: '12px' }}
                                        />
                                        <YAxis
                                            stroke="#9ca3af"
                                            style={{ fontSize: '12px' }}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#f3f4f6',
                                                border: 'none',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#3b82f6"
                                            strokeWidth={2}
                                            dot={{ fill: '#3b82f6', r: 4 }}
                                            activeDot={{ r: 6 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Calendar and Events */}
                        <div className="bg-background rounded-2xl p-4 md:p-6 shadow-neumorphism">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base md:text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <Calendar size={20} />
                                    Calendar and Events
                                </h3>
                                <button className="px-3 py-1.5 rounded-lg bg-background shadow-neumorphism-sm text-xs text-gray-600 hover:shadow-neumorphism transition-all flex items-center gap-1">
                                    <Calendar size={14} />
                                    23 Nov 22
                                </button>
                            </div>

                            {/* Mini Calendar */}
                            <div className="mb-4">
                                <div className="grid grid-cols-7 gap-2 text-center mb-2">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                                        <div key={day} className="text-xs font-medium text-gray-500">
                                            {day}
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 gap-2 text-center">
                                    {[29, 30, 31, 1, 2, 3, 4].map((date, idx) => (
                                        <div
                                            key={idx}
                                            className={`p-2 rounded-lg text-sm ${date === 31
                                                ? 'bg-primary text-white font-bold shadow-neumorphism-sm'
                                                : date < 29
                                                    ? 'text-gray-800'
                                                    : 'text-gray-400'
                                                }`}
                                        >
                                            {date}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Events List */}
                            <div className="space-y-3">
                                {calendarEvents.map((event, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 bg-background rounded-lg shadow-neumorphism-sm">
                                        <div className={`w-1 h-full ${event.color} rounded-full`}></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-gray-800">{event.title}</p>
                                            <p className="text-xs text-gray-500 mt-1">{event.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-background rounded-2xl p-4 shadow-neumorphism mb-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <Filter size={20} className="text-gray-600" />
                                <button className="px-4 py-2 rounded-lg bg-primary text-white shadow-neumorphism-sm text-sm">
                                    All Reports
                                </button>
                                <button className="px-4 py-2 rounded-lg bg-background shadow-neumorphism-sm text-sm text-gray-600 hover:shadow-neumorphism transition-all">
                                    Published
                                </button>
                                <button className="px-4 py-2 rounded-lg bg-background shadow-neumorphism-sm text-sm text-gray-600 hover:shadow-neumorphism transition-all">
                                    Draft
                                </button>
                            </div>
                            <button
                                onClick={() => navigate('/imihigo')}
                                className="px-6 py-2 bg-primary text-white rounded-xl shadow-neumorphism-sm hover:shadow-neumorphism transition-all flex items-center gap-2"
                            >
                                <FileText size={18} />
                                Generate Report
                            </button>
                        </div>
                    </div>

                    {/* Reports List */}
                    <div className="bg-background rounded-2xl p-4 md:p-6 shadow-neumorphism">
                        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">Recent Reports</h3>

                        <div className="space-y-3">
                            {reports.map((report, index) => (
                                <div key={index} className="bg-background rounded-xl p-4 md:p-5 shadow-neumorphism-sm hover:shadow-neumorphism transition-all">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-start gap-4 flex-1">
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <BarChart3 className="text-primary" size={24} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-base md:text-lg font-semibold text-gray-800 mb-1">{report.title}</h4>
                                                <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar size={14} />
                                                        {report.date}
                                                    </span>
                                                    <span className="px-2 py-1 rounded bg-primary/10 text-primary">
                                                        {report.type}
                                                    </span>
                                                    <span className={`px-2 py-1 rounded ${report.status === 'Published'
                                                        ? 'bg-success/10 text-success'
                                                        : 'bg-gray-200 text-gray-600'
                                                        }`}>
                                                        {report.status}
                                                    </span>
                                                    {report.downloads > 0 && (
                                                        <span>{report.downloads} downloads</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => navigate('/imihigo')}
                                                className="px-4 py-2 rounded-lg bg-background shadow-neumorphism-sm hover:shadow-neumorphism transition-all text-sm text-gray-700"
                                            >
                                                View
                                            </button>
                                            {report.status === 'Published' && (
                                                <button className="px-4 py-2 rounded-lg bg-primary text-white shadow-neumorphism-sm hover:shadow-neumorphism transition-all text-sm flex items-center gap-2">
                                                    <Download size={16} />
                                                    <span className="hidden md:inline">Download</span>
                                                </button>
                                            )}
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

export default Reports;
