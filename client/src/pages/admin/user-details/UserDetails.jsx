import React, { useEffect, useState } from 'react';
import './UserDetails.scss';
import { adminInstance } from '../../../utils/axios';
import { toast } from 'react-toastify';

const UserDetails = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from the server
    adminInstance.get('/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleBlockUser = async (userId) => {

    const userBlock = users.find((user) => user?._id === userId);
    const isBlocked = userBlock?.isBlocked;

    if (isBlocked) {
      await adminInstance.put(`/users/${userId}/blockUser`);
    } else {
      await adminInstance.put(`/users/${userId}/unblockUser`)
    }

    setUsers((prevDetails) =>
      prevDetails.map((user) =>
        user._id === userId ? { ...user, isBlocked: !isBlocked } : user
      )
    )


  };



  return (
    <div className='user-container'>
      <table className="user-table">
      <thead>
          <tr>
            <th>userId</th>
            <th>Username</th>
            <th>Email</th>
            <th>Subscribers</th>
            <th>Actions</th>
          
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user?._id}>
              <td>{user?._id}</td>
              <td>{user?.username}</td>
              <td>{user?.email}</td>
              <td>{user?.subscribers}</td>
              <td>

                <button onClick={() => handleBlockUser(user?._id)} style={{ background: user?.isBlocked ? "blue" : "red" }}>
                  {user?.isBlocked ? 'Unblock' : 'Block'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
