import styled, { ThemeProvider } from 'styled-components';
import Menu from './components/menu/Menu';
import Navbar from './components/navbar/Navbar';
import { darkTheme, lightTheme } from './utils/Theme';
import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/user/home/Home';
import Video from './pages/user/video/Video';
import Register from './pages/user/register/Register';
import { useSelector } from 'react-redux';
import Search from './pages/user/search/Search';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageUploaderWithManualCrop from './components/dummy';

const Container = styled.div`
 display:flex
 `;

const Main = styled.div`
flex:7;
background-color: ${({theme}) => theme.bgLighter};
color: black;
overflow:hidden;
`;

const Wrapper = styled.div`
padding:22px 10px;
`;

function App() {

  const [darkMode, setDarkMode] = useState(false)
  const { user } = useSelector((state) => state.auth);
  
   return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>

          <BrowserRouter>
            <Navbar />
        <Container>
          <Menu  darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Wrapper>
              <Routes>
                <Route path='/'>
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="search" element={<Search />} />

                  <Route path="register" element={ <Register />} />
                  <Route path='video' >
                    <Route path=':id' element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </Container>
          </BrowserRouter>
        <ToastContainer />
    </ThemeProvider>
   )
}

export default App
