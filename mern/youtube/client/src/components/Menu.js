import React from 'react'
import styled from 'styled-components'
import HomeIcon from '@material-ui/icons/Home';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import VideoLibraryOutlinedIcon from '@material-ui/icons/VideoLibraryOutlined';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import LibraryMusicOutlinedIcon from '@material-ui/icons/LibraryMusicOutlined';
import SportsBasketballOutlinedIcon from '@material-ui/icons/SportsBasketballOutlined';
import SportsEsportsOutlinedIcon from '@material-ui/icons/SportsEsportsOutlined';
import MovieCreationOutlinedIcon from '@material-ui/icons/MovieCreationOutlined';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import LiveTvOutlinedIcon from '@material-ui/icons/LiveTvOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import SettingsBrightnessOutlinedIcon from '@material-ui/icons/SettingsBrightnessOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Container = styled.div`
    flex:1;
    background-color: ${({theme})=>theme.bg};
    height: 100vh;
    color: ${({theme})=>theme.text};
    font-size: 14px;
    position: sticky;
    top: 0;
    overflow-y: scroll;
    ::-webkit-scrollbar{
    width: 5px;
}
`

const Wrapper = styled.div`
    padding: 18px 26px;
`

const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: bold ;
    margin-bottom: 25px;
    
`

const Img = styled.img`
    height: 25px;
`

const Item = styled.div `
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    padding: 7.5px;
    &:hover{
        background-color: ${({theme})=>theme.soft};
    };
`
const Hr = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid ${({theme})=>theme.soft};
`

const Login = styled.div``

const Button = styled.button`
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 15px;
    background-color: transparent;
    color: #3ea6ff;
    border: 1px solid #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    margin-top: 10px;
    cursor: pointer;
`

export default function Menu({darkMode, setDarkMode}) {
    const currentUser = useSelector(state => state.user.currentUser)
  return (
    <Container>
        <Wrapper>
            <Link to='/' style={{textDecoration:"none", color:"inherit"}}>
                <Logo>
                    <Img src='https://www.iconpacks.net/icons/2/free-youtube-logo-icon-2431-thumb.png'/>
                    Youtube
                </Logo>
            </Link>
            
            <Item>
                <HomeIcon/>
                Home
            </Item>

            <Link to='/trends' style={{textDecoration:"none", color:"inherit"}}>
                <Item>
                    <ExploreOutlinedIcon/>
                    Explore
                </Item>
            </Link>
            
            <Link to='/subcriptions' style={{textDecoration:"none", color:"inherit"}}>
                <Item>
                    <SubscriptionsOutlinedIcon/>
                    Subscription
                </Item>
            </Link>
            
            <Hr/>

            <Item>
                <VideoLibraryOutlinedIcon/>
                Library
            </Item>
            <Item>
                <HistoryOutlinedIcon/>
                History
            </Item>
            <Hr/>
            {!currentUser&& (
                <>
                <Login>
                    Sign in to like videos, comment, and subscribe
                    <Link to = '/signin' style={{textDecoration:"none"}}>
                        <Button> <AccountCircleOutlinedIcon/>SIGN IN</Button>
                    </Link>
                 </Login>
                <Hr/>
                </>
                
            )}
            
            <Item>
                <LibraryMusicOutlinedIcon/>
                Music
            </Item>
            <Item>
                <SportsBasketballOutlinedIcon/>
                Sports
            </Item>
            <Item>
                <SportsEsportsOutlinedIcon/>
                Gaming
            </Item>
            <Item>
                <MovieCreationOutlinedIcon/>
                Movie
            </Item>
            <Item>
                <ListOutlinedIcon/>
                News
            </Item>
            <Item>
                <LiveTvOutlinedIcon/>
                Live
            </Item>
            <Item>
                <SettingsOutlinedIcon/>
                Settings
            </Item>
            <Item>
                <FlagOutlinedIcon/>
                Report
            </Item>
            <Item>
                <HelpOutlineOutlinedIcon/>
                Help
            </Item>
            <Item onClick={()=>setDarkMode(!darkMode)}>
                <SettingsBrightnessOutlinedIcon/>
                {darkMode?"Light":"Dark"} Mode
            </Item>
        </Wrapper>
    </Container>
  )
}
