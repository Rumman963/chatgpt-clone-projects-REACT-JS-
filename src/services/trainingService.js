import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

const trainingService = {
    // Start training process
    async startTraining(trainingData) {
        try {
            const response = await axios.post(
                API_URL,
                {
                    model: "gpt-3.5-turbo",
                    messages: trainingData,
                    temperature: 0.7,
                    max_tokens: 1000
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_KEY}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Training error:', error);
            throw error;
        }
    },

    // Check training status
    async checkTrainingStatus(jobId) {
        try {
            const response = await axios.get(
                `https://api.openai.com/v1/fine-tunes/${jobId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${API_KEY}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Status check error:', error);
            throw error;
        }
    },

    // Evaluate model performance
    async evaluateModel(modelId, testData) {
        try {
            const results = await Promise.all(
                testData.map(async (item) => {
                    const response = await axios.post(
                        API_URL,
                        {
                            model: modelId,
                            messages: item.messages,
                            temperature: 0.7
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${API_KEY}`
                            }
                        }
                    );
                    return {
                        input: item.messages[0].content,
                        expected: item.messages[1].content,
                        actual: response.data.choices[0].message.content
                    };
                })
            );

            // Calculate metrics
            const metrics = this.calculateMetrics(results);
            return { results, metrics };
        } catch (error) {
            console.error('Evaluation error:', error);
            throw error;
        }
    },

    // Calculate evaluation metrics
    calculateMetrics(results) {
        let correct = 0;
        let total = results.length;
        let totalConfidence = 0;

        results.forEach(result => {
            if (result.expected === result.actual) {
                correct++;
            }
            // Calculate confidence based on similarity
            const similarity = this.calculateSimilarity(result.expected, result.actual);
            totalConfidence += similarity;
        });

        return {
            accuracy: correct / total,
            averageConfidence: totalConfidence / total,
            totalExamples: total
        };
    },

    // Calculate similarity between two strings
    calculateSimilarity(str1, str2) {
        const words1 = str1.toLowerCase().split(' ');
        const words2 = str2.toLowerCase().split(' ');
        const commonWords = words1.filter(word => words2.includes(word));
        return commonWords.length / Math.max(words1.length, words2.length);
    }
};

export default trainingService; 