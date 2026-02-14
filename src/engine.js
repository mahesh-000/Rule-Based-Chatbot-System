/**
 * Enhanced Rule-Based Chatbot Engine
 * Implements priority scoring, randomization, and time-aware logic.
 */

export class ChatEngine {
    constructor(data) {
        this.intents = data.intents;
        this.fallbackResponse = data.fallback;
    }

    /**
     * Sanitizes user input for better matching
     */
    sanitize(input) {
        return input.toLowerCase().trim().replace(/[^\w\s]/gi, '');
    }

    /**
     * Finds the best matching response based on priority scoring
     */
    getResponse(userInput) {
        const processedInput = this.sanitize(userInput);

        if (!processedInput) return "Please say something!";

        let bestMatch = null;
        let maxScore = 0;

        for (const intent of this.intents) {
            let score = 0;

            for (const keyword of intent.keywords) {
                const lowerKeyword = keyword.toLowerCase();

                // Simple keyword cluster scoring
                if (lowerKeyword.includes(' ')) {
                    if (processedInput.includes(lowerKeyword)) {
                        score += 2; // Multi-word phrases get higher weight
                    }
                } else {
                    const regex = new RegExp(`\\b${lowerKeyword}\\b`, 'i');
                    if (regex.test(processedInput)) {
                        score += 1;
                    }
                }
            }

            if (score > maxScore) {
                maxScore = score;
                bestMatch = intent;
            }
        }

        if (bestMatch) {
            return this.processIntentResponse(bestMatch, userInput);
        }

        return this.fallbackResponse;
    }

    /**
     * Processes the matched intent, handles randomization and time-based logic
     */
    processIntentResponse(intent, originalInput) {
        const hour = new Date().getHours();
        const input = originalInput.toLowerCase();

        // Dynamic Time-Based Logic
        if (intent.intent === 'good_morning') {
            if (hour >= 12 && hour < 17) {
                return "You're a little late for morning, but hello anyway! Hope your afternoon is going well.";
            } else if (hour >= 17) {
                return "A bit late for a morning greeting! Good evening to you.";
            }
        }

        if (intent.intent === 'good_night') {
            if (hour > 6 && hour < 18) {
                return "Already? It's still daytime! But rest is important whenever you take it.";
            }
        }

        // Random Response Selection
        const randomIndex = Math.floor(Math.random() * intent.responses.length);
        let response = intent.responses[randomIndex];

        // Mood-based modification (Simple example)
        if (input.includes('sad') || input.includes('fail') || input.includes('stress')) {
            response = "I hear you... " + response;
        }

        return response;
    }
}
