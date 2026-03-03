import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { ArrowLeft, Calendar, DollarSign, User, Tag, FileText, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useElasticScroll } from '../hooks/useElasticScroll';

const CreateGoal = () => {
    const navigate = useNavigate();
    const scrollRef = useElasticScroll();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        leader: '',
        territory: '',
        sector: '',
        startDate: '',
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

    const territories = [
        'Kigali City',
        'Eastern Province',
        'Southern Province',
        'Western Province',
        'Northern Province',
    ];

    const leaders = [
        'Mayor of Gasabo District',
        'Executive Secretary - Remera',
        'Executive Secretary - Kimironko',
        'Cell Chief - Rukiri',
        'Cell Chief - Nyarutarama',
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Goal created:', formData);
        navigate('/imihigo');
    };

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="Create New Goal" />

                <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8">
                    <div className="max-w-4xl mx-auto">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 sm:mb-6"
                        >
                            <ArrowLeft size={20} />
                            <span className="text-sm sm:text-base">Back</span>
                        </button>

                        <div className="bg-background rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-neumorphism">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Target className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Create New Igihango</h2>
                                    <p className="text-sm text-gray-600">Set a new leadership commitment and goal</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Goal Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Target size={16} className="inline mr-1" />
                                        Goal Title
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-background shadow-neumorphism-inset text-sm focus:outline-none"
                                        placeholder="Enter goal title (e.g., Build 5 New Health Centers)"
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FileText size={16} className="inline mr-1" />
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-background shadow-neumorphism-inset text-sm focus:outline-none resize-none"
                                        rows="4"
                                        placeholder="Describe the goal in detail"
                                        required
                                    />
                                </div>

                                {/* Leader & Territory */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <User size={16} className="inline mr-1" />
                                            Responsible Leader
                                        </label>
                                        <select
                                            value={formData.leader}
                                            onChange={(e) => setFormData({ ...formData, leader: e.target.value })}
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
                                            Territory
                                        </label>
                                        <select
                                            value={formData.territory}
                                            onChange={(e) => setFormData({ ...formData, territory: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-background shadow-neumorphism-inset text-sm focus:outline-none"
                                            required
                                        >
                                            <option value="">Select territory</option>
                                            {territories.map((territory, idx) => (
                                                <option key={idx} value={territory}>{territory}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Sector */}
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

                                {/* Start Date & Deadline */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Calendar size={16} className="inline mr-1" />
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.startDate}
                                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-background shadow-neumorphism-inset text-sm focus:outline-none"
                                            required
                                        />
                                    </div>

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
                                </div>

                                {/* Budget */}
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
                                        placeholder="Describe the expected impact on the community and national development"
                                        required
                                    />
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => navigate(-1)}
                                        className="flex-1 px-6 py-3 rounded-xl bg-background shadow-neumorphism-sm hover:shadow-neumorphism transition-all text-sm font-medium text-gray-700"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 rounded-xl bg-primary text-white shadow-neumorphism-sm hover:shadow-neumorphism transition-all text-sm font-medium"
                                    >
                                        Create Igihango
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

export default CreateGoal;
