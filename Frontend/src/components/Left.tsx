import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Left.scss";
import notificationsIcon from "../assets/notifications_24dp_E8EAED_FILL0_wght100_GRAD0_opsz20.svg";
import calender from "../assets/calendar_month_24dp_E8EAED_FILL0_wght100_GRAD0_opsz24.svg";
import leftarrow from "../assets/chevron_left_24dp_E8EAED_FILL0_wght100_GRAD0_opsz24.svg";
import darkplus from "../assets/add_24dp_E8EAED_FILL0_wght100_GRAD0_opsz24 copy.svg";
import plus from "../assets/add_24dp_E8EAED_FILL0_wght100_GRAD0_opsz24.svg";
import inbox from "../assets/inbox_24dp_E8EAED_FILL0_wght100_GRAD0_opsz24.svg";
import logout from "../assets/logout_24dp_E8EAED_FILL0_wght100_GRAD0_opsz24.svg";
import setting from "../assets/settings_24dp_E8EAED_FILL0_wght100_GRAD0_opsz24.svg";
import rightarror from "../assets/chevron_right_24dp_E8EAED_FILL0_wght100_GRAD0_opsz24.svg";
import "bootstrap/dist/css/bootstrap.min.css";
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
  rel="stylesheet"
/>;

const API_URL = "http://localhost:3000";
interface Project {
  _id: string;
  user: string;
  name: string; // Ensure that name is a string
  tasks: any[]; // Replace `any` with a more specific type if you have a task structure
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Left: React.FC = () => {
  const [shrink, SetShrink] = useState(false);
  const [name, SetName] = useState("");
  const [projectName, SetProjectName] = useState<Project[]>([]);
  const [errormsg,SetErrorMsg] = useState('');
  const [issue, SetIssue] = useState(true)
  const navigate = useNavigate();
  const handleShrink = () => {
    SetShrink(true);
  };
  const handleshrinkback = () => {
    SetShrink(false);
  };
  const navigateToInbox = () => {
    navigate("/app/inbox");
  };
  const navigateToToday = () => {
    navigate("/app/today");
  };
  const navigateToSetting = () => {
    navigate("/app/setting");
  };
  const navigateToAddTask = () => {
    navigate("/app/addTask");
  };
  const navigateToAddProject = () => {
    navigate("/app/addProject");
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  useEffect(() => {
    const fetchTodayTasks = async () => {
      try {
        const response = await axios(`${API_URL}/api/userdetail`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
          },
        });
        SetName(response.data.name); // Set tasks from API response
        //setIssue(false);
      } catch (error: any) {
        //setError(error.message || 'Error fetching tasks'); // Set error message
      }
    };

    fetchTodayTasks();
  }, []);

  useEffect(() => {
    const fetchProjectsName = async () => {
      try {
        const response = await axios(`${API_URL}/api/projects`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
          },
        });
        SetProjectName(response.data); // Set tasks from API response
        SetIssue(false);
      } catch (error: any) {
        SetErrorMsg(error.message || 'Error fetching tasks'); // Set error message
      }
    };
    fetchProjectsName();
  }, []);
  const initial = name.length > 0 ? name[0].toUpperCase() : "";

  const handleDelete = async (projectId: string) => {
    try {
      await axios.delete(`${API_URL}/api/project/${projectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Remove the task from the state after successful deletion
      SetProjectName(projectName.filter(project => project._id !== projectId));
    } catch (error: any) {
      console.error('Error deleting task:', error.message);
      //setError('Error deleting task');
    }
  };

  return (
    <div
      className="appleft"
      style={{
        width: shrink === true ? "3%" : "",
        background: shrink === true ? "transparent" : "#fcfaf8",
      }}
    >
      <div
        className="shrink-expand"
        onClick={handleshrinkback}
        style={{ display: shrink === false ? "none" : "block" }}
      >
        <img src={rightarror} alt="left Icon" />
      </div>
      <div
        className="appleft__header"
        style={{ display: shrink ? "none" : "block" }}
      >
        <div className="appleft__header--items">
          <div className="admin">
            <div className="admin-initial">
              <div className="initial">{initial}</div>
            </div>
            <div className="admin-name">{name}</div>
          </div>
          <div className="admin-items">
            <div className="bell-icons">
              <img src={notificationsIcon} alt="Notifications Icon" />
            </div>
            <div className="shrink-expand" onClick={handleShrink}>
              <img src={leftarrow} alt="left Icon" />
            </div>
          </div>
        </div>
      </div>
      <div
        className="appleft__body"
        style={{ display: shrink ? "none" : "block" }}
      >
        <div className="appleft__body--items">
          <button className="addtask-button" onClick={navigateToAddTask}>
            <div className="addtask-icons">
              <div className="addtask-icon-adjust">
                <img
                  src={plus}
                  alt="plus Icon"
                  style={{ marginBottom: "3px" }}
                />
              </div>
            </div>
            <div className="addtask-name">Add Task</div>
          </button>
        </div>
        <div className="appleft__body--items" onClick={navigateToInbox}>
          <div className="icons">
            <img src={inbox} alt="inbox Icon" />
          </div>

          <div className="icon-des">Inbox</div>
        </div>
        <div className="appleft__body--items" onClick={navigateToToday}>
          <div className="icon">
            <img src={calender} alt="calender Icon" />
          </div>
          <div className="icon-des">Today</div>
        </div>
        <div className="appleft__body--additems">
          <div className="projectadd-content" onClick={navigateToAddProject}>
            <div className="projectadd-header">My Project</div>
            <button className="projectadd-icon">
              <img src={darkplus} alt="plus Icon" />
            </button>
          </div>
          {issue ===false? <div className="projectadd-name">
            {projectName.map((project) => (
              <div key={project._id} className="projectadd-name-items">
                <svg
                  className="projectadd-name-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed"
                >
                  <path d="m323-240 30-120H223l5-20h130l44-176H260l5-20h142l36-144h18l-36 144h158l36-144h18l-36 144h136l-5 20H596l-44 176h148l-5 20H547l-30 120h-18l30-120H371l-30 120h-18Zm53-140h158l44-176H420l-44 176Z" />
                </svg>
                <div className="projectadd-wrapper">
                  <div className="projectadd-name-text" onClick={()=>navigate(`project/${project._id}`)}>{project.name}</div>
                  <svg
                    onClick={()=>handleDelete(project._id)}
                    className="projectadd-delete"
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
            ))}
          </div> : <div>{errormsg}</div>}
        </div>
      </div>
      <div
        className="appleft__footer"
        style={{ display: shrink ? "none" : "block" }}
      >
        <div className="appleft__footer--items">
          <div className="footer-row" onClick={navigateToSetting}>
            <div className="setting-icon">
              <img src={setting} alt="setting Icon" />
            </div>
            <div className="settng-text">Setting</div>
          </div>
          <div className="footer-row">
            <div className="logout-icon">
              <img src={logout} alt="logout Icon" />
            </div>
            <div className="logout-text" onClick={handleLogOut}>
              Logout
            </div>
          </div>
          <div className="footer-row-end">
            <div className="">© 2024 Company, Inc</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Left;
