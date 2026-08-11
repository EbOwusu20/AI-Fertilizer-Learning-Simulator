import React from 'react'

const StatCard = ({
    title,
    value,
    icon: Icon,
    color = "bg-green-600",
}) => {


    return (
        <div className="flex justify-between items-center bg-white rounded-2xl shadow-md p-6">
            <div>
                <p className="text-gray-500">{title}</p>
                <h2 className='text-3xl font-bold'>{value}</h2>
            </div>
            <div className={`${color} p-4 rounded-full text-white`}>
                <Icon className="w-7 h-7" />
            </div>
        </div>
    )
}

export default StatCard
