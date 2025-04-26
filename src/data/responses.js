const responseDatabase = {
    // General Knowledge
    "what is chatgpt": {
        response: "ChatGPT is an AI language model developed by OpenAI. It's designed to understand and generate human-like text based on the input it receives. It can answer questions, write content, and engage in conversations.",
        confidence: 0.95
    },
    
    "how does chatgpt work": {
        response: "ChatGPT works by using a large neural network trained on vast amounts of text data. It processes input text, understands the context, and generates relevant responses based on patterns it learned during training.",
        confidence: 0.90
    },

    // Technical Support
    "how to use chatgpt": {
        response: "To use ChatGPT, simply type your question or request in the chat box. The AI will process your input and provide a response. You can ask questions, request explanations, or engage in conversation.",
        confidence: 0.95
    },

    // Common Questions
    "hello": {
        response: "Hello! How can I assist you today?",
        confidence: 0.98
    },
    "hi": {
        response: "Hi there! How can I help you?",
        confidence: 0.98
    },
    "help": {
        response: "I'm here to help! You can ask me questions, request information, or engage in conversation. What would you like to know?",
        confidence: 0.95
    },

    // Error Messages
    "error": {
        response: "I apologize, but I couldn't find a specific answer to your question. Could you please rephrase or provide more details?",
        confidence: 0.85
    }
};

// Response Generator
const generateResponse = (input) => {
    // Convert input to lowercase and remove special characters
    const normalizedInput = input.toLowerCase().replace(/[^\w\s]/g, '');
    
    // Find the best matching response
    let bestMatch = null;
    let highestConfidence = 0;

    for (const [key, value] of Object.entries(responseDatabase)) {
        if (normalizedInput.includes(key) && value.confidence > highestConfidence) {
            bestMatch = value;
            highestConfidence = value.confidence;
        }
    }

    // If no match found, return error response
    if (!bestMatch) {
        return responseDatabase.error;
    }

    return bestMatch;
};

export { responseDatabase, generateResponse }; 