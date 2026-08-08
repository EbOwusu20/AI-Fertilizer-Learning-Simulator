import DashboardLayout from "../Components/layout/DashboardLayout"
import PageHeader from "../Components/common/PageHeader"
import Card from "../Components/common/Card"

const Help = () => {

    const faqs = [
        {
            question: "How do I run a simulation?",
            answer:
                "Navigate to the Simulation page, fill in the required farm data and click Run Simulation."
        },
        {
            question: "What crops are supported?",
            answer:
                "Maize, Rice, Cassava, Tomato and additional crops added by the system."
        },
        {
            question: "What does confidence mean?",
            answer:
                "Confidence indicates how certain the AI model is about its recommendation."
        }
    ]

    return (

        <div className="space-y-6">
            <PageHeader
                title="Help Center"
                subtitle="Frequently Asked Questions" />

            {faqs.map((faq) => (
                <Card
                    key={faq.question}
                    className="p-6">
                    <h2 className="font-semibold text-lg">{faq.question}</h2>
                    <p className="text-gray-600 mt-2">{faq.answer}</p>
                </Card>
            ))}

        </div>
    )
}

export default Help
