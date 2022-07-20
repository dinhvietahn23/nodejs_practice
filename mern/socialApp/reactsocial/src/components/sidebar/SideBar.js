import React from 'react'
import './SideBar.css'
import RssFeedIcon from '@material-ui/icons/RssFeed';
import ChatIcon from '@material-ui/icons/Chat';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import GroupIcon from '@material-ui/icons/Group';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import HelpIcon from '@material-ui/icons/Help';
import WorkIcon from '@material-ui/icons/Work';
import EventIcon from '@material-ui/icons/Event';
import { Users } from '../../dummyData';
import CloseFriends from '../closeFriends/CloseFriends';

export default function SideBar() {
  return (
    <div className='sidebar'>
      <div className='sidebar_wrapper'>
          <ul className='sidebar_list'>
            
              <li className='sidebar_list_item'>
                <RssFeedIcon className='sidebar_item_icon'/>
                <span className='sidebar_item_text'>Feed</span>
              </li>

              <li className='sidebar_list_item'>
                <ChatIcon className='sidebar_item_icon'/>
                <span className='sidebar_item_text'>Chat</span>
              </li>

              <li className='sidebar_list_item'>
                <PlayCircleFilledIcon className='sidebar_item_icon'/>
                <span className='sidebar_item_text'>Videos</span>
              </li>

              <li className='sidebar_list_item'>
                <GroupIcon className='sidebar_item_icon'/>
                <span className='sidebar_item_text'>Group</span>
              </li>

              <li className='sidebar_list_item'>
                <BookmarksIcon className='sidebar_item_icon'/>
                <span className='sidebar_item_text'>Bookmarks</span>
              </li>

              <li className='sidebar_list_item'>
                <HelpIcon className='sidebar_item_icon'/>
                <span className='sidebar_item_text'>Jobs</span>
              </li>

              <li className='sidebar_list_item'>
                <WorkIcon className='sidebar_item_icon'/>
                <span className='sidebar_item_text'>Questions</span>
              </li>

              <li className='sidebar_list_item'>
                <EventIcon className='sidebar_item_icon'/>
                <span className='sidebar_item_text'>Events</span>
              </li>

          </ul>
          <button className='sidebar_button'>Show more</button>
          <hr className='sidebar_hr'/>
          <ul className='sidebar_friendlist'>
            {/* <li className='sidebar_friend'>
              <img className='sidebar_friend_img' src='https://images.unsplash.com/photo-1656672618546-68683c9709b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' alt=''/>
              <span className='sidebar_friend_name'>Jahn</span>
            </li> */}
            {Users.map(user=>(
              <CloseFriends key={user.id} user={user}/>
            ))}
          </ul>
      </div>
    </div>
  )
}
