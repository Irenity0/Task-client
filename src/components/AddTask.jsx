import { useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
    
    const {user} = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDecription] = useState('');
    const [status, setStatus] = useState('todo');
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    
    const handleSubmit = async e => {
        e.preventDefault();

        const newTask = {
            title, 
            description,
            status,
            userEmail : user?.email
        }

        const response = await axiosSecure.post('/tasks', newTask)
        if (response.data.insertedId) {
            alert('task added');
            navigate('/dashboard')
          }

        setTitle("");
        setDecription("");
        setStatus("todo");

    }
    

    return (
    <>
    <div className="w-1/2 mt-40 mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Create a Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Task Title */}
        <div>
          <label className="block font-semibold">Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength="20"
            required
            className="w-full border-base-300 rounded mt-1"/>
        </div>

        {/* Task Description */}
        <div>
          <label className="block font-semibold">Task Description</label>
          <textarea
            value={description}
            onChange={(e) => setDecription(e.target.value)}
            maxLength="100"
            className="w-full border-base-300 rounded mt-1"/>
        </div>

        <button type="submit" className="btn btn-soft">Add Task</button>
      </form>
    </div>
    </>
    );
};

export default AddTask;