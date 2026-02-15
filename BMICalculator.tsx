import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Scale, Ruler } from 'lucide-react';

export default function BMICalculator() {
    const navigate = useNavigate();
    const [height, setHeight] = useState<string>(''); // in cm
    const [weight, setWeight] = useState<string>(''); // in kg
    const [bmi, setBmi] = useState<number | null>(null);
    const [category, setCategory] = useState<string>('');
    const [advice, setAdvice] = useState<string>('');

    const calculateBMI = () => {
        const h = parseFloat(height);
        const w = parseFloat(weight);

        if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
            alert("Please enter valid positive numbers for height and weight.");
            return;
        }

        const heightInMeters = h / 100;
        const bmiValue = w / (heightInMeters * heightInMeters);
        const roundedBMI = parseFloat(bmiValue.toFixed(1));
        setBmi(roundedBMI);

        let cat = '';
        let adv = '';

        if (roundedBMI < 18.5) {
            cat = 'Underweight';
            adv = 'Consider consulting a nutritionist to gain weight healthily.';
        } else if (roundedBMI < 25) {
            cat = 'Normal Weight';
            adv = 'Good job! Maintain a balanced diet and regular exercise.';
        } else if (roundedBMI < 30) {
            cat = 'Overweight';
            adv = 'Aim for gradual weight loss through calorie deficit and activity.';
        } else {
            cat = 'Obese';
            adv = 'Highly recommended to see a doctor for personalized health plan.';
        }

        setCategory(cat);
        setAdvice(adv);
    };

    const getCategoryColor = (cat: string) => {
        if (cat === 'Normal Weight') return 'var(--primary-color)';
        if (cat === 'Underweight') return '#fca311'; // Orange
        if (cat === 'Overweight') return '#ff9f1c'; // Orange-Red
        return '#ef233c'; // Red
    };

    return (
        <div className="container bmi-page">
            <button className="back-btn" onClick={() => navigate('/')}>
                <ArrowLeft size={20} /> Back
            </button>

            <div className="bmi-header fade-in">
                <h1>BMI Calculator</h1>
                <p>Know your body mass index for a healthier you.</p>
            </div>

            <div className="bmi-content card fade-in delay-1">
                <div className="input-group">
                    <label>Height (cm)</label>
                    <div className="input-wrapper">
                        <Ruler size={18} className="input-icon" />
                        <input
                            type="number"
                            placeholder="e.g. 170"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label>Weight (kg)</label>
                    <div className="input-wrapper">
                        <Scale size={18} className="input-icon" />
                        <input
                            type="number"
                            placeholder="e.g. 70"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>
                </div>

                <button className="btn btn-primary calculate-btn" onClick={calculateBMI}>
                    Calculate BMI
                </button>

                {bmi !== null && (
                    <div className="result-section fade-in">
                        <div className="bmi-score">
                            <span className="score-label">Your BMI</span>
                            <span className="score-value" style={{ color: getCategoryColor(category) }}>
                                {bmi}
                            </span>
                        </div>

                        <div className={`category-badge`} style={{ backgroundColor: getCategoryColor(category), color: 'white' }}>
                            {category}
                        </div>

                        <p className="health-advice-text">
                            {advice}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
