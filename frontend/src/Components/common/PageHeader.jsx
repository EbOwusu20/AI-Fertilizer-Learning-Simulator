import React from 'react'

const PageHeader = ({ title, subtitle }) => {
    return (
        <div>
            <h2 className='text-3xl font-bold'>{title}</h2>
            <p className='text-gray-500 mt-1'>{subtitle}</p>

        </div>
    )
}

export default PageHeader
