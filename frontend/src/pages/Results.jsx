import React from 'react'
import DashboardLayout from '../Components/layout/DashboardLayout'
import PredictionSummary from '../Components/Results/PredictionSummary'
import RecommendationCard from '../Components/Results/RecommendationCard'
import AdviceCard from '../Components/Results/AdviceCard'
import prediction from '../data/mockPrediction'


const Results = () => {
    return (
            <div className='space-y-8'>
                <RecommendationCard
                    fertilzer={prediction.fertilizer}
                    confidence={prediction.confidence}
                    expectedYield={prediction.expectedYield} />

                <div className='grid lg:grid-cols-2 gap-8'>
                    <PredictionSummary prediction={prediction} />
                    <AdviceCard advice={prediction.advice} />
                </div>

            </div>
    )
}

export default Results
