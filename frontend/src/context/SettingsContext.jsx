import { createContext, useContext, useEffect, useMemo, useState } from "react";

const SettingsContext = createContext(null);

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("fertisim_theme");
  if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system") {
    return savedTheme;
  }
  return "system";
};

const getInitialNotifications = () => {
  try {
    const saved = JSON.parse(localStorage.getItem("fertisim_notifications"));
    if (saved && typeof saved === "object") {
      return {
        enabled: saved.enabled !== false,
        simulationCompleted: saved.simulationCompleted !== false,
        recommendationsReady: saved.recommendationsReady !== false,
        email: saved.email === true,
      };
    }
  } catch {
    // Fall back to the defaults below when localStorage contains invalid data.
  }

  return {
    enabled: true,
    simulationCompleted: true,
    recommendationsReady: true,
    email: false,
  };
};

const applyTheme = (theme) => {
  const root = document.documentElement;
  const isDark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
};

export const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);
  const [notifications, setNotifications] = useState(getInitialNotifications);

  useEffect(() => {
    localStorage.setItem("fertisim_theme", theme);
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("fertisim_notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    if (theme !== "system") return undefined;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyTheme("system");

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const updateNotification = (key, value) => {
    setNotifications((current) => ({ ...current, [key]: value }));
  };

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      notifications,
      updateNotification,
    }),
    [theme, notifications]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettings must be used inside SettingsProvider");
  }

  return context;
};
