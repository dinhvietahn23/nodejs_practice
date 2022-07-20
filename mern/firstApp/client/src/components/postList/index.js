import React from "react";
import { Grid } from "@material-ui/core";
import Post from "./post";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions'
import { postState$ } from "../../redux/selectors";

export default function PostList() {
    const dispatch = useDispatch()
    const posts = useSelector(postState$);
    
    console.log('[Post-list, posts]', posts)
    React.useEffect(()=>{
        console.log("Start get pos in dispatch")
        dispatch(actions.getPosts.getPostsRequest())
    }, [dispatch]);
    return(
        <Grid container spacing = {2} alignItems = 'stretch'>
            {posts.map((post) =>(
                <Grid item xs={12} sm={6}>
                    <Post key = {post._id} post = {post}/>
                    <p>Post 3</p>
                </Grid>
            ))}
        </Grid>
    )
}