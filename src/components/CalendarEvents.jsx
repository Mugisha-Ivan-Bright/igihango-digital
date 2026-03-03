import { Calendar, ChevronDown } from 'lucide-react';

const CalendarEvents = () => {
    const events = [
        { title: 'Meeting with supplier', time: '8 AM - 10 AM', color: 'border-l-purple-500' },
        { title: 'Meeting with stakeholders', time: '10:30 AM - 12PM', color: 'border-l-purple-500' },
        { title: 'Discussion with the team', time: '4 PM - 5 PM', color: 'border-l-purple-500' },
    ];

    const days = [
        { day: 'Mon', date: 29 },
        { day: 'Tue', date: 30 },
        { day: 'Wed', date: 31, active: true },
        { day: 'Thu', date: 1 },
        { day: 'Fri', date: 2 },
        { day: 'Sat', date: 3 },
        { day: 'Sun', date: 4 },
    ];

    return (
        <div className="bg-background rounded-2xl p-6 shadow-neumorphism">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-background shadow-neumorphism-inset flex items-center justify-center">
                        <div className="w-3 h-3 grid grid-cols-2 gap-0.5">
                            <div className="w-1 h-1 bg-gray-600 rounded-sm"></div>
                            <div className="w-1 h-1 bg-gray-600 rounded-sm"></div>
                            <div className="w-1 h-1 bg-gray-600 rounded-sm"></div>
                            <div className="w-1 h-1 bg-gray-600 rounded-sm"></div>
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Calender and Events</h3>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background shadow-neumorphism-sm text-sm text-gray-600">
                    <Calendar size={16} />
                    <span>23 Nov 22</span>
                    <ChevronDown size={16} />
                </button>
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2 mb-6">
                {days.map((day, index) => (
                    <div key={index} className="text-center">
                        <p className="text-xs text-gray-500 mb-2">{day.day}</p>
                        <div className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center text-sm font-medium ${day.active
                                ? 'bg-primary text-white shadow-neumorphism-sm'
                                : 'text-gray-600'
                            }`}>
                            {day.date}
                        </div>
                    </div>
                ))}
            </div>

            {/* Events List */}
            <div className="space-y-3">
                {events.map((event, index) => (
                    <div key={index} className={`bg-background rounded-xl p-4 shadow-neumorphism-sm border-l-4 ${event.color}`}>
                        <p className="text-sm font-medium text-gray-800 mb-1">{event.title}</p>
                        <p className="text-xs text-gray-500">{event.time}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarEvents;
