import { X, Calendar, DollarSign, User, Tag, FileText } from 'lucide-react';
import { useState } from 'react';

const TaskAssignmentModal = ({ isOpen, onClose, leaders = [] }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        assignee: '',
        sector: '',
        deadline: '',
        budget: '',
        expectedImpact: '',
    });

    const sectors = [
        'Agriculture',
        'Health',
        'Education',
        'Infrastructure',
        'Social Welfare',
        'Economic Development',
        'Environment',
        'Security',
    ];

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Task assigned:', formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-2xl shadow-neumorphism max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-background p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between rounded-t-2xl">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">Assign New Task</h2>
                    <button onClick={onClose} className="w-8 h-8 rounded-lg bg-background shadow-neumorphism-sm hover:shadow-neumorphism transition-all flex items-center justify-center">
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    {/* Task Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-background shadow-neumorphism-inset text-sm focus:outline-none"
                            placeholder="Enter task title"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-background shadow-neumorphism-inset text-sm focus:outline-none resize-none"
                            rows="4"
                            placeholder="Describe the task in detail"
                            required
                        />
                    </div>

                    {/* Assignee & Sector */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <User size={16} className="inline mr-1" />
                                Assign To
                            </label>
                            <select
                                value={formData.assignee}
                                onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-background shadow-neumorphism-inset text-sm focus:outline-none"
                                required
                            >
                                <option value="">Select leader</option>
                                {leaders.map((leader, idx) => (
                                    <option key={idx} value={leader}>{leader}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Tag size={16} className="inline mr-1" />
                                Sector
                            </label>
                            <select
                                value={formData.sector}
                                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-background shadow-neumorphism-inset text-sm focus:outline-none"
                                required
                            >
                                <option value="">Select sector</option>
                                {sectors.map((sector, idx) => (
                                    <option key={idx} value={sector}>{sector}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Deadline & Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Calendar size={16} className="inline mr-1" />
                                Deadline
                            </label>
                            <input
                                type="date"
                                value={formData.deadline}
                                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-background shadow-neumorphism-inset text-sm focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <DollarSign size={16} className="inline mr-1" />
                                Budget (RWF)
                            </label>
                            <input
                                type="number"
                                value={formData.budget}
                                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-background shadow-neumorphism-inset text-sm focus:outline-none"
                                placeholder="0"
                                required
                            />
                        </div>
                    </div>

                    {/* Expected Impact */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FileText size={16} className="inline mr-1" />
                            Expected Impact
                        </label>
                        <textarea
                            value={formData.expectedImpact}
                            onChange={(e) => setFormData({ ...formData, expectedImpact: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-background shadow-neumorphism-inset text-sm focus:outline-none resize-none"
                            rows="3"
                            placeholder="Describe the expected impact on the community"
                            required
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 rounded-xl bg-background shadow-neumorphism-sm hover:shadow-neumorphism transition-all text-sm font-medium text-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 rounded-xl bg-primary text-white shadow-neumorphism-sm hover:shadow-neumorphism transition-all text-sm font-medium"
                        >
                            Assign Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskAssignmentModal;
