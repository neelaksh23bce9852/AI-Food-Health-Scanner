/**
 * groq.ts
 *
 * This service handles communication with the backend (which proxies Groq API).
 */

const API_KEY = import.meta.env.VITE_GROQ_API_KEY; // Only used for logging/debugging context if needed, but backend handles connection.
console.log("Frontend Mode. API Key Status:", API_KEY ? "Present" : "Missing (Should rely on Backend)");

// Point to local backend
const BACKEND_URL = "http://localhost:3001/api/chat";

export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

const SYSTEM_PROMPT = `You are a friendly AI nutrition assistant.
Give short, clear, beginner-friendly healthy food advice only.
Never give medical diagnosis.
Always end with one simple healthy tip.`;

/**
 * Sends a message to the Backend API and returns the response.
 * @param userMessage The text message from the user.
 * @param lastScannedFood The name of the last food item scanned (optional context).
 * @param history The conversation history (optional).
 * @returns The AI's response text.
 */
export async function chatWithGroq(
    userMessage: string,
    lastScannedFood: string | null = null,
    history: ChatMessage[] = []
): Promise<string> {
    try {
        // Construct system prompt with context
        let systemContent = SYSTEM_PROMPT;
        if (lastScannedFood) {
            systemContent += `\n\nContext: The user recently scanned "${lastScannedFood}". Tailor advice to this food if relevant.`;
        }

        const messages = [
            { role: 'system', content: systemContent },
            ...history,
            { role: 'user', content: userMessage }
        ];

        console.log("Sending to Backend:", messages);

        const response = await fetch(BACKEND_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages: messages
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Backend/Groq Error Response:", errorData);
            throw new Error(errorData?.error || `Request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log("Backend Response:", data);

        const reply = data.choices?.[0]?.message?.content;

        if (!reply) throw new Error("No content in response choices.");

        return reply;

    } catch (error) {
        console.error("Error communicating with Backend:", error);
        throw error;
    }
}
