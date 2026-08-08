import React from 'react'
import Card from '../common/Card'
import { Sprout } from 'lucide-react'
import ConfidenceBadge from './ConfidenceBadge'

const RecommendationCard = ({ fertilizer,
    confidence,
    expectedYield,
}) => {

    return (
        <Card className='p-6'>
            <div className='flex items-center justify-start'>
                <div>
                    <h2 className='text-gray-500 text-sm'>
                        Recommended Fertilizer
                    </h2>
                    <h1 className='text-3xl font-bold text-green-700 mt-2'>
                        {fertilizer}
                    </h1>
                    <p className='text-gray-500 mt-3'>
                        Expected Yield
                    </p>
                    <p className='text-xl font-semibold'>
                        {expectedYield}
                    </p>
                </div>

                <div className='flex flex-col items-end gap-4'>
                    <Sprout className='text-green-700 w-12 h-12' />
                    <ConfidenceBadge confidence={confidence} />
                </div>

            </div>
        </Card>
    )
}

export default RecommendationCard
