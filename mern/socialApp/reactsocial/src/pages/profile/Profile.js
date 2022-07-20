import React, { useEffect, useState } from 'react'
import Feed from '../../components/feed/Feed'
import RightBar from '../../components/rightbar/RightBar'
import SideBar from '../../components/sidebar/SideBar'
import TopBar from '../../components/topBar/TopBar'
import './Profile.css'
import axios from '../../axios'
import { useParams } from 'react-router-dom'

export default function Profile() {
    const [user, setUser] = useState({})
    const params = useParams()
    console.log(params)
    const username = useParams().username
    useEffect(()=>{
        const fetchUser = async () => {
        const res = await axios.get(`users?username=${username}`)
        setUser(prev => prev=res.data)
        }
        fetchUser()
    },[username])

    return (
        <div>
          <TopBar/>
          <div className='profile'>
            <SideBar/>
            <div className='profile_right'>
                <div className='profile_right_top'>
                    <div className='profile_right_top_cover'>
                        <img className='profile_coverImg' src={user.coverPicture} alt =''/>
                        <img className='profile_userImg' src={user.profilePicture} alt =''/>
                    </div>
                    
                    <div className='profile_right_top_information'>
                        <h4 className='profile_info_name'>{user.username}</h4>
                        <span className='profile_info_desc'>{user.description}</span>
                    </div>

                </div>
                <div className='profile_right_bottom'>
                    <Feed username = {user.username}/>
                    <RightBar user = {user}/>
                </div>
            </div>
          </div>
        </div>
      )
}
