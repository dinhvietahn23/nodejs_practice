import React, { useContext, useEffect, useRef, useState } from 'react'
import './Share.css'
import PermMediaIcon from '@material-ui/icons/PermMedia';
import LabelIcon from '@material-ui/icons/Label';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import { AuthContext } from '../../contexts/AuthContext';
import axios from '../../axios';
import {storage} from '../../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import CancelIcon from '@material-ui/icons/Cancel';
import { async } from '@firebase/util';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function Share() {
    const {user} = useContext(AuthContext)
    const [file, setFile] = useState(null)
    const desc = useRef() // lay value dc type
    const [linkFile,setLinkFile] = useState('')
    const [progress, setProgress] = useState(0)
    const [isSubmit, haveSubmit] = useState(false)

    const uploadFile =(file) =>{
        if(!file) return
        const storageRef = ref(storage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef,file)
        uploadTask.on("state_changed", 
            (snapshot)=>{
                const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100)
                console.log('Update complete',prog)
                setProgress(prog)
            },

            (err)=>console.log(err),

            ()=> {
                getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
                    console.log(url)
                    setLinkFile(url)
                })
            }
        )
    }

    const submitHandler =(e) => {
        e.preventDefault()
        uploadFile(file)
        haveSubmit(true)
    }

    useEffect(()=>{
        const newPost = {
            userId: user._id,
            description: desc.current.value,
            image: linkFile
        }

        if( linkFile!==''){
        try{
            axios.post("/posts", newPost)
            console.log('Post Doneeeee')
            haveSubmit(false)
            window.location.reload()
        } catch(error){
            console.log(error)
        }}
    },[linkFile])

    return (
        <div className='share'>
            <div className='share_wrapper'>
                <div className='share_top'>
                    <img className='share_top_profileImg' src={user.profilePicture} alt=''/>
                    <input 
                        placeholder={`What are you doing, ${user.username}?` }
                        className='share_top_input'
                        ref = {desc}
                    />
                </div>
                <hr className='share_hr'/>
                {file &&(
                    <div className='share_image_container'>
                        <img className='share_image' src={URL.createObjectURL(file)} alt/>
                        <CancelIcon className='share_image_cancel' onClick={()=>setFile(null)}/>
                        {isSubmit&&(
                        <CircularProgress  
                            className='share_submit_progress' 
                            variant='determinate' 
                            value={progress}
                        />)}

                    </div>
                )}
                <form className='share_bottom' onSubmit={submitHandler}>
                    <div className='share_bottom_options'>
                        <label htmlFor='fileImg' className='share_bottom_option'> {/* htmlFor theo cai id cua input id='fileImg'*/}
                            <PermMediaIcon htmlColor='tomato' className='share_bottom_icon'/>
                            <span className='share_bottom_shareOptionText'>Photo or Video</span>
                            <input style ={{display:"none"}} type='file' id='fileImg' accept='.png, .jpeg, .jpg' onChange={(e)=>setFile(e.target.files[0])}/>
                        </label>

                        <div className='share_bottom_option'>
                            <LabelIcon htmlColor='blue' className='share_bottom_icon'/>
                            <span className='share_bottom_shareOptionText'>Tag</span>
                        </div>

                        <div className='share_bottom_option'>
                            <LocationOnIcon htmlColor='green' className='share_bottom_icon'/>
                            <span className='share_bottom_shareOptionText'>Location</span>
                        </div>

                        <div className='share_bottom_option'>
                            <EmojiEmotionsIcon htmlColor='goldenrod' className='share_bottom_icon'/>
                            <span className='share_bottom_shareOptionText'>Feelings</span>
                        </div>
                    </div>
                    <button className='share_bottom_share' type='submit'>Share</button>
                </form>
            </div>
        </div>
    )
}
