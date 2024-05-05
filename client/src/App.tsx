import React from 'react';
import TaskList from './components/ListOfTaks';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListOfTasks from './components/ListOfTaks';
import CreateTask from './components/CreateTask';
import IndividualTask from './components/IndividualTask';
import EditTask from './components/EditTask';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<ListOfTasks/>}></Route>
      <Route path='/create' element={<CreateTask/>}></Route>
      <Route path='/view/:id' element={<IndividualTask/>}></Route>
      <Route path='/view/edit/:id' element={<EditTask/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
