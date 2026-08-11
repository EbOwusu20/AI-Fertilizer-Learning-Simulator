import React from 'react'

const ToggleSwitch = ({ label, onChange, checked, description }) => {

    return (
        <div className='flex justify-between items-center'>
            <div>

                <p className='font-medium text-gray-800'>{label}</p>

                {description && (
                    <p className='text-sm text-gray-500'>{description}</p>
                )}
            </div>

            <label className='relative inline-flex cursor-pointer items-center'>

                <input
                    type="text"
                    checked={checked}
                    onChange={onChange}
                    className='sr-only peer' />

                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-600
            after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white 
            after:w-5 after:h-5 after:rounded-full after:transition-all peer-checked:after:translate-x-5"
                />
            </label>
        </div>
    )
}

export default ToggleSwitch
