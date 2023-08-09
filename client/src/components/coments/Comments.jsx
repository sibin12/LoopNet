import React from 'react'
import { styled } from 'styled-components'
import Comment from '../comment/Comment';

const Container = styled.div`
`;

const NewComment = styled.div`
display:flex;
align-item:center;
gap:10px;
`;

const Avatar = styled.div`
width: 50px;
height:45px;
border-radius: 50%;
background-color:grey;
`;

const Inputs = styled.input`
border: none;
outline:none;
padding: 5px;
width:100%;
`;

function Comments() {
  return (
      <Container> 
        <NewComment>
            <Avatar src='https://www.pngmart.com/files/22/Spiral-PNG-Photo.png'>
            </Avatar >
                      <Inputs type="text" placeholder='Add a comment...'/>
        </NewComment>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </Container>
  )
}

export default Comments
