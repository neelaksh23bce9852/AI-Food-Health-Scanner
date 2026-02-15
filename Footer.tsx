import React from 'react';
import { Twitter, Github, Linkedin, Instagram, Activity } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="relative py-20 px-4 border-t border-white/5 bg-gradient-to-b from-transparent to-black">
            <div className="max-w-7xl mx-auto flex flex-col items-center">

                <div className="flex items-center gap-2 mb-8 group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-primary-cyan/10 border border-primary-cyan/20 flex items-center justify-center transition-all group-hover:scale-110 group-hover:neon-glow-cyan">
                        <Activity className="text-primary-cyan" size={24} />
                    </div>
                    <span className="text-xl font-bold font-space uppercase tracking-tight">AI FOOD <span className="text-primary-cyan">SCANNER</span></span>
                </div>

                <nav className="flex flex-wrap justify-center gap-8 mb-12">
                    {['Features', 'Scanner', 'Chatbot', 'About Us', 'Contact'].map((item) => (
                        <a key={item} href="#" className="text-sm text-white/40 hover:text-primary-cyan transition-colors">
                            {item}
                        </a>
                    ))}
                </nav>

                <div className="flex gap-6 mb-12">
                    {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
                        <a key={i} href="#" className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-primary-cyan transition-all hover:-translate-y-1 hover:neon-glow-cyan group">
                            <Icon size={20} className="text-white/40 group-hover:text-primary-cyan" />
                        </a>
                    ))}
                </div>

                <div className="text-center">
                    <p className="text-xs text-white/20 uppercase tracking-widest mb-2 font-medium">Built for Human Health Hackathon</p>
                    <p className="text-[10px] text-white/10">© 2026 AI Food & Health Scanner. All rights reserved.</p>
                </div>

            </div>

            {/* Background Ambience */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-cyan/20 to-transparent" />
        </footer>
    );
};

export default Footer;
