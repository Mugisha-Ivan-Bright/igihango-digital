import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Calendar, DollarSign, User, Tag, FileText, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useElasticScroll } from '../hooks/useElasticScroll';

const TaskAssignment = () => {
    const navigate = useNavigate();
    const scrollRef = useElasticScroll();
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

    const subordinateLeaders = [
        'Executive Secretary - Remera',
        'Executive Secretary - Kimironko',
        'Cell Chief - Rukiri',
        'Cell Chief - Nyarutarama',
        'Cell Chief - Kibagabaga',
        'Cell Chief - Biryogo'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Task assigned:', formData);
        navigate('/urwego');
    };

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="Assign New Task" />

                <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8">
                    <div className="max-w-4xl mx-auto">
                        <button
                            onClick={() => navigate('/urwego')}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 sm:mb-6"
                        >
                            <ArrowLeft size={20} />
                            <span className="text-sm sm:text-base">Back to Urwego</span>
                        </button>

                        <div className="bg-background rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-neumorphism">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">Assign New Task</h2>
                            <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-6 sm:mb-8">Fill in the details to assign a task to a subordinate leader</p>

                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                {/* Task Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Task Title *</label>
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
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-background shadow-neumorphism-inset text-sm focus:outline-none resize-none"
                                        rows="5"
                                        placeholder="Describe the task in detail"
                                        required
                                    />
                                </div>

                                {/* Assignee & Sector */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <User size={16} className="inline mr-1" />
                                            Assign To *
                                        </label>
                                        <select
                                            value={formData.assignee}
                                            onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-background shadow-neumorphism-inset text-sm focus:outline-none"
                                            required
                                        >
                                            <option value="">Select leader</option>
                                            {subordinateLeaders.map((leader, idx) => (
                                                <option key={idx} value={leader}>{leader}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Tag size={16} className="inline mr-1" />
                                            Sector *
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
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Calendar size={16} className="inline mr-1" />
                                            Deadline *
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
                                            Budget (RWF) *
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
                                        Expected Impact *
                                    </label>
                                    <textarea
                                        value={formData.expectedImpact}
                                        onChange={(e) => setFormData({ ...formData, expectedImpact: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-background shadow-neumorphism-inset text-sm focus:outline-none resize-none"
                                        rows="4"
                                        placeholder="Describe the expected impact on the community and territory development"
                                        required
                                    />
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/urwego')}
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
                </div>
            </div>
        </div>
    );
};

export default TaskAssignment;
