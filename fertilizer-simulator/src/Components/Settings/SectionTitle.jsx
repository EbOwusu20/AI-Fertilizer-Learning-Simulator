import React from 'react'

const SectionTitle = ({ title, description }) => {
    
    return (
        <div className="border-b pb-3">
            <h2 className="text-xl font-semibold text-gray-800">
                {title}
            </h2>

            {description && (
                <p className="text-sm text-gray-500 mt-1">
                    {description}
                </p>
            )}
        </div>
    )
}

export default SectionTitle
