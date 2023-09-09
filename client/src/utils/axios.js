import axios from 'axios';
const token = localStorage.getItem('token');

const userInstance = axios.create({
    baseURL:"http://localhost:5000/users",
    // timeout:2000,
    // withCredentials:true,
    headers: {
        Authorization: `Bearer ${token}`,
        Accept:"application/json"
    }
})
const authInstance = axios.create({
    baseURL:"http://localhost:5000/auth",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})
const videoInstance = axios.create({
    baseURL:"http://localhost:5000/video",
    // timeout:2000,
    // withCredentials:true,
    headers: {
        Authorization: `Bearer ${token}`,
        Accept:"application/json"
    }
})
const commentInstance = axios.create({
    baseURL:"http://localhost:5000/comments",
    // timeout:2000,
    // withCredentials:true,
    headers: {
        Authorization: `Bearer ${token}`,
        Accept:"application/json"
    }
})
const adminAuthInstance = axios.create({
    baseURL:"http://localhost:5000/admin",
   
    headers: {
        Accept:"application/json"
    }
})


export {userInstance , authInstance , videoInstance , commentInstance,adminAuthInstance}