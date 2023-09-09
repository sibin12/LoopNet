import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { commentInstance, userInstance } from '../../../utils/axios';
import {format} from 'timeago.js'   
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
const Container = styled.div`
display : flex;
gap : 10px;
margin : 30px 0px
`;

const Avatar = styled.div`
width: 50px;
height:45px;
border-radius: 50%;
background-color:grey;
`;

const Details = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`;

const Name = styled.span`
font-size: 16px;
font-weight:500;
color: ${({theme})=>theme.text};

`;

const Date =styled.span`
font-size: 11px;
font-weight:400;
margin-left:5px;
`;

const Text = styled.span`
display:flex;
color: ${({theme})=>theme.text};
font-size:14px;
`;
const Icon = styled.span`
margin-left:auto;
cursor:pointer;
`

function Comment({comment}) {
  const { user } = useSelector((state) => state.auth);
  const [state,setState]= useState(false)
  const [userName, setUserName] = useState({})

  useEffect(()=>{
    userInstance.get(`/find/${comment.userId}`)
    .then((res)=>{
      setUserName(res.data)
    })
  }, [comment.userId ,state])

  const handleDelete = (e)=>{
   
      e.preventDefault()
      commentInstance.delete(`/${comment._id}`)
      .then((res)=>{
        setState(true)
        console.log(res.data,"deleted comment");
      
      }).catch((err)=>{
        console.log(err.message);
      })
  }
  if(state){
    return null;
  }

  return (
    <Container>
  {userName?.image ?
   <Avatar src={userName?.image} />
   :
   <Avatar src='https://www.pngmart.com/files/22/Spiral-PNG-Photo.png'/> 
   }
        <Details>
          <Name>{userName?.username}</Name> <Date> {format(comment?.createdAt)}</Date>
          <Text>{comment?.text}</Text> 
          
        </Details>
        {user?.username === userName?.username &&
        ( <Icon>
          <DeleteIcon onClick={handleDelete} /> 
          </Icon>)}
       
    </Container>
  )
}

export default Comment
