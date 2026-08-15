import { User } from "lucide-react";
import Card from "../common/Card";

const AvatarCard = ({ avatar, name }) => {
    return (
        <Card className="flex flex-col items-center p-8">
            {avatar ? (
                <img
                    src={avatar}
                    alt={name}
                    className="w-32 h-32 object-cover border-4 rounded-full border-green-600"
                />
            ) : (
                <div className="w-32 h-32 rounded-full border-4 border-green-600 bg-green-50 dark:bg-green-950 flex items-center justify-center">
                    <User className="w-16 h-16 text-green-600" />
                </div>
            )}

            <h2 className="text-xl font-semibold mt-4 text-center">
                {name}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
                {avatar ? "Google Account" : "Account Profile"}
            </p>
        </Card>
    );
};

export default AvatarCard;