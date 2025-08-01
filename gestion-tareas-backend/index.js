const express = require ('express');
const app = express();
const port = 3000;
const taskRouter = require('./routes/TaskRoutes.js')
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use("/api/tasks",taskRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});