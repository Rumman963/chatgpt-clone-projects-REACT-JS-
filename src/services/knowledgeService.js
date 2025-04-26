// AI Knowledge Base
const aiKnowledge = {
    "machine learning": {
        definition: "Machine learning is a subset of artificial intelligence that focuses on developing systems that can learn from and make decisions based on data.",
        types: [
            "Supervised Learning - Learning from labeled data",
            "Unsupervised Learning - Finding patterns in unlabeled data",
            "Reinforcement Learning - Learning through trial and error",
            "Deep Learning - Using neural networks with multiple layers"
        ],
        applications: [
            "Image Recognition - Identifying objects in images",
            "Natural Language Processing - Understanding human language",
            "Predictive Analytics - Forecasting future trends",
            "Recommendation Systems - Suggesting relevant content"
        ],
        common_algorithms: [
            "Linear Regression",
            "Decision Trees",
            "Random Forests",
            "Support Vector Machines",
            "Neural Networks"
        ]
    },
    "deep learning": {
        definition: "Deep learning is a subset of machine learning that uses artificial neural networks with multiple layers to model and understand complex patterns in data.",
        architectures: [
            "Convolutional Neural Networks (CNN) - For image processing",
            "Recurrent Neural Networks (RNN) - For sequential data",
            "Transformer Networks - For natural language processing",
            "Generative Adversarial Networks (GAN) - For generating new data"
        ],
        applications: [
            "Computer Vision - Object detection and classification",
            "Speech Recognition - Converting speech to text",
            "Language Translation - Translating between languages",
            "Autonomous Vehicles - Self-driving cars"
        ],
        frameworks: [
            "TensorFlow",
            "PyTorch",
            "Keras",
            "MXNet"
        ]
    },
    "natural language processing": {
        definition: "Natural Language Processing (NLP) is a branch of AI that focuses on the interaction between computers and human language.",
        techniques: [
            "Tokenization - Breaking text into words or sentences",
            "Named Entity Recognition - Identifying names and entities",
            "Sentiment Analysis - Determining emotional tone",
            "Machine Translation - Translating between languages"
        ],
        applications: [
            "Chatbots - Automated conversation systems",
            "Text Summarization - Creating concise summaries",
            "Language Translation - Translating text between languages",
            "Sentiment Analysis - Analyzing emotions in text"
        ],
        models: [
            "BERT",
            "GPT",
            "T5",
            "RoBERTa"
        ]
    },
    "artificial intelligence": {
        definition: "Artificial Intelligence (AI) is the simulation of human intelligence in machines that are programmed to think and learn like humans.",
        branches: [
            "Machine Learning",
            "Deep Learning",
            "Natural Language Processing",
            "Computer Vision",
            "Robotics"
        ],
        applications: [
            "Healthcare - Disease diagnosis and treatment planning",
            "Finance - Fraud detection and risk assessment",
            "Education - Personalized learning systems",
            "Transportation - Autonomous vehicles",
            "Entertainment - Content recommendation"
        ],
        ethical_considerations: [
            "Privacy concerns",
            "Bias in AI systems",
            "Job displacement",
            "Autonomous weapons",
            "Decision-making transparency"
        ]
    }
};

