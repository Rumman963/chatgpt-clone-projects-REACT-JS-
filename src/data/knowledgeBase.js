export const knowledgeBase = {
    artificialIntelligence: {
        overview: {
            definition: "Artificial Intelligence (AI) is a branch of computer science that focuses on creating systems capable of performing tasks that typically require human intelligence, such as learning, reasoning, problem-solving, perception, and language understanding.",
            history: {
                timeline: [
                    "1950s: Birth of AI with Alan Turing's work",
                    "1960s: Development of first AI programs",
                    "1980s: Expert systems and machine learning",
                    "1990s: Neural networks and deep learning",
                    "2000s: Big data and advanced algorithms",
                    "2010s: Deep learning revolution",
                    "2020s: Large language models and generative AI"
                ]
            },
            types: [
                "Narrow AI (Weak AI)",
                "General AI (Strong AI)",
                "Superintelligent AI",
                "Machine Learning",
                "Deep Learning",
                "Natural Language Processing",
                "Computer Vision",
                "Robotics"
            ]
        },
        machineLearning: {
            definition: "Machine Learning is a subset of AI that enables systems to learn and improve from experience without being explicitly programmed.",
            types: [
                {
                    name: "Supervised Learning",
                    description: "Learning from labeled data to make predictions",
                    examples: ["Classification", "Regression"]
                },
                {
                    name: "Unsupervised Learning",
                    description: "Finding patterns in unlabeled data",
                    examples: ["Clustering", "Dimensionality Reduction"]
                },
                {
                    name: "Reinforcement Learning",
                    description: "Learning through trial and error with rewards",
                    examples: ["Game playing", "Robotics"]
                }
            ],
            algorithms: [
                "Linear Regression",
                "Logistic Regression",
                "Decision Trees",
                "Random Forests",
                "Support Vector Machines",
                "Neural Networks",
                "K-Means Clustering",
                "Principal Component Analysis"
            ]
        },
        deepLearning: {
            definition: "Deep Learning is a subset of machine learning that uses artificial neural networks with multiple layers to learn from data.",
            architectures: [
                {
                    name: "Convolutional Neural Networks (CNN)",
                    use: "Image recognition and processing"
                },
                {
                    name: "Recurrent Neural Networks (RNN)",
                    use: "Sequential data processing"
                },
                {
                    name: "Transformer",
                    use: "Natural language processing"
                },
                {
                    name: "Generative Adversarial Networks (GAN)",
                    use: "Generating synthetic data"
                }
            ],
            applications: [
                "Image Recognition",
                "Natural Language Processing",
                "Speech Recognition",
                "Autonomous Vehicles",
                "Medical Diagnosis",
                "Financial Forecasting"
            ]
        },
        naturalLanguageProcessing: {
            definition: "Natural Language Processing (NLP) is a branch of AI that focuses on the interaction between computers and human language.",
            components: [
                "Text Classification",
                "Named Entity Recognition",
                "Sentiment Analysis",
                "Machine Translation",
                "Text Generation",
                "Question Answering"
            ],
            models: [
                "BERT",
                "GPT",
                "T5",
                "RoBERTa",
                "XLNet"
            ]
        }
    },
    programming: {
        languages: {
            python: {
                description: "High-level, interpreted programming language known for its simplicity and readability",
                useCases: [
                    "Web Development",
                    "Data Science",
                    "Machine Learning",
                    "Automation",
                    "Scripting"
                ],
                frameworks: [
                    "Django",
                    "Flask",
                    "TensorFlow",
                    "PyTorch",
                    "Pandas"
                ]
            },
            javascript: {
                description: "High-level, interpreted programming language primarily used for web development",
                useCases: [
                    "Frontend Development",
                    "Backend Development",
                    "Mobile Development",
                    "Game Development"
                ],
                frameworks: [
                    "React",
                    "Angular",
                    "Vue",
                    "Node.js",
                    "Express"
                ]
            },
            java: {
                description: "Object-oriented programming language known for its portability and robustness",
                useCases: [
                    "Enterprise Applications",
                    "Android Development",
                    "Web Applications",
                    "Big Data"
                ],
                frameworks: [
                    "Spring",
                    "Hibernate",
                    "Android SDK",
                    "JavaFX"
                ]
            }
        },
        webDevelopment: {
            frontend: {
                technologies: [
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "React",
                    "Vue",
                    "Angular"
                ],
                concepts: [
                    "Responsive Design",
                    "Component Architecture",
                    "State Management",
                    "Routing",
                    "API Integration"
                ]
            },
            backend: {
                technologies: [
                    "Node.js",
                    "Python",
                    "Java",
                    "PHP",
                    "Ruby"
                ],
                concepts: [
                    "RESTful APIs",
                    "Database Management",
                    "Authentication",
                    "Security",
                    "Server Management"
                ]
            }
        },
        dataStructures: {
            basic: [
                "Arrays",
                "Linked Lists",
                "Stacks",
                "Queues",
                "Hash Tables"
            ],
            advanced: [
                "Trees",
                "Graphs",
                "Heaps",
                "Tries",
                "Segment Trees"
            ]
        },
        algorithms: {
            sorting: [
                "Bubble Sort",
                "Merge Sort",
                "Quick Sort",
                "Heap Sort",
                "Radix Sort"
            ],
            searching: [
                "Linear Search",
                "Binary Search",
                "Depth-First Search",
                "Breadth-First Search"
            ],
            optimization: [
                "Dynamic Programming",
                "Greedy Algorithms",
                "Backtracking",
                "Divide and Conquer"
            ]
        }
    },
    bestPractices: {
        coding: [
            "Write clean, readable code",
            "Use meaningful variable names",
            "Follow DRY (Don't Repeat Yourself) principle",
            "Write comprehensive comments",
            "Use version control",
            "Test your code thoroughly"
        ],
        aiDevelopment: [
            "Ensure data quality",
            "Consider ethical implications",
            "Validate model performance",
            "Monitor for bias",
            "Document model behavior",
            "Consider environmental impact"
        ]
    }
};

export const getKnowledgeResponse = (query) => {
    // This function can be used to search through the knowledge base
    // and return relevant information based on the query
    return {
        query,
        response: "Relevant information from knowledge base",
        sources: ["Knowledge Base"]
    };
}; 