import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { ArrowLeft, Edit, Mail, Phone, MapPin, Calendar, Award, Target, CheckCircle, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const navigate = useNavigate();

    const user = {
        name: 'Mayor of Gasabo District',
        role: 'District Leader',
        email: 'mayor.gasabo@gov.rw',
        phone: '+250 788 123 456',
        location: 'Gasabo District, Kigali',
        joinDate: 'January 2023',
        avatar: 'MG',
        contributionScore: 85,
        tasksCompleted: 20,
        totalTasks: 25,
        subordinates: 6,
    };

    const recentActivity = [
        { action: 'Completed task: Agricultural Survey', date: '2 hours ago', type: 'completed' },
        { action: 'Assigned task to Executive Secretary', date: '5 hours ago', type: 'assigned' },
        { action: 'Commented on Infrastructure Project', date: '1 day ago', type: 'comment' },
        { action: 'Updated Health Campaign status', date: '2 days ago', type: 'update' },
    ];

    const achievements = [
        { title: 'Top Performer', description: 'Ranked #1 in Q1 2026', icon: Award, color: 'text-yellow-500' },
        { title: 'Goal Achiever', description: 'Completed 20+ goals', icon: Target, color: 'text-primary' },
        { title: 'Team Leader', description: 'Managing 6 subordinates', icon: TrendingUp, color: 'text-success' },
    ];

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="User Profile" />

                <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8">
                    <div className="max-w-5xl mx-auto">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 sm:mb-6"
                        >
                            <ArrowLeft size={20} />
                            <span className="text-sm sm:text-base">Back</span>
                        </button>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                            {/* Profile Card */}
                            <div className="lg:col-span-1">
                                <div className="bg-background rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-neumorphism text-center">
                                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-3xl sm:text-4xl mx-auto mb-4 shadow-neumorphism-sm">
                                        {user.avatar}
                                    </div>

                                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">{user.name}</h2>
                                    <p className="text-sm text-gray-500 mb-4">{user.role}</p>

                                    <button className="w-full px-4 py-2 bg-primary text-white rounded-xl shadow-neumorphism-sm hover:shadow-neumorphism transition-all flex items-center justify-center gap-2 text-sm mb-4">
                                        <Edit size={16} />
                                        Edit Profile
                                    </button>

                                    <div className="space-y-3 text-left">
                                        <div className="flex items-center gap-3 text-sm">
                                            <Mail size={16} className="text-gray-400" />
                                            <span className="text-gray-700">{user.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <Phone size={16} className="text-gray-400" />
                                            <span className="text-gray-700">{user.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <MapPin size={16} className="text-gray-400" />
                                            <span className="text-gray-700">{user.location}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <Calendar size={16} className="text-gray-400" />
                                            <span className="text-gray-700">Joined {user.joinDate}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Achievements */}
                                <div className="bg-background rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-neumorphism mt-4 sm:mt-6">
                                    <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4">Achievements</h3>
                                    <div className="space-y-3">
                                        {achievements.map((achievement, idx) => (
                                            <div key={idx} className="flex items-start gap-3 p-3 bg-background rounded-lg shadow-neumorphism-sm">
                                                <achievement.icon size={20} className={achievement.color} />
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-800">{achievement.title}</p>
                                                    <p className="text-xs text-gray-500">{achievement.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Stats & Activity */}
                            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                                {/* Stats */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                                    <div className="bg-background rounded-xl p-4 shadow-neumorphism text-center">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                                            <Award className="text-primary" size={20} />
                                        </div>
                                        <p className="text-2xl font-bold text-gray-800">{user.contributionScore}%</p>
                                        <p className="text-xs text-gray-500">Contribution</p>
                                    </div>

                                    <div className="bg-background rounded-xl p-4 shadow-neumorphism text-center">
                                        <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mx-auto mb-2">
                                            <CheckCircle className="text-success" size={20} />
                                        </div>
                                        <p className="text-2xl font-bold text-gray-800">{user.tasksCompleted}</p>
                                        <p className="text-xs text-gray-500">Completed</p>
                                    </div>

                                    <div className="bg-background rounded-xl p-4 shadow-neumorphism text-center">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                                            <Target className="text-primary" size={20} />
                                        </div>
                                        <p className="text-2xl font-bold text-gray-800">{user.totalTasks}</p>
                                        <p className="text-xs text-gray-500">Total Tasks</p>
                                    </div>

                                    <div className="bg-background rounded-xl p-4 shadow-neumorphism text-center">
                                        <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mx-auto mb-2">
                                            <TrendingUp className="text-success" size={20} />
                                        </div>
                                        <p className="text-2xl font-bold text-gray-800">{user.subordinates}</p>
                                        <p className="text-xs text-gray-500">Subordinates</p>
                                    </div>
                                </div>

                                {/* Progress Overview */}
                                <div className="bg-background rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-neumorphism">
                                    <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4">Performance Overview</h3>

                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-gray-600">Task Completion Rate</span>
                                                <span className="text-sm font-bold text-gray-800">{Math.round((user.tasksCompleted / user.totalTasks) * 100)}%</span>
                                            </div>
                                            <div className="h-3 bg-background rounded-full shadow-neumorphism-inset overflow-hidden">
                                                <div
                                                    className="h-full bg-success rounded-full"
                                                    style={{ width: `${(user.tasksCompleted / user.totalTasks) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-gray-600">Contribution Score</span>
                                                <span className="text-sm font-bold text-gray-800">{user.contributionScore}%</span>
                                            </div>
                                            <div className="h-3 bg-background rounded-full shadow-neumorphism-inset overflow-hidden">
                                                <div
                                                    className="h-full bg-primary rounded-full"
                                                    style={{ width: `${user.contributionScore}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Activity */}
                                <div className="bg-background rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-neumorphism">
                                    <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>

                                    <div className="space-y-3">
                                        {recentActivity.map((activity, idx) => (
                                            <div key={idx} className="flex items-start gap-3 p-3 bg-background rounded-lg shadow-neumorphism-sm">
                                                <div className={`w-2 h-2 rounded-full mt-2 ${activity.type === 'completed' ? 'bg-success' :
                                                    activity.type === 'assigned' ? 'bg-primary' :
                                                        activity.type === 'comment' ? 'bg-purple-500' :
                                                            'bg-orange-500'
                                                    }`}></div>
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-800">{activity.action}</p>
                                                    <p className="text-xs text-gray-400 mt-1">{activity.date}</p>
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
        </div>
    );
};

export default UserProfile;
