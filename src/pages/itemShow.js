import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onLoad, onDone } from '../components/stateSlice/loadingSlice'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { WhiteCard } from '../components/cards/white-card'
import NotFoundPng from '../components/images/page-not-found.png'
import Countdown from 'react-countdown'
import Select from 'react-select'
import moment from 'moment'
import DataTable from 'react-data-table-component'
import { io } from 'socket.io-client'
import Swal from 'sweetalert2'
import CurrencyFormat from 'react-currency-format'
import Nopict from '../components/images/nopict.png'
import LocationOn from '@mui/icons-material/LocationOnOutlined'
import Chat from '@mui/icons-material/ChatOutlined'
import Home from '@mui/icons-material/HomeOutlined'
import InfoOutlined from '@mui/icons-material/InfoOutlined'
import StoreFrontOutlined from '@mui/icons-material/StorefrontOutlined'
import ContactPhoneOutlined from '@mui/icons-material/ContactPhoneOutlined'
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined'
import GavelOutlined from '@mui/icons-material/GavelOutlined'
import TimerOutlined from '@mui/icons-material/TimerOutlined'
import Favorite from '@mui/icons-material/Favorite'
import Share from '@mui/icons-material/Share'
import KeyboardArrowUpOutlined from '@mui/icons-material/KeyboardArrowUpOutlined'
import KeyboardArrowDownOutlined from '@mui/icons-material/KeyboardArrowDownOutlined'
import KeyboardDoubleArrowUpwardOutlined from '@mui/icons-material/KeyboardDoubleArrowUpOutlined'
import KeyboardDoubleArrowDownOutlined from '@mui/icons-material/KeyboardDoubleArrowDownOutlined'
import LocalMallOutlined from '@mui/icons-material/LocalMallOutlined'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import LocalShippingOutlined from '@mui/icons-material/LocalShippingOutlined'
import withReactContent from 'sweetalert2-react-content'
import { RWebShare } from 'react-web-share'

