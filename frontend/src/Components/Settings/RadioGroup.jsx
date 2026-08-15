const RadioGroup = ({ title, options, value, onChange }) => {
  return (
    <div>
      <p className="font-medium text-gray-800 dark:text-gray-100 mb-3">{title}</p>

      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-3 cursor-pointer text-gray-700 dark:text-gray-200"
          >
            <input
              type="radio"
              name={title}
              value={option.value}
              checked={value === option.value}
              onChange={(event) => onChange(event.target.value)}
              className="accent-green-600"
            />

            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
