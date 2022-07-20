import React, { useEffect } from 'react'
import styled from 'styled-components'
import Comment from './Comment'
import { useSelector } from 'react-redux'
import axios from '../axios'

const Container = styled.div``

const NewCommentUser = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`
const Input = styled.input`
    border: none;
    border-bottom: 1px solid ${({theme})=>theme.textSoft};
    background-color: transparent;
    outline: none;
    padding: 5px;
    width: 100%;
`

export default function NewComment({videoId}) {
    const { currentUser } = useSelector((state) => state.user);

    const [comments, setComments] = React.useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`/comments/${videoId}`);
                setComments(res.data);
            } catch (err) {}
        };
        fetchComments();
    }, [videoId]);
  return (
    <Container>
        <NewCommentUser>
            <Avatar src={currentUser.img}/>
            <Input placeholder='Add a comment...'/>
        </NewCommentUser>
        {comments.map(comment =>(
            <Comment key = {comment._id} comment = {comment}/>
        ))}
    </Container>
  )
}
