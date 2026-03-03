import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Calendar, DollarSign, User, Tag, FileText, Upload, MessageSquare, CheckCircle, Clock, AlertCircle, ArrowLeft, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useElasticScroll } from '../hooks/useElasticScroll';

const TaskDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [comment, setComment] = useState('');
    const [evidence, setEvidence] = useState(null);
    const scrollRef = useElasticScroll();

    // Mock task data - in real app, fetch based on id
    const task = {
        id: 1,
        title: 'Complete Agricultural Survey',
        description: 'Conduct comprehensive survey of all farming activities in the sector. This includes visiting all villages, interviewing farmers, documenting current practices, and identifying challenges and opportunities.',
        assignee: 'Executive Secretary - Remera',
        sector: 'Agriculture',
        deadline: '2026-04-15',
        budget: '5,000,000',
        progress: 65,
        status: 'in-progress',
        impact: 'Will help identify farming challenges and opportunities for 500+ farmers in the sector. Expected to improve agricultural productivity by 30% through targeted interventions.',
        evidence: [
            { name: 'Survey_Report_Draft.pdf', date: '2026-03-01', size: '2.5 MB' },
            { name: 'Field_Photos.zip', date: '2026-03-02', size: '15 MB' }
        ],
        comments: [
            { author: 'Mayor of Gasabo', text: 'Good progress! Please ensure all villages are covered.', time: '2 hours ago' },
            { author: 'Executive Secretary - Remera', text: 'Will complete remaining 3 villages by next week.', time: '1 hour ago' }
        ],
        canUpdateStatus: true
    };

    const handleSubmitEvidence = (e) => {
        e.preventDefault();
        console.log('Evidence submitted:', evidence);
        setEvidence(null);
    };

    const handleAddComment = (e) => {
        e.preventDefault();
        console.log('Comment added:', comment);
        setComment('');
    };

    const handleUpdateStatus = (newStatus) => {
        console.log('Status updated to:', newStatus);
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

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return <CheckCircle size={16} />;
            case 'in-progress': return <Clock size={16} />;
            case 'pending': return <AlertCircle size={16} />;
            case 'not-done': return <X size={16} />;
            default: return <Clock size={16} />;
        }
    };

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="Task Details" />

                <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8">
                    <div className="max-w-5xl mx-auto">
                        <button
                            onClick={() => navigate('/urwego')}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 sm:mb-6"
                        >
                            <ArrowLeft size={20} />
                            <span className="text-sm sm:text-base">Back to Urwego</span>
                        </button>

                        {/* Task Header */}
                        <div className="bg-background rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-neumorphism mb-4 sm:mb-6">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3">{task.title}</h2>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                <span className={`px-3 py-1 rounded-lg text-xs sm:text-sm font-medium ${getStatusColor(task.status)} flex items-center gap-1`}>
                                    {getStatusIcon(task.status)}
                                    {task.status.replace('-', ' ').toUpperCase()}
                                </span>
                                <span className="px-3 py-1 rounded-lg text-xs sm:text-sm font-medium bg-primary/10 text-primary">
                                    {task.sector}
                                </span>
                                <span className="px-3 py-1 rounded-lg text-xs sm:text-sm font-medium bg-gray-200 text-gray-700">
                                    Progress: {task.progress}%
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                                {/* Task Details */}
                                <div className="bg-background rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-neumorphism">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Task Information</h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                        <div className="flex items-start gap-3">
                                            <User size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs text-gray-500">Assigned To</p>
                                                <p className="text-sm font-medium text-gray-800">{task.assignee}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <Calendar size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs text-gray-500">Deadline</p>
                                                <p className="text-sm font-medium text-gray-800">{task.deadline}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <DollarSign size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs text-gray-500">Budget</p>
                                                <p className="text-sm font-medium text-gray-800">{task.budget} RWF</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <Tag size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs text-gray-500">Sector</p>
                                                <p className="text-sm font-medium text-gray-800">{task.sector}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-200">
                                        <p className="text-xs text-gray-500 mb-2">Description</p>
                                        <p className="text-sm text-gray-700">{task.description}</p>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <p className="text-xs text-gray-500 mb-2">Expected Impact</p>
                                        <p className="text-sm text-gray-700">{task.impact}</p>
                                    </div>

                                    {/* Progress */}
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-xs text-gray-500">Progress</p>
                                            <p className="text-sm font-bold text-gray-700">{task.progress}%</p>
                                        </div>
                                        <div className="h-3 bg-background rounded-full shadow-neumorphism-inset overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full transition-all"
                                                style={{ width: `${task.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Evidence */}
                                <div className="bg-background rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-neumorphism">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                        <Upload size={18} />
                                        Submit Evidence
                                    </h3>

                                    <form onSubmit={handleSubmitEvidence} className="space-y-4">
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-2">Upload Files (Images, Documents, Reports)</label>
                                            <input
                                                type="file"
                                                multiple
                                                onChange={(e) => setEvidence(e.target.files)}
                                                className="w-full px-4 py-3 rounded-xl bg-background shadow-neumorphism-inset text-sm focus:outline-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full px-6 py-3 rounded-xl bg-success text-white shadow-neumorphism-sm hover:shadow-neumorphism transition-all text-sm font-medium"
                                        >
                                            Submit Evidence for Review
                                        </button>
                                    </form>

                                    {/* Submitted Evidence */}
                                    {task.evidence && task.evidence.length > 0 && (
                                        <div className="mt-6 pt-6 border-t border-gray-200">
                                            <p className="text-xs text-gray-500 mb-3">Submitted Evidence</p>
                                            <div className="space-y-2">
                                                {task.evidence.map((file, idx) => (
                                                    <div key={idx} className="flex items-center justify-between p-3 bg-background rounded-lg shadow-neumorphism-sm">
                                                        <div className="flex items-center gap-2 flex-1 min-w-0">
                                                            <FileText size={16} className="text-primary flex-shrink-0" />
                                                            <div className="min-w-0">
                                                                <p className="text-sm text-gray-700 truncate">{file.name}</p>
                                                                <p className="text-xs text-gray-500">{file.size}</p>
                                                            </div>
                                                        </div>
                                                        <span className="text-xs text-gray-500 ml-2">{file.date}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Comments Section */}
                                <div className="bg-background rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-neumorphism">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                        <MessageSquare size={18} />
                                        Comments & Discussions ({task.comments?.length || 0})
                                    </h3>

                                    {/* Add Comment */}
                                    <form onSubmit={handleAddComment} className="mb-6">
                                        <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-background shadow-neumorphism-inset text-sm focus:outline-none resize-none"
                                            rows="3"
                                            placeholder="Add your comment or opinion..."
                                        />
                                        <button
                                            type="submit"
                                            className="mt-2 px-6 py-2 rounded-lg bg-primary text-white shadow-neumorphism-sm hover:shadow-neumorphism transition-all text-sm font-medium"
                                        >
                                            Post Comment
                                        </button>
                                    </form>

                                    {/* Comments List */}
                                    <div className="space-y-3">
                                        {task.comments?.map((comment, idx) => (
                                            <div key={idx} className="bg-background rounded-lg p-3 sm:p-4 shadow-neumorphism-sm">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs flex-shrink-0">
                                                        {comment.author.charAt(0)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <p className="text-sm font-medium text-gray-800">{comment.author}</p>
                                                            <p className="text-xs text-gray-400">{comment.time}</p>
                                                        </div>
                                                        <p className="text-sm text-gray-600">{comment.text}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-4 sm:space-y-6">
                                {/* Update Status */}
                                {task.canUpdateStatus && (
                                    <div className="bg-background rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-neumorphism">
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Update Status</h3>
                                        <div className="space-y-2">
                                            <button
                                                onClick={() => handleUpdateStatus('completed')}
                                                className="w-full px-4 py-3 rounded-lg bg-success/10 text-success shadow-neumorphism-sm hover:shadow-neumorphism transition-all text-sm font-medium flex items-center justify-center gap-2"
                                            >
                                                <CheckCircle size={16} />
                                                Completed
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus('in-progress')}
                                                className="w-full px-4 py-3 rounded-lg bg-primary/10 text-primary shadow-neumorphism-sm hover:shadow-neumorphism transition-all text-sm font-medium flex items-center justify-center gap-2"
                                            >
                                                <Clock size={16} />
                                                In Progress
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus('pending')}
                                                className="w-full px-4 py-3 rounded-lg bg-orange-100 text-orange-600 shadow-neumorphism-sm hover:shadow-neumorphism transition-all text-sm font-medium flex items-center justify-center gap-2"
                                            >
                                                <AlertCircle size={16} />
                                                Pending
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus('not-done')}
                                                className="w-full px-4 py-3 rounded-lg bg-danger/10 text-danger shadow-neumorphism-sm hover:shadow-neumorphism transition-all text-sm font-medium flex items-center justify-center gap-2"
                                            >
                                                <X size={16} />
                                                Not Done
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Quick Stats */}
                                <div className="bg-background rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-neumorphism">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Evidence Files</span>
                                            <span className="text-sm font-bold text-gray-800">{task.evidence.length}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Comments</span>
                                            <span className="text-sm font-bold text-gray-800">{task.comments.length}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Days Remaining</span>
                                            <span className="text-sm font-bold text-danger">12</span>
                                        </div>
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

export default TaskDetail;
