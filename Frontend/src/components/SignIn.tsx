import 'bootstrap/dist/css/bootstrap.min.css';
import './SignIn.scss';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface SignInData {
  email: string;
  password: string;
}

const API_URL = "https://todo-web-pgbt.onrender.com"; // Ensure this is using HTTPS for production
const SignIn = () => {
  const [signinData, setSignInData] = useState<SignInData>({
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Use 'name' instead of 'id'
    setSignInData((prevData) => ({ ...prevData, [name]: value })); // Update with 'name'
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("check",signinData)
    try {
      const response = await axios.post(`${API_URL}/api/signin`, signinData, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log("check2", response)
      
      const { token } = response.data;
      localStorage.setItem('token', token);

      // Navigate to inbox after successful sign-in
      navigate('/app/inbox');
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Check your details';
      setErrorMsg(errorMessage);
    }
  };

  // Redirect if already authenticated
  if (localStorage.getItem('token')) {
    navigate('/app/inbox');
  }

  return (
    <div className="signin">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        {errorMsg && <div className="alert alert-danger" role="alert">{errorMsg}</div>}
        <div className="form-floating">
          <input 
            type="email" 
            className="form-control" 
            name="email"  // Use 'name' attribute
            placeholder="name@example.com"
            value={signinData.email}
            onChange={handleChange} 
          />
          <label htmlFor="email">Email address</label>
        </div>

        <div className="form-floating">
          <input 
            type="password" 
            className="form-control" 
            name="password"  // Use 'name' attribute
            placeholder="Password"
            value={signinData.password}
            onChange={handleChange} 
          />
          <label htmlFor="password">Password</label>
        </div>

        <button className="btn w-100 py-2" type="submit">Sign In</button>
         <div className='footer'>
          <div>Don't have an account?</div>
          {/* <a href="/signup">Sign Up</a> */}
          <button className='footer-btn' type="button" onClick={() => navigate('/signup')}>Sign Up</button>
         </div>
      </form>
    </div>
  );
};

export default SignIn;

