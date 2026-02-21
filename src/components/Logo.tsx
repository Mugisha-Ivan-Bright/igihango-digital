import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
        <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 20C20 14.4772 24.4772 10 30 10C35.5228 10 40 14.4772 40 20C40 25.5228 35.5228 30 30 30C24.4772 30 20 25.5228 20 20ZM40 20C40 14.4772 44.4772 10 50 10C55.5228 10 60 14.4772 60 20C60 25.5228 55.5228 30 50 30C44.4772 30 40 25.5228 40 20Z" stroke="#FFD700" strokeWidth="4" />
        </svg>
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold tracking-widest text-[#FFD700]">IGIHANGO</h1>
            <p className="text-xs tracking-[0.2em] text-white opacity-80 uppercase">Digital</p>
            <p className="text-[8px] mt-1 text-white opacity-60 italic">ihura rrambye ry'inshingano</p>
        </div>
    </div>
);
