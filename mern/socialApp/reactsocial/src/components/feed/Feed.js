import React, { useContext, useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import './Feed.css'
import {Posts} from '../../dummyData'
import axios from '../../axios'
import {AuthContext} from '../../contexts/AuthContext'

export default function Feed({username}) {
  const [posts, setPosts] = useState([])
  const {user} = useContext(AuthContext)

  useEffect(()=>{
    const fetchPost = async () => {
      const res = username
        ? await axios.get(`posts/profile/${username}`)
        : await axios.get(`posts/timeline/${user._id}`)
      console.log(res, username)
      setPosts(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt)-new Date(p1.createdAt)
      }))
    }
    fetchPost()
  },[username,user._id])
  return (
    <div className='feed'>
      <div className='feed_wrapper'>
          <Share/>
          {posts.map((post)=>(
            <Post key= {post._id} post = {post}/>
          ))}
      </div>
    </div>
  )
}
