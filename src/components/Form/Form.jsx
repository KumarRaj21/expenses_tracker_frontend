import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Form.css'
import { IoCloseCircleSharp } from "react-icons/io5";
import { toast } from 'react-toastify';
import axios from 'axios';
const Form = (props) => {

    const [Inputs, setInputs] = useState({
        amount: "",
        category: "",
        date: new Date(),
        type: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value })
    }
    const handleDateChange = (date) => {
        setInputs({ ...Inputs, date });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (props.userId) {
                const response = await axios.post("https://expenses-tracker-backend-8wfn.onrender.com/api/k2/add-transaction", {
                    amount: Inputs.amount,
                    category: Inputs.category,
                    date: Inputs.date,
                    type: Inputs.type,
                    id: props.userId
                });

                console.log("Response Data:", response.data);
                console.log(Inputs)
                setInputs({
                    amount: "",
                    category: "",
                    date: new Date(),
                    type: ""
                })
                toast.success("Transaction added");
                props.setbtnpopup(!props.btnpopup);
                props.TransactionsFun();

            } else {
                console.log("User ID is not defined");
            }
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    }


    return (props.btnpopup ? (<div className='popup'>
        <div className='popup-in'>
            <div className='popup-head'>
                <h1>Add New Transaction</h1>
                <IoCloseCircleSharp
                    style={{ cursor: "pointer", height: "30px", width: "30px" }}
                    onClick={() => {
                        props.setbtnpopup(!props.btnpopup)
                    }} />
            </div>
            <div className='popup-body'>
                <form onSubmit={handleSubmit}>
                    <div className='amount-field'>
                        <label>Amount</label>
                        <input
                            type='number'
                            name='amount'
                            placeholder='Enter Your Amount'
                            value={Inputs.amount}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='category-field'>
                        <label>category</label>
                        <select
                            name='category'
                            value={Inputs.category}
                            onChange={handleChange}
                            required
                        >
                            <option value='' disabled>Select Category</option>
                            <option value='personal'>Personal</option>
                            <option value='bills'>Bills</option>
                            <option value='groceries'>Groceries</option>
                        </select>
                    </div>

                    <div className='date-field'>
                        <label>Date</label>
                        <DatePicker
                            selected={Inputs.date}
                            onChange={handleDateChange}
                            dateFormat='dd/MM/yyyy'
                            required
                        />
                    </div>
                    <div className='type-field'>
                        <label>Select type</label>
                        <select
                            name='type'
                            value={Inputs.type}
                            onChange={handleChange}
                            required
                        >
                            <option value='' disabled>Select Type</option>
                            <option value='income'>Income</option>
                            <option value='expense'>Expense</option>
                        </select>
                    </div>

                    <button type='submit' className='button-submit'>+ Add Transaction</button>
                </form>
            </div>
        </div>
    </div>) : '')

}

export default Form