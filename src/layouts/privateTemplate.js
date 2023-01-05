import { useSelector, useDispatch } from "react-redux"
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'
import { login, logout } from "../components/stateSlice/loginSlice"
import { onLoad, onDone } from "../components/stateSlice/loadingSlice"
import menu from '../components/images/tab.svg'
import Person from '@mui/icons-material/Person'
import ChatSvg from '../components/images/chat.svg'
import PaymentSvg from '../components/images/pembayaran.svg'
import PengaturanSvg from '../components/images/pengaturan.svg'
import TransaksiSvg from '../components/images/transaksi.svg'

const PrivateTemplate = () => {
    const isLogin = useSelector((state) => state.login.isLogin)
    const user = useSelector((state) => state.login.dataUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [open, setOpen] = useState(true);
    const Menus = [
        { title: "Akun", src: PengaturanSvg, path: '/dashboard/akun' },
        { title: "Dompet", src: PaymentSvg, path: '/dashboard/pembayaran' },
        { title: "Chat", src: ChatSvg, path: '/dashboard/chat'},
        { title: "Transaksi", src: TransaksiSvg, path: '/dashboard/transaksi' },
        { title: "Aktivitas", src: TransaksiSvg, path: '/dashboard/aktivitas' }
    ];
    const getUser = async () => {
        dispatch(onLoad())
        await axios.get('http://localhost:4001/user/getUser', {
            withCredentials: true
        })
            .then((response) => {
                dispatch(onDone())
                console.log(response.data.message)
                dispatch(login(response.data.user))
            })
            .catch((err) => {
                dispatch(onDone())
                console.log(err.response.data.message)
                dispatch(logout())
            })
    }

    useEffect(() => {
        console.log(location.pathname)
        getUser()
    }, [isLogin])
    return (
        isLogin === null ?
            <></>
            :
            isLogin ?
                <div className="flex">
                    <div
                        className={` ${open ? "w-72" : "w-20 "
                            } l-bg-brown h-screen p-5  pt-8 relative duration-300`}
                    >
                        <img
                            src={menu}
                            className={`absolute cursor-pointer -right-3 top-9 w-7 bg-white border-0 rounded-full  ${!open && "rotate-180"}`}
                            onClick={() => setOpen(!open)}
                        />
                        <div className="flex gap-x-4 items-center">

                            <Person
                                className={`cursor-pointer duration-500 text-white ${open && "rotate-[360deg]"
                                    }`}
                            />
                            <h1
                                className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                                    }`}
                            >
                                {user.username}
                            </h1>
                        </div>
                        <ul className="pt-6">
                            {Menus.map((Menu, index) => (
                                <li
                                    key={index}
                                    onClick={() => navigate(Menu.path)}
                                    className={`flex  rounded-md p-2 cursor-pointer hover:bg-amber-800 hover:text-white text-sm items-center gap-x-4 mt-2 ${location.pathname == Menu.path ? "bg-white l-font-brown" : "text-white"} `}
                                >
                                    <img src={Menu.src} className="h-8 w-8" />
                                    <span className={`${!open && "hidden"} origin-left duration-200`}>
                                        {Menu.title}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="h-screen flex-1 p-7">
                        <Outlet />
                        {/* <h1 className="text-2xl font-semibold ">Home Page</h1> */}
                    </div>
                </div>
                :
                // <p>ok</p>
                <Navigate to={{ pathname: "/login" }} state={{ prevPath: location.pathname }} />

    )

}

export default PrivateTemplate