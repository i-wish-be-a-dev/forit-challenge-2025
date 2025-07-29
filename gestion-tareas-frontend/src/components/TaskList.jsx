import React, { useState, useEffect } from 'react';

const TaskList = () => {
  const [filterState, setFilterState] = useState('all');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, [filterState]);

  const loadTasks = async () => {
    setError(null);
    
    try {
      let url = 'http://localhost:3000/api/tasks';
      
      if (filterState === 'completed') {
        url += '/state/1';
      } else if (filterState === 'pending') {
        url += '/state/0';
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

 

  const data = await response.json();
  // Maneja ambos casos de respuesta del backend
  let tasksArray = [];
  if (Array.isArray(data)) {
    tasksArray = data;
  } else if (Array.isArray(data.tasks)) {
    tasksArray = data.tasks;
  } else if (Array.isArray(data.task)) {
    tasksArray = data.task;
  }
  setTasks(tasksArray);
  console.log('Tasks loaded successfully:', tasksArray);

  } catch (error) {
    console.error('Error loading tasks:', error);
    setError('Failed to load tasks. Please try again.');
  } 
  };

  return (
    <>
      <div className="mb-3">
        <button 
          className={`btn ${filterState === 'all' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
          onClick={() => setFilterState("all")}
       //   disabled={loading}
        >
          Todos
        </button>
        <button 
          className={`btn ${filterState === 'completed' ? 'btn-success' : 'btn-outline-success'} me-2`}
          onClick={() => setFilterState("completed")}
      //    disabled={loading}
        >
          Done
        </button>
        <button 
          className={`btn ${filterState === 'pending' ? 'btn-warning' : 'btn-outline-warning'}`}
          onClick={() => setFilterState("pending")}
       //   disabled={loading}
        >
          Not Performed
        </button>
      </div>

      <div className="container mt-3">
        <h2>Lista de Tareas</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        {!error && tasks.length === 0 && (
          <div className="alert alert-warning">
            No Tasks {filterState === 'all'}
          </div>
        )}

        {!error && tasks.length > 0 && (
          <ul className="list-group">
            {tasks.map(task => (
              <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{task.title}</h5>
                  <p className="mb-0">{task.description}</p>
                </div>
                <span className={`badge ${task.completed ? 'bg-success' : 'bg-warning'}`}>
                  {task.completed ? 'Completed' : 'Pending'}
                </span>

                                      <button 
                      //  onClick={() => handleEdit(task)}
                        className="btn btn-outline-primary btn-sm me-2"
                      >
                        Editar
                      </button>
                      <button 
                      //  onClick={() => handleDelete(task.id)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        Eliminar
                      </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default TaskList;