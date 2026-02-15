import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

console.log("[Backend] Initializing AI Health Scanner Server...");
const GROQ_API_KEY = process.env.VITE_GROQ_API_KEY;

if (!GROQ_API_KEY) {
    console.error("CRITICAL ERROR: VITE_GROQ_API_KEY is missing in .env file. The AI features will not work.");
} else {
    console.log("[Backend] Environment variables loaded successfully.");
}

app.post('/api/chat', async (req, res) => {
    if (!GROQ_API_KEY) {
        console.error("Groq API Key missing during request.");
        return res.status(500).json({ error: "Server configuration error: Missing API Key" });
    }

    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid request body. 'messages' array is required." });
    }

    console.log("Forwarding to Groq:", JSON.stringify(messages, null, 2));

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: messages,
                temperature: 0.3
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Groq API Error:", errorData);
            return res.status(response.status).json({ error: errorData?.error?.message || "Groq request failed" });
        }

        const data = await response.json();
        console.log("Groq Response:", JSON.stringify(data, null, 2));

        res.json(data);

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Groq API Key status: ${GROQ_API_KEY ? "Loaded" : "Missing"}`);
});
