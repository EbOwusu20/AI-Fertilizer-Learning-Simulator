import DashboardLayout from '../Components/layout/DashboardLayout'
import AvatarCard from '../Components/Profile/AvatarCard'
import ProfileCard from '../Components/Profile/ProfileCard'
import ProfileInfo from '../Components/Profile/ProfileInfo'
import PageHeader from '../Components/common/PageHeader'

import user from '../data/mockUser'


const Profile = () => {
    return (
            <div className='space-y-6'>
                <div>
                    <PageHeader
                        title="My Profile"
                        subtitle="View your account information" />
                </div>

                <div className='grid lg:grid-cols-3 gap-8'>
                    <AvatarCard
                        avatar={user.avatar}
                        name={user.name} />
                </div>

                <div className='lg-cols-span-2'>
                    <ProfileInfo user={user} />
                </div>

            </div>
    )
}

export default Profile
