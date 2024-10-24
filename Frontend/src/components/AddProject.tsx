import "./AddProject.scss";
import { useNavigate } from "react-router-dom";
import close from "../assets/close_24dp_E8EAED_FILL0_wght100_GRAD0_opsz20.svg";
import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

const AddProject = () => {
  const navigate = useNavigate();
  const handleAddProjectCLose = () => {
    navigate("/app/inbox");
  };
  const [taskName, SetTaskName] = useState("");
  const [description] = useState("");
  const [toDo] = useState([]);
  const handleAddProject = async () => {
    const projectData = {
      name: taskName,
      description: description,
      todos: toDo,
    };
    try {
      const response = await axios.post(
        `${API_URL}/api/project`,
        projectData, // Task data should be passed as the second argument, no need to stringify
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you have token stored in localStorage
          },
        }
      );

      if (response.status === 201) {
        // If the task was added successfully, navigate to inbox
        navigate("/app/today");
      } else {
        // Handle any error
        console.error("Error adding task:", response.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="setting">
      <div className="setting__header">
        <div>Add Project</div>
        <img
          className="close-icon"
          onClick={handleAddProjectCLose}
          src={close}
          alt="close Icon"
        />
      </div>
      <div className="setting__body">
        <div className="setting__body--items">
          <div className="title">Name</div>
          <div className="input">
            <input
              className="input-place"
              onChange={(e) => SetTaskName(e.target.value)}
            ></input>
          </div>
        </div>
      </div>
      <div className="setting__footer">
        <button className="button" onClick={handleAddProject}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddProject;
