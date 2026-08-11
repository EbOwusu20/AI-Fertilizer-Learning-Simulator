import Card from '../common/Card'
import { CheckCircle } from 'lucide-react'

const AdviceCard = ({ advice }) => {

    return (
        <card className='p-6'>
            <h2 className='text-xl font-semibold mb-5'>AI Recommendation</h2>
            <div className='space-y-4'>
                {advice.map((tip, index) => (
                    <div key={index} className='flex items-start gap-3'>
                        <CheckCircle className='text-green-700 mt-1' />
                        <p>{tip}</p>
                    </div>

                ))}

            </div>
        </card>
    )
}

export default AdviceCard
