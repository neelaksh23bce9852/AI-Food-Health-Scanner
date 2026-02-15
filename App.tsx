import React from 'react';
import ThreeBackground from './components/ThreeBackground';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Features from './sections/Features';
import ScannerPreview from './sections/ScannerPreview';
import ChatbotHighlight from './sections/ChatbotHighlight';
import Roadmap from './sections/Roadmap';
import BMIPreview from './components/BMIPreview';
import Footer from './sections/Footer';

function App() {
    return (
        <div className="relative min-h-screen">
            {/* 3D Ambient Background */}
            <ThreeBackground />

            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <main>
                <Hero />

                <div id="features">
                    <Features />
                </div>

                <div id="scanner">
                    <ScannerPreview />
                </div>

                <div id="chat">
                    <ChatbotHighlight />
                </div>

                <section className="py-24 px-4 bg-white/[0.01]">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-4xl font-bold mb-6">Track Your <span className="text-primary-cyan">Physical Evolution.</span></h2>
                            <p className="text-white/50 mb-8 leading-relaxed">
                                Our precision tools help you monitor key health indicators with clinical accuracy. Watch your progress in real-time as you optimize your nutrition and activity levels.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="glass-panel p-4">
                                    <div className="text-primary-cyan text-lg font-bold mb-1">Body Fat %</div>
                                    <div className="text-xs text-white/30">AI Visual Estimation</div>
                                </div>
                                <div className="glass-panel p-4">
                                    <div className="text-primary-violet text-lg font-bold mb-1">BMR</div>
                                    <div className="text-xs text-white/30">Basal Metabolic Rate</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <BMIPreview />
                        </div>
                    </div>
                </section>

                <Roadmap />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default App;
