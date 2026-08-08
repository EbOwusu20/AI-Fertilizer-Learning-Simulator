import React from 'react'

const Select = ({ label,
    options = [],
    value,
    onChange,
}) => {
    return (
        <div className='flex flex-col gap-2'>
            {label && (
                <label className='text-gray-700 font-medium'>{label}</label>
            )}
            <select value={value}
                onChange={onChange}
                className='border rounded-xl p-3'>
                <option value="">
                    Select an option
                </option>
                
                {options.map((option) =>
                    <option
                        key={option}
                        value={option}>
                        {option}
                    </option>
                )}

            </select>
        </div>
    )
}

export default Select
