import React, { useEffect } from 'react'
import styled from 'styled-components'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import PlaylistAddCheckOutlinedIcon from '@material-ui/icons/PlaylistAddCheckOutlined';
import ReplyOutlinedIcon from '@material-ui/icons/ReplyOutlined';
import NewComment from '../components/NewComment';
import Card from '../components/Card';
import {useDispatch, useSelector} from 'react-redux'
import { useLocation } from 'react-router';
import axios from '../axios';
import { dislike, fetchSuccess, like } from '../redux/videoSlice';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { async } from '@firebase/util';
import { subscription } from '../redux/userSlice';

const Container = styled.div`
    display: flex;
    gap: 24px;
    color: ${({theme})=>theme.text};
`

const Content = styled.div`
    flex: 5;
`

const VideoWrapper = styled.div``

const Title = styled.h1``

const Details = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Info = styled.span`
    color: ${({theme})=>theme.textSoft};
`
const Buttons = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

`
const Button = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
`

const Hr = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid ${({theme})=>theme.textSoft};
`

const Recommendation = styled.div`
    flex:2;
`
const Channel = styled.div`
    display: flex;
    justify-content: space-between;
`

const ChannelInfo = styled.div`
    display: flex;
    gap: 20px;
`
const Image= styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`
const ChannelDetail = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 90%;
`
const ChannelName = styled.span`
    font-weight: 700;
`
const ChannelCounter = styled.span`
    margin-top: 5px;
    margin-bottom: 20px;
    color: ${({theme}) => theme.textSoft};
    font-size: 12px;
`
const Description = styled.p`
    font-size: 14px;
    /* max-width: 90%; */
`
const Subscribe = styled.button`
    background-color: #cc1a00;
    font-weight: 700;
    color: white;
    border: none;
    border-radius: 3px;
    height: max-content;
    padding: 10px 20px;
    cursor: pointer;
`

const VideoFrame = styled.video`
    width:100%;
    height:500px;
    object-fit: cover;
`

export default function Video() {
    const {currentUser} = useSelector((state)=>state.user)
    const {currentVideo} = useSelector((state)=>state.video)
    const dispatch = useDispatch();

    const path = useLocation().pathname.split("/")[2]

    console.log(path)

    // const [video, setVideo] = React.useState({})
    const [channel, setChannel] = React.useState({})

    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const videoRes = await axios.get(`videos/find/${path}`)
                const channelRes = await axios.get(`users/find/${videoRes.data.userId}`)
                console.log(videoRes.data)
                // setVideo(videoRes.data)
                setChannel(channelRes.data)
                dispatch(fetchSuccess(videoRes.data))
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    },[path, dispatch])

    const handleLike = async ()=>{
        await axios.put(`/users/like/${currentVideo._id}`)
        dispatch(like(currentUser._id))
    }

    const handleDislike = async ()=>{
        await axios.put(`/users/dislike/${currentVideo._id}`)
        dispatch(dislike(currentUser._id))
    }

    const handleSub = async () =>{
        !currentUser.subscribedUsers.includes(channel._id)
            ? await axios.put(`/users/subcribe/${channel._id}`)
            : await axios.put(`/users/unsubcribe/${channel._id}`)
        dispatch(subscription(channel._id))
    }
 
  return (
    <Container>
        <Content>
            <VideoWrapper>
                <VideoFrame src={currentVideo.videoUrl} controls/>
                <iframe
                    width="100%"
                    height = "500"
                    src='https://www.youtube.com/embed/TMXT0d6Yb28'
                    title='Video youtube'
                    frameBorder="0"
                    allow= 'accelerometer;autoplay;'
                    allowFullScreen
                ></iframe>
            </VideoWrapper>
            <Title> {currentVideo.title}</Title>
            <Details>
                <Info>{currentVideo.views} views ~ {currentVideo.createdAt}</Info>
                <Buttons>
                    <Button onClick={handleLike}>
                        {currentVideo.likes?.includes(currentUser._id)?<ThumbUpIcon/>:<ThumbUpAltOutlinedIcon/>} {currentVideo.likes?.length}
                        {/* <ThumbUpAltOutlinedIcon/> */}
                    </Button>
                    <Button onClick={handleDislike}>
                    {currentVideo.dislikes?.includes(currentUser._id)?<ThumbDownIcon/>:<ThumbDownOutlinedIcon/>} Dislike
                    </Button>
                    <Button>
                        <ReplyOutlinedIcon/> Share
                    </Button>
                    <Button>
                        <PlaylistAddCheckOutlinedIcon/> Save
                    </Button>
                </Buttons>
            </Details>
            <Hr/>

            <Channel>
                <ChannelInfo>
                    <Image src={channel.img}/>
                    <ChannelDetail>
                        <ChannelName>{channel.name}</ChannelName>
                        <ChannelCounter>{channel.subscribers} Subscribers</ChannelCounter>
                        <Description>
                            {currentVideo.desc}
                        </Description>
                    </ChannelDetail>
                </ChannelInfo>
                <Subscribe onClick={handleSub}>{currentUser.subscribedUsers.includes(channel._id)?"SUBSCRIBED":"SUBSCRIBE"}</Subscribe>
            </Channel>

            <Hr/>
            <NewComment videoId={currentVideo._id}/>

        </Content>
        {/* <Recommendation>
            <Card type = 'sm'/>
            <Card type = 'sm'/>
            <Card type = 'sm'/>
            <Card type = 'sm'/>
            <Card type = 'sm'/>
            <Card type = 'sm'/>
            <Card type = 'sm'/>
            <Card type = 'sm'/>
            <Card type = 'sm'/>
            <Card type = 'sm'/>
        </Recommendation> */}

    </Container>

  )
}
