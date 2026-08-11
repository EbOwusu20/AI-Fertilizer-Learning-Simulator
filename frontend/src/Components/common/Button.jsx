import React from 'react'

const Button = ({ children,
    onClick,
    type = 'button',
    variant = 'primary',
    className = "" }) => {

    const base =
        "px-6 py-4 rounded-xl font-semibold transition duration-300"
    const variants = {
        primary: "bg-green-700 hover:bg-green-800 text-white",
        secondary: "bg-white-200 border border-green-300 hover:bg-green-50 text-green-700",
        danger: "bg-red-600 hover:bg-red-700 text-white",
    }
    return (
        <div>
            <button
                type={type}
                onClick={onClick}
                className={`${base} ${variants[variant]} ${className}`}
            >
                {children}
            </button>
        </div>
    )
}

export default Button
