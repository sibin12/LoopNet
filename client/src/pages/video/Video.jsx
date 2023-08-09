import React from 'react'
import { styled } from 'styled-components';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ShareIcon from '@mui/icons-material/Share';
import Comments from '../../components/coments/Comments';
import Card from '../../components/card/Card';

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
 

function Video() {
  return (
    <Container>
        <Content>
            <VideoWrapper>
            <iframe
             width="100%"
             height="470" 
             src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
             frameborder="0"
             allowfullscreen>
             </iframe>
            </VideoWrapper>
            <Title>Test Video</Title>
            <Details>
              <Info>88 views   June 22, 2022</Info> 
              <Buttons>
                <Button><ThumbUpIcon /> 223</Button>
                <Button><ThumbDownIcon />Dislike </Button>
                <Button><LibraryAddIcon /> Save </Button>
                <Button><ShareIcon /> Share </Button>
                </Buttons> 
            </Details>
            <Hr />
            <User>
                <UserInfo>
                    <Image />
                    <UserDetail>
                        <UserName>username</UserName>
                        <UserCounter>100 Subscribers</UserCounter>
                        <Description>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni blanditiis nemo doloribus optio vitae quis incidunt nobis quo facilis nostrum.</Description>
                    </UserDetail>
                        <Subscribe>subscribe</Subscribe>
                </UserInfo>
            </User>
            < Hr />
            <Comments />
        </Content>
        <Recommendation>
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
