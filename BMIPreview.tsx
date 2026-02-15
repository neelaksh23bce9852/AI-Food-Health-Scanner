import React, { useState } from 'react';
import Button from './ui/Button';
import { Calculator, ChevronRight } from 'lucide-react';

const BMIPreview: React.FC = () => {
    const [height, setHeight] = useState(180);
    const [weight, setWeight] = useState(75);

    const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

    const getBmiStatus = (val: number) => {
        if (val < 18.5) return { label: 'Underweight', color: 'text-blue-400' };
        if (val < 25) return { label: 'Healthy', color: 'text-primary-cyan' };
        if (val < 30) return { label: 'Overweight', color: 'text-yellow-400' };
        return { label: 'Obese', color: 'text-red-400' };
    };

    const status = getBmiStatus(parseFloat(bmi));

    return (
        <div className="glass-panel p-6 w-full max-w-md mx-auto relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary-cyan/10 flex items-center justify-center">
                    <Calculator className="text-primary-cyan" size={20} />
                </div>
                <h3 className="text-xl font-bold font-space">BMI CALCULATOR</h3>
            </div>

            <div className="space-y-6">
                <div>
                    <div className="flex justify-between mb-2">
                        <span className="text-xs text-white/40 uppercase tracking-widest">Height</span>
                        <span className="text-sm font-bold">{height} cm</span>
                    </div>
                    <input
                        type="range"
                        min="100" max="220"
                        value={height}
                        onChange={(e) => setHeight(parseInt(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary-cyan"
                    />
                </div>

                <div>
                    <div className="flex justify-between mb-2">
                        <span className="text-xs text-white/40 uppercase tracking-widest">Weight</span>
                        <span className="text-sm font-bold">{weight} kg</span>
                    </div>
                    <input
                        type="range"
                        min="30" max="150"
                        value={weight}
                        onChange={(e) => setWeight(parseInt(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary-cyan"
                    />
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                        <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">Your Result</div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold font-space text-white">{bmi}</span>
                            <span className={`text-xs font-bold uppercase ${status.color}`}>{status.label}</span>
                        </div>
                    </div>
                    <Button size="sm" variant="outline" className="h-10 w-10 p-0 rounded-xl border-white/10 text-white">
                        <ChevronRight size={18} />
                    </Button>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-primary-cyan/5 blur-3xl rounded-full" />
        </div>
    );
};

export default BMIPreview;
