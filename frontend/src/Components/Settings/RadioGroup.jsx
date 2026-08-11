import { useState } from "react";

const RadioGroup = ({
    title,
    options,
    value,
    onChange,
}) => {

    return (
        <div>
            <p className="font-medium text-gray-800 mb-3">{title}</p>

            <div className="space-y-2">
                {options.map((option) => (
                    <label
                        key={option.value}
                        className="flex items-center gap-3 cursor-pointer">

                        <input
                            type="radio"
                            name={title}
                            value={option.value}
                            checked={value === option.value}
                            onChange={(e) => onChange(e.target.value)}
                            className="accent-green-600" />

                        <span>{option.label}</span>

                    </label>
                ))}
            </div>

        </div>
    );
};

export default RadioGroup;