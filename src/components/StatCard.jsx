import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ icon: Icon, title, amount, percentage, isPositive }) => {
    return (
        <div className="bg-background rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-neumorphism hover:shadow-neumorphism-sm transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
            <div className="flex items-start justify-between mb-2 sm:mb-3 md:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-background shadow-neumorphism-inset flex items-center justify-center">
                    <Icon size={16} className="text-gray-600 sm:w-5 sm:h-5" />
                </div>
                <div className="flex items-center gap-1">
                    {isPositive ? (
                        <TrendingUp size={14} className="text-success sm:w-5 sm:h-5" />
                    ) : (
                        <TrendingDown size={14} className="text-danger sm:w-5 sm:h-5" />
                    )}
                </div>
            </div>

            <div>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mb-0.5 sm:mb-1">{title}</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-0.5 sm:mb-1 md:mb-2">{amount}</p>
                <p className={`text-[10px] sm:text-xs md:text-sm font-medium ${isPositive ? 'text-success' : 'text-danger'}`}>
                    {isPositive ? '+' : ''}{percentage}
                </p>
            </div>
        </div>
    );
};

export default StatCard;
