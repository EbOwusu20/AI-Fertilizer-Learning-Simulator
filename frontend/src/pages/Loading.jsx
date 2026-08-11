import { LoaderCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

const Loading = () => {

    const messages = [
        "Analyzing Soil Nutrients...",
        "Calculating Fertility Score...",
        "Predicting Crop Yield...",
        "Generating AI Recommendation...",
    ]
    const [step, setStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) =>
                (prev + 1) % messages.length)

        }, 2000)
        return () => clearInterval(interval)

    }, [])


    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <LoaderCircle className='w-20 h-20 animate-spin text-green-700' />
            <h1 className='font-bold mt-8 text-4xl'>Running Simulation..</h1>
            <p className='text-gray-500 text-center max-w-md mt-4'>{messages[step]}</p>

        </div>
    )
}

export default Loading
