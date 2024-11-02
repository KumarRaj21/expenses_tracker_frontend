import React from 'react'
import '../../App.css'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
const Navbar = ({ navigate, setTransactionArray, setbtnpopup, btnpopup, setuser, setuserId }) => {
    return (
        <div className='app-header'>
            <h1>Expensify</h1>
            <div className='app-header-buttons'>
                <NavLink to={'/'}>
                    Home
                </NavLink>
                <NavLink to={'/category-personal'}>
                    Personal
                </NavLink>
                <NavLink to={'/category-bills'}>
                    Bills
                </NavLink>
                <NavLink to={'/category-groceries'}>
                    Groceries
                </NavLink>
                <button onClick={() => {
                    setbtnpopup(!btnpopup)
                }}
                    style={{ width: "30%" }}>
                    + Add Transaction
                </button>
                <button
                    style={{ backgroundColor: "rgb(211, 80, 32)" }}
                    onClick={() => {
                        toast.success("Logout successfully");
                        setuser(false);
                        setuserId(null);
                        setTransactionArray([])
                        localStorage.removeItem("userId");
                        navigate("/")
                    }}>Logout</button>
            </div>

        </div>
    )
}

export default Navbar