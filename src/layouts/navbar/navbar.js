import React, {useState} from "react";
import MenuIcon from '@mui/icons-material/Menu';
import Person from '@mui/icons-material/Person'
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { logout } from "../../components/stateSlice/loginSlice";
import { PopupMenu } from "react-simple-widgets";
import CurrencyFormat from 'react-currency-format'
import Nopict from '../../components/images/nopict.png'
import TextField from "@mui/material/TextField";
// import {useAutocomplete} from '@mui/base/AutocompleteUnstyled'
import Autocomplete from "@mui/material/Autocomplete";
// import {
//     ReactiveBase,
//     DataSearch,
//     ReactiveList,
//     ResultCard,
//     SelectedFilters
// } from "@appbaseio/reactivesearch";

import './navbar.css';
import { useEffect } from "react";



const LocalNavbar = () => {
    // const [optionsOne, setOptionsOne] = useState([]);
    const isLogin = useSelector((state) => state.login.isLogin)
    const user = useSelector((state) => state.login.dataUser)
    const [paymentAccount, setPaymentAccount] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [valueSearch, setValueSearch] = useState(null);
    const [suggestion, setSuggestion] = useState([])
    const [searchWord, setSearchWord] = useState("")
    const [searchParams] = useSearchParams()

    const getSearchItem = async (str) => {
        // let searchableCity = str.replace(/,/g, "");
        let url = "http://localhost:6001/item/autoCompleteSearch";
    
        await axios.post(url, {
            searchWord: searchWord
        })
        .then((response) => {
            setSuggestion(response.data.result)
        })
        .catch((error) => {
            setSuggestion(error.response.data.result)
        })
    };

    useEffect(() => {
        if(searchParams.get('q')) {
            setSearchWord(searchParams.get('q'))
        }
    }, [])

    const navSearch = () => {
        navigate(`/search?q=${searchWord}`)
    }

    // useEffect(() => {
    //     getSearchItem(searchWord)
    // }, searchWord)

    const getPaymentAccountDetail = async () => {
        await axios.get('http://localhost:8001/payment/getPaymentAccountDetail', {
            withCredentials: true
        })
        .then((response) => {
            setPaymentAccount(response.data.paymentAccount)
        })
        .catch((error) => {
            console.log(error.response.data)
        })
    }

    useEffect(() => {
        if(isLogin) {
            getPaymentAccountDetail()
        }
    }, [isLogin])

    useEffect(() => {
        if(valueSearch !== null && valueSearch !== ''){
            navSearch()
        }
    }, [valueSearch])

    const logoutAction = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:4001/user/logout', {
            withCredentials: true
        }).then((response) => {
            console.log(response.data.message)
            dispatch(logout())
            navigate('/')
        }).catch((err) => {
            dispatch(logout())
            console.log(err.response.data.message)
        })
    }

    const toBeranda = (e) => {
        e.preventDefault()
        navigate('/')
    }
    const toKategori = (e) => {
        e.preventDefault()
        navigate(`/kategori`)
    }

    // const onChangeOne = async (e) => {
    //     if (e.target.value) {
    //         let data = await getCitiesOne(e.target.value);
    //         setOptionsOne(data);
    //     }
    // };

    // useEffect(() => {
    //     if(isLogin)
    // }, [isLogin])

    return (
        <nav className="bg-white shadow-md fixed w-full grid content-center z-50" style={{ minHeight: "60px" }}>
            <div className="container m-auto flex gap-x-4">
                <a href="#main" className="flex-none self-center">
                    <span className="l-font-brown text-2xl font-black tracking-widest cursor-pointer" onClick={(e) => toBeranda(e)}>Levint</span>
                </a>
                {/* <input type="text" className="rounded-lg h-fit self-center bg-slate-200 border-transparent p-1 placeholder:italic flex-1 md:w-1/4 md:flex-none grid" placeholder="Telusuri"></input> */}
                <Autocomplete
                className="md:w-1/4 flex-1 md:flex-none"
                freeSolo
                filterOptions={(x) => x}
                size="small"
                // onChange={(e) => setSearchWord(e.target.value)}
                onInputChange={(event, inputValue) => setSearchWord(inputValue)}
                onKeyDown={(event) => {
                    if(event.key === 'Enter') {
                        event.defaultPrevented = true
                        navSearch()
                    }
                }}
                value={searchWord}
                onChange={(event, value) => setValueSearch(value)}
                options={suggestion ? suggestion.map((obj) => obj.nama_item) : []}
                renderInput={(params) => (
                    <TextField
                    {...params}
                    label="Cari"
                    onChange={(e) => getSearchItem(e)}
                    />
                )}
                />
                <ul className="hidden md:flex items-center font-semibold flex-1 gap-x-4 place-content-end">
                    <li className="hover:bg-slate-100" onClick={(e) => toKategori(e)}>Kategori</li>
                    {/* <li className="hover:bg-slate-100">Promo</li> */}
                    <span className="px-2">|</span>
                    {isLogin ?
                        <PopupMenu>
                            <button className="btn bg-transparent l-font-brown outline-none border-0 hover:bg-white">
                            {isLogin ? <span>{user ? `${user.username}` : ''}</span> : ''}
                                <img className="ml-1 w-8 h-8 rounded-full border border-orange-300" src={(user.photo === '' ? Nopict : user.photo)} alt={user._id}
                                    onError={(e) => {
                                        e.currentTarget.src = Nopict
                                        e.currentTarget.onerror = null
                                    }}
                                />
                            </button>

                            <div className="card text-left" style={{width:"250px", backgroundColor:"white"}}>
                                <div className="card-body px-4 py-4">
                                    <div id="circle-avatar" className="text-center grid place-items-center rounded-full mx-auto bg-black w-1/2 aspect-square">
                                        
                                        <img className="w-full aspect-square rounded-full border border-orange-300" src={(user.photo === '' ? Nopict : user.photo)} alt={user._id}
                                            onError={(e) => {
                                                e.currentTarget.src = Nopict
                                                e.currentTarget.onerror = null
                                            }}
                                        />
                                    </div>

                                    <h5 className="text-center mb-0 font-bold">{user ? `${user.username}` : ''}</h5>
                                    {/* <p className="text-center mb-2">{user ? `${user.email}` : ''}</p> */}

                                    <hr />

                                    <p
                                        className="mb-0 w-full"
                                        style={{ color: "#bebebe", fontWeight: "bold", fontSize: 12 }}
                                    >
                                        Saldo : <span className="l-font-brown">{paymentAccount === null ? 'menunggu' : <CurrencyFormat value={paymentAccount.saldo} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} />}</span>
                                    </p>
                                    {/* <a className="" href="http://localhost:3000/dashboard/pembayaran" target={"_blank"}>Isi saldo</a> */}

                                    <hr className="mb-0" style={{ margin: "0 -24px 0" }} />

                                        <a className=" px-4" href="http://localhost:3000/dashboard" target={"_blank"}>
                                            <small>Dashboard</small>
                                        </a>
                                    <hr className="mb-0" style={{ margin: "0 -24px 0" }} />
                                        <a className="px-4" onClick={(e) => logoutAction(e)}>
                                            <small>Logout</small>
                                        </a>
                                    {/* <hr className="mb-0" style={{ margin: "0 -24px 0" }} />
                                        <a className="px-4" href="http://localhost:3000/dashboard/chat" target={"_blank"}>
                                            <small>Chat</small>
                                        </a>
                                    <hr className="mb-0" style={{ margin: "0 -24px 0" }} />
                                        <a className="px-4" href="http://localhost:3000/dashboard/pembayaran" target={"_blank"}>
                                            <small>Pembayaran</small>
                                        </a> */}
                                    <hr style={{ margin: "0 -24px 24px" }} />

                                    {/* <div className="grid w-10 mx-auto">
                                        <button className="btn l-bg-brown border-0" onClick={(e) => logoutAction(e)}>
                                            <small>Logout</small>
                                        </button>
                                    </div> */}
                                </div>
                            </div>
                        </PopupMenu>
                        // <button onClick={(e) => logoutAction(e)} className=" hover:text-orange-300">Logout</button> 
                        :
                        <button onClick={() => navigate('/login')}>Login</button>
                    }
                    {/* <div className="l-bg-brown w-px h-full hidden md:block"></div>
                    <li><LoginButton/></li> */}
                </ul>
                <button className="block md:hidden">
                    <MenuIcon />
                </button>
            </div>
        </nav>
    );
}

export default LocalNavbar;