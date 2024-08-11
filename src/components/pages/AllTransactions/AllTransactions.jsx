import React from 'react'
import './all.css'
import Cards from '../../cards/Card';
import PieChart from '../../PieChart/PieChart';
const AllTransactions = (props) => {
    return (Array.isArray(props.TransactionArray) && props.TransactionArray.length !== 0) ? (
        <>

            <div className="all-container">
                <div className="all-head">
                    All Transactions
                </div>
                <div className='piechart'> 
                <p>Welcome <span style={{color:"skyblue", fontWeight:600}}>{props.Username}</span> 👋,
                <br/>Pie Chart of your income and expenses, <br />
                we are providing easiest way to manage expenses, Get a full view so you know where to save. Track spending, incoming amount without any fraud.</p>
                    <PieChart transactions={props.TransactionArray} />
                </div>
                <div className="cardlist">
                    {
                        props.TransactionArray.map((item, index) => {
                            return (<Cards item={item} key={index} id={item._id}
                            del={props.del}
                            openEdit={props.openEdit} setopenEdit={props.setopenEdit} 
                            updateId={index}
                            update={props.update}
                            index={index}
                            updateArray={props.updatedArray}
                            />)
                        })
                    }
                </div>
            </div>
        </>) : <div className='all-empty'>
        <h1>Do Not Have any Transactions, Add your Transactions </h1>
        <button onClick={() => {
        props.setbtnpopup(!props.btnpopup);
    }} style={{ cursor: 'pointer' }}>
        + Add Transaction
    </button>
    </div>
}

export default AllTransactions