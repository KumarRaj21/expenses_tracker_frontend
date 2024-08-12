import React from 'react'
import './Menu.css'
import { FaChevronCircleRight } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
const Menu = (props) => {
  return (props.OpenMenu) ?(<div className='menu-container'>
        <div className='menu-in'>
          <div className='menu-head'>
            <FaChevronCircleRight
            onClick={()=> props.setOpenMenu(!props.OpenMenu)}
            style={{height:"25px", width:"25px"}}
            />
          </div>
          <div className='menu-links'>
            <NavLink to={'/'}  onClick={()=> props.setOpenMenu(!props.OpenMenu)}>Home</NavLink>
            <NavLink to={'/category-personal'}  onClick={()=> props.setOpenMenu(!props.OpenMenu)}>Personal</NavLink>
            <NavLink to={'/category-bills'}  onClick={()=> props.setOpenMenu(!props.OpenMenu)}>Bills</NavLink>
            <NavLink to={'/category-groceries'}  onClick={()=> props.setOpenMenu(!props.OpenMenu)}>Groceries</NavLink>
          </div>
          <div className='menu-buttons'>
            <button className='menu-add'>
                + Add Transaction
            </button>
            <button 
            className='menu-logout'
            onClick={()=>{
                toast.success("Logout successfully");
                props.setuser(false);
                props.setuserId(null);
                localStorage.removeItem("userId");
                props.navigate("/")
            }}>Logout</button>
          </div>
        </div>
    </div> 
  ):''
}

export default Menu