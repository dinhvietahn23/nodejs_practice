import React from 'react'
import "./RightBar.css"
import CakeSharpIcon from '@material-ui/icons/CakeSharp';
import {Users} from '../../dummyData'
import Online from '../online/Online';

export default function RightBar({user}) {

  const HomeRightbar=()=>{
    return(
      <div>
        <div className='rightbar_birthdayContainer'>
          <CakeSharpIcon className='rightbar_birthdayContainer_icon'/>
          <span className='rightbar_birthdayContainer_text'>
            <b>Pola Foster</b> and<b> 3 other friends</b> have a birthday today.
          </span>
        </div>

        <img 
          className='rightbar_ad' 
          src="https://images.unsplash.com/photo-1653882227370-619d32b6ae24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
        />

        <h4 className='rightbar_title'>
          Online friends
        </h4>

        <ul className='rightbar_friendList'>

          {Users.map((u)=>(
            <Online key = {u.id} user = {u}/>
          ))}

        </ul>
      </div>
    )
  }

  const ProfileRightBar = () =>{
    return (
      <div>
        <h4 className='rightbar_title'>User information</h4>
        <div className='rightbar_info'>
          <div className='rightbar_infoItem'>
            <span className='rightbar_infoItem_key'>City:</span>
            <span className='rightbar_infoItem_value'> {user.city}</span>
          </div>
          <div className='rightbar_infoItem'>
            <span className='rightbar_infoItem_key'>From:</span>
            <span className='rightbar_infoItem_value'> {user.from}</span>
          </div>
          <div className='rightbar_infoItem'>
            <span className='rightbar_infoItem_key'>Relationship:</span>
            <span className='rightbar_infoItem_value'> 
              {user.relationship===1? "Single":user.relationship===2? "Married":"Other"}
            </span>
          </div>
        </div>
        <h4 className='rightbar_title'>User friends</h4>
        <div className='rightbar_followings'>
          <div className='rightbar_following'>
            <img
              src='https://images.unsplash.com/photo-1657277368599-31bebdda19a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"'
              alt =''
              className='rightbar_following_img'
            />
            <span className='rightbar_following_name'>Carser</span>
          </div>

          <div className='rightbar_following'>
            <img
              src='https://images.unsplash.com/photo-1657277368599-31bebdda19a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"'
              alt =''
              className='rightbar_following_img'
            />
            <span className='rightbar_following_name'>Carser</span>
          </div>

          <div className='rightbar_following'>
            <img
              src='https://images.unsplash.com/photo-1657277368599-31bebdda19a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"'
              alt =''
              className='rightbar_following_img'
            />
            <span className='rightbar_following_name'>Carser</span>
          </div>

          <div className='rightbar_following'>
            <img
              src='https://images.unsplash.com/photo-1657277368599-31bebdda19a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"'
              alt =''
              className='rightbar_following_img'
            />
            <span className='rightbar_following_name'>Carser</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='rightbar'>
      <div className='rightbar_wrapper'>
        {user?<ProfileRightBar/>:<HomeRightbar/>}
    
      </div>
    </div>
  )
}
