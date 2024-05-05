// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchTasks, selectTasks, selectStatus, addTaskToAPI } from '../features/tasks/taskSlice';
// import { AppDispatch } from '../app/store';
// import { Task } from '../types';

// interface TaskItemProps {
//   task: Task;
// }

// interface TaskGroupProps {
//   title: string;
//   tasks: Task[];
// }

// const useResponsiveStyle = () => {
//   const [width, setWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => setWidth(window.innerWidth);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return width <= 768 ? styles.mobile : styles.desktop;
// };

// const styles = {
//   desktop: {
//     taskItem: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '10px',
//       padding: '10px',
//       boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//       borderRadius: '8px',
//       backgroundColor: '#fff',
//     },
//     button: {
//       padding: '5px 15px',
//       borderRadius: '5px',
//       borderColor: 'transparent',
//       backgroundColor: '#007BFF',
//       color: 'white',
//       cursor: 'pointer',
//     },
//     container: {
//       margin: '20px',
//       backgroundColor: '#f8f9fa',
//       padding: '20px',
//       borderRadius: '10px',
//       boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
//     },
//     header: {
//         color: '#333',
//         textAlign: 'center' as const, // Ensuring the value is treated as a literal type
//       }
//   },
//   mobile: {
//     taskItem: {
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '10px',
//       padding: '10px',
//       boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//       borderRadius: '8px',
//       backgroundColor: '#fff',
//     },
//     button: {
//       width: '100%',
//       padding: '10px',
//       borderRadius: '5px',
//       borderColor: 'transparent',
//       backgroundColor: '#007BFF',
//       color: 'white',
//       cursor: 'pointer',
//     },
//     container: {
//       margin: '10px',
//       backgroundColor: '#f8f9fa',
//       padding: '10px',
//       borderRadius: '10px',
//       boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//     },
//     header: {
//         color: '#333',
//         textAlign: 'center' as const, // Ensuring the value is treated as a literal type
//       }
//   }
// };

// const getPriorityStyle = (priority: string) => {
//   switch(priority) {
//     case 'High': return { color: 'red', fontWeight: 'bold' };
//     case 'Medium': return { color: 'orange', fontWeight: 'bold' };
//     case 'Low': return { color: 'green', fontWeight: 'bold' };
//     default: return {};
//   }
// };

// const getCompletionStyle = (completed: string) => {
//     switch(completed) {
//       case "true": return { color: 'green', fontWeight: 'bold' };
//       case "false": return { color: 'red', fontWeight: 'bold' };
//       default: return {};
//     }
//   };

//   const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
//     const responsiveStyle = useResponsiveStyle();
//     return (
//       <div style={responsiveStyle.taskItem}>
//         <span>{task.title}</span>
//         <span>{task.project}</span>
//         <span style={getPriorityStyle(task.completed)}>{task.completed}</span>
//         <button style={responsiveStyle.button}>View</button>
//       </div>
//     );
//   };
  
//   const TaskGroup: React.FC<TaskGroupProps> = ({ title, tasks }) => {
//     const responsiveStyle = useResponsiveStyle();
//     return (
//       <div style={{ marginBottom: '40px' }}>
//         <h2 style={{ color: '#333', marginBottom: '15px' }}>{title}</h2>
//         {tasks.map(task => <TaskItem key={task.id} task={task} />)}
//       </div>
//     );
//   };
  
//   const TaskList: React.FC = () => {
//     const dispatch: AppDispatch = useDispatch();
//     const tasks = useSelector(selectTasks);
//     const status = useSelector(selectStatus);
//     const responsiveStyle = useResponsiveStyle();
//     const [newTask, setNewTask] = useState({ title: '', project: '', priority: 'Medium', completed: 'false' });
//     const [isFormVisible, setFormVisible] = useState(false); // To toggle the form visibility  
  
//     useEffect(() => {
//       dispatch(fetchTasks());
//     }, [dispatch]);
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setNewTask((prev) => ({ ...prev, [name]: value }));
//       };
    
//       // Function to handle adding a new task
//       const handleAddTask = () => {
//         const newTaskToAdd: Task = {
//           id: tasks.length + 1, // Or use a different ID generation approach
//           title: newTask.title,
//           project: newTask.project,
//           priority: newTask.priority,
//           completed: newTask.completed,
//         };
    
//         dispatch(addTaskToAPI(newTaskToAdd));
//         setFormVisible(false); // Hide the form after adding
//       };
    
//     if (status === 'loading') return <p>Loading tasks...</p>;
//     if (status === 'failed') return <p>Error fetching tasks</p>;
  
//     return (
//         <div style={{ padding: '20px', margin: '20px', backgroundColor: '#f8f9fa', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
//           <h1 style={{ textAlign: 'center', color: '#333' }}>My Tasks</h1>
//           <div style={responsiveStyle.container}>
//         <TaskGroup title="All Tasks" tasks={tasks} />
//         </div>
//           <button
//             style={{ margin: '20px', padding: '10px', backgroundColor: '#007BFF', color: '#fff', cursor: 'pointer' }}
//             onClick={() => setFormVisible(true)}
//           >
//             Add New Task
//           </button>
    
//           {/* Form is shown conditionally */}
//           {isFormVisible && (
//             <div style={{ margin: '20px', padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
//               <h2>Add a New Task</h2>
//               <label>
//                 Title:
//                 <input type="text" name="title" value={newTask.title} onChange={handleChange} />
//               </label>
//               <br />
//               <label>
//                 Project:
//                 <input type="text" name="project" value={newTask.project} onChange={handleChange} />
//               </label>
//               <br />
//               {/* <label>
//                 Completed:
//                 <select name="completed" value={"false"} onChange={handleChange}>
//                   <option value="true">True</option>
//                   <option value="false">False</option>
//                 </select>
//               </label> */}
//               <br />
//               <label>
//                 Priority:
//                 <select name="priority" value={newTask.priority} onChange={handleChange}>
//                   <option value="High">High</option>
//                   <option value="Medium">Medium</option>
//                   <option value="Low">Low</option>
//                 </select>
//               </label>
//               <br />
//               <button style={{ padding: '10px', backgroundColor: 'green', color: '#fff', cursor: 'pointer' }} onClick={handleAddTask}>
//                 Submit
//               </button>
//               <button style={{ padding: '10px', marginLeft: '10px', backgroundColor: 'red', color: '#fff', cursor: 'pointer' }} onClick={() => setFormVisible(false)}>
//                 Cancel
//               </button>
//             </div>
//           )}
//         </div>
//       );
//     };
// export default TaskList;

import React from 'react';
/// gives access to reducers
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setFilter } from '../features/tasks/taskSlice';
function ListOfTasks() {

    const tasks = useSelector((state: any) => state.tasks)
    return (
        <div className='container'>
            <h2>My Tasks</h2>
            <Link to='/create' className='btn btn-success my-3'>Create +</Link>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Task ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task: any, index: any) => (
                        <tr key={index}>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.priority}</td>
                            <td>{task.completed}</td>
                            <td>
                                <Link to={`/view/${task.id}`} className='btn btn-sm btn-info ms-2'>View</Link>
                                {/* <button onClick={applyHighPriorityFilter}>Show High Priority Tasks</button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        
        </div>
    )
}

export default ListOfTasks;