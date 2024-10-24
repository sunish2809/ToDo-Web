import './Setting.scss'
import axios /*,{ AxiosError }*/from "axios";
import close from '../assets/close_24dp_E8EAED_FILL0_wght100_GRAD0_opsz20.svg'
import { useNavigate } from 'react-router-dom'; 
import { useState } from 'react';
const API_URL = "http://localhost:3000";

const Setting = () => {
  const [name,SetName] = useState('');
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const navigate = useNavigate();
  const handleSettingClose=()=>{
    navigate('/app/inbox')
  }

  const handleSave= async()=>{
    const Data = {
      name: name,
      email: email,
      password: password,
    };
    try{
      const response = await axios.put(
        `${API_URL}/api/user`,Data,
        {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you have token stored in localStorage
          }
        }
      )
      if (response.status === 200) {
        // If the task was added successfully, navigate to inbox
        navigate('/app/inbox');
      } else {
          // Handle any error
          console.error('Error adding task:', response.data.error);
      }

    }catch(error:unknown){
      console.log("an error has occured", error);

    }
  }
  return (
    <div className="setting">
      <div className="setting__header">
        <div>Setting</div>
        <img onClick={handleSettingClose} className='close-icon' src={close} alt="close Icon" />
      </div>
      <div className="setting__body">
        <div className="setting__body--items">
          <div className="title">Change Name</div>
          <div className="input">
            <input className='input-place' onChange={(e)=>SetName(e.target.value)} placeholder="Enter Name" ></input>

          </div>

        </div>
        <div className="setting__body--items">
          <div className="title">Change Email</div>
          <div className="input">
            <input className='input-place'onChange={(e)=>SetEmail(e.target.value)} placeholder="Enter Email"></input>

          </div>
        </div>
        <div className="setting__body--items">
          <div className="title">Change password</div>
          <div className="input">
            <input className='input-place' onChange={(e)=>SetPassword(e.target.value)} placeholder="Enter Password"></input>

          </div>
        </div>
      </div>
      <div className='setting__footer'>
        <button className="button"onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default Setting;
