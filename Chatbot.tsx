import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { useFoodContext } from '../contexts/FoodContext';
import { chatWithGroq, ChatMessage } from '../services/groq';

interface Message {
    id: string;
    role: 'user' | 'ai';
    text: string;
}

export default function Chatbot() {
    const { lastScannedFood } = useFoodContext();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 'start', role: 'ai', text: "Hi! I'm your AI Health Assistant. Ask me anything about food, calories, or healthy eating." }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            // Build context and history for API
            const historyForApi: ChatMessage[] = messages
                .filter(m => m.id !== 'start' && m.id !== 'error')
                .map(m => ({
                    role: m.role === 'user' ? 'user' : 'assistant',
                    content: m.text
                }));

            // Call Groq (Llama 3)
            const responseText = await chatWithGroq(userMsg.text, lastScannedFood, historyForApi);

            const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', text: responseText };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            setMessages(prev => [...prev, { id: 'error', role: 'ai', text: "I'm having trouble connecting to the AI right now. Please try again in a moment." }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <button
                    className="chatbot-trigger btn-primary shadow-lg"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open Chat"
                >
                    <MessageSquare size={24} />
                </button>
            )}

            {/* Chat Panel */}
            {isOpen && (
                <div className="chatbot-panel card shadow-xl fade-in">
                    <div className="chatbot-header">
                        <h3>Health Assistant</h3>
                        <button onClick={() => setIsOpen(false)} className="close-btn" aria-label="Close Chat">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="chatbot-messages" ref={scrollRef}>
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message ${msg.role}`}>
                                <div className="message-bubble">
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message ai">
                                <div className="typing-indicator">
                                    <span>.</span><span>.</span><span>.</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="chatbot-input">
                        <input
                            type="text"
                            placeholder={lastScannedFood ? `Ask about ${lastScannedFood}...` : "Ask a health question..."}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            disabled={isTyping}
                        />
                        <button onClick={handleSend} disabled={isTyping || !input.trim()} className="send-btn">
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
