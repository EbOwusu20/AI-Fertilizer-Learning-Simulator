const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md rounded-2xl p-6 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
