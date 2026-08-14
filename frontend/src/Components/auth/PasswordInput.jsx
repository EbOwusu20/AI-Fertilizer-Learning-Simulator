import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({
    label = "Password",
    name = "password",
    value,
    onChange,
    placeholder = "Enter your password",
}) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-2">

            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>

            <div className="relative">

                <input
                    id={name}
                    name={name}
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl outline-none
            transition focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />

                <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500
    hover:text-green-600"
>
                    {showPassword ? (
                        <EyeOff size={20} />
                    ) : (
                        <Eye size={20} />
                    )}
                </button>

            </div>

        </div>
    );
};

export default PasswordInput;