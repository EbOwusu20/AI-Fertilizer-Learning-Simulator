import SettingsCard from "../Components/Settings/SettingsCard";
import SectionTitle from "../Components/Settings/SectionTitle";
import RadioGroup from "../Components/Settings/RadioGroup";
import ToggleSwitch from "../Components/Settings/ToggleSwitch";
import PageHeader from "../Components/common/PageHeader";
import { useSettings } from "../context/SettingsContext";

const Settings = () => {
  const { theme, setTheme, notifications, updateNotification } = useSettings();

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
          ]}
        />
      </SettingsCard>

      <SettingsCard>
        <SectionTitle
          title="Notifications"
          description="Choose which notifications Fertilizer AI can send you."
        />

        <ToggleSwitch
          label="Enable Notifications"
          description="Allow Fertilizer AI to show in-app notifications."
          checked={notifications.enabled}
          onChange={(event) => updateNotification("enabled", event.target.checked)}
        />

        <ToggleSwitch
          label="Simulation Completed"
          description="Notify you when an AI fertilizer simulation is complete."
          checked={notifications.simulationCompleted}
          disabled={!notifications.enabled}
          onChange={(event) =>
            updateNotification("simulationCompleted", event.target.checked)
          }
        />

        <ToggleSwitch
          label="Recommendations Ready"
          description="Notify you when fertilizer recommendations are ready."
          checked={notifications.recommendationsReady}
          disabled={!notifications.enabled}
          onChange={(event) =>
            updateNotification("recommendationsReady", event.target.checked)
          }
        />

        <ToggleSwitch
          label="Email Notifications"
          description="Receive important simulation updates by email when available."
          checked={notifications.email}
          disabled={!notifications.enabled}
          onChange={(event) => updateNotification("email", event.target.checked)}
        />
      </SettingsCard>
    </div>
  );
};

export default Settings;
