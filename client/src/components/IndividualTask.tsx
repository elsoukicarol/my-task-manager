import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Tasks } from '../data';
import { deleteTask, setFilter } from '../features/tasks/taskSlice';

interface IndividualTaskProps {}

const IndividualTask: React.FC<IndividualTaskProps> = () => {  
  const { id } = useParams<{ id: string }>();
  const taskId = id ? parseInt(id, 10) : NaN;
  const task = useSelector((state: RootState) => state.tasks.find(t => t.id === taskId));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = (id: any) => {

    dispatch(deleteTask({id}));
    navigate('/');
  }
  if (isNaN(taskId)) {
    console.error("Invalid or missing ID value.");
    return <div>Invalid or missing ID value</div>;
  }

  if (!task) {
    return <div className="alert alert-danger">Task not found</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Task Details</h2>
      <div className="card">
        <div className="card-header">
          <h3>{task.title}</h3>
        </div>
        <div className="card-body">
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          <p><strong>Completed:</strong> {task.completed}</p>
          <Link to={`/view/edit/${task.id}`} className='btn btn-sm btn-primary ms-2 my-2'>Edit</Link>
          <button onClick={() => handleDelete(task.id)} className='btn btn-sm btn-danger ms-2'>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default IndividualTask;
