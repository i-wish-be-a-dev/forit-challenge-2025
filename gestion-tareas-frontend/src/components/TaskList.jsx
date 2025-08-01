import React, { useState, useEffect } from 'react';
import TaskSearch from './TaskSearch';
import { useNavigate } from 'react-router-dom';
import handleDelete from './handleDelete';
import handleFinish from './HandleFinish';

const TaskList = () => {
  const [filterState, setFilterState] = useState('all');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        >
          Everything
        </button>
        <button 
          className={`btn ${filterState === 'completed' ? 'btn-success' : 'btn-outline-success'} me-2`}
          onClick={() => setFilterState("completed")}
        >
          Done
        </button>
        <button 
          className={`btn ${filterState === 'pending' ? 'btn-warning' : 'btn-outline-warning'}`}
          onClick={() => setFilterState("pending")}
        >
          Not Performed
        </button>
      </div>

      <div className="container mt-3">
        <h2>List  of Tasks</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        {!error && tasks.length === 0 && (
          <div className="alert alert-warning">
            No Tasks {filterState === 'all'}
          </div>
        )}

        {!error && tasks.length > 0 && (
          <TaskSearch
            tasks={tasks}
            renderTask={task => (
              <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">{task.title}</h5>
                <p className="mb-0 text-muted">{task.description}</p>
              </div>
                <span className={`badge ${task.completed ? 'bg-success' : 'bg-warning'}`}>
                  {task.completed ? 'Completed' : 'Pending'}
                </span>
                <button
                  className="btn btn-outline-primary btn-sm me-2"
                  onClick={() => navigate(`/tasks/${task.id}/edit`)}
                >
                  Editar
                </button>
                <button
                  onClick={() => HandleDelete(task.id, setTasks)}
                  className="btn btn-outline-danger btn-sm"
                >
                  Delete
                </button>
               <button
                  onClick={() => handleFinish(task.id)}
                  className="btn btn btn-info btn-sm"
                >
                  Finish
                </button>




              </li>
            )}
          />
        )}
      </div>
    </>
  );
};

export default TaskList;