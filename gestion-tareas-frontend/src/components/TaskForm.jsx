import { useState, useEffect } from 'react';
import { useNavigate, useParams,Navigate  } from 'react-router-dom';

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
const params = useParams();

  const navigate = useNavigate();
 const [editing,setEditing] = useState(false);





   const handleSubmit = async (e) => {
    e.preventDefault();
    try {


if (!editing){

      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
}else {

        console.log('Editing task:', task);

      const response = await fetch(`http://localhost:3000/api/tasks/${params.id}`, {
        method: 'PUT',
        headers: {  

'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

}


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
    navigate('/');
  };

  const fetchTask = async (id) => {
        try {
          const response = await fetch(`http://localhost:3000/api/tasks/${id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log('Task fetched:', data);
          setTask(data.task || data);
          setEditing(true);
        } catch (error) {
          console.error('Error fetching task:', error);
        }
      };

  useEffect(() => {

    if(params.id) {
      fetchTask(params.id);
    }
    
    console.log(params);
  },[params.id])

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
