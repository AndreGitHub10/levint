import React, {useEffect, useState} from "react"
import axios from "axios"
import DefaultButton from "../buttons/default-button"
import { useNavigate, useLocation } from "react-router-dom"
import {useDispatch} from 'react-redux'
import { login, logout } from "../stateSlice/loginSlice"
import { onDone, onLoad } from "../stateSlice/loadingSlice"
// import { io } from 'socket.io-client'
// const socket = io("http://localhost:7001", {
//     autoConnect: false
// })
const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [realtime, setRealtime] = useState(false)
    // const [bidData, setBidData] = useState({bid:[]})
    // const [id_lelang, setId_lelang] = useState('')
    // const [bid, setBid] = useState('')
    // socket.connect()
    // socket.on('bid', response => {
    //     setBidData(response)
    //     // console.log(response)
    // })
    // socket.on('datas', response => {
    //     setBidData(response)
    //     // console.log(bidData)
    //     // console.log(response)
    //     // if(response.length) {
    //     //     response.forEach(dataBid => {
    //     //         console.log(dataBid.harga_awal)
    //     //     });
    //     // }
    // })
    // const getLelang = () =>  {
        
    //     // socket.on("connect", () => {
    //         console.log(socket.connected)
    //         socket.emit('lelang', id_lelang)
            
    //     // })
        
        
    // }

    // const inputBid = async () => {
    //     const res = await axios.put('http://localhost:6001/lelang/createBid', {
    //         withCredentials: true,
    //         id_lelang: id_lelang,
    //         userBid: bid
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    //     socket.emit('lelang', id_lelang)
    // }

    // const logoutAction = async () => {
    //     await fetch('http://localhost:4001/user/logout',{
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         method: 'POST',
    //         credentials: 'include'
    //     }).then((response) => {
    //         console.log(response.data.message)
    //         // dispatch(logout())
    //         // navigate('/')
    //     }).err((err) => console.log(err))
    // }

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
            alert(err.response.data.message)
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
            navigate('/')
        })
        .catch((err) => {
            dispatch(onDone())
            console.log(err.response.data.message)
            dispatch(logout())
        })
    }
        // .then( async (response) => {
        //     console.log(response)
        //     if (response) {
        //         await axios.get("http://localhost:5002/seller/getSeller", {
        //             withCredentials: true
        //         })
        //     }

        // })
        // .then(async(jsonData) => {
        //     if (jsonData.user) {
        //         await axios.get("http://localhost:5001/seller/getSeller")
        //         // alert('login berhasil')
        //         // localStorage.setItem('token', jsonData.token)
        //     } else {
        //         // alert('login gagal')
        //     }
        // })
        

    const loginHandler = (e) => {
        e.preventDefault()
        loginAction()
        // .then(() => window.location.href = '/beranda')
    }
    // const handlingData = (e) => {
    //     e.preventDefault()
    //     getLelang()
    //     // .then(() => window.location.href = '/beranda')
    // }
    // const inputBidData = (e) => {
    //     e.preventDefault()
    //     inputBid()
    // }

    // const renderBid = (bidData) => {
    //     bidData.forEach(dataBid => {
    //        return <p>{dataBid.harga_awal}</p>
    //     });
    // }

    useEffect(() => {
        getUser()
    }, [])

    return(
        <>
        <form className="l-bg-light-brown grid p-4 gap-y-4 rounded-lg shadow-md shadow-orange-300 w-full l-border-brown h-fit" onSubmit={loginHandler}>
            <h2 className="justify-self-center font-bold">Register Form</h2>
            <div className="h-px w-full l-bg-brown"></div>
            <div className="flex flex-col">
                <span className="ml-4">Email</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-full l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2" required></input>
            </div>
            <div className="flex flex-col">
                <span className="ml-4">Password</span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="rounded-full l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2" required></input>
            </div>
            <DefaultButton type="submit">Register</DefaultButton>
        </form>
        {/* <form className="flex flex-col gap-y-3" onSubmit={handlingSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-slate-300 shadow-sm focus:border-orange-300" placeholder="email"></input>
            <input type="password" value={password} onChange={(e) => setPasword(e.target.value)} className="border border-slate-300 shadow-sm focus:border-orange-300" placeholder="password"></input>
            <button type='submit' value="Login" className="bg-slate-700">ok</button>
        </form> */}
        {/* <form className="flex flex-col gap-y-3" onSubmit={handlingData}> */}
            {/* <input type="text" value={id_lelang} onChange={(e) => setId_lelang(e.target.value)} className="border border-slate-300 shadow-sm focus:border-orange-300" placeholder="id lelang"></input>
            <button type='submit' value="Login" onClick={handlingData} className="bg-slate-700">ok</button>
            <input type="text" value={bid} onChange={(e) => setBid(e.target.value)} className="border border-slate-300 shadow-sm focus:border-orange-300" placeholder="bid"></input>
            <button type='submit' value="Login" onClick={inputBidData} className="bg-slate-700">input</button> */}
        {/* </form> */}
        {/* <button onClick={() => logoutAction()}>logout</button> */}
        {/* <p>id lelang : {id_lelang}</p>
        <p>bid : {bid}</p> */}
        {/* {bidData.bid.length > 0 && bidData.bid.map(dataBid => <p key={dataBid.id_bidder}>{dataBid.price}</p>)} */}
        {/* {bidData.length > 0 && renderBid(bidData)} */}
        {/* {bidData.map(bids => <p>big data : </p>)} */}
        </>
    )
}

export default LoginForm