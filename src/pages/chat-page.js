import { useEffect, useState } from "react"
import moment from 'moment'
import axios from "axios"
import Person from '@mui/icons-material/Person'
import { useSelector } from "react-redux";
import {io} from 'socket.io-client'
import Nopict from '../components/images/nopict.png'

const ChatPage = () => {
    const socket = io('http://localhost:7002', {withCredentials: true})
    const user = useSelector((state) => state.login.dataUser)
    // const [messageSendStatus, setMessageSendStatus] = useState(false)
    const [messageOnLoad, setMessgeOnLoad] = useState([])
    const [message, setMessage] = useState("")
    const [activeChat, setActiveChat] = useState(null)
    // const [dateSeparator, setDateSeparator] = useState(moment(new Date()).get('date'))
    const [allChat, setAllChat] = useState(null)
    socket.on('new-message', (data) => {
        console.log(data.newMessage)
        console.log('new message detect')
        if(data.newMessage !== []){
            // allChat.push(data.newMessage[0])
            console.log('new message inputed')
        }
        if(activeChat !== null) {
            console.log('new message no pick')
            if(activeChat._id === data.newMessage[0]._id) {
                console.log('new message updated')
                setActiveChat(data.newMessage[0])
            }
        }
    })

    const pickChat = (e, chat) => {
        e.preventDefault()
        console.log(chat)
        setActiveChat(chat)
    }

    const sendMessage = async (e) => {
        e.preventDefault()
        let to
        if(activeChat.users[0] !== user._id) {
            to = activeChat.users[0]
        } else {
            to = activeChat.users[1]
        }
        await axios.post('http://localhost:4001/user/sendMessage', {
            withCredentials: true,
            message,
            to
        })
        .then((response) => {
            setMessage('')
            console.log(response.data.message)
            console.log(response.data.chat)
            setActiveChat(response.data.chat)
            socket.emit('send-message', ({id_chat: response.data.id_chat, id_user_to: response.data.id_user_to}))
        })
        .catch((error) => {
            setMessage('')
            console.log(error.response.data.message)
        })
    }

    const getAllChat = async () => {
        await axios.get('http://localhost:4001/user/getAllChat', {
            withCredentials: true
        })
        .then((response) => {
            console.log(response.data.message)
            console.log(response.data.filterChat)
            setAllChat(response.data.filterChat)
        })
        .catch((error) => {
            console.log(error.response.data.message)
        })
    }

    useEffect(() => {
        getAllChat()
    }, [])

    return (
        <div className="w-full">
            <div className="h-chat-container">
                <div className="flex border border-grey rounded shadow-lg h-full">

                    {/* <!-- Left --> */}
                    <div className="w-1/3 border flex flex-col">

                        {/* <!-- Header --> */}
                        <div className="py-2 px-3 bg-gray-50 flex flex-row justify-between items-center">
                            
                        </div>

                        {/* <!-- Search --> */}
                        <div className="py-2 px-2 bg-gray-50">
                            <input type="text" className="w-full px-2 py-2 text-sm" placeholder="Cari nama" />
                        </div>

                        {/* <!-- Contacts --> */}
                        <div className="bg-gray-50 flex-1 overflow-auto">
                            {allChat !== null ?
                                <>
                                    {allChat.map((chat) => {
                                        return (
                                            <div className={`px-3 flex items-center cursor-pointer ${activeChat !== null && (activeChat._id === chat._id && 'bg-gray-200')}`} key={chat._id} onClick={(e) => pickChat(e, chat)}>
                                                <div id="circle-avatar" className="text-center grid place-items-center rounded-full mx-auto mb-4 bg-black h-12 w-12 aspect-square">
                                                    <Person/>
                                                </div>
                                                {/* <div>
                                                    <img className="h-12 w-12 rounded-full"
                                                        src={chat.image_src} />
                                                </div> */}
                                                <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                                    <div className="flex items-bottom justify-between">
                                                        <p className="text-grey-darkest">
                                                        {chat.user_name[0] === user.username ? 
                                                        chat.user_name[1]
                                                        :
                                                        chat.user_name[0]
                                                        }
                                                        </p>
                                                        <p className="text-xs text-grey-darkest">
                                                            {moment(chat.data_message[(chat.data_message.length - 1)].createdAt).format('hh:mm')}
                                                        </p>
                                                    </div>
                                                    <p className="text-grey-dark mt-1 text-sm">
                                                        {chat.data_message[(chat.data_message.length - 1)].message}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>
                                :
                                <div className="w-full border flex items-center justify-items-center">
                                    <span className="mx-auto">Tidak ada chat</span>
                                </div>
                            }
                            {/* <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
                                <div>
                                    <img className="h-12 w-12 rounded-full"
                                         src="https://www.biography.com/.image/t_share/MTE5NDg0MDU1MTIyMTE4MTU5/arnold-schwarzenegger-9476355-1-402.jpg"/>
                                </div>
                                <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                    <div className="flex items-bottom justify-between">
                                        <p className="text-grey-darkest">
                                            Arnold Schwarzenegger
                                        </p>
                                        <p className="text-xs text-grey-darkest">
                                            12:45 pm
                                        </p>
                                    </div>
                                    <p className="text-grey-dark mt-1 text-sm">
                                        I'll be back
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
                                <div>
                                    <img className="h-12 w-12 rounded-full"
                                         src="https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg"/>
                                </div>
                                <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                    <div className="flex items-bottom justify-between">
                                        <p className="text-grey-darkest">
                                            Russell Crowe
                                        </p>
                                        <p className="text-xs text-grey-darkest">
                                            12:45 pm
                                        </p>
                                    </div>
                                    <p className="text-grey-dark mt-1 text-sm">
                                        Hold the line!
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
                                <div>
                                    <img className="h-12 w-12 rounded-full"
                                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpYTzuO0zLW7yadaq4jpOz2SbsX90okb24Z9GtEvK6Z9x2zS5"/>
                                </div>
                                <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                    <div className="flex items-bottom justify-between">
                                        <p className="text-grey-darkest">
                                            Tom Cruise
                                        </p>
                                        <p className="text-xs text-grey-darkest">
                                            12:45 pm
                                        </p>
                                    </div>
                                    <p className="text-grey-dark mt-1 text-sm">
                                        Show me the money!
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
                                <div>
                                    <img className="h-12 w-12 rounded-full"
                                         src="https://www.biography.com/.image/t_share/MTE5NTU2MzE2MjE4MTY0NzQ3/harrison-ford-9298701-1-sized.jpg"/>
                                </div>
                                <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                    <div className="flex items-bottom justify-between">
                                        <p className="text-grey-darkest">
                                            Harrison Ford
                                        </p>
                                        <p className="text-xs text-grey-darkest">
                                            12:45 pm
                                        </p>
                                    </div>
                                    <p className="text-grey-dark mt-1 text-sm">
                                        Tell Java I have the money
                                    </p>
                                </div>
                            </div> */}
                        </div>

                    </div>


                    {/* <!-- Right --> */}
                    {activeChat === null ?
                        <div className="w-2/3 border flex items-center justify-items-center">
                            <span className="mx-auto">Mulai sebuah chat</span>
                        </div>
                        :
                        <div className="w-2/3 border flex flex-col">

                            {/* <!-- Header --> */}

                            <div className="py-2 px-3 bg-gray-50 flex flex-row justify-between items-center">
                                <div className="flex items-center">
                                <div id="circle-avatar" className="text-center grid place-items-center rounded-full mx-auto mb-4 bg-black w-1/2 aspect-square">
                                                    <Person/>
                                                </div>
                                    {/* <div>
                                        <img className="w-10 h-10 rounded-full" src={activeChat.image_src} />
                                    </div> */}
                                    <div className="ml-4">
                                        <p className="text-grey-darkest">
                                            {activeChat.user_name[0] === user.username ? 
                                            activeChat.user_name[1]
                                            :
                                            activeChat.user_name[0]
                                            }
                                        </p>
                                        <p className="text-grey-darker text-xs mt-1">
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 overflow-auto min-w-[300px]" style={{ backgroundColor: '#DAD3CC' }}>
                                <div className="py-2 px-3">
                                    {/* <div className="flex justify-center mb-4">
                                        <div className="rounded py-2 px-4" style={{ backgroundColor: '#FCF4CB' }}>
                                            <p className="text-xs">
                                                Messages to this chat and calls are now secured with end-to-end encryption. Tap for more info.
                                            </p>
                                        </div>
                                    </div> */}
                                    {activeChat.data_message.map((chat) => {
                                        // let checkDate = (dateSeparator === moment(chat.created_at).get('date'))
                                        // setDateSeparator(moment(chat.created_at).get('date'))
                                        // {checkDate &&
                                        //     <div className="flex justify-center mb-2">
                                        //         <div className="rounded py-2 px-4" style={{ backgroundColor: '#DDECF2' }}>
                                        //             <p className="text-sm uppercase">
                                        //                 {moment(chat.created_at).format('DD MMMM, YYYY')}
                                        //             </p>
                                        //         </div>
                                        //     </div>
                                        // }
                                        return(chat.from === user._id ?
                                            <div className="flex justify-end mb-2" key={chat._id}>
                                                <div className="rounded py-2 px-3 min-w-[200px]" style={{ backgroundColor: '#E2F7CB' }}>
                                                    <p className="text-sm mt-1">
                                                        {chat.message}
                                                    </p>
                                                    <p className="text-right text-xs text-grey-dark mt-1">
                                                        {moment(chat.createdAt).format('HH:mm')}
                                                    </p>
                                                </div>
                                            </div>
                                            :
                                            <div className="flex mb-2" key={chat._id}>
                                                <div className="rounded py-2 px-3 min-w-[200px]" style={{ backgroundColor: '#F2F2F2' }}>
                                                    <p className="text-sm mt-1">
                                                        {chat.message}
                                                    </p>
                                                    <p className="text-right text-xs text-grey-dark mt-1">
                                                        {moment(chat.createdAt).format('HH:mm')}
                                                    </p>
                                                </div>
                                            </div>)
                                    })}
                                    {messageOnLoad.length > 0 && 
                                    messageOnLoad.map((messageOL) => {
                                        return(
                                            <div className="flex mb-2" >
                                            <div className="rounded py-2 px-3" style={{backgroundColor: '#F2F2F2'}}>
                                                <p className="text-sm mt-1">
                                                    Hi all! I have one question for the movie
                                                </p>
                                                <p className="text-right text-xs text-grey-dark mt-1">
                                                    12:45 pm
                                                </p>
                                            </div>
                                        </div>
                                        )
                                    })
                                    }
                                    {/* 
                                

                                <div className="flex mb-2">
                                    <div className="rounded py-2 px-3" style={{backgroundColor: '#F2F2F2'}}>
                                        <p className="text-sm text-orange">
                                            Harrison Ford
                                        </p>
                                        <p className="text-sm mt-1">
                                            Again?
                                        </p>
                                        <p className="text-right text-xs text-grey-dark mt-1">
                                            12:45 pm
                                        </p>
                                    </div>
                                </div>

                                <div className="flex mb-2">
                                    <div className="rounded py-2 px-3" style={{backgroundColor: '#F2F2F2'}}>
                                        <p className="text-sm text-orange">
                                            Russell Crowe
                                        </p>
                                        <p className="text-sm mt-1">
                                            Is Andrés coming for this one?
                                        </p>
                                        <p className="text-right text-xs text-grey-dark mt-1">
                                            12:45 pm
                                        </p>
                                    </div>
                                </div>

                                <div className="flex mb-2">
                                    <div className="rounded py-2 px-3" style={{backgroundColor: '#F2F2F2'}}>
                                        <p className="text-sm text-teal">
                                            Sylverter Stallone
                                        </p>
                                        <p className="text-sm mt-1">
                                            He is. Just invited him to join.
                                        </p>
                                        <p className="text-right text-xs text-grey-dark mt-1">
                                            12:45 pm
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-end mb-2">
                                    <div className="rounded py-2 px-3" style={{backgroundColor: '#E2F7CB'}}>
                                        <p className="text-sm mt-1">
                                            Hi guys.
                                        </p>
                                        <p className="text-right text-xs text-grey-dark mt-1">
                                            12:45 pm
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-end mb-2">
                                    <div className="rounded py-2 px-3" style={{backgroundColor: '#E2F7CB'}}>
                                        <p className="text-sm mt-1">
                                            Count me in
                                        </p>
                                        <p className="text-right text-xs text-grey-dark mt-1">
                                            12:45 pm
                                        </p>
                                    </div>
                                </div>

                                <div className="flex mb-2">
                                    <div className="rounded py-2 px-3" style={{backgroundColor: '#F2F2F2'}}>
                                        <p className="text-sm text-purple">
                                            Tom Cruise
                                        </p>
                                        <p className="text-sm mt-1">
                                            Get Andrés on this movie ASAP!
                                        </p>
                                        <p className="text-right text-xs text-grey-dark mt-1">
                                            12:45 pm
                                        </p>
                                    </div>
                                </div> */}

                                </div>
                            </div>

                            {/* <!-- Input --> */}
                            <div className="bg-gray-50 px-4 py-4 flex items-center">
                                <div className="flex-1 mx-4">
                                    <input className="w-full border rounded px-2 py-2" type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
                                </div>
                                <div>
                                    <button onClick={(e) => sendMessage(e)}>kirim</button>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default ChatPage