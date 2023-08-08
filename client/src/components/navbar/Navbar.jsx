import React from 'react'
import styled from '@emotion/styled'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Navbar.css'


const Container = styled.div`
position:sticky;
top:0;
background-color:${({theme}) =>theme.bg};
height:56px;
`
const Wrapper = styled.div`
display:flex;
align-items: center;
justify-content: flex-end;
height: 100%;
padding: 0px 20px;
position: relative;
`

const Search = styled.div`
width:35%;
position: absolute;
left:0px;
right:0px;
margin:auto;
display:flex;
align-items: center;
justify-content:space-between;
padding:5px;
border:1px solid #ccc;
border-radius:3px;
margin-top:10px;
`

const Input = styled.div`
padding: 10px;
border: 1px solid #ccc;
border-radius: 4px;
font-size: 16px;
`;

const Button = styled.div`
width:90px;
height:auto;
padding: 5px 15px;
background-color: transparent;
border: 1px solid #3ea6ff;
color:#3ea6ff;
border-radius: 3px;
font-weight: 500;
margin-top:10px;
cursor: pointer;
display:flex;
align-items: center;
gap: 5px;
`


function Navbar() {
  return (
<Container>
    <Wrapper>
  <Search>
    <input type='text' placeholder='SEARCH' />
    <SearchIcon />
  </Search>
  <Button>
<AccountCircleIcon />
    SIGN IN
  </Button>
</Wrapper>

    </Container>
  )
}

export default Navbar
