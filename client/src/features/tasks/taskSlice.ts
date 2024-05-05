import { createSlice } from "@reduxjs/toolkit";
import { Tasks } from "../../data";

const loadTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : [];
};

const saveTasksToLocalStorage = (tasks : any) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const initialState = {
  tasks: loadTasksFromLocalStorage()
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: Tasks,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
      saveTasksToLocalStorage(state); 
    },
    updateTask: (state, action) => {
      const { id, title, description, priority, completed } = action.payload;
      const updateTask = state.find((task) => task.id === id);
      if (updateTask) {
        updateTask.title = title;
        updateTask.description = description;
        updateTask.completed = completed;
        updateTask.priority = priority;
        saveTasksToLocalStorage(state); 
      }
    },
    deleteTask: (state, action) => {
      const {id} = action.payload;
      const deleteTask = state.find((task) => task.id === id);
      if (deleteTask) {
        return state.filter(f => f.id !== id);
      }
      saveTasksToLocalStorage(state); 
    },
    setFilter: (state, action) => {
      state.filter = action.payload; // Set the filter value
    }
  },
});

// Selector to filter tasks by the current filter
export const selectFilteredTasks = (state : any) => {
  const { tasks, filter } = state.tasks;
  return tasks.filter((task: { priority: any; }) => task.priority === filter);
};

export const { addTask, updateTask, deleteTask, setFilter } = taskSlice.actions;
export default taskSlice.reducer;
