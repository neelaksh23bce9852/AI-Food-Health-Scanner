import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scan, Upload, CloudLightning, ArrowLeft } from 'lucide-react';

interface FoodInfo {
    name: string;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    healthRating: 'Healthy' | 'Moderate' | 'Avoid';
    advice: string;
}

const MOCK_DB: FoodInfo[] = [
    { name: 'Apple', calories: 52, protein: 0.3, fat: 0.2, carbs: 14, healthRating: 'Healthy', advice: 'Great source of fiber and vitamin C!' },
    { name: 'Burger', calories: 563, protein: 26, fat: 32, carbs: 44, healthRating: 'Avoid', advice: 'High in saturated fats. Consider a leaner option or smaller portion.' },
    { name: 'Pizza Slice', calories: 285, protein: 12, fat: 10, carbs: 36, healthRating: 'Moderate', advice: 'Okay in moderation, but watch out for sodium and grease.' },
    { name: 'Green Salad', calories: 20, protein: 1.5, fat: 0.2, carbs: 3, healthRating: 'Healthy', advice: 'Perfect choice! Add lean protein for a complete meal.' },
    { name: 'Avocado Toast', calories: 190, protein: 4, fat: 12, carbs: 18, healthRating: 'Healthy', advice: 'Rich in healthy fats and fiber.' },
];

import { useFoodContext } from '../contexts/FoodContext';

export default function ScanFood() {
    const navigate = useNavigate();
    const { setLastScannedFood } = useFoodContext();
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<FoodInfo | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                setResult(null); // Reset result on new upload
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeFood = () => {
        if (!image) return;
        setLoading(true);

        // Simulate AI processing delay
        setTimeout(() => {
            const randomFood = MOCK_DB[Math.floor(Math.random() * MOCK_DB.length)];
            setResult(randomFood);
            setLastScannedFood(randomFood.name);
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="container scan-page">
            <button className="back-btn" onClick={() => navigate('/')}>
                <ArrowLeft size={20} /> Back
            </button>

            <div className="scan-header fade-in">
                <h1>Scan Your Food</h1>
                <p>Upload an image to get instant nutrition insights.</p>
            </div>

            <div className="scan-content card fade-in delay-1">
                {!image ? (
                    <div className="upload-box" onClick={() => document.getElementById('file-input')?.click()}>
                        <Upload size={48} className="upload-icon" />
                        <p>Click or Drag to Upload Image</p>
                        <input
                            type="file"
                            id="file-input"
                            accept="image/*"
                            onChange={handleImageUpload}
                            hidden
                        />
                    </div>
                ) : (
                    <div className="preview-section">
                        <img src={image} alt="Uploaded food" className="preview-image" />
                        {!result && !loading && (
                            <div className="actions">
                                <button className="btn btn-secondary" onClick={() => setImage(null)}>Retake</button>
                                <button className="btn btn-primary" onClick={analyzeFood}>
                                    <Scan size={18} style={{ marginRight: 8 }} />
                                    Analyze Food
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {loading && (
                    <div className="loading-overlay">
                        <div className="spinner"></div>
                        <p>Analyzing visuals...</p>
                    </div>
                )}

                {result && (
                    <div className="result-card fade-in">
                        <div className={`rating-badge ${result.healthRating.toLowerCase()}`}>
                            {result.healthRating}
                        </div>
                        <h2>{result.name}</h2>

                        <div className="macros-grid">
                            <div className="macro-item">
                                <span className="macro-val">{result.calories}</span>
                                <span className="macro-label">Calories</span>
                            </div>
                            <div className="macro-item">
                                <span className="macro-val">{result.protein}g</span>
                                <span className="macro-label">Protein</span>
                            </div>
                            <div className="macro-item">
                                <span className="macro-val">{result.fat}g</span>
                                <span className="macro-label">Fat</span>
                            </div>
                            <div className="macro-item">
                                <span className="macro-val">{result.carbs}g</span>
                                <span className="macro-label">Carbs</span>
                            </div>
                        </div>

                        <div className="health-advice">
                            <h3>Health Advice</h3>
                            <p>{result.advice}</p>
                        </div>

                        <button className="btn btn-secondary" onClick={() => { setImage(null); setResult(null); }}>
                            Scan Another
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
