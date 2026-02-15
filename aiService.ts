const API_URL = 'http://localhost:3001/api/chat';

export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export const chatWithAI = async (messages: ChatMessage[]) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'AI service temporarily unavailable. Please try again.');
        }

        return await response.json();
    } catch (error) {
        console.error('AI Chat Error:', error);
        throw error;
    }
};

/**
 * High-level function to perform the 2-stage analysis
 * 1. Validate if image is food
 * 2. Analyze nutrition
 */
export const performFullAnalysis = async (imageDescription: string) => {
    // Stage 1: Validation
    const validationResponse = await chatWithAI([
        {
            role: 'system',
            content: 'You are an image classifier. Determine if the description of an image contains edible food. Reply ONLY with: FOOD or NOT_FOOD.'
        },
        {
            role: 'user',
            content: `Image filename: ${imageDescription}. Does this sound like it contains edible food?`
        }
    ]);

    const validationResult = validationResponse.choices[0].message.content.trim();

    if (validationResult.includes('NOT_FOOD')) {
        return { status: 'not_food' };
    }

    // Stage 2: Analysis
    const analysisResponse = await chatWithAI([
        {
            role: 'system',
            content: 'You are a nutrition expert. Analyze the food described and provide nutrition data in JSON format: { "calories": "...", "protein": "...", "carbs": "...", "fat": "...", "score": 0-100 }'
        },
        {
            role: 'user',
            content: `Analyze this food: ${imageDescription}`
        }
    ]);

    try {
        const content = analysisResponse.choices[0].message.content;
        const jsonMatch = content.match(/\{.*\}/s);
        const data = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

        if (data) {
            return { status: 'success', data };
        } else {
            throw new Error('Could not parse nutrition data');
        }
    } catch (e) {
        throw new Error('Failed to process nutrition data.');
    }
};
