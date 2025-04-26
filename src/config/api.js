const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://api.openai.com/v1',
  MODEL: process.env.REACT_APP_MODEL || 'gpt-3.5-turbo',
  MAX_TOKENS: parseInt(process.env.REACT_APP_MAX_TOKENS) || 1000,
  TEMPERATURE: parseFloat(process.env.REACT_APP_TEMPERATURE) || 0.7,
  PRESENCE_PENALTY: parseFloat(process.env.REACT_APP_PRESENCE_PENALTY) || 0,
  FREQUENCY_PENALTY: parseFloat(process.env.REACT_APP_FREQUENCY_PENALTY) || 0,
};

export default API_CONFIG; 