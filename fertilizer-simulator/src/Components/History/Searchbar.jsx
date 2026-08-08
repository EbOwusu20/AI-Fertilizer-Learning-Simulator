import { Search, ChevronDown } from "lucide-react";

const Searchbar = ({ value, onChange, onFilterChange }) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 w-full">

            {/* Search Input */}
            <div className="relative flex-1">

                <Search
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 
          pointer-events-none"/>

                <input
                    type="text"
                    placeholder="Search by crop or fertilizer..."
                    value={value}
                    onChange={onChange}
                    className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 bg-white
            text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600
            focus:border-green-600 transition"/>

            </div>

            {/* Filter Dropdown */}
            <div className="relative w-full md:w-48">

                <select
                    onChange={onFilterChange}
                    className=" appearance-none w-full border border-gray-300 rounded-xl px-4 py-3 pr-10
            bg-white text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-600
            focus:border-green-600 transition"
                    defaultValue="all" >

                    <option value="all">
                        All Results
                    </option>

                    <option value="maize">
                        Maize
                    </option>

                    <option value="rice">
                        Rice
                    </option>

                    <option value="cassava">
                        Cassava
                    </option>

                    <option value="tomato">
                        Tomato
                    </option>
                </select>

                <ChevronDown
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400
           pointer-events-none"/>

            </div>
        </div>
    );
};

export default Searchbar;