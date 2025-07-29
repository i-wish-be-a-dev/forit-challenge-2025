import { useState } from 'react';

function refreshPage() {
  window.location.reload();
}

const TaskForm = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    setTask((prevTask) => ({
      ...prevTask,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      await response.json();
      console.log('Task submitted:', task);
    } catch (error) {
      console.error('Error submitting task:', error);
      // Handle error appropriately, e.g., show a notification
    }
  };
  

  const handleSubmitAndRefresh = async (e) => {
    await handleSubmit(e);
    refreshPage();
  };

  return (
    <form onSubmit={handleSubmitAndRefresh} className="container mt-5">
      <div className="form-group mb-3">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          placeholder="Enter title"
          value={task.title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          placeholder="Enter description"
          rows="4"
          value={task.description}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary mt-3">Submit</button>
    </form>
  );
};

export default TaskForm;
