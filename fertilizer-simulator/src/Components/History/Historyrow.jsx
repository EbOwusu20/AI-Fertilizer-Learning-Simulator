import Button from '../common/Button'

const Historyrow = ({ record }) => {

    return (

        <tr className='border-b hover:bg-gray-50'>
            <td className='p-4'>{record.date}</td>
            <td className='p-4'>{record.crop}</td>
            <td className='p-4'>{record.fertilizer}</td>
            <td className='p-4'>{record.yield}</td>
            <td className='p-4'>{record.yield}</td>
            <td className='p-4'><Button>View </Button></td>
        </tr>
    )
}

export default Historyrow
