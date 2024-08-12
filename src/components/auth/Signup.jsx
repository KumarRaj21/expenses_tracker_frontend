import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Login.css'
const Signup = () => {
  const [Inputs, setInputs] = useState({
    email: "",
    username: "",
    password: ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value })
  }
  const navigate = useNavigate();

  const Submit = async (e) => {
    e.preventDefault();
    if (!Inputs.email || !Inputs.password || !Inputs.username) {
      toast.error("Email or Password or Username cannot be empty");
      return;
    }
    await axios.post("https://expenses-tracker-backend-8wfn.onrender.com/api/k1/register", Inputs).then(() => {
      toast.success("Signup Successfully")
      setInputs({ email: "", username: "", password: "" })
      navigate("/login")
    })

  }
  return (
    <div className='login-container'>
      <div className='login-in'>
        <div className='login-head'>
          <h1>Create Account</h1>
        </div>
        <div className='login-form'>
          <form action=''>
            <input type='text' name='username'
              placeholder='Enter your username'
              value={Inputs.username}
              onChange={handleChange}
            />
            <input type='email' name='email'
              placeholder='Enter your email'
              value={Inputs.email}
              onChange={handleChange}
            />
            <input type='password' name='password'
              placeholder='Enter your password'
              value={Inputs.password}
              onChange={handleChange}
            />
            <button onClick={Submit}>Create</button>
            <NavLink to={'/login'}>Already have an account ?</NavLink>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup