import React from 'react';
import { Clock, ExternalLink } from 'lucide-react';

const NewsWidget = ({ newsItems }) => {
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="w-full h-full max-w-3xl">
            <div className="bg-white h-full rounded-lg shadow-lg p-6">
                <h2 className="font-bold mb-6">Market News</h2>
                <div className="space-y-6 h-[90%] overflow-y-auto">
                    {newsItems.map((item) => (
                        <div
                            key={item.id}
                            className="border-b border-gray-200 last:border-0 pb-6 last:pb-0 cursor-pointer"
                        >
                            <a
                                href={item.content.canonicalUrl.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block w-full h-full"
                            >
                                <div className="flex gap-4">
                                    {item.content.thumbnail && (
                                        <div className="flex-shrink-0">
                                            <img
                                                src={item.content.thumbnail.originalUrl}
                                                alt={item.content.title}
                                                className="w-32 h-24 object-cover rounded-lg"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4">
                                            <h3 className="font-semibold text-lg group-hover:text-blue-600 line-clamp-2">
                                                {item.content.title}
                                            </h3>
                                            <ExternalLink size={16}
                                                          className="flex-shrink-0 mt-1 text-gray-400 group-hover:text-blue-600"/>
                                        </div>

                                        <div
                                            className="flex flex-wrap items-center text-sm text-gray-500 mt-2 gap-x-4 gap-y-2">
                                            <span className="font-medium">{item.content.provider.displayName}</span>
                                            <div className="flex items-center space-x-1">
                                                <Clock size={14}/>
                                                <span>{formatDate(item.content.pubDate)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsWidget;