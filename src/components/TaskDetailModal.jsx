import { X, Calendar, DollarSign, User, Tag, FileText, Upload, MessageSquare, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const TaskDetailModal = ({ isOpen, onClose, task }) => {
    const [comment, setComment] = useState('');
    const [evidence, setEvidence] = useState(null);

    if (!isOpen || !task) return null;

    const handleSubmitEvidence = (e) => {
        e.preventDefault();
        console.log('Evidence submitted:', evidence);
        // Handle evidence submission
    };

    const handleAddComment = (e) => {
        e.preventDefault();
        console.log('Comment added:', comment);
        setComment('');
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
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-2xl shadow-neumorphism max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-background p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between rounded-t-2xl">
                    <div className="flex-1 min-w-0 mr-4">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{task.title}</h2>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getStatusColor(task.status)} flex items-center gap-1`}>
                                {getStatusIcon(task.status)}
                                {task.status.replace('-', ' ').toUpperCase()}
                            </span>
                            <span className="px-3 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary">
                                {task.sector}
                            </span>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-lg bg-background shadow-neumorphism-sm hover:shadow-neumorphism transition-all flex items-center justify-center flex-shrink-0">
                        <X size={18} />
                    </button>
                </div>

                <div className="p-4 sm:p-6 space-y-6">
                    {/* Task Details */}
                    <div className="bg-background rounded-xl p-4 shadow-neumorphism-sm">
                        <h3 className="text-sm font-semibold text-gray-800 mb-4">Task Information</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <User size={18} className="text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500">Assigned To</p>
                                    <p className="text-sm font-medium text-gray-800">{task.assignee}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Calendar size={18} className="text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500">Deadline</p>
                                    <p className="text-sm font-medium text-gray-800">{task.deadline}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <DollarSign size={18} className="text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500">Budget</p>
                                    <p className="text-sm font-medium text-gray-800">{task.budget} RWF</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Tag size={18} className="text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500">Sector</p>
                                    <p className="text-sm font-medium text-gray-800">{task.sector}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
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
                            <div className="h-2 bg-background rounded-full shadow-neumorphism-inset overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full transition-all"
                                    style={{ width: `${task.progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Evidence */}
                    <div className="bg-background rounded-xl p-4 shadow-neumorphism-sm">
                        <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
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
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <p className="text-xs text-gray-500 mb-3">Submitted Evidence</p>
                                <div className="space-y-2">
                                    {task.evidence.map((file, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-background rounded-lg shadow-neumorphism-sm">
                                            <div className="flex items-center gap-2">
                                                <FileText size={16} className="text-primary" />
                                                <span className="text-sm text-gray-700">{file.name}</span>
                                            </div>
                                            <span className="text-xs text-gray-500">{file.date}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Comments Section */}
                    <div className="bg-background rounded-xl p-4 shadow-neumorphism-sm">
                        <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <MessageSquare size={18} />
                            Comments & Discussions ({task.comments?.length || 0})
                        </h3>

                        {/* Add Comment */}
                        <form onSubmit={handleAddComment} className="mb-4">
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
                                <div key={idx} className="bg-background rounded-lg p-3 shadow-neumorphism-sm">
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

                    {/* Update Status (For High-Level Leaders) */}
                    {task.canUpdateStatus && (
                        <div className="bg-background rounded-xl p-4 shadow-neumorphism-sm">
                            <h3 className="text-sm font-semibold text-gray-800 mb-4">Update Task Status</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <button className="px-4 py-3 rounded-lg bg-success/10 text-success shadow-neumorphism-sm hover:shadow-neumorphism transition-all text-sm font-medium">
                                    Completed
                                </button>
                                <button className="px-4 py-3 rounded-lg bg-primary/10 text-primary shadow-neumorphism-sm hover:shadow-neumorphism transition-all text-sm font-medium">
                                    In Progress
                                </button>
                                <button className="px-4 py-3 rounded-lg bg-orange-100 text-orange-600 shadow-neumorphism-sm hover:shadow-neumorphism transition-all text-sm font-medium">
                                    Pending
                                </button>
                                <button className="px-4 py-3 rounded-lg bg-danger/10 text-danger shadow-neumorphism-sm hover:shadow-neumorphism transition-all text-sm font-medium">
                                    Not Done
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskDetailModal;
