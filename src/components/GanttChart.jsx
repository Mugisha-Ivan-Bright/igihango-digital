import { Calendar, ChevronDown, MoreVertical, Maximize2 } from 'lucide-react';

const GanttChart = () => {
    const projects = [
        {
            name: 'OS - FAB',
            tasks: [
                { name: 'Project 1', start: 1, duration: 5, week: 1, color: 'bg-yellow-200' },
                { name: 'Project 2', start: 1, duration: 3, week: 2, color: 'bg-gray-300', striped: true },
            ]
        },
        {
            name: 'TATA',
            tasks: [
                { name: '', start: 1, duration: 2, week: 2, color: 'bg-green-300' },
            ]
        },
        {
            name: 'KEC',
            tasks: [
                { name: '', start: 2, duration: 1, week: 2, color: 'bg-gray-300' },
            ]
        },
    ];

    const weeks = [
        { label: 'Week 1', days: ['MON\n1', 'TUE\n2', 'WED\n3', 'THU\n4', 'FRI\n5', 'SAT\n6', 'SUN\n7'] },
        { label: 'Week 2', days: ['MON\n1', 'TUE\n2', 'WED\n3', 'THU\n4', 'FRI\n5', 'SAT\n6', 'SUN\n7'] },
        { label: 'Week 3', days: ['MON\n1', 'TUE\n2', 'WED\n3', 'THU\n4', 'FRI\n5', 'SAT\n6', 'SUN\n7'] },
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
                    <h3 className="text-lg font-semibold text-gray-800">Gantt chart</h3>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background shadow-neumorphism-sm text-sm text-gray-600">
                        <Calendar size={16} />
                        <span>1 Nov 22 — 28 Dec 22</span>
                        <ChevronDown size={16} />
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-background shadow-neumorphism-sm flex items-center justify-center">
                        <MoreVertical size={16} className="text-gray-600" />
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-background shadow-neumorphism-sm flex items-center justify-center">
                        <Maximize2 size={16} className="text-gray-600" />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                    {/* Header */}
                    <div className="grid grid-cols-[200px_1fr] gap-4 mb-4">
                        <div className="text-sm font-semibold text-gray-600">Title</div>
                        <div className="grid grid-cols-3 gap-4">
                            {weeks.map((week, idx) => (
                                <div key={idx}>
                                    <div className="text-xs font-semibold text-gray-600 mb-2">{week.label}</div>
                                    <div className="grid grid-cols-7 gap-1">
                                        {week.days.map((day, dayIdx) => (
                                            <div key={dayIdx} className="text-[10px] text-gray-400 text-center whitespace-pre-line">
                                                {day}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Projects */}
                    {projects.map((project, idx) => (
                        <div key={idx} className="mb-4">
                            <div className="grid grid-cols-[200px_1fr] gap-4 items-center">
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">{project.name}</p>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    {weeks.map((week, weekIdx) => (
                                        <div key={weekIdx} className="grid grid-cols-7 gap-1 h-8">
                                            {project.tasks
                                                .filter(task => task.week === weekIdx + 1)
                                                .map((task, taskIdx) => (
                                                    <div
                                                        key={taskIdx}
                                                        className={`${task.color} rounded-lg shadow-neumorphism-sm flex items-center justify-center relative ${task.striped ? 'bg-striped' : ''
                                                            }`}
                                                        style={{
                                                            gridColumn: `${task.start} / span ${task.duration}`,
                                                        }}
                                                    >
                                                        {task.name && (
                                                            <span className="text-xs text-gray-700">{task.name}</span>
                                                        )}
                                                        {taskIdx === 0 && (
                                                            <div className="absolute right-1 w-2 h-2 bg-gray-800 rounded-full"></div>
                                                        )}
                                                    </div>
                                                ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {project.tasks.map((task, taskIdx) => (
                                task.name && (
                                    <div key={taskIdx} className="grid grid-cols-[200px_1fr] gap-4 items-center mt-2">
                                        <div className="pl-4">
                                            <p className="text-xs text-gray-500">{task.name}</p>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GanttChart;
