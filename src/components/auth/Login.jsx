import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Login.css'
const Login = (props) => {
  const [Inputs, setInputs] = useState({
    email: "",
    password: ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value })
  }
  const navigate = useNavigate();

  const Submit = async (e) => {
    e.preventDefault();
    if (!Inputs.email || !Inputs.password) {
      toast.error("Email or Password cannot be empty");
      return;
    }
    await axios.post("https://expenses-tracker-backend-8wfn.onrender.com/api/k1/login", Inputs).then((res) => {
      if (res.data.others._id) {
        const id = res.data.others._id;
        const username = res.data.others.username;
        props.setuserId(id)
        props.setuser(true)
        localStorage.setItem("userId", id);
        localStorage.setItem("username", username);
        props.setUsername(username);
        toast.success("Login Successfully")
        navigate("/all-transactions")
      }
    })
  }
  return (
    <div className='login-container'>
      <div className='login-in'>
        <div className='login-head'>
          <h1>Login</h1>
        </div>
        <div className='login-form'>
          <form action=''>
            <input type='email' name='email'
              value={Inputs.email}
              placeholder='Enter your email'
              onChange={handleChange}
            />
            <input type='password' name='password'
              value={Inputs.password}
              placeholder='Enter your password'
              onChange={handleChange}
            />
            <button onClick={Submit}>Login</button>
            <NavLink to={'/signup'}>Don't have an account ?</NavLink>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login