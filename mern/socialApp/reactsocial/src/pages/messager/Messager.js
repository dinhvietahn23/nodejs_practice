import React, { useContext, useEffect, useState } from 'react'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversation from '../../components/conversation/Conversation.js'
import Message from '../../components/message/Message'
import TopBar from '../../components/topBar/TopBar'
import './Messager.css'
import axios from '../../axios.js'
import { AuthContext } from '../../contexts/AuthContext'
import Pusher from 'pusher-js'


export default function Messager() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [dataListen, setDataListen] = useState(null)
    const { user } = useContext(AuthContext);


    useEffect(() => {
        const getConversations = async () => {
          try {
            const res = await axios.get("/conversations/" + user._id);
            setConversations(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getConversations();
    }, [user._id]);

    useEffect (() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`/messages/${currentChat._id}`)
                setMessages(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMessages()
    }, [currentChat])

    const handleSubmit = async () => {
        const newMessagePost = {
            sender: user._id,
            conversationId: currentChat._id,
            text: newMessage
        }
        try {
            const res = await axios.post(`/messages`, newMessagePost)
            setMessages([
                ...messages,
                res.data
            ])
        } catch (error) {
            console.log(error)
        }
    }
    // console.log(messages)

    const pusher = new Pusher('89585e5e1db79d63b3ea', {
        cluster: 'ap1'
      });
  
    const channel = pusher.subscribe('messages');
    channel.bind("pusher:subscription_succeeded", function () {
        var me = channel.members.me;
        var userId = me.id;
        var userInfo = me.info;
        console.log(me)
      });
      
    console.log(channel)
    
    useEffect(() => {
        console.log(messages)
        const channel = pusher.subscribe('messages');
        
        channel.bind('inserted', (data) => {
            console.log(data.sender === user._id)
            console.log(messages)
            console.log(newMessage)
            if (data.sender !== user._id) {
                setMessages(prevData => {
                    return [...prevData,data]
                })
            }
            
            // if (data.sender !== user._id){
            //     console.log(data)
            //     setDataListen(data)
            //     console.log(messages)
            //     // setMessages([...messages, data])
            // }
            
        });
        // const res = axios.get(`/messages/${currentChat._id}`)
        // console.log(res.data)
        return ()=>{
          channel.unbind_all();
          channel.unsubscribe();
        }
    
      }, [channel.bind])
    
      console.log(messages)
    //   console.log(dataListen)

    //   useEffect(()=>{
    //     setMessages([
    //         ... messages,
    //         dataListen
    //     ])
    //   },[dataListen!=null, dataListen])

    return (
        <div>
            <TopBar/>
            <div className='messager'>
                <div className='messager_chatMenu'>
                    <div className='chatMenu_wrapper'>
                        
                        <input placeholder='Search for friends' className='chatMenu_wrapper_input'/>
                            {conversations.map((c)=>(
                                <div onClick={() => setCurrentChat(c)}>
                                    <Conversation key={c._id} conversation={c} currentUser={user}/>
                                </div>

                            ))}
                        
                    </div>    
                </div>

                <div className='messager_chatBox'>
                    <div className='chatBox_wrapper'>
                        {
                            currentChat?
                        <>
                        <div className='chatBox_wrapper_top'>
                            {messages.map((m)=>(
                               <Message message = {m} own= {m.sender === user._id? true:false}/> 
                            ))}
                            {/* <Message/>
                            <Message own = {true}/>
                            <Message/>
                            <Message own = {true}/>
                            <Message/>
                            <Message own = {true}/>
                            <Message/>
                            <Message own = {true}/>
                            <Message/>
                            <Message own = {true}/>
                            <Message/>
                            <Message own = {true}/>
                            <Message/> */}
                        </div>
                        <div className='chatBox_wrapper_bottom'>
                            <textarea 
                                className='chatMesseage_input' 
                                placeholder='Write something...'
                                onChange={(e)=>{setNewMessage(e.target.value)}}
                                value = {newMessage}
                                ></textarea>
                            <button className='chatSubmitBtn' onClick={handleSubmit}>Send</button>
                        </div> </>: <span className='noConversationText'>Open a conversation to start chat</span>}
                    </div>
                </div>

                <div className='messager_chatOnline'>
                    <div className='chatOnline_wrapper'>
                        <ChatOnline/>
                        <ChatOnline/>
                        <ChatOnline/>
                    </div>
                </div>
            </div>
        </div>
    )
}
