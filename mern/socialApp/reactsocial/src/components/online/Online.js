import React from 'react'

export default function Online({user}) {
  return (
    <li className='rightbar_friend'>
        <div  className='rightbar_friend_profile'>
        <img
            className='rightbar_friend_profile_img'
            src = {user.profilePicture}
        />

        <span className='rightbar_friend_profile_online'></span>
        </div>

        <span className='rightbar_friend_username'>{user.username}r</span>
    </li>
  )
}
