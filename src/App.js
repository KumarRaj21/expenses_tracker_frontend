import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Home from './components/pages/Home/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Form from './components/Form/Form';
import Update from './components/update/Update';
import AllTransactions from './components/pages/AllTransactions/AllTransactions';
import Personal from './components/pages/Personal/Personal';
import Bills from './components/pages/Bills/Bills';
import Groceries from './components/pages/Groceries/Groceries';
import { RiMenu5Fill } from "react-icons/ri";
import Menu from './components/Menu/Menu';
function App() {
  const [userId, setuserId] = useState(localStorage.getItem("userId") || null)
  const [user, setuser] = useState(!!userId);
  const [TransactionArray, setTransactionArray] = useState([]);
  const [Username, setUsername] = useState("");
  const [btnpopup, setbtnpopup] = useState(false);
  const [openEdit, setopenEdit] = useState(false);
  const [updatedArray, setupdatedArray] = useState(null);
  const [OpenMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    if (userId) {
      console.log('User ID:', userId);
    }
  }, [userId]);


  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const TransactionsFun = async () => {
    if (userId) {
      try {
        const response = await axios.get(`https://expenses-tracker-backend-8wfn.onrender.com/api/k2/get-transaction/${userId}`);

        if (response.data && response.data.transaction) {
          setTransactionArray(response.data.transaction);
        } else {
          console.error('Transaction data not found in response');
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
  };
  useEffect(() => {
    TransactionsFun();
  }, [userId]);

  const del = async (cardid) => {
    await axios.delete(`https://expenses-tracker-backend-8wfn.onrender.com/api/k2/delete-transaction/${cardid}`, { data: { id: userId } }).then(() => {
      toast.success("Task Deleted");
      window.location.reload()
      TransactionsFun();
    })
  }

  const update = (id) => {
    const transactionToUpdate = TransactionArray.find(item => item._id === id);
    setupdatedArray(transactionToUpdate);
  }
  const navigate = useNavigate();

  return (
    <>
      {
        user ? (<div className='app-container'>
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
                  localStorage.removeItem("userId");
                  navigate("/")
                }}>Logout</button>
            </div>

          </div>
          <div className='menu'>
            <div className='menu-head'>
              Expensify
            </div>
            <RiMenu5Fill
              onClick={() => setOpenMenu(!OpenMenu)}
              style={{ height: "25px", width: "25px" }} />

          </div>
          <div className='app-body'>
            <Routes>
              <Route path='/' element={<AllTransactions btnpopup={btnpopup} setbtnpopup={setbtnpopup}
                Username={Username} del={del} setuser={setuser} user={user} setuserId={setuserId}
                TransactionArray={TransactionArray} setTransactionArray={setTransactionArray} update={update} openEdit={openEdit}
                setopenEdit={setopenEdit} setupdatedArray={setupdatedArray} updatedArray={updatedArray} />} />

              <Route path='/all-transactions' element={<AllTransactions btnpopup={btnpopup} setbtnpopup={setbtnpopup}
                Username={Username} del={del} setuser={setuser} user={user} setuserId={setuserId}
                TransactionArray={TransactionArray} setTransactionArray={setTransactionArray} update={update} openEdit={openEdit}
                setopenEdit={setopenEdit} setupdatedArray={setupdatedArray} updatedArray={updatedArray} />} />
              <Route path='/category-personal' element={<Personal btnpopup={btnpopup} setbtnpopup={setbtnpopup}
                Username={Username} del={del} setuser={setuser} user={user} setuserId={setuserId}
                TransactionArray={TransactionArray} setTransactionArray={setTransactionArray} update={update} openEdit={openEdit}
                setopenEdit={setopenEdit} setupdatedArray={setupdatedArray} updatedArray={updatedArray} />} />

              <Route path='/category-bills' element={<Bills btnpopup={btnpopup} setbtnpopup={setbtnpopup}
                Username={Username} del={del} setuser={setuser} user={user} setuserId={setuserId}
                TransactionArray={TransactionArray} setTransactionArray={setTransactionArray} update={update} openEdit={openEdit}
                setopenEdit={setopenEdit} setupdatedArray={setupdatedArray} updatedArray={updatedArray} />} />

              <Route path='/category-groceries' element={<Groceries btnpopup={btnpopup} setbtnpopup={setbtnpopup}
                Username={Username} del={del} setuser={setuser} user={user} setuserId={setuserId}
                TransactionArray={TransactionArray} setTransactionArray={setTransactionArray} update={update} openEdit={openEdit}
                setopenEdit={setopenEdit} setupdatedArray={setupdatedArray} updatedArray={updatedArray}
              />} />

            </Routes>
          </div>
          <Form setbtnpopup={setbtnpopup} btnpopup={btnpopup} userId={userId} TransactionsFun={TransactionsFun} />
          <Update openEdit={openEdit} setopenEdit={setopenEdit} TransactionArray={TransactionArray} setTransactionArray={setTransactionArray}
            setuserId={setuserId} userId={userId} update={update} updatedArray={updatedArray} setupdatedArray={setupdatedArray} TransactionsFun={TransactionsFun} />

          <Menu setOpenMenu={setOpenMenu} OpenMenu={OpenMenu} setuser={setuser} setuserId={setuserId} navigate={navigate} />
        </div>) : <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login setuserId={setuserId} setuser={setuser}
            setUsername={setUsername} />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      }
    </>

  );
}

export default App;
