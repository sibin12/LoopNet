import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {  userInstance, videoInstance } from '../../../utils/axios';
import formData from 'form-data'
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
// import EditVideo from '../../../components/user/edit-video/EditVideo';
import EditVideo from '../../../components/user/edit-video/EditVideo/'
const Container = styled.div`

@media (max-width: 484px) {
   margin:10px;
   
    margin-top:80px;
}
  
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  margin: 50px 50px 0 10px;
`;

const CoverPhoto = styled.img`
  width: 100%;
  max-height: 300px;
  min-height:180px;
  min-width:260px;
  object-fit: cover;
  cursor: pointer;

`;

const ProfileImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: -100px;
  border: 5px solid #fff;
  cursor: pointer;

  
  @media (max-width: 484px){
    max-width:150px;
    max-height:150px;
  }

`;

const UserName = styled.h1`
  gap: 10px;
  font-size: 24px;
  margin: 10px 0;
`;

const UserBio = styled.p`
  font-size: 16px;
  text-align: center;
  margin-bottom: 10px;
`;



const HiddenFileInput = styled.input`
  display: none;
`;

const NavBar = styled.div`
  display: flex;
  width:auto;
  max-width:18rem;
  background-color: #007BFF;
  color: #fff;
//   padding: 10px 0;
//   position: fixed;
  left: 0;


`;

const NavItem = styled.div`
  flex: 1;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
  padding: 10px
`;

const Hr = styled.hr`
margin-top:50px;
width:70vw;
`;

const VideosTable = styled.table`
  width: 80%;
  border-collapse: collapse;
  margin-top: 20px;

 
`;

const TableHeader = styled.thead`
  background-color: #007BFF;
  color: #fff;

`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #ddd;
  }
`;

const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: left;
  
`;

const VideosDisplay = styled.img`
max-width:140px;
max-height:90px;
min-width:110px;
min-height:70px;
`;


const fileInputStyle = {
    display: 'none',
  };
  
const TableVisible = styled.span`
 
@media (max-width:484px){
    display:none;
  }
`


const Profile = () => {
  const toggle = useSelector((state) => state.auth.toggle);
  const { user } = useSelector((state) => state.auth);

  const fileInputRef = useRef(null);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedCoverImage, setSelectedCoverImage] = useState(null);

  const handleImageClick = (e) => {
    // Trigger the file input when a profile image or cover image container is clicked
    fileInputRef.current.name = e.currentTarget.getAttribute('data-fieldname');
    fileInputRef.current.click();
  };
  

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    console.log(file,"file for image uploding");
    if (file) {
      const formData = new FormData();
      // Get the field name from the clicked element's data-fieldname attribute
    const fieldName = e.target.getAttribute('data-fieldname');
     alert(fieldName)
    // Append the file to the FormData with the correct field name
    formData.append(fieldName, file);

    console.log('FormData content:');
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    //   formData.append(e.target.name, file);
    console.log(formData,"😊😊😊😊");
      try {
         
        userInstance.post('/upload-image',{formData},{
        headers: {
            'Content-Type': 'multipart/form-data',
          },
        })


        // if (response.status === 201) {
        //     // Handle a successful upload and update the selected image state
        //     if (e.target.name === 'profileImage') {
        //       setSelectedProfileImage(URL.createObjectURL(file));
        //     } else if (e.target.name === 'coverImage') {
        //       setSelectedCoverImage(URL.createObjectURL(file));
        //     }
        //   } else {
        //     // Handle an error response
        //     toast.error('Image upload failed:');
        //     console.error('Image upload failed:', response.data);
        //   }
      } catch (error) {
        console.log(error.message);
      }



    }
} 
  const [selectedTab, setSelectedTab] = useState('uploaded'); // 'uploaded' or 'saved'
// Example video data
 const [videos, setVideos ]= useState([])
useEffect(() => {
    try {
 videoInstance.get(`/find-videos/${user?._id}`)
 .then((res)=>{
    setVideos(res.data)
 })
    } catch (error) {
        toast.error(error.message)
    }
}, [])

const [videoOpen, setVideoOpen] = useState(null)
const handleVideos = (videoId)=>{
    setVideoOpen(videoId)
}



  return (
    < Container style={{ marginLeft: toggle ? '200px' : '60px' }} >
    <ProfileContainer>
   
      <div  data-fieldname="coverImage"
          onClick={handleImageClick} >

      <CoverPhoto src="https://via.placeholder.com/1200x300" alt="Cover Photo"  />
      </div>

      <div  data-fieldname="profileImage"
          onClick={handleImageClick}>
      <ProfileImage
        src="https://via.placeholder.com/200"alt="Profile" data-fieldname="profileImage"/>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={fileInputStyle}
        />
    
      <UserName>
        {user?.username} <BorderColorIcon  />
      </UserName>
      <UserBio>subscribers: {user?.subscribers}</UserBio>
    </ProfileContainer>

    <NavBar   >
        <NavItem
          onClick={() => setSelectedTab('uploaded')}
          style={{ backgroundColor: selectedTab === 'uploaded' ? '#0056b3' : '' }}
        >
          Uploaded Videos
        </NavItem>
        <NavItem
          onClick={() => setSelectedTab('saved')}
          style={{ backgroundColor: selectedTab === 'saved' ? '#0056b3' : '' }}
        >
          Saved Videos
        </NavItem>
      </NavBar>
        <Hr />

         {/* Render videos in a table */}
      {selectedTab === 'uploaded' && (
        <VideosTable>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Videos</TableHeaderCell>
              <TableHeaderCell>Title</TableHeaderCell>
              <TableVisible>
              <TableHeaderCell>desc</TableHeaderCell>
              <TableHeaderCell>Views</TableHeaderCell>
              <TableHeaderCell></TableHeaderCell>
              </TableVisible>
            </TableRow>
          </TableHeader>
          <tbody>
            {videos.map((video, index) => (
              <TableRow key={index}  onClick={()=> handleVideos(video?._id)}>
                <TableCell> <VideosDisplay  src={video?.imgUrl} /> </TableCell>
                <TableCell>{video?.title}</TableCell>
                <TableVisible>
                <TableCell>{video?.desc}</TableCell>
                <TableCell>{video?.views?.length}</TableCell>
                </TableVisible>
                
              </TableRow>
            ))}
          </tbody>
        </VideosTable>


)}
{videoOpen && ( <EditVideo setOpen={videoOpen} />)}
    </Container>
  );
};

export default Profile;
