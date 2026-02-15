import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Bot, Send, Sparkle, User, Loader2 } from 'lucide-react';
import { chatWithAI, ChatMessage } from '../services/aiService';

const ChatbotHighlight: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: 'assistant',
            content: "Hello! I'm your AI Health Coach. You can ask me anything about nutrition, meal planning, or how to reach your fitness goals. How can I help you today?"
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await chatWithAI([...messages, userMessage]);
            const aiMessage: ChatMessage = response.choices[0].message;
            setMessages(prev => [...prev, aiMessage]);
        } catch (error: any) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "AI service temporarily unavailable. Please try again."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="py-24 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-20">

                {/* Right Side: Real Chat UI */}
                <div className="w-full lg:w-1/2 relative">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel-heavy p-0 border-white/20 shadow-2xl overflow-hidden aspect-[4/3] flex flex-col"
                    >
                        {/* Chat Header */}
                        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-violet to-primary-blue flex items-center justify-center">
                                    <Bot size={18} className="text-white" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold font-space uppercase">AI HEALTH COACH</div>
                                    <div className="text-[10px] text-primary-cyan flex items-center gap-1">
                                        <span className={`w-1.5 h-1.5 rounded-full bg-primary-cyan ${isLoading ? 'animate-ping' : 'animate-pulse'}`} />
                                        {isLoading ? 'Thinking...' : 'Online & Ready'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div
                            ref={scrollRef}
                            className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar"
                        >
                            <AnimatePresence mode="popLayout">
                                {messages.map((msg, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-primary-cyan/10 border border-primary-cyan/20' : 'bg-primary-violet/20 border border-primary-violet/50'
                                            }`}>
                                            {msg.role === 'user' ? <User size={16} className="text-primary-cyan" /> : <Bot size={16} className="text-primary-violet" />}
                                        </div>
                                        <div className={`p-4 rounded-2xl text-sm max-w-[80%] ${msg.role === 'user'
                                            ? 'bg-white/5 border border-white/10 rounded-tr-none text-white/80'
                                            : 'bg-primary-violet/10 border border-primary-violet/20 rounded-tl-none text-white shadow-[0_0_20px_rgba(139,92,246,0.1)]'
                                            }`}>
                                            {msg.content}
                                        </div>
                                    </motion.div>
                                ))}
                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-primary-violet/20 border border-primary-violet/50 flex items-center justify-center">
                                            <Loader2 size={16} className="text-primary-violet animate-spin" />
                                        </div>
                                        <div className="bg-primary-violet/5 border border-white/5 p-4 rounded-2xl rounded-tl-none">
                                            <div className="flex gap-1">
                                                <span className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <span className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                                                <span className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Chat Input */}
                        <form onSubmit={handleSend} className="p-4 border-t border-white/10 mt-auto bg-black/20">
                            <div className="bg-white/5 border border-white/10 rounded-full pl-6 pr-2 py-2 flex items-center justify-between focus-within:border-primary-violet/50 transition-colors">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask your health assistant..."
                                    className="bg-transparent border-none outline-none text-sm text-white/80 w-full"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="p-2 rounded-full bg-primary-violet text-white hover:scale-110 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </form>
                    </motion.div>

                    {/* Background Aura */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-primary-violet/5 blur-[120px] -z-10 animate-glow-pulse" />
                </div>

                {/* Left Side: Copy */}
                <div className="w-full lg:w-1/2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-violet/10 border border-primary-violet/20 text-primary-violet text-xs font-medium mb-6">
                        <MessageCircle size={14} />
                        <span>24/7 Intelligent Guidance</span>
                    </div>
                    <h2 className="text-4xl font-bold mb-6">Your Personal <span className="text-primary-violet">Health Expert</span>, Always Online.</h2>
                    <p className="text-white/50 mb-8 max-w-lg leading-relaxed text-lg">
                        Our AI Chatbot utilizes the llama-3.1-8b engine to provide science-backed answers to your most pressing health questions.
                    </p>
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3">
                            <Sparkle size={18} className="text-primary-violet" />
                            <span className="text-sm text-white/70">Personalized Meal Recommendations</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Sparkle size={18} className="text-primary-violet" />
                            <span className="text-sm text-white/70">Scientific Breakdown of Ingredients</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Sparkle size={18} className="text-primary-violet" />
                            <span className="text-sm text-white/70">Metabolic Health Tracking Advice</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChatbotHighlight;
