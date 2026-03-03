import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Calendar, ChevronDown, Maximize2 } from 'lucide-react';

const data = [
    { day: 1, legend1: 20, legend2: 15 },
    { day: 2, legend1: 25, legend2: 20 },
    { day: 3, legend1: 30, legend2: 25 },
    { day: 4, legend1: 28, legend2: 30 },
    { day: 5, legend1: 35, legend2: 28 },
    { day: 6, legend1: 40, legend2: 35 },
    { day: 7, legend1: 38, legend2: 40 },
    { day: 8, legend1: 45, legend2: 38 },
    { day: 9, legend1: 42, legend2: 42 },
    { day: 10, legend1: 48, legend2: 45 },
    { day: 11, legend1: 35, legend2: 30 },
    { day: 12, legend1: 40, legend2: 35 },
    { day: 13, legend1: 38, legend2: 38 },
    { day: 14, legend1: 42, legend2: 40 },
    { day: 15, legend1: 45, legend2: 42 },
    { day: 16, legend1: 40, legend2: 45 },
    { day: 17, legend1: 38, legend2: 40 },
    { day: 18, legend1: 35, legend2: 38 },
    { day: 19, legend1: 32, legend2: 35 },
    { day: 20, legend1: 30, legend2: 32 },
    { day: 21, legend1: 28, legend2: 30 },
    { day: 22, legend1: 25, legend2: 28 },
];

const ProjectsChart = () => {
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
                    <h3 className="text-lg font-semibold text-gray-800">Projects</h3>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background shadow-neumorphism-sm text-sm text-gray-600">
                        <Calendar size={16} />
                        <span>23 Nov 22</span>
                        <ChevronDown size={16} />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background shadow-neumorphism-sm text-sm text-gray-600">
                        <span>View</span>
                        <ChevronDown size={16} />
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-background shadow-neumorphism-sm flex items-center justify-center">
                        <Maximize2 size={16} className="text-gray-600" />
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">TO</span>
                    <div className="px-3 py-1 rounded-lg bg-background shadow-neumorphism-inset">
                        <span className="text-sm font-semibold text-gray-800">38</span>
                    </div>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" vertical={false} />
                    <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                        ticks={[0, 10, 20, 30, 40, 50, 60, 70]}
                    />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="legend1"
                        stroke="#d1d5db"
                        strokeWidth={2}
                        dot={false}
                    />
                    <Line
                        type="monotone"
                        dataKey="legend2"
                        stroke="#9ca3af"
                        strokeWidth={2}
                        dot={{ fill: '#4F7FFF', r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>

            <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <span className="text-xs text-gray-500">Legend 1</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                    <span className="text-xs text-gray-500">Legend 2</span>
                </div>
            </div>
        </div>
    );
};

export default ProjectsChart;
