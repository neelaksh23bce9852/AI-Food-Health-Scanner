import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: 'cyan' | 'violet' | 'blue';
}

const Card: React.FC<CardProps> = ({ children, className, glowColor = 'cyan' }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const glows = {
        cyan: 'group-hover:shadow-[0_0_30px_rgba(0,242,255,0.15)]',
        violet: 'group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]',
        blue: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]',
    };

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn(
                'group glass-panel transition-all duration-500 relative',
                glows[glowColor],
                className
            )}
        >
            <div
                style={{ transform: 'translateZ(50px)' }}
                className="relative z-10"
            >
                {children}
            </div>

            {/* Background glow trail */}
            <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />
        </motion.div>
    );
};

export default Card;
