import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Menu, X, ChevronRight } from 'lucide-react';
import Button from './ui/Button';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-8'}`}>
            <div className={`absolute inset-0 transition-opacity duration-300 -z-10 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 opacity-100' : 'opacity-0'}`} />

            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2 group cursor-pointer">
                    <div className={`rounded-lg bg-primary-cyan/10 border border-primary-cyan/20 flex items-center justify-center transition-all duration-300 ${scrolled ? 'w-8 h-8' : 'w-10 h-10'}`}>
                        <Activity className="text-primary-cyan" size={scrolled ? 18 : 24} />
                    </div>
                    <span className="text-xl font-bold font-space uppercase tracking-tight">AI FOOD <span className="text-primary-cyan">SCANNER</span></span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {['Features', 'Scanner', 'Chat', 'Pricing'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                            {item}
                        </a>
                    ))}
                    <Button size="sm">Get Started</Button>
                </div>

                {/* Mobile Toggle */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10"
                    >
                        <div className="px-6 py-8 flex flex-col gap-6">
                            {['Features', 'Scanner', 'Chat', 'Pricing'].map((item) => (
                                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-lg font-medium flex items-center justify-between group">
                                    {item}
                                    <ChevronRight size={18} className="text-primary-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            ))}
                            <Button className="w-full py-4">Get Started</Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
