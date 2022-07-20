import './App.css';
import React, { useEffect, useState } from 'react';
import SideBar from './sideBar';
import Chat from './chat';
import Pusher from 'pusher-js'
import axios from './axios'

function App() {

  const [messages, setMessages] = useState([])

  useEffect(()=>{
    console.log("Starttsssssss")
    axios.get('/messages/sync')
      .then(res=>{
        setMessages(res.data)
      })
  },[])

  useEffect(() => {
    const pusher = new Pusher('89585e5e1db79d63b3ea', {
      cluster: 'ap1'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (data) => {
      setMessages([...messages, data])
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [messages])

  console.log("this is message in mongo", messages)

  return (
    <div className="app">
      {/* Side bar  */}
      <div className='app_body'>
        <SideBar/>
        <Chat/>
      </div>
      
      {/* Chat component */}
    </div>
  );
}

export default App;
