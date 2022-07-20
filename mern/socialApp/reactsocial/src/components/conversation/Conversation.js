import axios from '../../axios.js'
import React, { useEffect, useState } from 'react'
import './Conversation.css'

export default function Conversation({conversation, currentUser}) {
  const [user, setUser] = useState({})
  useEffect(()=>{
    const friendId = conversation.members.find(m=> m !== currentUser._id)

    const getUser = async () =>{
      try {
        const res = await axios(`/users?userId=${friendId}`)
        console.log(res.data)
        setUser(res.data)
      } catch (error) {
        console.log(error)
      }
      
    }
    getUser()
  },[])
  return (
    <div className='conversation'>
        <img className='conversation_img' 
            src={user.profilePicture}
        />
        <span className='conversation_name'>{user.username}</span>
    </div>
  )
}
