import React from 'react'
import './Home.css'
import { NavLink } from 'react-router-dom'
const Home = () => {
  return (<div className='home-container'>
    <div className='home-head'>
      <h1>Expensify</h1>
      <div className='home-links'>
        <NavLink to={'/login'}>Login</NavLink>
        <NavLink to={'/signup'}>SignUp</NavLink>
      </div>
    </div>
    <div className='home-body'>
      <div className='home-body-left'>
        <div className='home-body-in'>
          <h2>welcome to Expensify</h2>
          <h1>Manage Your Expenses Easily With Expensify</h1>
          <p>we are providing easiest way to manage expenses, Get a full view so you know where to save. Track spending, incoming amount without any fraud.</p>
          <button><NavLink to={'/login'}>Get Started</NavLink></button>
        </div>

      </div>

    </div>

  </div>

  )
}

export default Home