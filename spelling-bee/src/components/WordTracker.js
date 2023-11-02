import React from 'react';
import '../styles/WordTracker.css';

// This will display the user's number of correct words by difficulty
const WordTracker = ({ username, easyCount, mediumCount, hardCount }) => {
    // Get the max count so we can use it for scaling the chart
    const maxCount = Math.max(easyCount, mediumCount, hardCount);

    // Parameters of the bar chart
    const barWidth = 70; // width of each bar
    const barSpacing = 50; // space between bars
    const maxBarHeight = 300; // max height of the tallest bar
    const scale = maxBarHeight / maxCount; // scaling factor for bars

    // define the bars with labels, values, and colors
    const bars = [
        { label: 'Easy', value: easyCount, color: 'green' },
        { label: 'Medium', value: mediumCount, color: 'yellow' },
        { label: 'Hard', value: hardCount, color: 'red' },
    ];

    return (
        <div className = "word-tracker">
            <h2>{username}'s Correct Words</h2>
            <svg width={(barWidth + barSpacing) * bars.length} height={maxBarHeight + 40}>
                {bars.map((bar, index) => (
                    // create a group for each bar and its label
                    <g key={bar.label} transform={`translate(${index * (barWidth + barSpacing) + barSpacing/2}, 0)`}>
                        <rect 
                            width={barWidth} 
                            height={bar.value * scale} 
                            y={maxBarHeight - bar.value * scale} 
                            fill={bar.color}
                        ></rect>
                        <text 
                            x={barWidth / 2} 
                            y={maxBarHeight + 20} 
                            textAnchor="middle"
                        >
                            {`${bar.label}: ${bar.value}`}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
}

export default WordTracker;