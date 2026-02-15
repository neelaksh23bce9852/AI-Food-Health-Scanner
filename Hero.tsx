import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { ArrowRight, Zap, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center z-10 max-w-5xl mx-auto"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-violet/10 border border-primary-violet/20 text-primary-violet text-sm font-medium mb-8"
                >
                    <Sparkles size={14} className="animate-pulse" />
                    <span>Next-Gen AI Nutrition Technology</span>
                </motion.div>

                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 leading-tight">
                    Scan Your <span className="text-gradient">Food.</span> <br />
                    Understand Your <span className="text-white relative">Health.
                        <motion.span
                            className="absolute -bottom-2 left-0 w-full h-1 bg-primary-cyan/30 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ delay: 1, duration: 1 }}
                        />
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Instantly decode nutrition labels and identify ingredients with our advanced AI scanner. Get real-time health guidance tailored for your body.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <Button size="lg" className="group">
                        Start Scanning
                        <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button variant="secondary" size="lg">
                        Try AI Chatbot
                        <Zap size={18} className="ml-1 text-primary-violet" />
                    </Button>
                </div>
            </motion.div>

            {/* Hero Stats */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-t border-white/5 pt-12"
            >
                {[
                    { label: 'Scans Performed', value: '1.2M+' },
                    { label: 'Nutrients Tracked', value: '850K' },
                    { label: 'AI Accuracy', value: '99.4%' },
                    { label: 'User Rating', value: '4.9/5' },
                ].map((stat, i) => (
                    <div key={i} className="text-center">
                        <div className="text-3xl font-space font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-white/40 uppercase tracking-widest">{stat.label}</div>
                    </div>
                ))}
            </motion.div>
        </section>
    );
};

export default Hero;
