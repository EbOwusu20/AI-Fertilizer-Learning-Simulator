import { useAuth } from "../context/AuthContext";

import AvatarCard from "../Components/Profile/AvatarCard";
import ProfileInfo from "../Components/Profile/ProfileInfo";
import PageHeader from "../Components/common/PageHeader";

const Profile = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500">
                    Unable to load your profile.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            <div>
                <PageHeader
                    title="My Profile"
                    subtitle="View your account information"
                />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <AvatarCard
                    avatar={user.profile_image}
                    name={user.name}
                />
            </div>

            <div className="lg:col-span-2">
                <ProfileInfo user={user} />
            </div>

        </div>
    );
};

export default Profile;