// Programming Knowledge Base
const programmingKnowledge = {
    "javascript": {
        definition: "JavaScript is a high-level, interpreted programming language that is one of the core technologies of the World Wide Web.",
        features: [
            "Dynamic Typing - Variables can hold any type of data",
            "Prototype-based Object Orientation - Objects inherit from other objects",
            "First-class Functions - Functions can be passed as arguments",
            "Event-driven Programming - Responding to user events"
        ],
        frameworks: [
            "React - UI library for building interfaces",
            "Angular - Full-featured framework for web apps",
            "Vue.js - Progressive framework for building UIs",
            "Node.js - Runtime for server-side JavaScript"
        ],
        best_practices: [
            "Use const and let instead of var",
            "Follow the DRY principle",
            "Write modular code",
            "Use proper error handling",
            "Follow consistent coding style"
        ]
    },
    "python": {
        definition: "Python is a high-level, interpreted programming language known for its simplicity and readability.",
        features: [
            "Dynamic Typing - No need to declare variable types",
            "Automatic Memory Management - Garbage collection",
            "Extensive Standard Library - Rich set of modules",
            "Multiple Programming Paradigms - OOP, functional, procedural"
        ],
        applications: [
            "Web Development - Django, Flask frameworks",
            "Data Science - NumPy, Pandas libraries",
            "Machine Learning - Scikit-learn, TensorFlow",
            "Automation - Scripting and task automation"
        ],
        popular_libraries: [
            "NumPy - Numerical computing",
            "Pandas - Data manipulation",
            "Matplotlib - Data visualization",
            "Scikit-learn - Machine learning",
            "TensorFlow - Deep learning"
        ]
    },
    "react": {
        definition: "React is a JavaScript library for building user interfaces, particularly single-page applications.",
        features: [
            "Component-based Architecture - Reusable UI components",
            "Virtual DOM - Efficient updates to the UI",
            "JSX Syntax - HTML-like syntax in JavaScript",
            "Unidirectional Data Flow - Predictable state management"
        ],
        concepts: [
            "Components - Building blocks of React apps",
            "Props - Passing data to components",
            "State - Managing component data",
            "Hooks - Reusing stateful logic",
            "Context - Sharing data between components"
        ],
        best_practices: [
            "Use functional components",
            "Implement proper state management",
            "Follow component composition",
            "Use proper error boundaries",
            "Optimize performance with memoization"
        ]
    }
};

export const searchKnowledgeBase = (query) => {
    const lowerQuery = query.toLowerCase();
    const results = [];

    // Search AI knowledge
    for (const [topic, info] of Object.entries(aiKnowledge)) {
        if (lowerQuery.includes(topic) || 
            topic.split(' ').some(word => lowerQuery.includes(word)) ||
            info.definition.toLowerCase().includes(lowerQuery)) {
            results.push({
                topic: topic,
                type: 'ai',
                information: info
            });
        }
    }

    // Search programming knowledge
    for (const [topic, info] of Object.entries(programmingKnowledge)) {
        if (lowerQuery.includes(topic) || 
            topic.split(' ').some(word => lowerQuery.includes(word)) ||
            info.definition.toLowerCase().includes(lowerQuery)) {
            results.push({
                topic: topic,
                type: 'programming',
                information: info
            });
        }
    }

    return {
        query: query,
        results: results
    };
};

export const formatResponse = (searchResults) => {
    if (searchResults.results.length === 0) {
        return "I don't have specific information about that topic in my knowledge base. Could you please rephrase your question or provide more details? I can help you with topics related to:\n\n" +
               "Artificial Intelligence:\n" +
               "- Machine Learning\n" +
               "- Deep Learning\n" +
               "- Natural Language Processing\n\n" +
               "Programming:\n" +
               "- JavaScript\n" +
               "- Python\n" +
               "- React";
    }

    let response = "Here's what I know about your query:\n\n";
    
    searchResults.results.forEach(result => {
        response += `Topic: ${result.topic}\n`;
        response += `Definition: ${result.information.definition}\n\n`;
        
        if (result.information.features) {
            response += "Key Features:\n";
            result.information.features.forEach(feature => {
                response += `- ${feature}\n`;
            });
            response += "\n";
        }

        if (result.information.applications) {
            response += "Common Applications:\n";
            result.information.applications.forEach(app => {
                response += `- ${app}\n`;
            });
            response += "\n";
        }

        if (result.information.types) {
            response += "Types:\n";
            result.information.types.forEach(type => {
                response += `- ${type}\n`;
            });
            response += "\n";
        }

        if (result.information.concepts) {
            response += "Key Concepts:\n";
            result.information.concepts.forEach(concept => {
                response += `- ${concept}\n`;
            });
            response += "\n";
        }

        if (result.information.best_practices) {
            response += "Best Practices:\n";
            result.information.best_practices.forEach(practice => {
                response += `- ${practice}\n`;
            });
            response += "\n";
        }

        if (result.information.frameworks) {
            response += "Popular Frameworks/Libraries:\n";
            result.information.frameworks.forEach(framework => {
                response += `- ${framework}\n`;
            });
            response += "\n";
        }
    });

    return response;
}; 