const FeatureCard = ({
    icon,
    title,
    description,
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-md p-8 hover:-translate-y-2 transition">

            <div className="text-green-600 mb-5">
                {icon}
            </div>

            <h3 className="font-bold text-xl">
                {title}
            </h3>

            <p className="text-gray-600 mt-3">
                {description}
            </p>

        </div>
    );
};

export default FeatureCard;