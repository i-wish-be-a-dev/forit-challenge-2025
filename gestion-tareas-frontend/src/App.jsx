import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import TaskList from './components/TaskList.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import Navbar from './components/Navbar.jsx'
import TaskForm from './components/TaskForm.jsx'


function App() {
  return (

  <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<TaskList /> } />
        <Route path="/tasks/new" element={<TaskForm />} />
        <Route path="/tasks/:id/edit" element={<TaskForm />} />
      </Routes>
    </BrowserRouter>



  );
}

export default App
