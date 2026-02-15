import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
        const variants = {
            primary: 'bg-primary-cyan text-black hover:bg-white neon-glow-cyan',
            secondary: 'bg-white/10 text-white backdrop-blur-md hover:bg-white/20 border border-white/10',
            outline: 'bg-transparent border border-primary-cyan/50 text-primary-cyan hover:bg-primary-cyan/10',
        };

        const sizes = {
            sm: 'px-4 py-2 text-sm',
            md: 'px-6 py-3 text-base',
            lg: 'px-8 py-4 text-lg font-semibold',
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                    'relative overflow-hidden rounded-full transition-all duration-300 font-medium flex items-center justify-center gap-2',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...(props as any)}
            >
                <span className="relative z-10">{children}</span>

                {/* Neon Ripple Effect */}
                <motion.div
                    className="absolute inset-0 bg-white/20 opacity-0"
                    whileTap={{ opacity: 1, scale: 2 }}
                    transition={{ duration: 0.5 }}
                />
            </motion.button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
