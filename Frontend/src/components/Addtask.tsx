import './Addtask.scss'
import './AddProject.scss'
import axios ,{ AxiosError }from "axios";
import { useNavigate } from 'react-router-dom'; 
import { useState } from 'react';

const API_URL = "http://localhost:3000";
const Addtask = () => {

    const [taskName, SetTaskName] = useState('');
    const [description, SetDescription] = useState('');
    const [dueDate, SetDueDate] = useState('');

    const navigate = useNavigate();
    const handleAddTask= async()=>{
        const taskData = {
            name: taskName,
            description: description,
            date: dueDate,
        };
        try {
            const response = await axios.post(
                `${API_URL}/api/task`,
                taskData, // Task data should be passed as the second argument, no need to stringify
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you have token stored in localStorage
                    }
                }
            );
        
            if (response.status === 201) {
                // If the task was added successfully, navigate to inbox
                navigate('/app/inbox');
            } else {
                // Handle any error
                console.error('Error adding task:', response.data.error);
            }
        } catch(error: unknown) { // Explicitly typing error as unknown
            // Check if the error is an instance of AxiosError
            if (error instanceof AxiosError) {
                console.error('Error adding task:', error.response?.data?.error || error.message);
            } else if (error instanceof Error) {
                // If it's a standard Error object
                console.error('Error adding task:', error.message);
            } else {
                // For other types of unknown errors
                console.error('An unknown error occurred:', error);
            }
        }
        
    }

    const handleAddTaskCancel=()=>{
        navigate('/app/inbox');
    }
  return (
    <div className='addtask'>
        <div className='addtask__header'>
            <div className='addtask__header--item1'>
                <input className='item1-input' placeholder="Task name" onChange={(e)=>SetTaskName(e.target.value)}></input>
            </div>
            <div className='addtask__header--item2'>
                <input className='item2-input' placeholder="Description" onChange={(e)=>{SetDescription(e.target.value)}}></input>
            </div>
        </div>
        <div className='addtask__body'>
            <div className='addtask__body--item'>
                <input className='body-input' type="date" placeholder="Due Date" onChange={(e)=>SetDueDate(e.target.value)}></input>
            </div>
        </div>
        <div className='addtask__footer' >
            <button className='footer-cancel'  onClick={handleAddTaskCancel}>Cancel</button>
            <button className='footer-addtask' onClick={handleAddTask}>Add Task</button>
        </div>
      
    </div>
  )
}

export default Addtask
