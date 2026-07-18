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

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 flex items-start justify-center">
      {/* ✅ Container - Bara + Responsive */}
      <div className="w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-14">
        {/* Card Container */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 xl:p-12 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center gap-3 sm:gap-0 mb-6 sm:mb-8">
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 flex items-center justify-center sm:justify-start gap-2">
                To-Do List
              </h1>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1 font-medium">
                Manage your daily tasks efficiently
              </p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 sm:p-4 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 dark:text-gray-300 hover:scale-110 hover:rotate-12 active:scale-95"
            >
              {darkMode ? (
                <FaSun size={22} className="text-yellow-500" />
              ) : (
                <FaMoon size={22} className="text-purple-600" />
              )}
            </button>
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

          {/* Footer Stats */}
          {tasks.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap justify-between items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <span>
                Total:{" "}
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {tasks.length}
                </span>
              </span>
              <span>
                Completed:{" "}
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {tasks.filter((t) => t.completed).length}
                </span>
              </span>
              <span>
                Pending:{" "}
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                  {tasks.filter((t) => !t.completed).length}
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
