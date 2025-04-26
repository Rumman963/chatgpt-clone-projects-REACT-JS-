import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
});

export const sendMessage = async (messages) => {
    try {
        const response = await api.post('', {
            model: "gpt-3.5-turbo",
            messages: messages.map(msg => ({
                role: msg.role,
                content: msg.content
            })),
            temperature: 0.7,
            max_tokens: 1000,
        });

        return response.data.choices[0].message;
    } catch (error) {
        console.error('Error calling ChatGPT API:', error);
        throw new Error(error.response?.data?.error?.message || 'Failed to get response from ChatGPT');
    }
};

export const streamMessage = async function* (messages) {
    try {
        const response = await api.post('', {
            model: "gpt-3.5-turbo",
            messages: messages.map(msg => ({
                role: msg.role,
                content: msg.content
            })),
            temperature: 0.7,
            max_tokens: 1000,
            stream: true
        }, {
            responseType: 'stream'
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
        console.error('Error in stream:', error);
        throw new Error(error.response?.data?.error?.message || 'Failed to stream response from ChatGPT');
    }
}; 