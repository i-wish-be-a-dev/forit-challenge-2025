import React, { useState } from 'react';

// Usage: <TaskSearch tasks={tasks} renderTask={task => (...)} />
const TaskSearch = ({ tasks, renderTask }) => {
  const [search, setSearch] = useState('');

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase()) 
  );

  return (
    <>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search tasks..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul className="list-group">
        {filteredTasks.length === 0 ? (
          <li className="list-group-item text-muted">No tasks found</li>
        ) : (
          filteredTasks.map(task => renderTask(task))
        )}
      </ul>
    </>
  );
};

export default TaskSearch;