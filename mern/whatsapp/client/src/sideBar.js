import React from 'react'
import "./sideBar.css"
import DonutLargeIcon from'@material-ui/icons/DonutLarge'
import { Avatar, IconButton } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';

export default function SideBar() {
  return (
    <div className='sideBar'>

        <div className='sidebar_header'>
          <Avatar/>
          <div className='sidebar_headerRight'>
            <IconButton>
              <DonutLargeIcon/>
            </IconButton>
            <IconButton>
              <ChatIcon/>
            </IconButton>
            <IconButton>
              <MoreVertIcon/>
            </IconButton>
          </div>
        </div>

        <div className="sidebar_search">
          <div className='sidebar_searchContainer'>
            <SearchOutlinedIcon/>
            <input placeholder="Seacrh of start new chat" type="text"/>
          </div>
        </div>

        <div className = "sidebar_chats">
            <SidebarChat/>
            <SidebarChat/>
            <SidebarChat/>
        </div>
    </div>
  )
}
