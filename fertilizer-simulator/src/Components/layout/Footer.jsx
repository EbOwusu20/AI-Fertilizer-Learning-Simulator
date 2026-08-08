import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">

      <div className="px-6 py-4">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* Brand */}
          <div className="flex items-center gap-2">

            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
              <Leaf
                size={17}
                className="text-green-600"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700">
                Fertilizer AI
              </p>

              <p className="text-xs text-gray-400">
                Learning Simulator
              </p>
            </div>

          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-500 text-center">
            © 2026 AI Fertilizer Learning Simulator
          </p>

          {/* Institution */}
          <p className="text-xs text-gray-500">
            KNUST
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;