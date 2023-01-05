import { useEffect, useState } from "react"
import axios from "axios"
import DefaultButton from "../buttons/default-button"
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { onDone, onLoad } from "../stateSlice/loadingSlice"
import { DangerMsgBox } from '../msg-box/danger-msg-box'
import Swal from "sweetalert2"

// import RegisterButton from "../buttons/registerButton"
// import OutlinedBrownButton from "../buttons/outlinedBrownButton"
// import GoogleIcon from '@mui/icons-material/Google'

const RegisterForm = () => {
    // const isLogin = useSelector((state) => state.login.isLogin)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [password2, setPasword2] = useState('')
    const [dangerBox, setDangerBox] = useState(null)

    const registerAction = async () => {
        setDangerBox(null)
        dispatch(onLoad())
        await axios.post('http://localhost:4001/user/register', {
            name,email,password,username
        })
        .then((response) => {
            dispatch(onDone())
            Swal.fire({
                icon: 'success',
                title: 'Register berhasil!',
                text: 'Akun berhasil didaftarkan, silahkan cek email untuk menkonfirmasi!',
                showConfirmButton: true,
                confirmButtonText: 'Login'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login')
                }
            })
        })
        .catch((err) => {
            if(!(err.response.data.message === undefined)){
                setDangerBox(err.response.data.message)
            }
            if(!(err.response.data.errors === undefined)){
                setDangerBox(err.response.data.errors[0].msg)
            }
            console.log('fail')
            dispatch(onDone())
            console.log(err.response.data)
            console.log(dangerBox)
        })
    }

    const syncPassword = () => {
        if (password2 !== password) {
            return false
        } else {
        return true
        }
    }

    const registerHandler = (e) => {
        e.preventDefault()
        registerAction()
    }

    return(
        <>
        <form className="l-bg-light-brown grid p-4 gap-y-4 rounded-lg shadow-md shadow-orange-300 w-full l-border-brown h-fit" onSubmit={registerHandler}>
            <h2 className="justify-self-center font-bold">Register Form</h2>
            <div className="h-px w-full l-bg-brown"></div>
            {dangerBox !== null && 
                <DangerMsgBox msg={dangerBox}/>
            }
            <div className="flex flex-col">
                <span className="ml-4">Nama Lengkap</span>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama lengkap" className="rounded-full l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2" required minLength={4} maxLength={24}></input>
            </div>
            <div className="flex flex-col">
                <span className="ml-4">Username</span>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="rounded-full l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2" required></input>
            </div>
            <div className="flex flex-col">
                <span className="ml-4">Email</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-full l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2" required></input>
            </div>
            <div className="flex flex-col">
                <span className="ml-4">Password</span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="rounded-full l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2" required minLength={8} maxLength={24}></input>
            </div>
            <div className="flex flex-col">
                <span className="ml-4">Ulangi Password {password2 !== '' && (syncPassword() ? "": <span className=" text-red-700 text-xs">sandi tidak sesuai</span>)}</span>
                <input type="password" value={password2} onChange={(e) => setPasword2(e.target.value)} placeholder="Password" className="rounded-full l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2" required minLength={8} maxLength={24}></input>
            </div>
            <DefaultButton type="submit">Register</DefaultButton>
        </form>
        {/* <div className="grid">
            <div className="w-full md:w-1/2 justify-self-end">
                <form className="flex flex-col gap-y-3" onSubmit={registerUser}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="border border-slate-300 shadow-sm focus:border-orange-300" placeholder="username"></input>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-slate-300 shadow-sm focus:border-orange-300" placeholder="email"></input>
                    <input type="password" value={password} onChange={(e) => setPasword(e.target.value)} className="border border-slate-300 shadow-sm focus:border-orange-300" placeholder="password"></input>
                    <input type="submit" value="Register" />
                </form>
            </div>
            
        </div>
         */}
        </>
    )
}

export default RegisterForm