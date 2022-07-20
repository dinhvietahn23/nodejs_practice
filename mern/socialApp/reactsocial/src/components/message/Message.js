import React from 'react'
import './Message.css'

export default function Message({message,own}) {
  return (
    <div className={own? 'message own':'message'}>
        <div className='message_top'>
            <img
                className='message_top_img'
                src = 'https://images.unsplash.com/photo-1644982647844-5ee1bdc5b114?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'
                alt=''
            />
            <p className='message_top_text'>
                {message.text}
            </p>
        </div>
        <div className='message_bottom'>1 hour ago</div>
    </div>
  )
}
