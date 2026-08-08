import React from 'react'

const Input = ({ label,
    type = "text",
    placeholder,
    value,
    onChange
}) => {


    return (
        <div className='flex flex-col gap-2 width-full'>
            {label && <label className='font-medium text-gray-700'>{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className='border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-600'
            />
        </div>
    )
}

export default Input