const ItemShow = () => {
    const isLogin = useSelector((state) => state.login.isLogin)
    const user = useSelector((state) => state.login.dataUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [item, setItem] = useState(null)
    const [lelang, setLelang] = useState(null)
    const [bid, setBid] = useState(0)
    const [bidLength, setBidLength] = useState(0)
    const [sellerItem, setSellerItem] = useState(null)
    const [sellerUser, setSellerUser] = useState(null)
    const [sellerCount, setSellerCount] = useState({item:"0", lelang:"0", transaksi:"0"})
    const [cekButton, setCekButton] = useState(true)
    const [kurirPending, setKurirPending] = useState(false)
    const [userBid, setUserBid] = useState(null)
    // const [kategori, setKategori] = useState(null)
    // const [seller, setSeller] = useState(null)
    const ok = new Map()
    const [viewUser, setViewUser] = useState(0)
    const [selectedImage, setSelectedImage] = useState(NotFoundPng)
    const [bidData, setBidData] = useState([])
    const [provinsi, setProvinsi] = useState({
        id: "",
        provinsi: ""
    })
    const [kabupaten, setKabupaten] = useState({
        id: "",
        kabupaten: ""
    })
    const [kecamatan, setKecamatan] = useState({
        id: "",
        kecamatan: ""
    })
    const [provinsiOpsi, setProvinsiOpsi] = useState([])
    const [kabupatenOpsi, setKabupatenOpsi] = useState([])
    const [kecamatanOpsi, setKecamatanOpsi] = useState([])
    const [kurir, setKurir] = useState({
        id: "",
        kurir: ""
    })
    const [kurirOpsi, setKurirOpsi] = useState([])
    const [tarifOnkir, setTarifOngkir] = useState([])
    const ReactSwal = withReactContent(Swal)
    const socket = io('http://localhost:7001', { withCredentials: true })
    socket.on('bid', (dataBid) => {
        console.log(dataBid)
        setBidData(dataBid.bid)
        setBidLength(dataBid.length)
    })
    socket.on('user-watching', (sum) => {
        setViewUser(sum)
    })
    // , {
    //     withCredentials: true,
    //     transportOptions: {
    //         polling: {
    //             extraHeaders: {
    //                 "my-custom-header": "abcd"
    //             }
    //         }
    //     }
    // })
    const getTarifOngkir = async (e) => {
        e.preventDefault()
        if (kabupaten.id === "" || kurir.id === "" || item.berat === "") {
            Swal.fire({
                title: 'Alamat atau kuri yang di pilih tidak sesuai',
                text: 'Pilih alamat dengan benar, atau refresh halaman',
                confirmButtonText: 'Tutup',
            })
        } else {
            setKurirPending(true)
            await axios.post('http://localhost:6001/item/getCostRO', {
                from: item.kabupaten.id,
                to: kabupaten.id,
                berat: item.berat,
                kurir: kurir.id
            })
                .then((response) => {
                    setKurirPending(false)
                    const body = JSON.parse(response.data.body)
                    console.log(body)
                    setTarifOngkir(body.rajaongkir.results[0].costs)
                })
        }
    }

    // const getTarifOngkir = async (e) => {
    //     e.preventDefault()
    //     if (kecamatan.id === "" || kurir.id === "" || item.berat === "") {
    //         Swal.fire({
    //             title: 'Alamat yang di pilih tidak sesuai',
    //             text: 'Pilih alamat dengan benar, atau refresh halaman',
    //             confirmButtonText: 'Tutup',
    //         })
    //     } else {
    //         setKurirPending(true)
    //         await axios.post('http://localhost:6001/item/getCost', {
    //             from: '2087',
    //             to: kecamatan.id,
    //             berat: item.berat,
    //             kurir: kurir.id
    //         })
    //             .then((response) => {
    //                 setKurirPending(false)
    //                 console.log(response.data.tarif)
    //                 setTarifOngkir(response.data.tarif)
    //             })
    //     }
    // }

    const inputKurirChange = (value) => {
        setKurir({
            id: value.value,
            kurir: value.label
        })
    }

    const inputProvinsiChange = (value) => {
        setProvinsi({
            id: value.value,
            provinsi: value.label
        })
    }

    const inputKabupatenChange = (value) => {
        setKabupaten({
            id: value.value,
            kabupaten: value.label
        })
    }

    const inputKecamatanChange = (value) => {
        setKecamatan({
            id: value.value,
            kecamatan: value.label
        })
    }

    // const getSellerUser = async (id_user) => {
    //     await axios.get(`http://localhost:4001/user/getUserSeller?idUser=${id_user}`)
    //     .then((response) => {
    //         set
    //     })
    // }

    const getProvinsi = async () => {
        await axios.post('http://localhost:6001/item/getProvinsi')
            .then((response) => {
                const body = JSON.parse(response.data.body)
                const prov = []
                body.rajaongkir.results.map((provinsi) => {
                    prov.push({
                        value: provinsi.province_id,
                        label: provinsi.province
                    })
                })
                setProvinsiOpsi(prov)
            })
    }
    const getKabupaten = async () => {
        await axios.post('http://localhost:6001/item/getKabupaten', {
            province: provinsi.id
        })
            .then((response) => {
                const body = JSON.parse(response.data.body)
                console.log(body)
                const kab = []
                body.rajaongkir.results.map((kabupaten) => {
                    kab.push({
                        value: kabupaten.city_id,
                        label: kabupaten.city_name
                    })
                })
                setKabupatenOpsi(kab)
            })
    }

    const getKecamatan = async () => {
        await axios.post('http://localhost:6001/item/getKecamatan', {
            city: kabupaten.id
        })
            .then((response) => {
                // const body = JSON.parse(response.data.body)
                console.log(response.data)
                const kec = []
                response.data.links.map((kecamatan) => {
                    kec.push({
                        value: kecamatan.kode,
                        label: kecamatan.kecamatan
                    })
                })
                setKecamatanOpsi(kec)
            })
    }

    const getKurir = async () => {
        console.log('ini harusnya jalan')
        await axios.get('http://localhost:6001/item/kurir')
            .then((response) => {
                console.log(response.data)
                const kur = []
                response.data.map((kurirs) => {
                    kur.push({
                        value: kurirs.code,
                        label: kurirs.description
                    })
                })
                setKurirOpsi(kur)
            })
    }


    const sendMessage = async (text) => {
        await axios.post('http://localhost:4001/user/sendMessage', {
            withCredentials: true,
            message: text,
            to: sellerItem.id_user
        })
            .then((response) => {
                console.log(response.data.message)
                Swal.fire({
                    icon: 'success',
                    title: 'Terkirim',
                    text: response.data.message,
                    confirmButtonText: 'Tutup',
                })
            })
            .catch((error) => {
                console.log(error.response.data.message)
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: error.response.data.message,
                    confirmButtonText: 'Tutup',
                })
            })
    }


    const tryMessage = (e) => {
        e.preventDefault()
        if (!isLogin) {
            Swal.fire({
                title: 'Unauthorized',
                text: 'Silahkan login terlebih dahulu',
                confirmButtonText: 'Tutup',
            })
        } else {
            Swal.fire({
                title: 'Kirim pesan',
                html: `<input type="text" id="pesan" class="swal2-input" placeholder="masukkan text">`,
                confirmButtonText: 'kirim',
                focusConfirm: false,
                preConfirm: () => {
                    const pesan = Swal.getPopup().querySelector('#pesan').value
                    return { text: pesan }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    sendMessage(result.value.text)
                }
            })
        }
    }


    useEffect(() => {
        setKecamatan({
            id: "",
            kecamatan: ""
        })
        getKecamatan()
    }, [kabupaten])


    useEffect(() => {
        setKabupaten({
            id: "",
            kabupaten: ""
        })
        getKabupaten()
    }, [provinsi])

    useEffect(() => {
        if (kecamatan !== "") {
            setCekButton(false)
        } else {
            setCekButton(true)
        }
    }, [kecamatan])

    const tryCreateMaxBid = (e) => {
        e.preventDefault()
        if (!isLogin) {
            Swal.fire({
                title: 'Unauthorized',
                text: 'Silahkan login terlebih dahulu',
                confirmButtonText: 'Tutup',
            })
        } else {
            Swal.fire({
                title: 'Masukkan password untuk menkonfirmasi',
                html: `<input type="password" id="password" class="swal2-input" placeholder="password">`,
                confirmButtonText: 'BID',
                focusConfirm: false,
                preConfirm: () => {
                    const pesan = Swal.getPopup().querySelector('#password').value
                    return { text: pesan }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    createMaxBid(result.value.text)
                }
            })
        }
    }

    const createMaxBid = async (password) => {
        let api
        if (lelang.open_bidding) {
            api = "createBid"
        } else {
            api = "createClosedBid"
        }
        await axios.put(`http://localhost:6001/lelang/${api}`, {
            withCredentials: true,
            id_lelang: lelang._id,
            userBid: lelang.auto_sell_price,
            password
        })
            .then((response) => {
                console.log(response.data.message)
                setUserBid(response.data.userBid)
                socket.emit('lelang', lelang._id)
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: response.data.message,
                    confirmButtonText: 'Tutup',
                })
            })
            .catch((error) => {
                console.log(error.response.data.message)
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: error.response.data.message,
                    confirmButtonText: 'Tutup',
                })
            })
        // socket.emit('create-bid', {
        //         id_lelang: lelang._id,
        //         userBid: bid
        // })
    }

    const tryCreateBid = (e) => {
        e.preventDefault()
        if (!isLogin) {
            Swal.fire({
                title: 'Unauthorized',
                text: 'Silahkan login terlebih dahulu',
                confirmButtonText: 'Tutup',
            })
        } else {
            Swal.fire({
                title: 'Masukkan password untuk menkonfirmasi',
                html: `<input type="password" id="password" class="swal2-input" placeholder="password">`,
                confirmButtonText: 'BID',
                focusConfirm: false,
                preConfirm: () => {
                    const pesan = Swal.getPopup().querySelector('#password').value
                    return { text: pesan }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    createBid(result.value.text)
                }
            })
        }
    }

    const createBid = async (password) => {
        let api
        if (lelang.open_bidding) {
            api = "createBid"
        } else {
            api = "createClosedBid"
        }
        await axios.put(`http://localhost:6001/lelang/${api}`, {
            withCredentials: true,
            id_lelang: lelang._id,
            userBid: bid,
            password
        })
            .then((response) => {
                console.log(response.data.message)
                setUserBid(response.data.userBid)
                socket.emit('lelang', lelang._id)
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: response.data.message,
                    confirmButtonText: 'Tutup',
                })
            })
            .catch((error) => {
                console.log(error.response.data.message)
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: error.response.data.message,
                    confirmButtonText: 'Tutup',
                })
            })
        // socket.emit('create-bid', {
        //         id_lelang: lelang._id,
        //         userBid: bid
        // })
    }

    // useEffect(() => {
    //     if(isLogin) {
    //         console.log('berjalan')

    //         socket.emit('add-user')
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isLogin])

    useEffect(() => {
        const getItem = async () => {
            dispatch(onLoad())
            await axios.get(`http://localhost:6001/item/getItem?itemId=${searchParams.get('itemId')}`)
                .then((response) => {
                    dispatch(onDone())
                    setItem(response.data.item)
                })
                .catch((err) => {
                    dispatch(onDone())
                    console.log(err.response.data.message)
                    alert(err.response.data.message)
                })
        }

        getItem()
        getProvinsi()
        getKurir()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (lelang !== null) {
            // if(moment(lelang.tanggal_akhir) > moment(new Date()) && moment(lelang.tanggal_awal) < moment(new Date())) {

            socket.emit('join', lelang._id)
            socket.emit('lelang', lelang._id)
            // }

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lelang])

    useEffect(() => {
        if (lelang !== null) {
            if (bidData.length > 0) {
                let highBid = parseInt(sortBidData()[0].price)
                if (highBid > bid) {
                    setBid(highBid + lelang.bid_increase)
                }
            } else {
                setBid(lelang.harga_dasar + lelang.bid_increase)
            }
        }
        if(isLogin) {
            if(bidData.some(e => e.id_bidder === user._id)) {
                setUserBid(bidData.find(e => e.id_bidder === user._id).price)
            } else {
                setUserBid(null)
            }
        }
    }, [bidData])

    const bidIncreaseOne = (e) => {
        e.preventDefault()
        setBid(b => b + lelang.bid_increase)
    }

    const bidIncreaseTen = (e) => {
        e.preventDefault()
        setBid(b => b + (lelang.bid_increase * 10))
    }

    const bidDecreaseOne = (e) => {
        e.preventDefault()
        if (lelang.open_bidding && bidData.length > 0) {
            let highBid = parseInt(sortBidData()[0].price)
            if ((bid - lelang.bid_increase) <= highBid) {
                return
            } else {
                setBid(b => b - lelang.bid_increase)
            }
        } else {
            if ((bid - lelang.bid_increase) <= lelang.harga_dasar) {
                return
            } else {
                setBid(b => b - lelang.bid_increase)
            }
        }

    }

    const bidDecreaseTen = (e) => {
        e.preventDefault()
        if (lelang.open_bidding && bidData.length > 0) {
            let highBid = parseInt(sortBidData()[0].price)
            if ((bid - (lelang.bid_increase * 10)) <= highBid) {
                return
            } else {
                setBid(b => b - (lelang.bid_increase * 10))
            }
        } else {
            if ((bid - (lelang.bid_increase * 10)) <= lelang.harga_dasar) {
                return
            } else {
                setBid(b => b - (lelang.bid_increase * 10))
            }
        }
    }

    useEffect(() => {
        const getlelang = async () => {
            await axios.get(`http://localhost:6001/lelang/getLelang/${item._id}`)
                .then((response) => {
                    setLelang(response.data.lelang)
                })
                .catch((err) => console.log(err))
        }
        const getSeller = async () => {
            await axios.get(`http://localhost:5001/seller/getSellerPublic?sellerId=${item.id_seller}`)
                .then((response) => {
                    setSellerItem(response.data.seller)
                    setSellerUser(response.data.user)
                    setSellerCount({item:response.data.countItem, lelang:response.data.countLelang, transaksi:response.data.countTransaction})
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        if (item !== null) {
            getSeller()
            setSelectedImage(item.gambar[0].url)
            getlelang()
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item])

    const openBidList = (e) => {
        e.preventDefault()
        ReactSwal.fire({
            title: 'Bid saat ini',
            html: <div className="h-[400px] w-full overflow-y-auto"> {bidData.map((bit, index) => {
                    return <div className="flex items-center justify-between">
                        <div className='flex'>
                        <span className='font-bold text-lg'>{index + 1}</span>
                        <img className="ml-1 w-[30px] h-[30px] rounded-full border border-orange-300" src={(bit.user.photo === '' ? Nopict : bit.user.photo)} alt={bit.user.username + "imglist"}
                            onError={(e) => {
                                e.currentTarget.src = Nopict
                                e.currentTarget.onerror = null
                            }}
                        />
                        <span className='font-bold ml-1'>{bit.user.username}<span className='ml-1 text-sm text-slate-500'>{bit.id_bidder === user._id && '(anda)'}</span></span>
                        </div>
                        <span className='font-bold text-red-500'><CurrencyFormat value={bit.price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span>
                    </div>
                })}
            `</div>,
            showCloseButton: true,
        })
    }

    const sortBidData = () => {
        const sortedBidData = bidData.sort((a, b) => b.price - a.price)
        return sortedBidData
    }

    const countdownRender = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span>Pelelangan telah berakhir</span>
        } else {
            return <span className='text-sm'>BERAKHIR DALAM : {days}H {hours}J {minutes}M {seconds}D</span>
        }
    }

    const countdownRenderMulai = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span>Pelelangan telah dimulai</span>
        } else {
            return <span className='text-sm'>Akan dimulai : {days}H {hours}J {minutes}M {seconds}D</span>
        }
    }

    const toToko = (e) => {
        e.preventDefault()
        navigate(`/toko?sellerId=${sellerItem._id}`)
    }

    useEffect(() => {
        // return ()=>{    
        //     socket.disconnect()
        // }
    })

    const columns = [
        {
            name: 'Service',
            selector: row => row.service
        },
        {
            name: 'Tarif',
            cell: row => (
                <><span className={`${item.promo.ada && 'line-through text-slate-500 mr-1'}`}><CurrencyFormat value={row.cost[0].value} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span>{item.promo.ada && <CurrencyFormat value={(row.cost[0].value - item.promo.disc) < 0 ? 0 : (row.cost[0].value - item.promo.disc)} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} />}</>
            )
        },
        {
            name: 'Perkiraan waktu',
            cell: row => (
                <><span>{row.cost[0].etd} Hari</span></>
            )
        }
    ]

    // const columns = [
    //     {
    //         name: 'Service',
    //         selector: row => row.Service
    //     },
    //     {
    //         name: 'Tarif',
    //         cell: row => (
    //             <><span>{row.Tarif}</span></>
    //         )
    //     },
    //     {
    //         name: 'Perkiraan waktu',
    //         cell: row => (
    //             <><span>{row["Perkiraan Waktu Kedatangan"]} Hari</span></>
    //         )
    //     }
    // ]


    return (
        <div className='pt-4'>
            {item === null ?
                <p>Data item tidak ditemukan</p>
                :
                <WhiteCard>
                    <div className="flex h-full flex-col lg:flex-row py-4">
                        <div className='lg:w-full max-h-fit lg:max-w-[550px] h-full lg:max-h-[450px] justify-between flex justify-self-center flex-col lg:flex-row gap-y-2 mb-2'>
                            {/* Preview */}
                            <div className='lg:h-[450px] lg:w-auto w-full h-[300px] aspect-square border outline-slate-200 items-center justify-items-center flex m-auto'>
                                <img src={selectedImage} alt={item.nama_item} className="max-h-full h-auto w-auto max-w-full m-auto" key={item._id}
                                    onError={(e) => {
                                        e.currentTarget.src = NotFoundPng
                                        e.currentTarget.onerror = null
                                    }}
                                />
                            </div>
                            {/* Nav-Preview */}
                            <div className='flex w-full lg:flex-col gap-2 lg:h-auto lg:overflow-y-auto lg:overflow-x-hidden overflow-x-auto overflow-y-hidden overflow-scroll scroll-smooth lg:w-[70px] l-hide-scroll'>
                                {item.gambar.map(gambar => {
                                    return <div className={`min-h-[70px] max-h-[70px] aspect-square border items-center justify-items-center flex hover:cursor-pointer ` + (gambar.url === selectedImage ? 'backdrop-brightness-100 bg-orange-100 border-orange-500' : 'outline-slate-200')} key={`preview_${gambar.id}`} onClick={(e) => setSelectedImage(gambar.url)} >
                                        <img src={gambar.url} alt={gambar.id} className={`max-h-full max-w-full m-auto w-auto h-auto `} key={`preview_${gambar.id}`}
                                            onError={(e) => {
                                                e.currentTarget.src = NotFoundPng
                                                e.currentTarget.onerror = null
                                            }}
                                        />
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className="w-full lg:ml-10">
                            <p className='lg:text-4xl text-2xl font-bold uppercase pb-4'>{item.nama_item}</p>
                            <div className="w-full justify-between flex flex-row items-center pb-4">
                                <div>
                                    {item.promo.ada && 
                                        <span className='px-2 py-1 shadow rounded-full bg-green-400 text-white text-sm font-bold'><LocalShippingOutlined sx={{ fontSize: 15 }} /> potong ongkir s/d - <CurrencyFormat value={item.promo.disc} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span>
                                    }
                                </div>
                                <div>
                                    {/* <button className={`h-[28px] w-[28px] rounded-full shadow aspect-square text-slate-700 bg-white/70 hover:bg-white`}><Favorite sx={{ fontSize: 20 }} /></button> */}
                                    <RWebShare
                                        data={{
                                            text: `Ayo lihat item yang sedang di lelang saat ini, ${item.nama_item} hanya di aplikasi Levint, Klik link berikut`,
                                            url: `http://localhost:3000/item?itemId=${searchParams.get('itemId')}`,
                                            title: 'Bagikan'
                                        }}
                                    >
                                        <button className={`h-[28px] w-[28px] rounded-full shadow aspect-square text-slate-700 bg-white/70 hover:bg-white ml-2`}><Share sx={{ fontSize: 20 }} /></button>
                                    </RWebShare>
                                </div>
                            </div>
                            {lelang !== null ?
                                moment(lelang.tanggal_akhir) < moment(new Date()) ?
                                    <div className='flex items-center justify-center rounded bg-orange-100 p-2'>
                                        <span>Lelang telah berakhir</span>
                                    </div>
                                    :
                                    lelang.status === 'onTransaction' ?
                                    <div className='flex items-center justify-center rounded bg-orange-100 p-2'>
                                        <span>Item terjual</span>
                                    </div>
                                    :
                                    (moment(lelang.tanggal_mulai) > moment(new Date()) ?
                                        <>
                                        <Countdown date={lelang.tanggal_mulai} renderer={countdownRenderMulai} />
                                        <div className='flex flex-col items-center justify-center rounded bg-orange-100 p-2'>
                                            <span className='font-bold py-2'>Info lelang</span>
                                            <div className='w-full bg-white px-4 py-2'>
                                                <div className='flex w-full justify-between'>
                                                    <span>Harga awal</span>
                                                    <span><CurrencyFormat value={lelang.harga_dasar} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span>
                                                </div>
                                                <div className='flex w-full justify-between'>
                                                    <span>Kelipatan kenaikan</span>
                                                    <span><CurrencyFormat value={lelang.bid_increase} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span>
                                                </div>
                                                {lelang.sell_limit && 
                                                    <div className='flex w-full justify-between'>
                                                        <span>Sell limit</span>
                                                        <span><CurrencyFormat value={lelang.sell_limit_price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span>
                                                    </div>
                                                }
                                                {lelang.auto_sell && 
                                                    <div className='flex w-full justify-between'>
                                                        <span>Harga "Buy now"</span>
                                                        <span><CurrencyFormat value={lelang.auto_sell_price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span>
                                                    </div>
                                                }
                                            </div>
                                        </div></>
                                        :

                                        <>
                                        <div className='w-full bg-slate-300 h-[1px] my-2'></div>
                                            <div className='p-2 bg-red-500 rounded flex text-white mb-4 flex-row items-center font-bold justify-center shadow'>
                                                <TimerOutlined sx={{ fontSize: 18 }}/>
                                                <div className='h-[16px] bg-white w-[1px] mx-2'></div>
                                                <Countdown date={lelang.tanggal_akhir} renderer={countdownRender} />
                                            </div>
                                            {bidData.length > 0 ?
                                                <>
                                                    <div className='flex flex-row justify-between mb-4'>
                                                        <div className="flex">
                                                            <img className="ml-1 w-[50px] h-[50px] rounded-full border border-orange-300" src={(bidData[0].user.photo === '' ? Nopict : bidData[0].user.photo)} alt={bidData[0].user.username + "img"}
                                                                onError={(e) => {
                                                                    e.currentTarget.src = Nopict
                                                                    e.currentTarget.onerror = null
                                                                }}
                                                            />
                                                            <div className='flex flex-col ml-2'>
                                                                <span>Bid tertinggi oleh <span className='font-bold'> {bidData[0].user.username}</span></span>
                                                                <span className='font-bold'><CurrencyFormat value={bidData[0].price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span>
                                                            </div>
                                                        </div>
                                                        <div className='text-red-500'>
                                                            <span className='text-2xl mr-2'>{bidLength} <span className=' text-base'>bid</span></span>
                                                            <button className='text-slate-500 text-sm' onClick={(e) => openBidList(e)}>&#40;lihat semua&#41;</button>
                                                        </div>
                                                    </div>
                                                </>
                                             : 
                                                <div className='mb-4'>
                                                    <span>Belum ada yang menawar</span>
                                                </div>
                                             }
                                             <div className='lg:flex'>
                                                <div className="border-slate-300 border shadow p-2 rounded lg:w-1/2">
                                                    <span className='mb-1'>Masukkan bid :</span>
                                                    <div className='flex w-full justify-center gap-x-2 items-center'>
                                                        <button onClick={(e) => bidDecreaseTen(e)} className="border rounded px-1 shadow"><KeyboardDoubleArrowDownOutlined />10x</button>
                                                        <button onClick={(e) => bidDecreaseOne(e)} className="border rounded px-1 shadow"><KeyboardArrowDownOutlined /></button>
                                                        <CurrencyFormat value={bid} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} />
                                                        <button onClick={(e) => bidIncreaseOne(e)} className="border rounded px-1 shadow"><KeyboardArrowUpOutlined /></button>
                                                        <button onClick={(e) => bidIncreaseTen(e)} className="border rounded px-1 shadow"><KeyboardDoubleArrowUpwardOutlined />10x</button>
                                                    </div>
                                                    <button onClick={(e) => tryCreateBid(e)} className="w-full text-center py-1 bg-green-500 rounded text-white mt-2 font-bold text-xl"><GavelOutlined />Bid</button>
                                                </div>
                                                {lelang.auto_sell && 
                                                            <>
                                                                <div className='flex w-full lg:items-center lg:w-1/2'>
                                                                    <span className='mx-4'>/</span>
                                                                    <button onClick={(e) => tryCreateMaxBid(e)} className="text-center w-full py-1 bg-green-500 rounded text-white"><LocalMallOutlined />Beli Sekarang <CurrencyFormat value={lelang.auto_sell_price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></button>
                                                                </div>
                                                            </>
                                                        }
                                             </div>
                                             
                                             <div>
                                                <p className='w-full flex items-center'><VisibilityOutlined sx={{ fontSize: 18, color: 'red' }} /><span className='text-red-500 font-bold'> {viewUser}</span> sedang menyaksikan lelang ini</p>
                                             </div>
                                            {/* <div className='w-full p-2 border border-slate-100 rounded-sm shadow-lg shadow-orange-300 lg:h-[320px] h-full flex flex-col lg:flex-row gap-2'>
                                                <div className='w-full h-full flex flex-col gap-y-2'>
                                                    <span className='text-center font-bold'>Live BID</span>
                                                    <div className='flex flex-col w-full gap-y-2 h-[200px]'> */}
                                                        {/* {bidData.length < 1 ?
                                                            <span>Bid Start {lelang.harga_dasar}</span>
                                                            :
                                                            sortBidData().map((bid) => {
                                                                return <div className='w-full border rounded l-border-brown flex justify-between p-2' key={`${bid.id_bidder}${bid.price}`}>
                                                                    <span className="w-[150px] truncate">@user{bid.id_bidder}</span>
                                                                    <span><CurrencyFormat value={bid.price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span>
                                                                </div>
                                                            })
                                                        } */}
                                                    {/* </div>
                                                    <div className='flex flex-col w-full'>
                                                        <p className='w-full flex items-center'><GavelOutlined sx={{ fontSize: 18 }}/> {bidLength} Bid</p>
                                                        <p className='w-full flex items-center'><VisibilityOutlined sx={{ fontSize: 18 }} /> {viewUser} Penonton Langsung</p>
                                                        
                                                    </div>
                                                </div>
                                                <div className='lg:h-full border border-slate-200 w-full lg:w-[1px]'></div>
                                                <div className='w-full h-full flex flex-col'>
                                                    <span className='text-center font-bold'>Masukkan bid anda</span>
                                                    <div className='h-full l-bg-light-brown rounded shadow shadow-orange-300 p-2 w-full'>
                                                        <div className='flex w-full justify-between'>
                                                            <span>Harga awal</span>
                                                            <span><CurrencyFormat value={lelang.harga_dasar} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span>
                                                        </div>
                                                        <div className='flex w-full justify-between'>
                                                            <span>Kelipatan kenaikan</span>
                                                            <span><CurrencyFormat value={lelang.bid_increase} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span>
                                                        </div>
                                                        <div className='flex w-full justify-between'>
                                                            <span>Jaminan</span>
                                                            <span><CurrencyFormat value={50000} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span>
                                                        </div> */}
                                                        {/* {lelang.sell_limit && 
                                                            <div className='flex w-full justify-between'>
                                                                <span>Sell limit</span>
                                                                <span><CurrencyFormat value={lelang.sell_limit_price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span>
                                                            </div>
                                                        } */}
                                                        {/* {lelang.auto_sell && 
                                                            <div className='flex w-full justify-between'>
                                                                <span>Beli langsung</span>
                                                                <span><CurrencyFormat value={lelang.auto_sell_price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span>
                                                            </div>
                                                        } */}
                                                        {/* <div className='flex w-full justify-between'>
                                                            <span>Tawaran anda</span> */}
                                                            {/* {userBid === null ?
                                                                <span>belum menawar</span>
                                                                :
                                                                <span><CurrencyFormat value={userBid} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span>
                                                            } */}
                                                        {/* </div> */}
                                                        {/* <input type="text" onChange={(e) => setBid(e.target.value)}/> */}
                                                        {/* <div className='flex w-full justify-center gap-x-2'>
                                                            <button onClick={(e) => bidDecreaseTen(e)} className="border rounded px-1 l-border-brown text-white l-bg-brown shadow shadow-orange-300">-10x</button>
                                                            <button onClick={(e) => bidDecreaseOne(e)} className="border rounded px-1 l-border-brown text-white l-bg-brown shadow shadow-orange-300">-</button>
                                                            <CurrencyFormat value={bid} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} />
                                                            <button onClick={(e) => bidIncreaseOne(e)} className="border rounded px-1 l-border-brown text-white l-bg-brown shadow shadow-orange-300">+</button>
                                                            <button onClick={(e) => bidIncreaseTen(e)} className="border rounded px-1 l-border-brown text-white l-bg-brown shadow shadow-orange-300">+10x</button>
                                                        </div>
                                                        <button onClick={(e) => tryCreateBid(e)} className="w-full text-center l-bg-brown rounded text-white mt-2">Bid</button> */}
                                                        {/* {lelang.auto_sell && 
                                                            <>
                                                                <div className='flex w-full'>
                                                                    <div className=" bg-white w-full" style={{ height: "1px" }}></div>
                                                                    <div className="relative px-2">
                                                                        <span className="text-slate-500">ATAU</span>
                                                                    </div>
                                                                    <div className=" bg-white w-full" style={{ height: "1px" }}></div>
                                                                </div>
                                                                <div className='flex w-full'>
                                                                    <button onClick={(e) => tryCreateMaxBid(e)} className="w-full text-center bg-green-300 rounded text-green-700">Beli Langsung <CurrencyFormat value={lelang.auto_sell_price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></button>
                                                                </div>
                                                            </>
                                                        } */}
                                                    {/* </div>
                                                </div>
                                            </div> */}
                                        </>
                                    )
                                :
                                <div className='flex items-center justify-center rounded bg-orange-100 p-2'>
                                    <span>Tidak ada jadwal lelang untuk item ini</span>
                                </div>
                            }
                        </div>
                    </div>
                    {/* <div className='flex h-full flex-col lg:flex-row py-4'> */}
                    <div className='py-2 min-h-[700px]'>
                        <div className='mb-4 w-full'>
                            <span className='text-slate-900 text-2xl font-bold text-center'>Informasi</span>
                        </div>

                        <Tabs>
                            <TabList className={'bg-slate-100 px-4 py-2 rounded'}>
                                <Tab selectedClassName='bg-white shadow text-black font-bold'>Deskripsi</Tab>
                                <Tab selectedClassName='bg-white shadow text-black font-bold'>Spesifikasi</Tab>
                                <Tab selectedClassName='bg-white shadow text-black font-bold'>Penjual</Tab>
                                <Tab selectedClassName='bg-white shadow text-black font-bold'>Cek Tarif Pengiriman</Tab>
                            </TabList>
                            <TabPanel>
                                <div className='w-fit px-4 mt-4'>
                                    <p className='whitespace-pre-line my-1'>{item.deskripsi_item}</p>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className='w-fit px-4 mt-4'>
                                    <p>Merek : {item.merek}</p>
                                    <p>Tahun dibuat : {item.tahun}</p>
                                    <p>Kuantitas : {item.jumlah_item}</p>
                                    <p>Dimensi : {item.panjang_cm} x {item.lebar_cm} x {item.tinggi_cm} | P x L x T</p>
                                    <p>Berat : {item.berat}</p>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                {sellerUser !== null ?
                                <div className='p-4 flex lg:flex-row flex-col mt-4'>
                                    <div className='lg:w-1/3 items-center flex flex-col p-4 border l-bg-light-brown rounded-lg l-border-brown'>
                                        <img className="ml-1 w-[200px] h-[200px] rounded-full border border-orange-300" src={(sellerUser.photo === '' ? Nopict : sellerUser.photo)} alt={sellerUser.username}
                                            onError={(e) => {
                                                e.currentTarget.src = Nopict
                                                e.currentTarget.onerror = null
                                            }}
                                        />
                                        <span className='font-bold text-xl text-green-400'><StoreFrontOutlined className="text-green-400" /> {sellerItem.nama_toko}</span>
                                        <span className='text-gray-500'>Penjual : <span className='text-black'>{sellerUser.username}</span></span>
                                        <div className='py-4 gap-x-4 flex'>
                                            <button className="border-2 l-border-brown rounded-lg l-font-brown p-2 hover:bg-amber-700 hover:text-white hover:shadow font-bold" onClick={(e) => tryMessage(e)}><Chat /> Chat</button>
                                            <button className="border-2 l-border-brown rounded-lg l-font-brown p-2 hover:bg-amber-700 hover:text-white hover:shadow font-bold" onClick={(e) => toToko(e)}><Home /> Kunjungi Toko</button>
                                        </div>
                                    </div>
                                    <div className='lg:w-1/3 flex flex-col gap-y-4 p-4'>
                                        <div className='flex flex-row gap-x-4'>
                                            <LocationOn sx={{ fontSize: 40 }} className="text-green-400"/>
                                            <div className='flex flex-col'>
                                                <span className='text-green-400 font-bold'>Lokasi toko</span>
                                                <span>{sellerItem.alamat.alamat_lengkap}</span>
                                                <span>{sellerItem.alamat.kabupaten.kabupaten}, {sellerItem.alamat.provinsi.provinsi}</span>
                                            </div>
                                        </div>
                                        <div className='flex flex-row gap-x-4'>
                                            <ContactPhoneOutlined sx={{ fontSize: 40 }} className="text-green-400"/>
                                            <div className='flex flex-col'>
                                                <span className='text-green-400 font-bold'>Kontak</span>
                                                <span className='text-gray-500'>Toko : <span className='text-black'>{sellerItem.no_telp}</span></span>
                                                <span className='text-gray-500'>Penjual : <span className='text-black'>{sellerItem.phone}</span></span>
                                            </div>
                                        </div>
                                        <div className='flex flex-row gap-x-4'>
                                            <Home sx={{ fontSize: 40 }} className="text-green-400"/>
                                            <div className='flex flex-col'>
                                                <span className='text-green-400 font-bold'>Alamat rumah</span>
                                                <span>{sellerUser.alamat.alamat_lengkap}</span>
                                                <span>{sellerUser.alamat.kabupaten.kabupaten}, {sellerUser.alamat.provinsi.provinsi}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='lg:w-1/3 flex flex-col p-4 gap-y-4'>
                                        <span className='text-green-400 font-bold'><InfoOutlined /> Dari toko ini</span>
                                        <div className='border border-slate-200 items-center flex flex-col'>
                                            <span className='text-green-400 text-2xl'>{sellerCount.item}</span>
                                            <span>Produk</span>
                                        </div>
                                        <div className='border border-slate-200 items-center flex flex-col'>
                                            <span className='text-green-400 text-2xl'>{sellerCount.lelang}</span>
                                            <span>Saat ini di lelang</span>
                                        </div>
                                        <div className='border border-slate-200 items-center flex flex-col'>
                                            <span className='text-green-400 text-2xl'>{sellerCount.transaksi}</span>
                                            <span>Terjual</span>
                                        </div>
                                    </div>
                                </div>
                                 : ''}
                            </TabPanel>
                            <TabPanel>
                                <div className='w-full px-4 mt-4'>
                                    <div className='bg-slate-100 rounded p-1 flex flex-col'>
                                        <span>Pengiriman dari : {item.kabupaten.kabupaten}, {item.provinsi.provinsi}</span>
                                        <span>Berat : {item.berat} &#40;gram&#41;</span>
                                    </div>
                                    <span>Lokasi penerima / tujuan :</span>
                                    <div className='w-full flex flex-row gap-x-2 p-2 bg-orange-100 rounded'>
                                        <div className='flex flex-col w-1/2'>
                                            <span>Provinsi</span>
                                            <Select placeholder="Provinsi" options={provinsiOpsi} className='basic-select' classNamePrefix="select" name="Provinsi" onChange={inputProvinsiChange} />
                                        </div>
                                        <div className='flex flex-col w-1/2'>
                                            <span>Kabupaten / Kota</span>
                                            <Select placeholder="Kabupaten" options={kabupatenOpsi} className='basic-select' classNamePrefix="select" name="Kabupaten" onChange={inputKabupatenChange} />
                                        </div>
                                        {/* <div className='flex flex-col w-1/3'>
                                            <span>Kecamatan</span>
                                            <Select placeholder="Kecamatan" options={kecamatanOpsi} className='basic-select' classNamePrefix="select" name="Kecamatan" onChange={inputKecamatanChange} />
                                        </div> */}
                                    </div>
                                    <span>Kurir :</span>
                                    <div className='w-full flex flex-row'>
                                        <div className='flex flex-col w-2/3'>
                                            <Select placeholder="Kurir" options={kurirOpsi} className='basic-select' classNamePrefix="select" name="Kurir" onChange={inputKurirChange} />
                                        </div>
                                        <button onClick={(e) => getTarifOngkir(e)} className={`w-1/3 ${cekButton ? `bg-slate-100` : `l-bg-light-brown border l-border-brown shadow shadow-orange-300`}`} disabled={cekButton}>Cek</button>
                                    </div>

                                    <div>
                                        <DataTable
                                            columns={columns}
                                            data={tarifOnkir}
                                            noDataComponent="Pengiriman tidak tersedia"
                                            progressPending={kurirPending}
                                            // customStyles={customStyles}
                                            noHeader={true}
                                        />
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        {/* <div className='w-full'>
                            <span className='text-lg font-bold'>Detail Item</span>
                            <div className='w-full l-bg-light-brown h-[1px] my-2'></div>
                            <p className='text-lg font-bold'>Deskripsi</p>
                            <p className='whitespace-pre-line my-1'>{item.deskripsi_item}</p>
                            <p className='text-lg font-bold mt-4'>Spesifikasi</p>
                            <div className='w-full l-bg-light-brown h-[1px] my-2'></div>
                            <p>Merek : {item.merek}</p>
                            <p>Tahun dibuat : {item.tahun}</p>
                            <p>Kuantitas : {item.jumlah_item}</p>
                            <p>Dimensi : {item.panjang_cm} x {item.lebar_cm} x {item.tinggi_cm} | P x L x T</p>
                            <p>Berat : {item.berat}</p>
                        </div>
                        <div className='w-full lg:ml-10'>
                            <p className='text-lg font-bold'>Cek tarif ongkir</p>
                            <div className='w-full l-bg-light-brown h-[1px] my-2'></div>
                            <span>Lokasi penerima / tujuan :</span>
                            <div className='w-full flex flex-row gap-x-2 p-2 bg-orange-100 rounded'>
                                <div className='flex flex-col w-1/2'>
                                    <span>Provinsi</span>
                                    <Select placeholder="Provinsi" options={provinsiOpsi} className='basic-select' classNamePrefix="select" name="Provinsi" onChange={inputProvinsiChange} />
                                </div>
                                <div className='flex flex-col w-1/2'>
                                    <span>Kabupaten / Kota</span>
                                    <Select placeholder="Kabupaten" options={kabupatenOpsi} className='basic-select' classNamePrefix="select" name="Kabupaten" onChange={inputKabupatenChange} />
                                </div> */}
                                {/* <div className='flex flex-col w-1/3'>
                                    <span>Kecamatan</span>
                                    <Select placeholder="Kecamatan" options={kecamatanOpsi} className='basic-select' classNamePrefix="select" name="Kecamatan" onChange={inputKecamatanChange} />
                                </div> */}
                            {/* </div> */}
                            {/* <span>Kurir :</span>
                            <div className='w-full flex flex-row'>
                                <div className='flex flex-col w-2/3'>
                                    <Select placeholder="Kurir" options={kurirOpsi} className='basic-select' classNamePrefix="select" name="Kurir" onChange={inputKurirChange} />
                                </div>
                                <button onClick={(e) => getTarifOngkir(e)} className={`w-1/3 ${cekButton ? `bg-slate-100` : `l-bg-light-brown border l-border-brown shadow shadow-orange-300`}`} disabled={cekButton}>Cek</button>
                            </div> */}

                            {/* <div>
                                <DataTable
                                    columns={columns}
                                    data={tarifOnkir}
                                    noDataComponent="Pengiriman tidak ada"
                                    progressPending={kurirPending}
                                    // customStyles={customStyles}
                                    noHeader={true}
                                /> */}
                                {/* {tarifOnkir !== null && 
                                // <span>{JSON.stringify(tarifOnkir)}</span>
                                tarifOnkir.map((ongkir) => {
                                    return(<span>{ongkir["Perkiraan Waktu Kedatangan"]}</span>)
                                })
                            } */}
                            {/* </div> */}
                        {/* </div> */}
                    </div>
                </WhiteCard>
            }
        </div>
    )
}
export default ItemShow