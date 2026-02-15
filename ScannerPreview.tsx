import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, Info, CheckCircle2, Upload, AlertCircle, RefreshCw, Loader2 } from 'lucide-react';
import Button from '../components/ui/Button';
import { chatWithAI } from '../services/aiService';

interface NutritionResult {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
    score: number;
}

const ScannerPreview: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [status, setStatus] = useState<'idle' | 'validating' | 'analyzing' | 'success' | 'error' | 'not_food'>('idle');
    const [result, setResult] = useState<NutritionResult | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setStatus('idle');
            setResult(null);
        }
    };

    const startScan = async () => {
        if (!file) return;

        setIsScanning(true);
        setStatus('validating');

        try {
            // PART 2 - STAGE 1: FOOD VALIDATION
            // Since we are using a text model (llama-3.1-8b), we "describe" the image based on its name 
            // or metadata to simulate the classifier for the hackathon demo.
            // In a real production app, you'd use a Vision model here.

            const description = file.name.toLowerCase();
            console.log(`[Frontend] Validating image: ${description}`);

            const validationResponse = await chatWithAI([
                {
                    role: 'system',
                    content: 'You are an image classifier. Determine if the description of an image contains edible food. Reply ONLY with: FOOD or NOT_FOOD.'
                },
                {
                    role: 'user',
                    content: `Image filename: ${description}. Does this sound like it contains edible food?`
                }
            ]);

            const validationResult = validationResponse.choices[0].message.content.trim();
            console.log(`[Frontend] Validation result: ${validationResult}`);

            if (validationResult.includes('NOT_FOOD')) {
                setStatus('not_food');
                setIsScanning(false);
                return;
            }

            // STAGE 2: FOOD ANALYSIS
            setStatus('analyzing');
            const analysisResponse = await chatWithAI([
                {
                    role: 'system',
                    content: 'You are a nutrition expert. Analyze the food described and provide nutrition data in JSON format: { "calories": "...", "protein": "...", "carbs": "...", "fat": "...", "score": 0-100 }'
                },
                {
                    role: 'user',
                    content: `Analyze this food: ${description}`
                }
            ]);

            try {
                const content = analysisResponse.choices[0].message.content;
                const jsonMatch = content.match(/\{.*\}/s);
                const data = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

                if (data) {
                    setResult(data);
                    setStatus('success');
                } else {
                    throw new Error('Could not parse nutrition data');
                }
            } catch (e) {
                console.error('Parsing error:', e);
                setStatus('error');
            }

        } catch (error: any) {
            console.error('Scan error:', error);
            setStatus('error');
        } finally {
            setIsScanning(false);
        }
    };

    const reset = () => {
        setFile(null);
        setPreview(null);
        setStatus('idle');
        setResult(null);
    };

    return (
        <section className="py-24 px-4 bg-white/[0.02] border-y border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

                {/* Left Side: Interactive Scanner UI */}
                <div className="w-full lg:w-1/2 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        animate={status === 'not_food' ? { x: [-10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.4 }}
                        className={`relative z-10 glass-panel-heavy p-6 aspect-square max-w-md mx-auto transition-colors duration-500 ${status === 'not_food' ? 'border-red-500/50 bg-red-500/5' :
                            status === 'success' ? 'border-primary-cyan/50' : 'border-white/10'
                            }`}
                    >
                        {/* Viewfinder / Upload Area */}
                        <div
                            onClick={() => !isScanning && fileInputRef.current?.click()}
                            className={`relative w-full h-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center overflow-hidden cursor-pointer transition-all ${isScanning ? 'border-primary-cyan/20' : 'border-white/10 hover:border-white/20'
                                }`}
                        >
                            <input
                                type="file"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                            />

                            {preview ? (
                                <div className="relative w-full h-full group">
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <p className="text-white text-sm font-medium">Click to change</p>
                                    </div>

                                    {isScanning && (
                                        <motion.div
                                            animate={{ top: ['0%', '100%', '0%'] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-cyan to-transparent z-20 shadow-[0_0_15px_rgba(0,242,255,0.8)]"
                                        />
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Upload size={48} className="text-white/20 mb-4" />
                                    <p className="text-white/40 text-sm font-medium">Drag & Drop or Click to Upload</p>
                                    <p className="text-white/20 text-[10px] uppercase mt-2">Support: JPG, PNG, WEBP</p>
                                </>
                            )}

                            {/* Status Overlay */}
                            <AnimatePresence>
                                {status === 'not_food' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-red-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center"
                                    >
                                        <AlertCircle size={48} className="text-red-500 mb-4" />
                                        <h3 className="text-xl font-bold text-white mb-2">Not Food Detected</h3>
                                        <p className="text-white/60 text-sm mb-6">This image does not appear to contain food. Please upload a clear photo of edible food.</p>
                                        <Button variant="outline" size="sm" onClick={reset} className="border-white/20">
                                            <RefreshCw size={14} className="mr-2" /> Retry
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Float UI Panels */}
                        {status === 'success' && result && (
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                className="absolute -right-8 top-12 glass-panel p-4 w-40 neon-glow-cyan"
                            >
                                <div className="text-[10px] text-white/40 mb-1 font-space uppercase">NUTRITION SCORE</div>
                                <div className="text-2xl font-bold font-space text-primary-cyan">{result.score}/100</div>
                                <div className="h-1 w-full bg-white/10 mt-2 overflow-hidden rounded-full">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${result.score}%` }}
                                        className="h-full bg-primary-cyan shadow-[0_0_10px_rgba(0,242,255,0.5)]"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {isScanning && (
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass-panel px-4 py-2 flex items-center gap-2 whitespace-nowrap">
                                <Loader2 size={16} className="text-primary-cyan animate-spin" />
                                <span className="text-[10px] font-bold tracking-widest uppercase">
                                    {status === 'validating' ? 'Checking if this is food...' : 'Analyzing nutrition...'}
                                </span>
                            </div>
                        )}
                    </motion.div>

                    {/* Background Glow */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] blur-[100px] -z-10 transition-colors duration-1000 ${status === 'not_food' ? 'bg-red-500/10' :
                        status === 'success' ? 'bg-primary-cyan/10' : 'bg-primary-cyan/5'
                        }`} />
                </div>

                {/* Right Side: Results & Actions */}
                <div className="w-full lg:w-1/2">
                    {!result && status !== 'not_food' ? (
                        <>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-cyan/10 border border-primary-cyan/20 text-primary-cyan text-xs font-medium mb-6">
                                <Scan size={14} />
                                <span>Production AI Pipeline</span>
                            </div>
                            <h2 className="text-4xl font-bold mb-6">Unprecedented Accuracy in Every <span className="text-primary-cyan">Scan.</span></h2>
                            <p className="text-white/50 mb-8 leading-relaxed">
                                Upload a photo to see our dual-stage AI in action. We first validate if the item is food, then perform a deep nutritional breakdown.
                            </p>
                            <Button
                                size="lg"
                                onClick={startScan}
                                disabled={!file || isScanning}
                                className="w-full sm:w-auto"
                            >
                                {isScanning ? 'Processing...' : 'Analyze Photo'}
                            </Button>
                        </>
                    ) : result ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex items-center gap-2 text-primary-cyan mb-2">
                                <CheckCircle2 size={20} />
                                <span className="text-sm font-bold uppercase tracking-widest">Analysis Complete</span>
                            </div>
                            <h2 className="text-4xl font-bold mb-8 capitalize">{file?.name.split('.')[0].replace(/[-_]/g, ' ')}</h2>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {[
                                    { label: 'Calories', value: result.calories, color: 'text-white' },
                                    { label: 'Protein', value: result.protein, color: 'text-primary-cyan' },
                                    { label: 'Carbs', value: result.carbs, color: 'text-primary-violet' },
                                    { label: 'Fat', value: result.fat, color: 'text-primary-blue' },
                                ].map((stat, i) => (
                                    <div key={i} className="glass-panel p-4 border-white/5">
                                        <div className="text-white/40 text-[10px] uppercase mb-1 tracking-widest">{stat.label}</div>
                                        <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="glass-panel p-6 mb-8 border-primary-cyan/20">
                                <div className="flex items-center gap-2 mb-3">
                                    <Info size={16} className="text-primary-cyan" />
                                    <span className="text-xs font-bold uppercase text-white/60">Health Insight</span>
                                </div>
                                <p className="text-sm text-white/80 leading-relaxed italic">
                                    "Based on your profile, this item provides a good balance of protein and slow-release carbohydrates. Recommended as a post-workout recovery meal."
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <Button size="md" onClick={reset} variant="secondary">Scan Another</Button>
                                <Button size="md">Save to Log</Button>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="py-12">
                            <h2 className="text-4xl font-bold mb-6 text-red-500/80">Validation Failed.</h2>
                            <p className="text-white/40 mb-8">Our AI determined the uploaded image is not a food item. To protect accuracy, we only process edible products.</p>
                            <Button onClick={reset} variant="outline" className="border-white/10">Try a different photo</Button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ScannerPreview;
