import { useState } from "react";
import { FaCheck, FaTrash, FaEdit, FaTimes, FaSave } from "react-icons/fa";

const priorityColors = {
  high: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-700",
  medium:
    "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700",
  low: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-700",
};

const priorityLabels = {
  high: "🔴 High",
  medium: "🟡 Medium",
  low: "🟢 Low",
};

function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editPriority, setEditPriority] = useState(task.priority || "medium");

  const handleEdit = () => {
    if (editTitle.trim()) {
      onEdit(task.id, editTitle.trim(), editPriority);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 ${
        task.completed
          ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700"
          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600"
      } shadow-sm hover:shadow-md`}
    >
      {/* Left: Checkbox + Content */}
      <div className="flex-1 flex items-start sm:items-center gap-2 sm:gap-3 min-w-0">
        {/* ✅ Checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          style={{ marginLeft: "4px" }}
          className={`checkbox-btn !w-5 !h-5 sm:!w-6 sm:!h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 mt-0.5 sm:mt-0  ml-1 sm:ml-2 ${
            task.completed
              ? "bg-green-500 border-green-500"
              : "border-gray-300 dark:border-gray-600 hover:border-purple-500"
          }`}
        >
          {task.completed && (
            <FaCheck size={5} className="sm:text-sm text-white" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleEdit()}
                className="flex-1 min-w-[100px] px-2 sm:px-3 py-1 rounded-lg border-2 border-purple-400 dark:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
                autoFocus
              />
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                className="px-2 sm:px-3 py-1 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 text-sm sm:text-base"
              >
                <option value="high">🔴 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🟢 Low</option>
              </select>
            </div>
          ) : (
            <div>
              <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
                <p
                  className={`text-sm sm:text-base md:text-lg font-medium break-words ${
                    task.completed
                      ? "line-through text-gray-400 dark:text-gray-500"
                      : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {task.title}
                </p>
                <span
                  className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full border font-medium ${priorityColors[task.priority || "medium"]}`}
                >
                  {priorityLabels[task.priority || "medium"]}
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {task.createdAt} • {task.completed ? "Completed" : "Pending"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex gap-1 sm:gap-1.5 ml-7 sm:ml-0">
        {isEditing ? (
          <>
            <button
              onClick={handleEdit}
              className="p-1.5 sm:p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/50 transition-all duration-300"
            >
              <FaSave size={12} className="sm:text-sm" />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-1.5 sm:p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
            >
              <FaTimes size={12} className="sm:text-sm" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 sm:p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-all duration-300 opacity-60 group-hover:opacity-100"
            >
              <FaEdit size={12} className="sm:text-sm" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1.5 sm:p-2 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800/50 transition-all duration-300 opacity-60 group-hover:opacity-100"
            >
              <FaTrash size={12} className="sm:text-sm" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskItem;
