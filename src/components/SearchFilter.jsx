import { FaSearch } from "react-icons/fa";

function SearchFilter({ search, setSearch, filter, setFilter }) {
  const filters = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-4 mt-2 mb-4">
      {/* Search Input */}
      <div className="relative flex-1 w-full md:w-auto">
        <FaSearch className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm sm:text-base" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-1 sm:pl-1 pr-4 py-2.5 sm:py-3 md:py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-300 shadow-sm text-sm sm:text-base"
        />
      </div>

      {/* Filter Buttons - Fully Responsive */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 md:gap-2.5 w-full md:w-auto">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`flex-1 min-w-[60px] sm:flex-none px-3 sm:px-5 md:px-7 py-1.5 sm:py-2.5 md:py-3 rounded-xl font-medium transition-all duration-300 text-xs sm:text-sm md:text-base ${
              filter === f.id
                ? "bg-purple-600 text-white shadow-md border-2 border-purple-700"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 border-2 border-transparent"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchFilter;
