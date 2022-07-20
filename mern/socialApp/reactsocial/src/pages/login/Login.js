import React, { useContext, useRef } from 'react'
import './Login.css'
import '../../apiCalls'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../contexts/AuthContext'
import CircularProgress from '@material-ui/core/CircularProgress';


export default function Login() {
    const email = useRef()
    const password = useRef()

    const {user, isFetching, error, dispatch} = useContext(AuthContext)

    const handleClick = (e) =>{
        e.preventDefault()
        loginCall({email:email.current.value, password: password.current.value}, dispatch)
        console.log(user)
    }

    return (
        <div className='login'>
            <div className='login_wrapper'>
                <div className='login_left'>
                    <h3 className='login_left_loginLogo'>Tews</h3>
                    <span className='login_left_loginDesc'>
                        Connect with friends and the world around you on Tews.
                    </span>
                </div>

                <div className='login_right'>
                    <form className='login_right_loginBox' onSubmit={handleClick}>
                        <input 
                            placeholder='Email' 
                            type='email'
                            required
                            className='loginInput'
                            ref = {email}
                        />
                        <input 
                            placeholder='Password' 
                            type='password'
                            required
                            minLength="8"
                            className='loginInput'
                            ref = {password}
                        />
                        <button className='loginButton'>{isFetching?<CircularProgress color="white" size= "25px" /> :"Log In"}</button>
                        <span className='LoginForgot'>Forgot Password?</span>
                        <button className='LoginRegiste'>{isFetching?<CircularProgress color="white" size= "25px" /> :"Create a new account"}</button>
                    </form>
                </div>

            </div>
        </div>
    )
}
