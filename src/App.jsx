import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import useLocalStorages from "./hooks/useLocalStorages.js";
import AddTask from "./components/AddTask";
import SearchFilter from "./components/SearchFilter";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useLocalStorages("tasks", []);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const addTask = (title, priority = "medium") => {
    const newTask = {
      id: Date.now(),
      title,
      priority,
      completed: false,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
    setTasks([newTask, ...tasks]);
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const editTask = (id, newTitle, newPriority) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, title: newTitle, priority: newPriority || task.priority }
          : task,
      ),
    );
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()));

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 flex items-start justify-center">
      <div className="w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-14">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 xl:p-12 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300">
          {/* Header */}

          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center gap-3 sm:gap-0 mb-6 sm:mb-8">
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 flex items-center justify-center sm:justify-start gap-3">
                To-Do
              </h1>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1 font-medium flex items-center justify-center sm:justify-start gap-2">
                Stay organized, stay productive
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
              {/* Task Count Badge - Mobile par bhi show */}
              <div className="flex items-center gap-1 px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-700 dark:text-purple-300 text-sm font-medium">
                <span>{tasks.length}</span>
                <span className=" xs:inline">tasks</span>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-3 sm:p-4 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 dark:text-gray-300 border border-white/20 dark:border-gray-600/30 flex-shrink-0"
              >
                {darkMode ? (
                  <FaSun size={22} className="text-yellow-500" />
                ) : (
                  <FaMoon size={22} className="text-purple-600" />
                )}
              </button>
            </div>
          </div>

          {/* Add Task */}
          <div className="mb-4 sm:mb-5">
            <AddTask onAdd={addTask} />
          </div>

          {/* Search & Filter */}
          <div className="mb-4 sm:mb-5">
            <SearchFilter
              search={search}
              setSearch={setSearch}
              filter={filter}
              setFilter={setFilter}
            />
          </div>

          {/* Task List */}
          <TaskList
            tasks={filteredTasks}
            onDelete={deleteTask}
            onToggle={toggleComplete}
            onEdit={editTask}
          />

          {/* Footer Stats + Clear Completed */}
          {/* Footer Stats + Clear Completed */}
          {tasks.length > 0 && (
            <>
              <div className="mt-6 pt-4 border-t-2 border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-3">
                {/* Stats */}
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
                    Total
                    <span className="font-bold text-gray-700 dark:text-gray-300 ml-1">
                      {tasks.length}
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-green-100 dark:bg-green-900/30 px-3 py-1.5 rounded-full">
                    Done
                    <span className="font-bold text-green-600 dark:text-green-400 ml-1">
                      {completedCount}
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1.5 rounded-full">
                    Pending
                    <span className="font-bold text-yellow-600 dark:text-yellow-400 ml-1">
                      {tasks.length - completedCount}
                    </span>
                  </span>
                </div>

                {/* Clear Completed Button */}
                {completedCount > 0 && (
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete all ${completedCount} completed tasks?`,
                        )
                      ) {
                        setTasks(tasks.filter((task) => !task.completed));
                      }
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-xl font-medium transition-all duration-300 text-sm shadow-md hover:shadow-lg flex items-center gap-2 border border-white/20"
                  >
                    Clear Completed ({completedCount})
                  </button>
                )}
              </div>

              {/* Footer Bottom */}
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-center">
                <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 font-medium tracking-wide">
                  Made with <span className="text-red-500">❤</span> by Usama
                  Jameel
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
