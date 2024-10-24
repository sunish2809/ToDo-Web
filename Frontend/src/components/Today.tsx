import './Today.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import sound from '../assets/whoosh-motion-243505.mp3'

// Define the task structure using TypeScript interface
interface Task {
  _id: string;
  user: string;
  name: string;
  description: string;
  date: string; // ISO string format for date
  isToday: boolean;
  createdAt: string;
  updatedAt: string;
}

const API_URL = "http://localhost:3000"; // Replace with your actual API URL

const Today: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // Store tasks in state
  const [error, setError] = useState<string | null>(null); // Store error messages
  const [issue,Setissue] = useState(true);
  const [tick, SetTick] = useState(false);
  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTodayTasks = async () => {
      try {
        const response = await axios.get<Task[]>(`${API_URL}/api/tasks/today`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
          },
        });
        setTasks(response.data); // Set tasks from API response
        Setissue(false);
      } catch (error: any) {
        setError(error.message || 'Error fetching tasks'); // Set error message
      }
    };

    fetchTodayTasks();
  }, []);
  const handleDelete = async (taskId: string) => {
    try {
      await axios.delete(`${API_URL}/api/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTasks(tasks.filter(task => task._id !== taskId)); // Update the state to remove the deleted task
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  const playAudio = () => {
    const audio = new Audio(sound); // Provide the correct path to the audio file
    audio.play();
  };

  return (
    <div className="appright">
      <div className="wrapper">
        <div className="appright__header">
          <div className="appright__header--items">Today</div>
        </div>
        <div className="appright__body">
          {issue && <div className="error-message">{error}</div>} {/* Display error message */}
          {tasks.map((task) => (
            <div key={task._id} className="appright__body--items">
              <div className="input" style={{ background: tick==true ? '#058527' : '' }} onClick={() => {SetTick(true);playAudio();handleDelete(task._id)}}>
                {/* <input className="radio" type="radio" /> */}
              </div>
              <div className="content-items">
                <div className="task-content">
                  <div className="task-title">{task.name}</div>
                  <div className='task-description'>{task.description}</div>
                  <div className="task-date-content">
                    <svg className="task-date-icon" style={{ fill: '#058527' }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                      <path d="M249.76-153q-20.9 0-35.08-14.53t-14.18-34.73v-460.48q0-20.2 14.18-34.73Q228.86-712 250-712h114.5v-108H386v108h192v-108h17.5v108H710q21.14 0 35.32 14.53t14.18 34.73v460.48q0 20.2-14.18 34.73Q731.14-153 710.24-153H249.76Zm.24-17.5h460q12 0 22-10t10-22V-495H218v292.5q0 12 10 22t22 10Zm-32-342h524v-150q0-12-10-22t-22-10H250q-12 0-22 10t-10 22v150Zm0 0v-182 182Zm262.26 136q-9.26 0-16.51-6.99-7.25-6.98-7.25-16.25 0-9.26 6.99-16.51 6.98-7.25 16.25-7.25 9.26 0 16.51 6.99 7.25 6.98 7.25 16.25 0 9.26-6.99 16.51-6.98 7.25-16.25 7.25Zm-156 0q-9.26 0-16.51-6.99-7.25-6.98-7.25-16.25 0-9.26 6.99-16.51 6.98-7.25 16.25-7.25 9.26 0 16.51 6.99 7.25 6.98 7.25 16.25 0 9.26-6.99 16.51-6.98 7.25-16.25 7.25Zm312 0q-9.26 0-16.51-6.99-7.25-6.98-7.25-16.25 0-9.26 6.99-16.51 6.98-7.25 16.25-7.25 9.26 0 16.51 6.99 7.25 6.98 7.25 16.25 0 9.26-6.99 16.51-6.98 7.25-16.25 7.25Z" />
                    </svg>
                    <div className="task-date-text" style={{ color: '#058527' }}>
                      {new Date(task.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                </div>

                <div className="delete" onClick={() => handleDelete(task._id)}>
                  <svg  className="delete-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                    <path d="m400-361 80-80 80 80 15-15-80-80 80-80-15-15-80 80-80-80-15 15 80 80-80 80 15 15Zm-56 165q-22.7 0-37.35-14.65Q292-225.3 292-248v-448h-48v-20h140v-36h192v36h140v20h-48v447.57q0 23.43-14.65 37.93T616-196H344Zm304-500H312v448q0 12 10 22t22 10h272q12 0 22-10t10-22v-448Zm-336 0v480-480Z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Today;

