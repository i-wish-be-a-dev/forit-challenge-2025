const handleFinish = async (taskId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/tasks/${taskId}/finish`, {
      method: 'PUT',
      headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ completed: 1 }),
        });
        window.location.reload();
      } catch (error) {
        console.error('Error finishing task:', error);
      }
    };
    
    export default handleFinish;