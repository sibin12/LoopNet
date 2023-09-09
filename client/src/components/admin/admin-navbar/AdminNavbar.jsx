import React from 'react'
import './adminnavbar.scss'
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../../../redux/adminAuthSlice';
import { useNavigate } from 'react-router-dom';

function AdminNavbar() {
const dispatch = useDispatch()
const navigate = useNavigate()
const {admin} = useSelector((state)=>state.adminAuth)

const handleLogout =()=>{
  dispatch(adminLogout())
  navigate('/admin')
}
  return (
    <div className='container'>
        <div className='navbar'>
    
        <span className='navbar-component'><HomeIcon /></span>
        <span className='navbar-component'>Users</span>
        <span className='navbar-component'>Videos</span>
        {/* <span className='navbar-component'>Shorts</span> */}
        <span className='navbar-component'><AccountCircleIcon /><h4 onClick={handleLogout}>Logout</h4></span>

        </div>
    </div>
  )
}

export default AdminNavbar
