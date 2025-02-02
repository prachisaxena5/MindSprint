import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'

const Navbar = ({darkmode,setDarkMode}) => {
  const navigate=useNavigate();
  const gotoquiz=()=>{
    navigate('/Quiz');
  }
  return (
    <div className="front">
    <div className="navbar">
        <img  className="ques-logo" src="https://cdn-icons-png.flaticon.com/512/671/671829.png" alt="ques"/>
    </div>
     <div className="Body">
     <h2>Welcome to MindSprint</h2>
 </div>
 <button className='btn' onClick={gotoquiz} id={darkmode ?"dark":"light"}>Start the quiz
 </button>
 </div>
  )
}

export default Navbar