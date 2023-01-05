import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { DangerMsgBox } from "../msg-box/danger-msg-box"
import { login, logout } from "../stateSlice/loginSlice"
import { onLoad, onDone } from "../stateSlice/loadingSlice"
import axios from "axios"
import DefaultButton from "../buttons/default-button"
import OutlinedBrownButton from '../buttons/outlinedBrownButton'

const LoginForm = () => {
    const isLogin = useSelector((state) => state.login.isLogin)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    const backPath = () => {
        if(location.state !== null){
            return location.state.prevPath
        }
        return '/'
    }

    const loginAction = async () => {
        dispatch(onLoad())
        await axios.post('http://localhost:4001/user/login', {
            email,
            password
        })
        .then((response) => {
            dispatch(onDone())
            console.log(response.data.message)
            dispatch(login(response.data.user))
            navigate("/")
            // window.location.reload()
        })
        .catch((err) => {
            dispatch(onDone())
            console.log(err.response.data.message)
            setMsg(err.response.data.message)
        })
    }

    const getUser = async () => {
        dispatch(onLoad())
        await axios.get('http://localhost:4001/user/getUser', {
            withCredentials: true
        })
        .then((response) => {
            dispatch(onDone())
            console.log(response.data.message)
            dispatch(login(response.data.user))
            navigate(backPath())
        })
        .catch((err) => {
            dispatch(onDone())
            console.log(err.response.data.message)
            dispatch(logout())
        })
    }

    const loginHandler = (e) => {
        e.preventDefault()
        loginAction()
    }

    const navigateRegister = (e) => {
        e.preventDefault()
        navigate('/register')
    }

    useEffect(() => {
        if(isLogin){
            navigate(backPath())
        }
        getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <form className="bg-white grid p-4 gap-y-4 rounded-lg shadow-md shadow-orange-300 w-full h-fit" onSubmit={loginHandler}>
            <h2 className="justify-self-center font-bold text-2xl">LOG IN</h2>
            <div className="h-px w-full l-bg-brown"></div>
            {msg !== '' && <DangerMsgBox msg={msg}/>}
            <div className="flex flex-col">
                <span>Email</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2" required></input>
            </div>
            <div className="flex flex-col">
                <span>Password</span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="rounded l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2" required></input>
            </div>
            <DefaultButton type="submit">Login</DefaultButton>
            <div className="flex items-center">
                <div className=" bg-slate-500 w-full" style={{height: "1px"}}></div>
                <div className="relative px-2">
                    <span className="text-slate-500">ATAU</span>
                </div>
                <div className=" bg-slate-400 w-full" style={{height: "1px"}}></div>
            </div>
            <OutlinedBrownButton onClick={(e) => navigateRegister(e)}>Register</OutlinedBrownButton>
        </form>
    )
}

export default LoginForm