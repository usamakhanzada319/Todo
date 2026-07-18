import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete, onToggle, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 px-4 sm:py-16 md:py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <p className="text-base sm:text-lg md:text-xl text-gray-400 dark:text-gray-500 font-medium">
          No tasks yet
        </p>
        <p className="text-sm sm:text-base text-gray-400 dark:text-gray-500 mt-1">
          Add a new task to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2 sm:space-y-3 md:space-y-4 mt-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TaskList;
