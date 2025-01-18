import React, { useState } from 'react';
import OpenAI from "openai";
import { handleChat } from "../api/api.js";

// Initialize LangChain ChatOpenAI
const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

const ChatInterface = ({ portfolio, currentPrices }) => {
    const [messages, setMessages] = useState([
        {
            text: "Hi! I'm your portfolio assistant. I can help you analyze your portfolio and answer questions about your investments.",
            sender: 'bot',
        },
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // const calculatePortfolioValue = () => {
    //     return portfolio
    //         .reduce((total, stock) => {
    //             return total + parseFloat(stock.shares) * parseFloat(currentPrices[stock.symbol.toUpperCase()]);
    //         }, 0)
    //         .toFixed(2);
    // };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const userMessage = {text: inputText, sender: 'user'};
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);
        let botResponse;
        const userQuery = inputText.toLowerCase();
        setInputText('');
        let docContext = "";

        // Create embedding for the user query
        const embedding = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: userQuery,
            encoding_format: "float"
        });

        try {
            // Query Flask backend
            const payload = { embedding: embedding.data[0].embedding };
            const response = await handleChat(payload);

            const documents = await response.data;
            const docsMap = documents?.map(doc => doc.text);
            docContext = JSON.stringify(docsMap);
        } catch (error) {
            console.error(error);
        }

        // Constructing the template with context
        const template = {
            role: "system",
            content: `You are a professional portfolio assistant and are qualified to give specific financial advice related to the user's portfolio. 
            Use the context to enhance your understanding of stocks, finance, and market trends, focusing solely on personalized insights based on the user's existing portfolio and query. 
            If the context lacks specific information relevant to the user's query, provide advice based on the knowledge of financial markets, avoiding generic advice. 
            Avoid discussing unrelated topics such as broad economic indicators unless directly relevant to the user's portfolio or specific stocks.
            Format responses using markdown where applicable and don't return images.
        ----------------------
        START CONTEXT
        ${docContext}
        END CONTEXT
        ----------------------
        USER'S PORTFOLIO: Portfolio (w/ cost basis)-${JSON.stringify(portfolio)}; Current prices of stocks-${JSON.stringify(currentPrices)}
        USER QUERY: ${userQuery}
        ----------------------
        `
        };
        const filteredMessages = messages
            .filter(message => message.sender === 'user')
            .map(message => ({
                role: 'user',
                content: message.text
            }));

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            stream: false,
            messages: [template, ...filteredMessages]
        });

        botResponse = response.choices[0]?.message?.content || "I'm unable to provide a response at this time.";

        setTimeout(() => {
            setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
            setIsLoading(false);
        }, 1000);

    }

    function sanitizeHtml(input) {
        const allowedTags = ['strong', 'em', 'p', 'br']; // Customize allowed tags
        const parser = new DOMParser();
        const doc = parser.parseFromString(input, 'text/html');
        Array.from(doc.body.getElementsByTagName('*')).forEach(el => {
            if (!allowedTags.includes(el.tagName.toLowerCase())) {
                el.remove();
            }
        });
        return doc.body.innerHTML;
    }

    return (
        <div className="bg-white rounded-lg shadow-md h-[750px] flex flex-col">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Portfolio Assistant</h2>
            </div>

            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                                message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
                            }`}
                            dangerouslySetInnerHTML={{
                                __html: sanitizeHtml(message.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'))
                            }}
                        >
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                            Thinking...
                        </div>
                    </div>
                )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Ask about your portfolio..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatInterface;