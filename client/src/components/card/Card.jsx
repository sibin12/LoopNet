import React from 'react'
import { Link } from 'react-router-dom';
import { styled } from 'styled-components'

const Container = styled.div`
width:270px;
background-color:lightblue;
margin-bottom: ${(props)=> props.type === "sm" ? "10px" : "45px"};
cursor:pointer;
display: ${(props)=> props.type === "sm" &&"flex"};
border-radius:10px
`;

const Image = styled.img`
width: 100%;
height: ${(props)=> props.type === "sm" ? "120px" : "160px"};
background-color:grey;
border-radius:10px;
`;

const Details = styled.div`
display: flex;
margin-top: ${(props)=> props.type !== "sm" && "16px"};
margin:${(props)=>props.type ==="sm" && "5px"};
gap:12px;
`;

const UserImage = styled.img`
width:36px;
height:36px;
border-radius:50%;
background-color:grey;
display: ${(props)=> props.type === "sm" && "none"};
`;

const Texts = styled.div`
`;

const Title = styled.h1`
font-size: 16px;
font-weight: 500;
color: ${({theme}) => theme.text}
`;

const UserName = styled.h2`
font-size: 14px;
color: ${({theme})=> theme.text};
margin: 9px 0px; 
`;

const Info = styled.div`
font-size: 11px;
color: ${({theme})=>theme.text}
`

function Card({type}) {
  return (
    <Link to="/video/test" style={{textDecoration:"none"}}>
    <Container type={type}>
     <Image type={type} src='https://www.careerguide.com/career/wp-content/uploads/2020/03/Floating-head-for-GIF-1.gif.gif' />
     {/* <Image src='https://www.pngmart.com/files/22/Spiral-PNG-Photo.png' /> */}
     {/* <Image src='https://thumbs.gfycat.com/DefinitiveEnormousJumpingbean-size_restricted.gif' /> */}
     <Details  type={type}>
      <UserImage type={type} src='https://www.pngmart.com/files/22/Spiral-PNG-Photo.png' />
      <Texts>
        <Title>Test video</Title>
        <UserName>username</UserName>
        <Info>88 views  1 day ago</Info>
      </Texts>
      </Details>
    </Container>
     </Link>
  )
}

export default Card
