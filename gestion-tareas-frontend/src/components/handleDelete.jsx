import React from 'react';

const handleDelete = async (taskId, setTasks) => {


  
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(`Task with ID ${taskId} deleted successfully`);
      
      setTasks(tasks => tasks.filter(task => task.id !== taskId)); 
    } catch (error) {
      console.error('Error deleting task:', error);
      // Handle error appropriately, e.g., show a notification
    }
  }

  export default handleDelete;