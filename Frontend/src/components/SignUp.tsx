import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.scss';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface SignInData {
  name: string;
  email: string;
  password: string;
}
const API_URL = "http://localhost:3000";
const SignUp = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [signinData, setSignInData] = useState<SignInData>({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignInData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
       await axios.post(`${API_URL}/api/signup`, signinData, {
        headers: { 'Content-Type': 'application/json' }
      });
      navigate('/signin');
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error signing up';
      setErrorMsg(errorMessage === 'Email already exists' ? 'Email already registered' : errorMessage);
    }
  };

  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
        {errorMsg && <div className="alert alert-danger" role="alert">{errorMsg}</div>} 
        
        <div className="form-floating">
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            placeholder="John Doe"
            value={signinData.name}
            onChange={handleChange} 
          />
          <label htmlFor="name">Name</label>
        </div>

        <div className="form-floating">
          <input 
            type="email" 
            className="form-control" 
            id="email" 
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
            id="password" 
            placeholder="Password"
            value={signinData.password}
            onChange={handleChange} 
          />
          <label htmlFor="password">Password</label>
        </div>

        <button className="btn w-100 py-2" type="submit">Sign Up</button>
        <div className='footer'>
          <div>Have an account?</div>
          <a href="/signin">Sign In</a>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

