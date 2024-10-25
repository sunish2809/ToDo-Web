
import { useEffect,useState} from 'react';
import { useParams } from "react-router-dom";
import './ProjectDetails.scss'
import axios from 'axios';
import sound from '../assets/whoosh-motion-243505.mp3'

interface Task {
    _id: string;
    name: string;
    description: string;
    date: string;
  }
  
  interface Project {
    _id: string;
    name: string;
    description: string;
    tasks: Task[];
  }
  
  interface NewTodo {
    name: string;
    description: string;
    date: string;
  }
  const API_URL = "https://todo-web-pgbt.onrender.com";
const ProjectDetails : React.FC = () => {

    const { id } = useParams<{ id: string }>(); // Get project ID from route parameters
    const [project, setProject] = useState<Project | null>(null); // Store project details
    const [newTodo, setNewTodo] = useState<NewTodo>({ name: '', description: '', date: '' }); // For new todo inputs
    // const [loading, setLoading] = useState<boolean>(true);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [tick, SetTick] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/project/${id}`,{
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
            }

        });
        setProject(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProject();
  }, [id]);

  const handleInputChange = (e:any) => {
    setNewTodo({
      ...newTodo,
      [e.target.name]: e.target.value
    });
  };

  // Toggle the form visibility
  const toggleFormVisibility = () => {
    setShowForm((prev) => !prev);
  };
  const addTodo = async () => {
    try {
      const response = await axios.post<Task>(`${API_URL}/api/project/${id}/add-todo`, newTodo, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (project) {
        setProject({
          ...project,
          tasks: [...project.tasks, response.data] // Add new todo to the task list
        });
      }
      setNewTodo({ name: '', description: '', date: '' }); // Reset the input fields
      setShowForm(false); // Hide the form after adding a task
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };
  const playAudio = () => {
    const audio = new Audio(sound); // Provide the correct path to the audio file
    audio.play();
  };

  const handleDelete = async (taskId: string) => {
    try {
      // Make API request to delete the task
      await axios.delete(`${API_URL}/api/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Update the tasks in the project state after successful deletion
      if (project) {
        setProject({
          ...project,
          tasks: project.tasks.filter(task => task._id !== taskId)
        });
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

      
      
  return (
    <div className="appright">
      <div className="wrapper">
        <div className="appright__header">
          <div className="appright__header--items">{project?.name}</div>
        </div>
        <div className="appright__body">
        {project?.tasks.map((task) => (
          <div className="appright__body--items">
            <div className="input" style={{ background: tick==true ? '#058527' : '' }} onClick={() => {SetTick(true);playAudio();handleDelete(task._id)}}>
              {/* //<input className="radio" type="radio" /> */}
            </div>
            <div className="content-items">
              <div className="task-content">
                <div className="task-title">{task.name}</div>
                <div className="task-description">{task.description}</div>
                <div className="task-date-content">
                  <svg
                    className="task-date-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e8eaed"
                  >
                    <path d="M249.76-153q-20.9 0-35.08-14.53t-14.18-34.73v-460.48q0-20.2 14.18-34.73Q228.86-712 250-712h114.5v-108H386v108h192v-108h17.5v108H710q21.14 0 35.32 14.53t14.18 34.73v460.48q0 20.2-14.18 34.73Q731.14-153 710.24-153H249.76Zm.24-17.5h460q12 0 22-10t10-22V-495H218v292.5q0 12 10 22t22 10Zm-32-342h524v-150q0-12-10-22t-22-10H250q-12 0-22 10t-10 22v150Zm0 0v-182 182Zm262.26 136q-9.26 0-16.51-6.99-7.25-6.98-7.25-16.25 0-9.26 6.99-16.51 6.98-7.25 16.25-7.25 9.26 0 16.51 6.99 7.25 6.98 7.25 16.25 0 9.26-6.99 16.51-6.98 7.25-16.25 7.25Zm-156 0q-9.26 0-16.51-6.99-7.25-6.98-7.25-16.25 0-9.26 6.99-16.51 6.98-7.25 16.25-7.25 9.26 0 16.51 6.99 7.25 6.98 7.25 16.25 0 9.26-6.99 16.51-6.98 7.25-16.25 7.25Zm312 0q-9.26 0-16.51-6.99-7.25-6.98-7.25-16.25 0-9.26 6.99-16.51 6.98-7.25 16.25-7.25 9.26 0 16.51 6.99 7.25 6.98 7.25 16.25 0 9.26-6.99 16.51-6.98 7.25-16.25 7.25Z" />
                  </svg>
                  <div className="task-date-text">
                  {new Date(task.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                  </div>
                </div>
              </div>

              <div className="delete" onClick={() => handleDelete(task._id)}>
                <svg
                  className="delete-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed"
                >
                  <path d="m400-361 80-80 80 80 15-15-80-80 80-80-15-15-80 80-80-80-15 15 80 80-80 80 15 15Zm-56 165q-22.7 0-37.35-14.65Q292-225.3 292-248v-448h-48v-20h140v-36h192v36h140v20h-48v447.57q0 23.43-14.65 37.93T616-196H344Zm304-500H312v448q0 12 10 22t22 10h272q12 0 22-10t10-22v-448Zm-336 0v480-480Z" />
                </svg>
              </div>
            </div>
          </div>))}
        </div>
        <div className="appright__footer">
        <div className="appright__footer--items"onClick={toggleFormVisibility}>
          <svg className="add-task-image" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666">
            <path d="M466-466H252v-28h214v-214h28v214h214v28H494v214h-28v-214Z" />
          </svg>
          <div className="add-task">Add task</div>
        </div>

        {showForm && (
            <div className="addtask">
                <div className="addtask__header">
                    <div className="addtask__header--item1">
                    <input
                        className="item1-input"
                        name="name"
                        placeholder="Task Name"
                        value={newTodo.name}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="addtask__header--item2">
                    <input
                        className="item2-input"
                        name="description"
                        placeholder="Task Description"
                        value={newTodo.description}
                        onChange={handleInputChange}
                    />
                    </div>
                </div>
                <div className="addtask__body">
                    <div className="addtask__body--item">
                    <input
                        className="body-input"
                        type="date"
                        name="date"
                        value={newTodo.date}
                        onChange={handleInputChange}
                    />
                    </div>
                </div>
                <div className="addtask__footer">
                    <button className="footer-cancel" onClick={toggleFormVisibility}>
                    Cancel
                    </button>
                    <button className="footer-addtask" onClick={addTodo}>
                    Add Task
                    </button>
                </div>
                </div>

          )}

      </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
