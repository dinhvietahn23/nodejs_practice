import React from 'react'
import Feed from '../../components/feed/Feed'
import RightBar from '../../components/rightbar/RightBar'
import SideBar from '../../components/sidebar/SideBar'
import TopBar from '../../components/topBar/TopBar'
import "./Home.css"

export default function Home() {
  return (
    <div>
      <TopBar/>
      <div className='homeContainer'>
        <SideBar/>
        <Feed/>
        <RightBar/>
      </div>
    </div>
  )
}
