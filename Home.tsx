import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="container center-page">
            <header className="home-header fade-in">
                <h1>AI Food & Health Scanner</h1>
                <p className="subtitle">
                    Your personal health assistant. Analyze your food instantly with AI and get personalized health insights.
                </p>
                <div className="action-buttons">
                    <Link to="/scan" className="btn btn-primary start-btn">
                        SCAN FOOD
                    </Link>
                    <Link to="/bmi" className="btn btn-secondary start-btn">
                        CALCULATE BMI
                    </Link>
                </div>
            </header>

            <section className="features-grid fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="card feature-card">
                    <h3>🌱 Smart Vision</h3>
                    <p>
                        Upload a photo of your meal and get instant nutritional breakdown.
                    </p>
                </div>
                <div className="card feature-card">
                    <h3>⚖️ BMI Tools</h3>
                    <p>
                        Calculate your Body Mass Index and track your progress.
                    </p>
                </div>
                <div className="card feature-card">
                    <h3>🥗 Health Tips</h3>
                    <p>
                        Receive simple, actionable advice for a healthier lifestyle.
                    </p>
                </div>
            </section>
        </div>
    );
}
