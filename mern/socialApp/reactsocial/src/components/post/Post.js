import React, { useEffect, useState } from 'react'
import "./Post.css"
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp';
import {Users} from '../../dummyData'
import axios from '../../axios'
import {format} from "timeago.js"
import {Link} from 'react-router-dom'

export default function Post({post}) {
    const [user, setUser] = useState({})
    const [likes, setLikes] = useState(post.likes)

    useEffect(()=>{
        const fetchUser = async () => {
        const res = await axios.get(`users/${post.userId}`)
        setUser(prev => prev=res.data)
        }
        fetchUser()
    },[post.userId])

    return (
        <div className='post'>
            <div className='postWrapper'>
                <div className='postTop'>
                    <div className='postTop_right'>
                        <Link to={`/profile/${user.username}`}>
                            <img 
                                src={user.profilePicture}
                                alt = ''
                                className='postTop_right_profileImg'
                            />
                        </Link>
                        
                        <span className='postTop_right_username'>
                            {user.username}
                        </span>
                        <span className='postTop_right_postdate'>{format(post.createdAt)}</span>
                    </div>
                    <div className='postTop_left'>
                        <MoreVertIcon/>
                    </div>
                </div>
                <div className='postCenter'>
                    <span className='postCenter_postText'>{post?.description}</span>
                    <img
                        src= {post.image}
                        alt=''
                        className='postCenter_postImg'
                    />
                </div>

                <div className='postBottom'>
                    <div className='postBottom_left'>
                        <ThumbUpAltIcon className='postBottom_left_likeIcon'/>
                        <FavoriteSharpIcon className='postBottom_left_likeIcon'/>
                        <span className='postBottom_left_likeCount'>{likes.length} {likes.length<=1?"like":"likes"}</span>
                    </div>
                    <div className='postBottom_right'>
                        <span className='postBottom_right_comment'>{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
