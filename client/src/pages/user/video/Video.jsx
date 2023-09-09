import React,{ useEffect, useState } from 'react'
import { styled } from 'styled-components';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ShareIcon from '@mui/icons-material/Share';
// import Comments from '../../components/coments/Comments';
import Comments from '../../../components/user/coments/Comments';
import Card from '../../../components/user/card/Card';
import {format} from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../../../redux/videoSlice";
import { userInstance, videoInstance } from '../../../utils/axios';




const Container = styled.div`
display: flex;
gap: 24px;
`;

const Content = styled.div`
flex: 5;
`;

const VideoWrapper = styled.div`
`;

const Title = styled.div`
font-size: 18px;
font-weight: 400;
margin-top: 20px;
margin-bottom: 10px;
color: ${({theme})=> theme.text}
`;

const Details = styled.div`
display: flex;
align-items: center;
justify-content: space-between
`;

const Info = styled.div`
color:grey;
`;

const Buttons = styled.div`
display: flex;
gap:20px;
color: ${({theme})=> theme.text}
`;

const Button = styled.div`
display: flex;
align-items:center;
cursor: pointer;
`;

const Hr = styled.hr`
margin: 15px 0px;
border: 0.5px solid grey;
`;

const Recommendation = styled.div`
flex: 2;
`;

const User = styled.div`
dispaly: flex;
justify-content: space-between;
`;

const UserInfo = styled.div`
display: flex;
gap:20px;
`;

const Image = styled.img`
width: 50px;
height:45px;
border-radius: 50%;
background-color:grey;
`;

const UserDetail = styled.div`
display: flex;
flex-direction: column;
color: ${({theme})=> theme.text}
`;

const UserName = styled.span`
 
`;

const UserCounter = styled.span`
margin-top:5px;
margin-bottom: 20px;
color: ${({theme})=> theme.text}
font-size: 12px;
`;

const Description = styled.p`
font-size: 14px;
`;

const Subscribe = styled.button`
background-color:#3ea6ff;
font-weight: 500;
color:white;
border: none;
border-radius:3px;
height: max-content;
padding: 10px 20px;
cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;
 

function Video() {
    const { user } = useSelector((state) => state.auth);
    const { currentVideo } = useSelector((state) => state.video);
    const dispatch = useDispatch();
    const [userName, setUserName] = useState({})
  
    const path = useLocation().pathname.split("/")[2];

    useEffect(()=>{
        videoInstance.get(`/find/${path}`)
        .then((res)=>{
            console.log(res.data,'current video');
            dispatch(fetchSuccess(res.data))
        })
        .catch((err)=>{
            console.log(err);
        })

        userInstance.get(`/find/${currentVideo.userId}`)
        .then((res)=>{
            console.log("userdetails",res.data);
            setUserName(res.data)
        }).catch((err)=>{
            console.log("username error",err.message);
        })
    },[path, dispatch])

    const handleLike = async ()=>{
        await userInstance.put(`/like/${currentVideo._id}`)
         dispatch(like(user._id))
    }

    const handleDislike = async ()=>{
       await userInstance.put(`/dislike/${currentVideo._id}`)
        dispatch(dislike(user._id))
    }


  return (
    <Container>
        <Content>
            <VideoWrapper>
            <VideoFrame  src={currentVideo?.videoUrl} controls />
            </VideoWrapper>
            <Title>{currentVideo?.title}</Title>
            <Details>
              <Info>{currentVideo?.views?.length}views   {format(currentVideo?.createdAt)}</Info> 
              <Buttons>
              <Button onClick={handleLike}>
              {currentVideo.likes?.includes(user?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {currentVideo.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo.dislikes?.includes(user?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}{" "}
              Dislike
            </Button>
                <Button><LibraryAddIcon /> Save </Button>
                <Button><ShareIcon /> Share </Button>
                </Buttons> 
            </Details>
            <Hr />
            <User>
                <UserInfo>
                    <Image />
                    <UserDetail>
                        <UserName>{userName?.username}</UserName>
                        <UserCounter>{userName?.subscribers}subscribers</UserCounter>
                        <Description>{userName?.desc}</Description>
                    </UserDetail>
                        <Subscribe>subscribe</Subscribe>
                </UserInfo>
            </User>
            < Hr />
            <Comments  videoId ={currentVideo._id} />
        </Content>
        <Recommendation  tags ={currentVideo.tags}>
            <Card type="sm"/>
            <Card type="sm"/>
            <Card type="sm"/>
            <Card type="sm"/>
            <Card type="sm"/>
            <Card type="sm"/>
            <Card type="sm"/>
            <Card type="sm"/>
            <Card type="sm"/>
           
        </Recommendation>
    </Container>
  )
}

export default Video;
