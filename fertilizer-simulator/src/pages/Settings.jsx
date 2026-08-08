import { useState } from "react"
import SettingsCard from "../Components/Settings/SettingsCard"
import SectionTitle from "../Components/Settings/SectionTitle"
import RadioGroup from "../Components/Settings/RadioGroup"
import ToggleSwitch from "../Components/Settings/ToggleSwitch"
import PreferenceSelect from "../Components/Settings/PreferenceSelect"
import DashboardLayout from "../Components/layout/DashboardLayout"
import PageHeader from "../Components/common/PageHeader"


const Settings = () => {
    const [theme, setTheme] = useState('system');

    const [preferences, setPreferences] = useState({
        crop: "Maize",
        soil: "Loamy",
        notifications: "true",
        tip: "true"
    })


    return (
            <div className="space-y-6">

                <PageHeader
                    title="Settings"
                    subtitle="Manage your application preferences."
                />
                <SettingsCard>

                    <SectionTitle
                        title="Appearance"
                        description="Customize the look of the application."
                    />

                    <RadioGroup
                        title="Theme"
                        value={theme}
                        onChange={setTheme}
                        options={[
                            { label: "Light", value: "light" },
                            { label: "Dark", value: "dark" },
                            { label: "System", value: "system" },
                        ]} />

                </SettingsCard>

                <SettingsCard>
                    <SectionTitle
                        title="Simulation Preferences"
                        description="Set your default simulation options." />

                    <PreferenceSelect
                        label="Default Crop"
                        options={[
                            "Maize",
                            "Rice",
                            "Cassava",
                            "Tomato",
                        ]}
                        value={preferences.crop}
                        onChange={(e) =>
                            setPreferences({
                                ...preferences,
                                crop: e.target.value,
                            })} />

                    <PreferenceSelect
                        label="Default Soil"
                        options={[
                            "Loamy",
                            "Clay",
                            "Sandy",
                        ]}
                        value={preferences.soil}
                        onChange={(e) =>
                            setPreferences({
                                ...preferences,
                                soil: e.target.value,
                            })} />

                </SettingsCard>

                <SettingsCard>

                    <SectionTitle
                        title="Notifications"
                        description="Choose what notifications you receive."
                    />

                    <ToggleSwitch
                        label="Enable Notifications"
                        description="Receive updates about simulations."
                        checked={preferences.notifications}
                        onChange={(e) =>
                            setPreferences({
                                ...preferences,
                                notifications: e.target.checked,
                            })} />

                    <ToggleSwitch
                        label="Show Simulation Tips"
                        description="Display helpful tips while using the simulator."
                        checked={preferences.tips}
                        onChange={(e) =>
                            setPreferences({
                                ...preferences,
                                tips: e.target.checked,
                            })} />

                </SettingsCard>

            </div>
    )
}

export default Settings
