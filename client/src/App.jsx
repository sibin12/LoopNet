import styled, { ThemeProvider } from 'styled-components';
import Menu from './components/menu/Menu';
import Navbar from './components/navbar/Navbar';
import { darkTheme, lightTheme } from './utils/Theme';
import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home';
import Video from './pages/video/Video';

const Container = styled.div`
 display:flex`;
const Main = styled.div`
flex:7;
background-color: ${({theme}) => theme.bgLighter};
color: black;

`
const Wrapper = styled.div`
padding:22px 10px;
`

function App() {

  const [darkMode, setDarkMode] = useState(true)

   return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>

        <Container>
          <BrowserRouter>
          <Menu  darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path='/'>
                  <Route index element={<Home />} />
                  <Route path='video' >
                    <Route path=':id' element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            
             
            </Wrapper>
          </Main>
          </BrowserRouter>
        </Container>
    </ThemeProvider>
   )
}

export default App
