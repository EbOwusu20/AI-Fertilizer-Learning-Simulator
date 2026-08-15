const SectionTitle = ({ title, description }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        {title}
      </h2>

      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
