import OpenAI from "openai";

// Check if API key is present and properly formatted
const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
if (!apiKey) {
  throw new Error('OpenAI API key is missing. Please add REACT_APP_OPENAI_API_KEY to your .env file');
}
if (!apiKey.startsWith('sk-')) {
  throw new Error('Invalid API key format. The key should start with "sk-"');
}

// Initialize OpenAI configuration
const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
  timeout: 60000, // 60 seconds timeout
});

// Maximum number of messages to keep in context
const MAX_CONTEXT_MESSAGES = 10;

// Initialize conversation history
let conversationHistory = [];

/**
 * Sends a message to OpenAI and gets the response
 * @param {string} message - The user's message
 * @returns {Promise<string>} - The AI's response
 */
export const sendMsgToOpenAI = async (message) => {
  if (!message || typeof message !== 'string') {
    throw new Error('Invalid message format. Message must be a non-empty string.');
  }

  try {
    // Add user message to history
    conversationHistory.push({ role: "user", content: message });

    // Keep only the last MAX_CONTEXT_MESSAGES messages
    if (conversationHistory.length > MAX_CONTEXT_MESSAGES) {
      conversationHistory = conversationHistory.slice(-MAX_CONTEXT_MESSAGES);
    }

    console.log('Sending request to OpenAI...'); // Debug log
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible."
        },
        ...conversationHistory
      ],
      temperature: 0.7,
      max_tokens: 1000, // Reduced for better reliability
      presence_penalty: 0.6,
      frequency_penalty: 0.6,
    });

    const aiResponse = completion.choices[0].message.content;
    conversationHistory.push({ role: "assistant", content: aiResponse });
    return aiResponse;

  } catch (error) {
    console.error("Detailed error:", error); // Debug log

    // Handle API errors
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.error?.message || error.message;
      
      switch (status) {
        case 401:
          throw new Error(`Authentication error: ${message}. Please check your API key.`);
        case 429:
          throw new Error(`Rate limit exceeded: ${message}. Please try again later.`);
        case 500:
          throw new Error(`OpenAI server error: ${message}. Please try again.`);
        default:
          throw new Error(`API error (${status}): ${message}`);
      }
    }

    // Handle network errors
    if (error.request) {
      throw new Error('Network error: Unable to reach OpenAI servers. Please check your internet connection.');
    }

    // Log the full error for debugging
    console.error('Full error object:', JSON.stringify(error, null, 2));
    throw new Error(`Unexpected error: ${error.message}`);
  }
};

/**
 * Clears the conversation history
 */
export const clearConversation = () => {
  conversationHistory = [];
};

/**
 * Gets the current conversation history
 * @returns {Array} - The conversation history
 */
export const getConversationHistory = () => {
  return [...conversationHistory];
};