const ToggleSwitch = ({ label, onChange, checked, description, disabled = false }) => {
  return (
    <div className={`flex justify-between items-center gap-6 ${disabled ? "opacity-50" : ""}`}>
      <div>
        <p className="font-medium text-gray-800 dark:text-gray-100">{label}</p>

        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>

      <label className="relative inline-flex shrink-0 cursor-pointer items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only peer"
        />

        <div
          className="w-11 h-6 rounded-full bg-gray-300 dark:bg-gray-600 peer-checked:bg-green-600
          peer-focus-visible:ring-2 peer-focus-visible:ring-green-500 peer-focus-visible:ring-offset-2
          dark:peer-focus-visible:ring-offset-gray-900
          after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white
          after:w-5 after:h-5 after:rounded-full after:transition-all peer-checked:after:translate-x-5"
        />
      </label>
    </div>
  );
};

export default ToggleSwitch;
