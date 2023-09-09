import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import styled from '@emotion/styled'
import AdminHome from './pages/admin/admin-home/AdminHome';
import { useSelector } from 'react-redux';
import AdminLogin from './pages/admin/admin-login/AdminLogin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Container = styled.div`
display: flex;
`;


function Admin() {
const {admin} =useSelector((state)=>state.adminAuth)
  console.log(admin,"admin");

  return (
    
    <Container>
        <BrowserRouter>
         <Routes>
          {admin && (<Route path='/admin' element= {<AdminHome />} />) }

  {!admin &&  <Route path='/admin' element= {<AdminLogin />} />
}          
          
         </Routes>
        </BrowserRouter>
        <ToastContainer />
    </Container>
  )
}

export default Admin
