# AI Food & Health Scanner

## Overview
A modern responsive AI-powered web application that helps users understand the health impact of the food they eat. It features:
- **Food Scanner**: Analyzes food images and provides nutritional info (Mock AI).
- **BMI Calculator**: Calculates Body Mass Index with health advice.
- **Modern UI**: Clean, responsive design with smooth animations.

## Tech Stack
- **Frontend**: React + Vite
- **Language**: TypeScript
- **Styling**: Vanilla CSS (CSS Variables + Flexbox/Grid)
- **Icons**: Lucide React

## Setup & Run Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the root directory and add your Groq API key:
   ```env
   VITE_GROQ_API_KEY=your_api_key_here
   ```
   *You can get a free API key from the [Groq Console](https://console.groq.com/keys).*

3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment
This project is ready for deployment on Vercel, Netlify, or similar platforms.
1. Push this code to a GitHub repository.
2. Import the repository in Vercel/Netlify.
3. The build command `npm run build` and output directory `dist` will be automatically detected.
