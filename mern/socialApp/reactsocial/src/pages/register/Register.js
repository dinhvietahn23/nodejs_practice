import axios from '../../axios'
import React, { useRef } from 'react'
import './Register.css'
import {useNavigate} from 'react-router-dom'

export default function Register() {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const passwordAgain = useRef()
    const history = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()
        if(passwordAgain.current.value!==password.current.value){
            passwordAgain.current.setCustomValidity("Password don't match!")
        } else {
            const newUser = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            console.log(newUser)
            try {
                const res = await axios.post('/auth/register', newUser)
                history("/login")
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className='register'>
            <div className='register_wrapper'>
                <div className='register_left'>
                    <h3 className='register_left_registerLogo'>Tews</h3>
                    <span className='register_left_registerDesc'>
                        Connect with friends and the world around you on Tews.
                    </span>
                </div>

                <div className='register_right'>
                    <form className='register_right_registerBox' onSubmit={handleClick}>
                        <input placeholder='Username' required ref={username} className='registerInput'/>
                        <input placeholder='Email' required ref={email} className='registerInput' type=''email/>
                        <input placeholder='Password' requried ref={password} className='registerInput' type='password' minLength='8'/>
                        <input placeholder='Password again' required ref={passwordAgain} className='registerInput' type='password' minLength='8'/>
                        <button className='registerButton' type='submit'>Register</button>
                        <button className='registerRegiste'>Login</button>
                    </form>
                </div>

            </div>
        </div>
    )
}
