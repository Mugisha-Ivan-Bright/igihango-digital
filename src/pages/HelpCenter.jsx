import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { HelpCircle, Search, Book, MessageCircle, Mail, Phone, FileText, Video } from 'lucide-react';
import { useState } from 'react';
import { useElasticScroll } from '../hooks/useElasticScroll';

const HelpCenter = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const scrollRef = useElasticScroll();

    const faqs = [
        {
            category: 'Getting Started',
            icon: Book,
            questions: [
                { q: 'How do I create a new Igihango?', a: 'Click the "Add New Goal" button in the sidebar, fill in the required information including title, description, sector, and deadline, then submit.' },
                { q: 'How do I assign tasks to subordinate leaders?', a: 'Navigate to the Urwego Platform, find the leader you want to assign a task to, and click the "Assign" button next to their name.' },
                { q: 'How can I track my contribution score?', a: 'Your contribution score is visible on your profile and the Contribution Hub. It\'s calculated based on completed tasks and goals.' },
            ]
        },
        {
            category: 'Task Management',
            icon: FileText,
            questions: [
                { q: 'How do I submit evidence for a completed task?', a: 'Open the task details page, scroll to the "Submit Evidence" section, upload your files (images, documents, reports), and click submit.' },
                { q: 'How do I update task status?', a: 'High-level leaders can update task status by opening the task details and selecting the appropriate status (Completed, In Progress, Pending, Not Done).' },
                { q: 'Can I comment on tasks?', a: 'Yes, all leaders can add comments and suggestions on tasks through the task details page.' },
            ]
        },
        {
            category: 'Reports & Analytics',
            icon: Video,
            questions: [
                { q: 'How do I generate a report?', a: 'Go to Reports & Analytics page and click "Generate Report". Select the type (Monthly, Quarterly, Annual) and the data you want to include.' },
                { q: 'How can I view territorial development progress?', a: 'Visit the Contribution Hub to see rankings and progress of all provinces, districts, and sectors.' },
                { q: 'Where can I see sector performance?', a: 'Sector performance is available on the Urwego Platform page, showing scores for Agriculture, Health, Education, Infrastructure, and more.' },
            ]
        },
    ];

    const contactOptions = [
        { icon: Mail, title: 'Email Support', value: 'support@igihango.gov.rw', color: 'bg-blue-500' },
        { icon: Phone, title: 'Phone Support', value: '+250 788 123 456', color: 'bg-green-500' },
        { icon: MessageCircle, title: 'Live Chat', value: 'Available 24/7', color: 'bg-purple-500' },
    ];

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="Help Center" />

                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="mb-6 md:mb-8 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                <HelpCircle className="text-primary" size={32} />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">How can we help you?</h2>
                            <p className="text-sm md:text-base text-gray-600">Find answers to common questions and get support</p>
                        </div>

                        {/* Search */}
                        <div className="bg-background rounded-2xl p-4 shadow-neumorphism mb-6 md:mb-8">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for help articles, guides, or FAQs..."
                                    className="w-full px-4 py-3 pl-12 rounded-xl bg-background shadow-neumorphism-inset text-sm focus:outline-none"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            </div>
                        </div>

                        {/* Contact Options */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 md:mb-8">
                            {contactOptions.map((option, idx) => (
                                <div key={idx} className="bg-background rounded-xl p-4 shadow-neumorphism hover:shadow-neumorphism-sm transition-all cursor-pointer">
                                    <div className={`w-12 h-12 rounded-xl ${option.color} flex items-center justify-center mb-3`}>
                                        <option.icon className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-base font-semibold text-gray-800 mb-1">{option.title}</h3>
                                    <p className="text-sm text-gray-600">{option.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* FAQs */}
                        <div className="space-y-6">
                            {faqs.map((category, idx) => (
                                <div key={idx} className="bg-background rounded-2xl p-4 md:p-6 shadow-neumorphism">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <category.icon className="text-primary" size={20} />
                                        </div>
                                        <h3 className="text-lg md:text-xl font-bold text-gray-800">{category.category}</h3>
                                    </div>

                                    <div className="space-y-4">
                                        {category.questions.map((item, qIdx) => (
                                            <div key={qIdx} className="bg-background rounded-xl p-4 shadow-neumorphism-sm">
                                                <h4 className="text-sm md:text-base font-semibold text-gray-800 mb-2 flex items-start gap-2">
                                                    <HelpCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                                                    {item.q}
                                                </h4>
                                                <p className="text-sm text-gray-600 ml-6">{item.a}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Additional Resources */}
                        <div className="bg-background rounded-2xl p-4 md:p-6 shadow-neumorphism mt-6">
                            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Additional Resources</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-background rounded-xl p-4 shadow-neumorphism-sm hover:shadow-neumorphism transition-all cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Book className="text-primary" size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-800">User Guide</h4>
                                            <p className="text-xs text-gray-500">Complete platform documentation</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-background rounded-xl p-4 shadow-neumorphism-sm hover:shadow-neumorphism transition-all cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Video className="text-primary" size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-800">Video Tutorials</h4>
                                            <p className="text-xs text-gray-500">Step-by-step video guides</p>
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

export default HelpCenter;
