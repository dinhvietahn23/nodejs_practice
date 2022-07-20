import axios from '../axios.js';
import React from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice.js';
import { auth, provider } from '../firebase.js';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  outline: none;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;


export default function SignIn() {

    const [user, setUser] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [pasword, setPassword] = React.useState("")
    const disptach = useDispatch()
    const navigate = useNavigate()

    const hanldeSignIn = async (e) => {
      e.preventDefault()
      disptach(loginStart())
      try {
        const res = await axios.post("auths/signin", {name:user, password:pasword}, { withCredentials: true })
        console.log(res.data)
        disptach(loginSuccess(res.data))
        navigate("/")
      } catch (error) {
        console.log(error)
        disptach(loginFailure())
      }
    }

    const signInWithGoogle = () => {
      disptach(loginStart())
      signInWithPopup(auth, provider).then((result)=>{
        console.log(result);
        axios.post("/auths/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            console.log(res)
            disptach(loginSuccess(res.data));
            navigate("/")
          });
      }).catch((error)=>{
        disptach(loginFailure());
      })
    }

    return (
        <Container>
          <Wrapper>
            <Title>Sign in</Title>
            <SubTitle>to continue to LamaTube</SubTitle>
            <Input 
              placeholder="username"
              onChange={(e) => setUser(e.target.value)}
            />
            <Input 
              type="password" 
              placeholder="password" 
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={hanldeSignIn}>Sign in</Button>
            <Title>or</Title>
            <Button onClick={signInWithGoogle}>Sign in with Google</Button>
            <Title>or</Title>
            <Input 
              placeholder="username" 
              onChange={(e) => setUser(e.target.value)}
            />
            <Input
              type="email" 
              placeholder="email" 
              onChange={(e)=> setEmail(e.target.value)}
            />
            <Input 
              type="password" 
              placeholder="password" 
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button>Sign up</Button>
          </Wrapper>
          <More>
            English(USA)
            <Links>
              <Link>Help</Link>
              <Link>Privacy</Link>
              <Link>Terms</Link>
            </Links>
          </More>
        </Container>
    );
}
