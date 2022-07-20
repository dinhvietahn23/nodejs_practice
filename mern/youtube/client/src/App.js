// import './App.css';
import styled, { ThemeProvider } from 'styled-components'
import Menu from './components/Menu.js';
import NavBar from './components/NavBar.js';
import { darkTheme, lightTheme } from './utils/Theme.js';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Home from './pages/Home.js';
import Video from './pages/Video.js';
import SignIn from './pages/SignIn.js';
import Search from './pages/Search.js';

const Contanier = styled.div`
  display: flex;
`

const Main = styled.div`
  flex:7;
  background-color: ${({theme})=>theme.bgLighter};
`
const Wrapper = styled.div`
  padding: 20px 50px;
`

function App() {
  const [darkMode, setDarkMode] = React.useState(true)
  return (
    <ThemeProvider theme={darkMode? darkTheme:lightTheme}>
      <Contanier>
        <BrowserRouter>
          <Menu darkMode= {darkMode} setDarkMode = {setDarkMode}/>
          
          <Main>
            <NavBar/>

            <Wrapper>
              <Routes>
                <Route path='/'>
                  <Route index element={<Home type={"random"}/>}/>
                  <Route path = 'trends' element={<Home type="trends"/>}/>
                  <Route path = 'subcriptions' element={<Home type="sub"/>}/>
                  <Route path='search' element={<Search/>}/>
                  <Route path='signin' element={<SignIn/>}/>
                  <Route path='video'> 
                    <Route path=":id" element={<Video/>}/>
                  </Route>
                </Route>
              </Routes>
            </Wrapper>

          </Main>
        </BrowserRouter>
      
    </Contanier>
    </ThemeProvider>
    
  );
}

export default App;
