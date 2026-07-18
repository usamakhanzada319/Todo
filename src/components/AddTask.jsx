import { useState } from "react";
import { FaPlus } from "react-icons/fa";

function AddTask({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), priority);
      setTitle("");
      setPriority("medium");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title..."
        className="flex-1 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-300 shadow-sm text-sm sm:text-base"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-300 shadow-sm text-sm sm:text-base"
      >
        <option value="high"> High</option>
        <option value="medium"> Medium</option>
        <option value="low"> Low</option>
      </select>

      <button
        type="submit"
        className="px-4 sm:px-6 py-2.5 sm:py-3 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white rounded-xl font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base whitespace-nowrap"
      >
        <FaPlus size={14} />
        Add Task
      </button>
    </form>
  );
}

export default AddTask;
