import React from 'react'

const STATUS_STYLES = {
    Excellent: 'bg-green-100 text-green-700',
    Good: 'bg-green-100 text-green-700',
    Moderate: 'bg-yellow-100 text-yellow-700',
    Poor: 'bg-orange-100 text-orange-700',
    Critical: 'bg-red-100 text-red-700',
}

// Renders the backend's `environmental_status` (from calculator.classify_environment)
// e.g. "Excellent" | "Good" | "Moderate" | "Poor" | "Critical"
const StatusBadge = ({ status }) => {
    if (!status) return null

    const badgeColor = STATUS_STYLES[status] || 'bg-gray-100 text-gray-700'

    return (
        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${badgeColor}`}>
            {status}
        </span>
    )
}

export default StatusBadge
