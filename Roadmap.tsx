import React from 'react';
import { motion } from 'framer-motion';

const STEPS = [
    {
        title: 'Scan Food',
        description: 'Capture a photo of your meal or scan the ingredient label for instant identification.',
        tag: 'Step 01'
    },
    {
        title: 'Get Nutrition',
        description: 'Receive a molecular breakdown of macros, vitamins, and potential allergens.',
        tag: 'Step 02'
    },
    {
        title: 'Ask AI',
        description: 'Consult our health expert for advice on portions and metabolic optimization.',
        tag: 'Step 03'
    },
    {
        title: 'Improve Lifestyle',
        description: 'Track your progress and build habits that lead to a healthier, longer life.',
        tag: 'Step 04'
    }
];

const Roadmap: React.FC = () => {
    return (
        <section className="py-24 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-bold mb-4">How it Works</h2>
                    <p className="text-white/40">Four steps to a better understanding of your body.</p>
                </div>

                <div className="relative">
                    {/* Central Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-cyan via-primary-violet to-primary-blue opacity-30" />

                    <div className="space-y-24">
                        {STEPS.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                className={`flex items-center gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                            >
                                {/* Content */}
                                <div className={`w-1/2 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                    <div className="text-primary-cyan font-space text-xs tracking-widest mb-2">{step.tag}</div>
                                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                                    <p className="text-white/40 leading-relaxed">{step.description}</p>
                                </div>

                                {/* Dot */}
                                <div className="relative z-10 w-4 h-4 rounded-full bg-white border-4 border-black box-content shadow-[0_0_15px_rgba(255,255,255,0.5)]" />

                                {/* Empty Space for alignment */}
                                <div className="w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Roadmap;
