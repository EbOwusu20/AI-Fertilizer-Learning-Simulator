import React from 'react'

const ConfidenceBadge = ({ confidence }) => {
    let badgeColor = 'bg-green-100 text-red-700'

    if (confidence >= 90) {
        badgeColor = 'bg-green-100 text-green-700'
    }
    else if (confidence >= 70) {
        badgeColor = 'bg-yellow-100 text-yellow-700'
    }

    return (
        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${badgeColor}`}>
            {confidence}% Confidence

        </span>
    )
}

export default ConfidenceBadge
