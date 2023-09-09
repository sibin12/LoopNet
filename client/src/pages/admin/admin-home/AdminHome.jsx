import React from 'react'
import AdminNavbar from '../../../components/admin/admin-navbar/AdminNavbar'
import AdminLogin from '../admin-login/AdminLogin'
import UserDetails from '../user-details/userDetails'

function AdminHome() {
  return (
    <div>
     <AdminNavbar /> 

<UserDetails />
    </div>
  )
}

export default AdminHome
