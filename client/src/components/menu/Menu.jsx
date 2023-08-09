import React from 'react'
import styled from 'styled-components'
import LoopNet from '../../../public/img/loopnet.jpg'
import HomeIcon from '@mui/icons-material/Home';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SettingsIcon from '@mui/icons-material/Settings';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { Link } from 'react-router-dom';



const Container = styled.div`
flex:1;
background-color:${({theme}) =>theme.bg};
color:${({theme}) => theme.text};
height:100vh;
position:sticky;
top:0;
`

const Wrapper = styled.div`
padding: 18px 26px;
`

const Logo = styled.div`
display: flex;
align-items:center;
gap: 5px;
margin-bottom:15px;
font-weight:bold;
font-size:35px
`

const Img = styled.div`
height:25px;
`

const Item = styled.div`
display: flex;
align-items:center;
cursor:pointer;
padding: 7.5px 0px;
gap:10px;

&:hover {
    background-color: ${({theme})=> theme.soft}
}
`

const Hr = styled.div`
width:130px;
margin: 15px 0px;
border:0.5px solid ${({theme}) =>theme.soft};
 `

function Menu( {darkMode , setDarkMode} ) {
    return (
        <Container>
            <Wrapper>
            <Link to="/" style={{textDecoration:"none", color:"inherit"}}>
                <Logo >
                    <Img src={LoopNet} />
                    LoopNet
                </Logo>
             </Link>   
                <Item>
                <HomeIcon /> Home
                </Item>
                    <Hr />
                <Item>
                <SubscriptionsIcon />Subscription
                </Item>
                    <Hr />
                <Item>
                <CloudUploadIcon /> Upload
                </Item>
                    <Hr />
                <Item>
                    <CloudUploadIcon /> Upload
                </Item>
                    <Hr />
                <Item>    
                    <SettingsIcon /> Setting
                </Item>
                    <Hr />
                <Item onClick={(e)=> setDarkMode(!darkMode)}>    
                    <SettingsBrightnessIcon />{darkMode ? "Light": "Dark"} Mode
                </Item>
            </Wrapper>
        </Container>
    )
}

export default Menu
