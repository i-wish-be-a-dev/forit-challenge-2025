
const db = require('../db/database.js');

class TaskController {
 
 
    constructor() {}
 
    getTasks(req, res) {
   
      const sql = `SELECT * FROM tasks`;
      db.all(sql, [], (err, rows) => {  
        if(err) {
          console.error('Error fetching tasks:', err);
          return res.status(500).send({ error: 'Failed to fetch tasks' });
        }
        res.send({ tasks: rows });
      });
  }

   getTasksByState(req, res) {

    const { state } = req.params;
    const sql = `SELECT * FROM tasks WHERE completed = ?`;
    db.all(sql, [state], (err, rows) => {
      if (err) {
        console.error('Error fetching task details:', err);
        return res.status(500).send({ error: 'Failed to fetch task details' });
      }
      if (!rows) {
        return res.status(404).send({ error: 'Task not found' });
      }
      res.send({ task: rows });
    });
  }


createTask(req, res) {
 
  const sql = `INSERT INTO tasks (title,description) VALUES (?, ?)`
  db.run(
    sql,
    [req.body.title, req.body.description],
    function (err) {
      if (err) {
        console.error('Error creating task:', err);
        return res.status(500).send({ error: 'Failed to create task' });
      }
      res.send({ msg: 'Task created', taskId: this.lastID });
      console.log(`Task created with ID: ${this.lastID}`);
    }
  );
}

   deleteTask(req, res) {
   const { id } = req.params;
   const sql = `DELETE FROM tasks WHERE id = ?`;
   
   db.run(sql, [id], function(err) {
     if (err) {
        console.error('Error deleting task:', err);
        return res.status(500).send({ error: 'Failed to delete task' });
      }
        if (this.changes === 0) {
      return res.status(404).send({ error: 'Task not found' });
    }
     res.send({ msg: 'Task deleted', deletedId: id });
  });
   }


  getTaskDetails(req, res) {
    const { id } = req.params;
    const sql = `SELECT * FROM tasks WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
      if (err) {
        console.error('Error fetching task details:', err);
        return res.status(500).send({ error: 'Failed to fetch task details' });
      }
      if (!row) {
        return res.status(404).send({ error: 'Task not found' });
      }
      res.send({ task: row });
    });
  }

updateTask(req, res) {
  const sql = `UPDATE tasks SET title = ?, description = ? WHERE id = ?`;
  db.run(sql, [req.body.title, req.body.description, req.params.id], function(err) {
    if (err) {
      console.error('Error updating task:', err);
      return res.status(500).send({ error: 'Failed to update task' });
    }
    if (this.changes === 0) {
      return res.status(404).send({ error: 'Task not found' });
    }
    res.send({ msg: 'Task updated', updatedId: req.params.id });
  });
}


  finishTask(req, res) {
    const { id } = req.params;
    const sql = `UPDATE tasks SET completed = 1 WHERE id = ?`;
    db.run(sql, [req.params.id], function(err) {
      if (err) {
        console.error('Error finishing task:', err);
        return res.status(500).send({ error: 'Failed to finish task' });
      }
      if(this.changes === 0) {
        return res.status(404).send({error: 'Task not found'});
      }
      console.log(`Task with ID ${id} finished`);
      res.send({ msg: 'Task finished', taskId: req.params.id });
    });
  }



  


}
module.exports = new TaskController();