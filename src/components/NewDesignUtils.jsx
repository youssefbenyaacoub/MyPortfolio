import React from 'react';

export const THEME = {
    bg: '#030412',
    accent: '#00FFFF', // Aqua / Cyan
    textPrimary: '#F5F5F5',
    textSecondary: '#A3A3A3',
    glass: 'rgba(255, 255, 255, 0.05)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
    indigoGlow: 'rgba(99, 102, 241, 0.1)'
};

export const TYPO = {
    h1: "font-['Space_Grotesk',sans-serif] font-black uppercase tracking-tighter leading-[0.85]",
    h2: "font-['Space_Grotesk',sans-serif] font-bold uppercase tracking-tight text-[#F5F5F5]",
    body: "font-['Inter',sans-serif] font-normal leading-relaxed text-[#A3A3A3]",
    tag: "font-['JetBrains_Mono',monospace] text-[10px] font-bold tracking-widest uppercase"
};

export const GlassCard = ({ children, className = "" }) => (
    <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(0,255,255,0.1)] ${className}`}>
        {children}
    </div>
);

export const TechTag = ({ text }) => (
    <span className={`${TYPO.tag} px-2 py-1 bg-white/5 border border-white/10 rounded text-cyan-400/80`}>
        {text}
    </span>
);
