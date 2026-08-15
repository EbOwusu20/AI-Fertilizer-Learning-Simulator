import { useEffect, useRef, useState } from "react";

import {
  Bell,
  Leaf,
  UserCircle,
  Check,
  Menu,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useSettings } from "../../context/SettingsContext";

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();
  const { notifications } = useSettings();

  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
  }, []);

  const notificationItems = [
    notifications.simulationCompleted &&
      "Simulation completed notifications",

    notifications.recommendationsReady &&
      "Recommendation-ready notifications",

    notifications.email &&
      "Email notifications",
  ].filter(Boolean);

  const hasNotifications =
    notifications.enabled &&
    notificationItems.length > 0;

  return (
    <nav
      className="
        bg-white
        dark:bg-gray-900

        shadow-sm

        flex
        items-center
        justify-between

        border-b
        border-gray-200
        dark:border-gray-700

        px-4
        sm:px-6

        py-3

        transition-colors

        sticky
        top-0
        z-30
      "
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3 min-w-0">

        {/* Hamburger */}
        <button
          type="button"
          onClick={onMenuClick}
          className="
            lg:hidden
            p-2
            rounded-lg
            hover:bg-gray-100
            dark:hover:bg-gray-800
            transition
            shrink-0
          "
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Leaf className="text-green-600 w-7 h-7 sm:w-8 sm:h-8 shrink-0" />

        <div className="min-w-0">
          <h1 className="font-bold text-green-700 dark:text-green-400 text-lg sm:text-xl truncate">
            Fertilizer AI
          </h1>

          {/* Hide subtitle on very small screens */}
          <p className="hidden sm:block text-sm text-gray-500 dark:text-gray-400 truncate">
            Learning Simulator
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2 sm:gap-4">

        {/* Notifications */}
        <div
          className="relative"
          ref={menuRef}
        >
          <button
            type="button"
            onClick={() =>
              setOpen((current) => !current)
            }
            aria-label="Open notifications"
            aria-expanded={open}
            className="
              relative
              rounded-full
              p-2
              hover:bg-gray-100
              dark:hover:bg-gray-800
              transition
            "
          >
            <Bell
              className={`
                w-5 h-5
                sm:w-6 sm:h-6
                transition

                ${
                  notifications.enabled
                    ? "text-gray-700 dark:text-gray-200 hover:text-green-600"
                    : "text-gray-400 dark:text-gray-600"
                }
              `}
            />

            {hasNotifications && (
              <span
                className="
                  absolute
                  top-1
                  right-1
                  bg-red-500
                  rounded-full
                  w-2.5
                  h-2.5
                  border-2
                  border-white
                  dark:border-gray-900
                "
              />
            )}
          </button>

          {/* Notification dropdown */}
          {open && (
            <div
              className="
                absolute
                right-0
                mt-2

                w-[calc(100vw-2rem)]
                max-w-80

                bg-white
                dark:bg-gray-800

                border
                border-gray-200
                dark:border-gray-700

                rounded-xl
                shadow-xl

                z-50
                overflow-hidden
              "
            >
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Notifications
                  </h3>

                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {notifications.enabled
                      ? "Enabled"
                      : "Disabled"}
                  </span>
                </div>
              </div>

              <div className="p-4">
                {!notifications.enabled ? (
                  <div className="text-center py-4">
                    <Bell className="mx-auto w-8 h-8 text-gray-400 mb-2" />

                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Notifications are turned off.
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Turn them on from Settings.
                    </p>
                  </div>
                ) : notificationItems.length === 0 ? (
                  <div className="text-center py-4">
                    <Check className="mx-auto w-8 h-8 text-green-500 mb-2" />

                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      You have no notification categories enabled.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notificationItems.map((item) => (
                      <div
                        key={item}
                        className="
                          flex
                          items-start
                          gap-3
                          rounded-lg
                          bg-gray-50
                          dark:bg-gray-900/60
                          p-3
                        "
                      >
                        <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />

                        <p className="text-sm text-gray-700 dark:text-gray-200">
                          {item} are enabled.
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User */}
        <div className="flex items-center gap-2">

          {/* Avatar */}
          {user?.profile_image ? (
            <img
              src={user.profile_image}
              alt={user.name}
              className="
                w-8
                h-8
                sm:w-9
                sm:h-9
                rounded-full
                object-cover
                shrink-0
              "
            />
          ) : (
            <UserCircle
              className="
                w-8
                h-8
                sm:w-9
                sm:h-9
                text-green-700
                dark:text-green-400
                shrink-0
              "
            />
          )}

          {/* User information */}
          <div className="hidden sm:block max-w-32 lg:max-w-none">
            <h2 className="font-semibold text-gray-900 dark:text-white truncate">
              {user?.name || "User"}
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Student
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;