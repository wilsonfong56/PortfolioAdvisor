import React, { useState } from 'react';
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { BaseMessage } from "@langchain/core/messages";

// Initialize LangChain ChatOpenAI
const chat = new ChatOpenAI({
    openAIApiKey: process.env.REACT_APP_OPENAI_API_KEY,
    streaming: false,
    modelName: 'gpt-4',
});

const ChatInterface = ({ portfolio, currentPrices }) => {
    const [messages, setMessages] = useState([
        {
            text: "Hi! I'm your portfolio assistant. I can help you analyze your portfolio and answer questions about your investments.",
            sender: 'bot',
        },
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const calculatePortfolioValue = () => {
        return portfolio
            .reduce((total, stock) => {
                return total + parseFloat(stock.shares) * parseFloat(currentPrices[stock.symbol.toUpperCase()]);
            }, 0)
            .toFixed(2);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const userMessage = {text: inputText, sender: 'user'};
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);
        let botResponse = "I'll help you analyze that.";
        const userQuery = inputText.toLowerCase();
        setInputText('');

        if (userQuery.includes('total value') || userQuery.includes('worth')) {
            botResponse = `Your portfolio's total value is $${calculatePortfolioValue()}.`;
        } else if (userQuery.includes('stocks') || userQuery.includes('holdings')) {
            botResponse = `You currently have ${portfolio.length} stocks in your portfolio: ${portfolio.map(stock => stock.symbol.toUpperCase()).join(', ')}.`;
        } else {
            const messages: BaseMessage[] = [
                new SystemMessage("You are a professional portfolio assistant and are qualified to give financial advice."),
                new HumanMessage(`Portfolio context (price shown is price bought): ${JSON.stringify(portfolio)}\n\nUser question: ${userQuery}`)
            ];
            const message = await chat.invoke(messages)
            botResponse = message.content
        }
        // Simulate API delay
        setTimeout(() => {
            setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
            setIsLoading(false);
        }, 1000);

    }

    return (
        <div className="bg-white rounded-lg shadow-md h-[500px] flex flex-col">
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
                        >
                            {message.text}
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