import React from 'react'
import { styled } from 'styled-components';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ShareIcon from '@mui/icons-material/Share';

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
flex: 2
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
        </Content>
        <Recommendation>recommendation</Recommendation>
    </Container>
  )
}

export default Video;
