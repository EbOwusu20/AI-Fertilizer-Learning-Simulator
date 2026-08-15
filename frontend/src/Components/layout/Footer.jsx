import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors">
      <div className="px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
              <Leaf size={17} className="text-green-600 dark:text-green-400" />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Fertilizer AI
              </p>
              <p className="text-xs text-gray-400">Learning Simulator</p>
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            © 2026 AI Fertilizer Learning Simulator
          </p>

          <p className="text-xs text-gray-500 dark:text-gray-400">KNUST</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
