import React, { useContext } from 'react'
import "./TopBar.css"
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatIcon from '@material-ui/icons/Chat';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export default function TopBar() {
    
    const{user} = useContext(AuthContext)

    return (
        <div className='topbarContainer'>
            <div className='topbarLeft'>
                <Link to = '/' style={{textDecoration: "none"}}>
                    <span className='logo'>Tews</span>  
                </Link>
                
            </div>

            <div className='topbarCenter'>
                <div className='topbarCenter_searchBar'>
                    <SearchIcon className='topbarCenter_searchBar_searchIcon'/>
                    <input placeholder='Search for post, friend or video' className='topbarCenter_searchBar_searchInput'/>
                </div>
            </div>

            <div className='topbarRight'>
                <div className='topbarRight_topbarLinks'>
                    <span className='topbarRight_topbarLinks_topLink'> Homepage</span>
                    <span className='topbarRight_topbarLinks_topLink'> Timeline</span>
                </div>
                <div className='topbarRight_icons'>

                    <div className='topbarRight_icons_item'>
                        <PersonIcon/>
                        <span className='topbarRight_icons_badge'>1</span>
                    </div>

                    <div className='topbarRight_icons_item'>
                        <NotificationsIcon/>
                        <span className='topbarRight_icons_badge'>2</span>
                    </div>

                    <div className='topbarRight_icons_item'>
                        <Link to='/message'>
                            <ChatIcon/>
                        </Link>
                        <span className='topbarRight_icons_badge'>3</span>
                    </div>

                </div>
                <Link to={`/profile/${user.username}`}>
                    <img src ={user.profilePicture}
                        alt=""
                        className="topbarRight_image"
                    />
                </Link>
                
            </div>
        </div>
    )
}
