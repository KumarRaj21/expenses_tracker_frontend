import React from 'react'
import '../AllTransactions/all.css'
import Cards from '../../cards/Card';
import PieChart from '../../PieChart/PieChart';
const Bills = (props) => {
    const BillsArray = props.TransactionArray ? props.TransactionArray.filter(item => item.category === "bills") : [];
    return (Array.isArray(BillsArray) && BillsArray.length !== 0) ? (
        <>

            <div className="all-container">
                <div className="all-head">
                    Categorised by Bills Income / Expenses
                </div>
                <div className='piechart'> 
                <p>Welcome <span style={{color:"skyblue", fontWeight:600}}>{props.Username}</span> 👋,
                <br/>Pie Chart of your income and expenses, <br />
                we are providing easiest way to manage expenses, Get a full view so you know where to save. Track spending, incoming amount without any fraud.</p>
                    <PieChart transactions={BillsArray} />
                </div>
                <div className="cardlist">
                    {
                        BillsArray.map((item, index) => {
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
        <h1>Do Not Have any Bill Transactions, Add your Transactions </h1>
        <button onClick={() => {
        props.setbtnpopup(!props.btnpopup);
    }} style={{ cursor: 'pointer' }}>
        + Add Transaction
    </button>
    </div>
}

export default Bills