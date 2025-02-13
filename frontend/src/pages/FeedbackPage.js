import React, {useState} from 'react';
import {sendFeedback} from "../api/api.js";

const FeedbackPage = () => {
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitFeedback = async (feedbackData) => {
        const response = await sendFeedback(feedbackData);

        if (!response.ok) {
            throw new Error('Failed to submit feedback');
        }

        return await response.json();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            await submitFeedback(feedback);
            setSubmitted(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="max-w-md mx-auto p-5 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Thank You!</h3>
                    <p className="text-gray-600">Your feedback has been submitted successfully.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-2xl w-1/2 p-5 bg-white rounded-lg shadow-md">
                <div className="mb-5">
                    <h2 className="text-xl font-semibold mb-4">Have any thoughts or suggestions?</h2>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {error && (
                        <div className="p-3 bg-red-100 border border-red-400 rounded text-red-700">
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="feedback" className="block text-sm font-medium mb-2">
                            Share them with us!
                        </label>
                        <textarea
                            id="feedback"
                            rows={4}
                            className="w-full p-3 border border-gray-300 rounded resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Tell us what you think about MarketMentor..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={!feedback || isSubmitting}
                            className={`px-4 py-2 bg-blue-600 text-white rounded 
                        ${!feedback || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FeedbackPage;