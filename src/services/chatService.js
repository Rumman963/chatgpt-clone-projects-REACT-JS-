import axios from 'axios';
import API_CONFIG from '../config/api';

const chatService = {
  // Initialize axios instance with default config
  api: axios.create({
    baseURL: API_CONFIG.BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    },
  }),

  // Send a single message and get response
  async sendMessage(messages) {
    try {
      const response = await this.api.post('/chat/completions', {
        model: API_CONFIG.MODEL,
        messages: messages,
        max_tokens: API_CONFIG.MAX_TOKENS,
        temperature: API_CONFIG.TEMPERATURE,
        presence_penalty: API_CONFIG.PRESENCE_PENALTY,
        frequency_penalty: API_CONFIG.FREQUENCY_PENALTY,
      });

      return response.data.choices[0].message;
    } catch (error) {
      this.handleError(error);
    }
  },

  // Stream messages for real-time response
  async *streamMessage(messages) {
    try {
      const response = await this.api.post('/chat/completions', {
        model: API_CONFIG.MODEL,
        messages: messages,
        max_tokens: API_CONFIG.MAX_TOKENS,
        temperature: API_CONFIG.TEMPERATURE,
        presence_penalty: API_CONFIG.PRESENCE_PENALTY,
        frequency_penalty: API_CONFIG.FREQUENCY_PENALTY,
        stream: true,
      }, {
        responseType: 'stream',
      });

      for await (const chunk of response.data) {
        const lines = chunk
          .toString('utf8')
          .split('\n')
          .filter(line => line.trim() !== '' && line.trim() !== 'data: [DONE]');

        for (const line of lines) {
          const message = line.replace(/^data: /, '');
          if (message) {
            try {
              const parsed = JSON.parse(message);
              const content = parsed.choices[0]?.delta?.content || '';
              if (content) {
                yield content;
              }
            } catch (error) {
              console.error('Error parsing streaming message:', error);
            }
          }
        }
      }
    } catch (error) {
      this.handleError(error);
    }
  },

  // Handle different types of errors
  handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const status = error.response.status;
      const data = error.response.data;

      switch (status) {
        case 401:
          throw new Error('Invalid API key. Please check your configuration.');
        case 429:
          throw new Error('Rate limit exceeded. Please try again later.');
        case 500:
          throw new Error('Server error. Please try again later.');
        default:
          throw new Error(data.error?.message || 'An error occurred while processing your request.');
      }
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from the server. Please check your internet connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(error.message || 'An error occurred while setting up the request.');
    }
  },

  // Format messages for API
  formatMessages(chatHistory) {
    return chatHistory.map(msg => ({
      role: msg.role,
      content: msg.content,
    }));
  },
};

export default chatService; 