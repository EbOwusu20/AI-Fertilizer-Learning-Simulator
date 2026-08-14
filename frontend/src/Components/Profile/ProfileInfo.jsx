import Card from "../common/Card";

const ProfileInfo = ({ user }) => {
    const fields = [
        ["Full Name", user?.name || "Not provided"],
        ["Email", user?.email || "Not provided"],
        [
            "Authentication",
            user?.auth_provider === "google"
                ? "Google"
                : "Email & Password",
        ],
        [
            "Member Since",
            user?.created_at
                ? new Date(user.created_at).toLocaleDateString()
                : "Not available",
        ],
    ];

    return (
        <Card className="p-6">
            <h2 className="text-xl mb-6 font-semibold">
                Profile Information
            </h2>

            <div className="space-y-5">
                {fields.map(([label, value]) => (
                    <div key={label}>
                        <p className="text-sm text-gray-500">
                            {label}
                        </p>

                        <p className="font-medium">
                            {value}
                        </p>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default ProfileInfo;