import React from "react";

const FearGreedIndex = () => {
    return (
        <div className="w-[750px] h-[310px] overflow-hidden relative">
            <iframe
                title="FearGreedIndex"
                src="https://feargreedmeter.com/fear-and-greed-index"
                className="w-[600px] h-[320px] absolute -top-[70px] -left-[10px] border-0"
                scrolling="no"
            />
        </div>
    )
}

export default FearGreedIndex;