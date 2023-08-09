import React from 'react'
import { styled } from 'styled-components'
   
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
color: ${({theme})=>theme.text};
font-size:14px;
`;

function Comment() {
  return (
    <Container>
        <Avatar />
        <Details>
          <Name>username</Name> <Date>2 jun 2022</Date>
          <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, eveniet aperiam. Possimus earum, in quasi sint illum consequuntur.</Text>
        </Details>
    </Container>
  )
}

export default Comment
