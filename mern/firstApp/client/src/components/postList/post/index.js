import React from "react";
import { Avatar,Card, CardActions, CardContent, CardHeader, CardMedia, Icon, IconButton, Typography} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { useDispatch } from "react-redux";
import { updatePost } from "../../../redux/actions";

export default function Post({post}) {
    const dispatch = useDispatch()
    const onLikeBtnClick = React.useCallback(()=>{
        dispatch(updatePost.updatePostRequest({...post, likeCount: post.likeCount+1}))
    },[dispatch, post])

    return (
        <Card>
            <CardHeader 
                avatar={<Avatar>A</Avatar>}
                title = {post.author}
                subheader="April"
                action = {
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                }
            />

            <CardMedia image = "" title = "Title"/>

            <CardContent>
                <Typography variant="h5" color = "textPrimary">
                    {post.title}
                </Typography>

                <Typography variant="body2" component = "p" color = "textPrimary">
                    {post.content}
                </Typography>
            </CardContent>
            
            <CardActions>
                <IconButton onClick={onLikeBtnClick}>
                    <FavoriteIcon/>
                    <Typography component = "span" color = "textSecondary" >
                        {post.likeCount} {post.likeCount===0? "like":"likes"} 
                    </Typography>
                </IconButton>
            </CardActions>

        </Card>
    )
}