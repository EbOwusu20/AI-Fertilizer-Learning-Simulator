import Card from '../common/Card'

const AvatarCard = ({ avatar, name }) => {
    return (
        <Card className='flex flex-col items-center p-6'>
            <img
                src={avatar}
                alt={name}
                className='w-32 h-32 object-cover border-4 rounded-full border-green-600' />

            <h2 className='text-xl font-semibold mt-4'>{name}</h2>
        </Card>
    )
}

export default AvatarCard
