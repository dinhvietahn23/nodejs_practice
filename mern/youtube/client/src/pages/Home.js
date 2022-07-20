import React from 'react'
import Card from '../components/Card'
import styled from 'styled-components'
import axios from '../axios.js'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
` 

export default function Home({type}) {

  // useState video
  const [videos, setVideos] = React.useState([])
  // useEffect load video and set video 
  React.useEffect (()=>{
    const fetchVideos = async () =>{
      const result = await axios.get(`videos/${type}`);
      console.log(type,result)
      setVideos(result.data)
    };

    fetchVideos();

  }, [type])
  // return card with map of video 
  return (
    <Container>
        {videos.map((video)=>(
          <Card key = {video._id} video = {video}/>
        ))}
    </Container>
  )
}
