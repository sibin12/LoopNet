
import React from 'react';
import './UserDetails.scss';

const UserDetails = () => {
  let user = [{
    id:1,
    name:"sibin",
    email:"sibin@gmail.com"
  },
  {
    id:1,
    name:"alwin",
    email:"alwin@gmail.com"
  },{
    id:1,
    name:"hari",
    email:"hari@gmail.com"
  }]
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {user.map((user) => (
          <tr key={user?.id}>
            <td>{user?.id}</td>
            <td>{user?.name}</td>
            <td>{user?.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserDetails;
