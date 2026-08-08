import React from 'react'
import DashboardLayout from '../Components/layout/DashboardLayout'
import WelcomeCard from '../Components/Dashboard/WelcomeCard'
import StatCard from '../Components/Dashboard/StatCard'
import { Sprout, DollarSign, Activity, TrendingUp } from 'lucide-react'


const Dashboard = () => {
    return (
        <div>
            <WelcomeCard />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-6 gap-6">
                <StatCard
                    title="Simulations"
                    value="18"
                    icon={Sprout} />
                <StatCard
                    title="Average Yield"
                    value="6.8 T"
                    icon={TrendingUp} />
                <StatCard
                    title="Profit"
                    value="$12,500"
                    icon={DollarSign} />
                <StatCard
                    title="Accuracy"
                    value="95%"
                    icon={Activity} />
            </div>
        </div>
    )
}

export default Dashboard
