import React from 'react'
import './card.css'
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
const Cards = (props) => {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };
  const formattedDate = formatDate(props.item.date);
  return (
    <div className='card'>
        <div className='card-head'>
          <p className='card-head-1'>Date: {formattedDate}</p>
          <div className='card-head-2'>
          <FaRegEdit
                        onClick={() => {
                            props.setopenEdit(true)
                            props.update(props.item._id)
                        }}
                        style={{ height: '30px', width: '30px', cursor: 'pointer' }}
                    />
                    <MdDeleteForever
                        onClick={() => { props.del(props.id) }}
                        style={{ height: '30px', width: '30px', cursor: 'pointer' }}
                    />
          </div>
        </div>
        <div className='card-body'>
          <p className='card-category'>paid / recieved category of : {props.item.category}</p>
          <p className={props.item.type === "expense" ? "red" : "green"}>
                 ₹ {props.item.amount} 
          </p>
        </div>
    </div>
  )
}

export default Cards