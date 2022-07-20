import { Avatar, IconButton } from '@material-ui/core'
import React from 'react'
import './chat.css'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import MicIcon from '@material-ui/icons/Mic';

export default function Chat() {
  return (
    <div className='chat'>
        <div className='chat_header'>

          <Avatar/>

          <div className='chat_headerInfo'>
            <h3>Room name</h3>
            <p>Last Seen at...</p>
          </div>

          <div className='chat_headerRight'>
            <IconButton>
              <SearchOutlinedIcon/>
            </IconButton>
            <IconButton>
              <AttachFileIcon/> 
            </IconButton>
            <IconButton>
              <MoreVertIcon/>
            </IconButton>
          </div>
        </div>

        <div className='chat_body'>
          <p className='chat_message'>
            <span className='chat_name'>Ahn</span>
            This is Ahn message 
            <span className='chat_timestamp'>
              {new Date().toUTCString() }
            </span>
          </p>
          
          <p className='chat_message chat_receiver'>
            <span className='chat_name'>Ahn</span>
            This is Ahn message 
            <span className='chat_timestamp'>
              {new Date().toUTCString() }
            </span>
          </p>

          <p className='chat_message'>
            <span className='chat_name'>Ahn</span>
            This is Ahn message 
            <span className='chat_timestamp'>
              {new Date().toUTCString() }
            </span>
          </p>

        </div>

        <div className='chat_footer'>
          <EmojiEmotionsOutlinedIcon/>
          <form>
            <input placeholder='Type a message' type='text'/>
            <button type='submit'> Send a message </button>
          </form>
          <MicIcon/>
        </div>
    </div>
  )
}
