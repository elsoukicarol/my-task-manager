import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../features/tasks/taskSlice';
import { Tasks } from '../data';
import { useNavigate } from 'react-router-dom';

function CreateTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [completed, setCompleted] = useState('false');
    const task = useSelector((state: any) => state.tasks)
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const handleSubmit = (event: any) => {
        event.preventDefault();
        dispatch(addTask({id: task[task.length - 1].id + 1, title: title, description: description, priority: priority, completed: completed }))
        navigate('/');
    }
    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-light text-white p-5'>
                <form onSubmit={handleSubmit}>
                    <h2 style={{ color: 'black' }}>Add Task</h2>
                    <div>
                        <label htmlFor="title" style={{ color: 'black' }}>Title:</label>
                        <input type="text" name='title' className='form-control' placeholder='Enter title'
                        onChange={e=> setTitle(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="description" style={{ color: 'black' }}>Description:</label>
                        <input type="text" name='description' className='form-control' placeholder='Enter description'
                        onChange={e=> setDescription(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="priority" style={{ color: 'black' }}>Priority:</label>
                        <select name='priority' className='form-control' onChange={e=> setPriority(e.target.value)}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div><br/>
                    <button className='btn btn-success'>Add</button>
                </form>
            </div>
        </div>
    )
}

export default CreateTask;