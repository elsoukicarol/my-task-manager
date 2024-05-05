// EditTask.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../app/store";
import { updateTask } from "../features/tasks/taskSlice";

function EditTask() {
  // Extract the task ID from the URL parameters using `useParams`
  const { id } = useParams<{ id: string }>();
  const taskId = id ? parseInt(id, 10) : NaN;

  // Retrieve the specific task from the Redux store
  const task = useSelector((state: RootState) =>
    state.tasks.find((t) => t.id === taskId)
  );

  // Initialize hooks regardless of whether the task is found or not
  const [Atitle, setTitle] = useState(task?.title || "");
  const [Adescription, setDescription] = useState(task?.description || "");
  const [Apriority, setPriority] = useState(task?.priority || "Medium");
  const [Acompleted, setCompleted] = useState(task?.completed ? "Yes" : "No");

  // Initialize other hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validate ID and task presence after all hooks are initialized
  if (isNaN(taskId)) {
    console.error("Invalid or missing ID value.");
    return <div>Invalid or missing ID value</div>;
  }

  if (!task) {
    return <div className="alert alert-danger">Task not found</div>;
  }

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateTask({
        id: taskId,
        title: Atitle,
        description: Adescription,
        priority: Apriority,
        completed: Acompleted,
      })
    );
    navigate('/');
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-light text-white p-5">
        <form onSubmit={handleUpdate}>
          <h2 style={{ color: "black" }}>Edit Task</h2>
          <div>
            <label htmlFor="title" style={{ color: "black" }}>
              Title:
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Enter title"
              value={Atitle}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description" style={{ color: "black" }}>
              Description:
            </label>
            <input
              type="text"
              name="description"
              className="form-control"
              placeholder="Enter description"
              value={Adescription}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="priority" style={{ color: "black" }}>
              Priority:
            </label>
            <select
              name="priority"
              className="form-control"
              value={Apriority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label htmlFor="completed" style={{ color: "black" }}>
              Completed:
            </label>
            <select
              name="completed"
              className="form-control"
              value={Acompleted}
              onChange={(e) => setCompleted(e.target.value)}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <br />
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditTask;
