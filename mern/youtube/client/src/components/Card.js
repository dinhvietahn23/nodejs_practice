import axios from '../axios.js'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
// import {format} from "timeago.js"

const Container = styled.div`
    width: ${(props)=>props.type === 'sm' ? "100%":"275px"};
    margin-bottom: ${(props)=>props.type === 'sm' ? "10px":"45px"};
    cursor: pointer;
    display: ${(props)=>props.type === 'sm' && "flex"};
    gap: 5px;
`

const Image = styled.img`
    width: 100%;
    height: ${(props)=>props.type === 'sm' ? "100px":"150px"};
    object-fit: cover;
    /* flex: 1; */
`

const Details = styled.div `
    display: flex;
    margin-top:${(props)=>props.type !== 'sm' && "16px"};
    gap: 12px;
    /* flex: 1; */
`

const ChannelImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: ${(props)=>props.type === 'sm' && "none"};
`

const Texts = styled.div`

`

const Title = styled.h1`
    font-size: 16px;
    color: ${({theme})=>theme.text};
`

const ChannelName = styled.h2`
    font-size: 14px;
    color: ${({theme})=>theme.textSoft};
    margin: 9px 0px;
`

const Info = styled.div`
    font-size: 14px;
    color: ${({theme})=>theme.textSoft};
`

export default function Card({type, video}) {
    // get video
    // get user from video.userid
    const [channel, setChannel] = React.useState({})

    React.useEffect(()=>{
        const getChannel = async () => {
            const res = await axios.get(`/users/find/${video.userId}`)
            setChannel(res.data)
        }
        getChannel()
    }, [video.userId])

  return (
    <Link to={`/video/${video._id}`} style={{textDecoration:"none"}}>
        <Container type={type}>
            <Image type={type} src='https://images.unsplash.com/photo-1657763889247-95a99edff8fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'/>
            <Details type={type}>
                <ChannelImage type={type} src='https://images.unsplash.com/photo-1657597245745-541f2e63924d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80'/>
                <Texts>
                    <Title>{video.title}</Title>
                    <ChannelName>{channel.name}</ChannelName>
                    <Info> {video.views} views ~ {video.createdAt}</Info>
                </Texts>
            </Details>
        </Container>
    </Link>
    
  )
}
