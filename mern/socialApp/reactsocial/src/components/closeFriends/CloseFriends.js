import React from 'react'

export default function CloseFriends({user}) {
  return (
    <li className='sidebar_friend'>
        <img className='sidebar_friend_img' 
            src={user.profilePicture}
        />
        <span className='sidebar_friend_name'>{user.username}</span>
    </li>
  )
}
