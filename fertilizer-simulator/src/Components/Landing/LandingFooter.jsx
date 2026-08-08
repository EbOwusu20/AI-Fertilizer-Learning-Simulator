import { FaGithub } from "react-icons/fa6";
import { Mail, Leaf, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-950 text-gray-300">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">

            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <div className="w-11 h-11 rounded-xl bg-green-600 flex items-center justify-center">
                <Leaf
                  size={24}
                  className="text-white"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  Fertilizer AI
                </h2>

                <p className="text-xs text-gray-400">
                  Learning Simulator
                </p>
              </div>
            </Link>

            <p className="mt-6 text-gray-400 leading-relaxed max-w-md">
              Empowering sustainable farming through Artificial
              Intelligence. Explore fertilizer recommendations,
              simulate agricultural conditions, and learn how
              different factors influence crop performance.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">

              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="
                  w-10
                  h-10
                  rounded-lg
                  bg-gray-800
                  flex
                  items-center
                  justify-center
                  hover:bg-green-600
                  hover:text-white
                  transition
                "
              >
                <FaGithub size={20} />
              </a>

              <a
                href="mailto:your-email@example.com"
                aria-label="Email"
                className="
                  w-10
                  h-10
                  rounded-lg
                  bg-gray-800
                  flex
                  items-center
                  justify-center
                  hover:bg-green-600
                  hover:text-white
                  transition
                "
              >
                <Mail size={20} />
              </a>

            </div>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-white font-semibold text-lg mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <a
                  href="#about"
                  className="hover:text-green-400 transition"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="#features"
                  className="hover:text-green-400 transition"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#how"
                  className="hover:text-green-400 transition"
                >
                  How It Works
                </a>
              </li>

              <li>
                <a
                  href="#technology"
                  className="hover:text-green-400 transition"
                >
                  Technology
                </a>
              </li>

            </ul>

          </div>

          {/* Product */}
          <div>

            <h3 className="text-white font-semibold text-lg mb-5">
              Product
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/login"
                  className="hover:text-green-400 transition"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="hover:text-green-400 transition"
                >
                  Create Account
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-green-400 transition"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  to="/simulation"
                  className="hover:text-green-400 transition"
                >
                  New Simulation
                </Link>
              </li>

            </ul>

          </div>

        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">

        <div className="max-w-7xl mx-auto px-6 py-6">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-sm text-gray-500 text-center md:text-left">
              © 2026 AI Fertilizer Learning Simulator. All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-sm text-gray-500">

              <span>
                KNUST
              </span>

              <button
                onClick={scrollToTop}
                className="
                  flex
                  items-center
                  gap-2
                  hover:text-green-400
                  transition
                "
              >
                Back to top
                <ArrowUp size={16} />
              </button>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;