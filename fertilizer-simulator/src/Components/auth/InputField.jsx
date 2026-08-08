

const InputField = ({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    name,
    required = true,
}) => {

    return (
        <div className="space-y-2">

            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full px-4 py-3 border border-gray-300 rounded-x outline-none transition
          focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />

        </div>
    );
};

export default InputField;