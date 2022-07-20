import { Avatar } from '@material-ui/core'
import React from 'react'
import "./SidebarChat.css"

export default function SidebarChat() {
  return (
    <div className='sidebarChat'>
        <Avatar/>
        <div className='sidebarChat_info'>
            <h2>Name</h2>
            <p>This is last messeage</p>
        </div>
    </div>
  )
}
