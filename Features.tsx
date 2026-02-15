import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import { Camera, BarChart3, MessageSquare, Calculator } from 'lucide-react';

const FEATURE_DATA = [
    {
        title: 'Food Scanner',
        description: 'Advanced computer vision detects macros and micronutrients instantly from any photo.',
        icon: Camera,
        color: 'cyan' as const,
    },
    {
        title: 'Nutrition Insights',
        description: 'Go beyond calories. Understand how specific foods impact your unique metabolism.',
        icon: BarChart3,
        color: 'violet' as const,
    },
    {
        title: 'AI Health Chatbot',
        description: 'Ask anything about your health or diet and get science-backed answers 24/7.',
        icon: MessageSquare,
        color: 'blue' as const,
    },
    {
        title: 'BMI Calculator',
        description: 'Precision physical metrics tracking with integrated health trend analysis.',
        icon: Calculator,
        color: 'cyan' as const,
    },
];

const Features: React.FC = () => {
    return (
        <section className="py-24 px-4 relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Smarter Tools for <span className="text-primary-cyan">Better Living</span>
                    </motion.h2>
                    <p className="text-white/50 max-w-2xl mx-auto">
                        Our platform combines cutting-edge AI with nutrition science to give you a complete picture of your health.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FEATURE_DATA.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card glowColor={feature.color} className="p-8 h-full">
                                <div className={`w-12 h-12 rounded-xl bg-primary-${feature.color}/10 flex items-center justify-center mb-6`}>
                                    <feature.icon className={`text-primary-${feature.color}`} size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
