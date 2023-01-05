import { WhiteCard } from "../components/cards/white-card"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CurrencyFormat from 'react-currency-format'
import Select from "react-select"
import { onLoad, onDone } from '../components/stateSlice/loadingSlice.js';
import axios from "axios"
import Swal from 'sweetalert2'
import DataTable from 'react-data-table-component';
import FullModal from '../components/modals/fullModal'
import Modal from '../components/modals/modal'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import withReactContent from 'sweetalert2-react-content'

const TransaksiPage = () => {
    // id_transaksi, kurir, provinsi, kabupaten, kecamatan, nama_penerima, alamat_lengkap, catatan, no_telp
    const dispatch = useDispatch()
    const ReactSwal = withReactContent(Swal)
    // const user = useSelector((state) => state.login.dataUser)
    const isLogin = useSelector((state) => state.login.isLogin)
    const user = useSelector((state) => state.login.dataUser)
    const [modalShow, setModalShow] = useState(false)
    const [modalShow2, setModalShow2] = useState(false)
    const [pending, setPending] = useState(false)
    const [pendingTarif, setPendingTarif] = useState(false)
    const [allTransaksi, setAllTransaksi] = useState([])
    const [transaksiBaru, setTransaksiBaru] = useState([])
    const [transaksiBayar, setTransaksiBayar] = useState([])
    const [transaksiPack, setTransaksiPack] = useState([])
    const [transaksiShip, setTransaksiShip] = useState([])
    const [transaksiDone, setTransaksiDone] = useState([])
    const [transaksiBatal, setTransaksiBatal] = useState([])
    const [namaPenerima, setNamaPenerima] = useState("")
    const [idTransaksi, setIdTransaksi] = useState("")
    const [noTelp, setNoTelp] = useState("")
    const [catatan, setCatatan] = useState("")
    const [subTotal, setSubTotal] = useState(0)
    const [alamatLengkap, setAlamatLengkap] = useState("")
    const [item, setItem] = useState({})
    const [selectKurir, setSelectKurir] = useState({
        code: "",
        service: "",
        harga: 0
    })
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
    const [selectProvinsi, setSelectProvinsi] = useState(null)
    const [selectKabupaten, setSelectKabupaten] = useState(null)
    const [kurir, setKurir] = useState({
        id: "",
        kurir: ""
    })
    const [kurirOpsi, setKurirOpsi] = useState([])
    const [tarifOnkir, setTarifOngkir] = useState([])
    const status = [
        {
            value: "unconfirmed",
            label: "unconfirmed"
        },
        {
            value: "confirmed",
            label: "confirmed"
        },
        {
            value: "payed",
            label: "payed"
        },
        {
            value: "canceled",
            label: "canceled"
        },
        {
            value: "packaging",
            label: "packaging"
        },
        {
            value: "onshipping",
            label: "onshipping"
        },
        {
            value: "delivered",
            label: "delivered"
        },
        {
            value: "done",
            label: "done"
        }
    ]

    const showAlamat = (e) => {
        e.preventDefault()
        ReactSwal.fire({
            title: 'Pilih alamat',
            html: <div className="h-[400px] w-full overflow-y-auto">
                {user.savedAlamat.map((alamat) => {
                    return <div onClick={(e) => pickAlamat(e, alamat)} className={`rounded p-2 flex flex-row justify-between text-slate-700 border shadow cursor-pointer ${namaPenerima === alamat.nama_penerima ? 'bg-sky-300' : 'bg-sky-100'}`}>
                        <div className="flex flex-col text-left">
                            <span className='font-bold text-lg text-black'>{alamat.nama_penerima}</span>
                            <span>{alamat.no_telp}</span>
                            <span>{alamat.alamat_lengkap}, {alamat.kabupaten.kabupaten}, {alamat.provinsi.provinsi}</span>
                        </div>
                        {/* <button onClick={} className='text-red-500'>Pilih</button> */}
                    </div>
                })}
            </div>,
            showCloseButton: true,
        })
    }

    const pickAlamat = (e, alamat) => {
        e.preventDefault()
        setAlamatLengkap(alamat.alamat_lengkap)
        setProvinsi({
            id: alamat.provinsi.id,
            provinsi: alamat.provinsi.provinsi
        })
        setKabupaten({
            id: alamat.kabupaten.id,
            kabupaten: alamat.kabupaten.kabupaten
        })
        setSelectProvinsi({value: alamat.provinsi.id, label: alamat.provinsi.provinsi})
        setSelectKabupaten({value: alamat.kabupaten.id, label: alamat.kabupaten.kabupaten})
        setNamaPenerima(alamat.nama_penerima)
        setNoTelp(alamat.no_telp)
    }

    useEffect(() => {
        
        if(allTransaksi !== []) {
            allTransaksi.map((transaksi) => {
                switch (transaksi.status) {
                    case "unconfirmed":
                        setTransaksiBaru(t => [...t, transaksi])
                        return
                    case "confirmed":
                        setTransaksiBayar(t => [...t, transaksi])
                        return
                    case "payed":
                        setTransaksiBayar(t => [...t, transaksi])
                        return
                    case "canceled":
                        setTransaksiBatal(t => [...t, transaksi])
                        return
                    case "packaging":
                        setTransaksiPack(t => [...t, transaksi])
                        return
                    case "onshipping":
                        setTransaksiShip(t => [...t, transaksi])
                        return
                    case "delivered":
                        setTransaksiDone(t => [...t, transaksi])
                        return
                    case "done":
                        setTransaksiDone(t => [...t, transaksi])
                        return
                    default:
                        return
                }
            })
        }
    }, [allTransaksi])

    const confirmTransaksi = async (e) => {
        e.preventDefault()
        if(idTransaksi === "" || selectKurir.code === "" || provinsi.id === "" || kabupaten.id === "" || namaPenerima === "" || noTelp === "" || alamatLengkap === "") {
            Swal.fire({
                title: 'Data yang anda inputkan salah',
                text: 'Coba cek kembali',
                confirmButtonText: 'Tutup',
            })
        } else {
            dispatch(onLoad())
            await axios.post('http://localhost:6001/transaksi/confirmTransaksi', {
                withCredentials: true,
                id_transaksi: idTransaksi,
                kurir: {code: selectKurir.code, harga: selectKurir.harga - item.promo.disc, service: selectKurir.service},
                provinsi, 
                kabupaten, 
                kecamatan, 
                nama_penerima: namaPenerima, 
                alamat_lengkap: alamatLengkap, 
                catatan: catatan, 
                no_telp: noTelp
            })
            .then((response) => {
                dispatch(onDone())
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: response.data.message,
                    confirmButtonText: 'Oke',
                })
            })
            .catch((error) => {
                dispatch(onDone())
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal!',
                    text: error.response.data.message,
                    confirmButtonText: 'Oke',
                })
            })
        }
    }

    const openModalResi = (resi, kurir, id) => {
        console.log(id)
        Swal.fire({
            title: 'Barang sedang dalam pengiriman',
            text: `Nomor resi: ${resi} (${kurir})`,
            showCancelButton: true,
            cancelButtonText: 'Tutup',
            confirmButtonText: 'Barang telah sampai',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Konfirmasi barang telah sampai',
                    text: `Apakah anda yakin barang telah sampai anda?`,
                    showCancelButton: true,
                    cancelButtonText: 'Batal',
                    confirmButtonText: 'Ya, saya telah menerima',
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        terimaPesanan(id)
                    }
                })
            }
        })
    }

    const terimaPesanan = async (id) => {
        dispatch(onLoad())
        await axios.post('http://localhost:6001/transaksi/terimaPesanan', {
            withCredentials: true,
            id_transaksi: id
        })
        .then((response) => {
            dispatch(onDone())
            getAllTransaksi()
            Swal.fire({
                title: 'Data berhasil diupdate!',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: 'green'
            })
        })
        .catch((error) => {
            dispatch(onDone())
            Swal.fire({
                title: 'Permintaan gagal!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: 'orange'
            })
        })
    }

    const openModal = (e, data) => {
        e.preventDefault()
        setItem(data.item)
        console.log(data)
        let kurirs = []
        data.item.kurirList.map((kur) => {
            kurirs.push({ value: kur, label: kur })
        })
        setKurirOpsi(kurirs)
        setIdTransaksi(data._id)
        setModalShow(true)
    }
    const closeModal = (e) => {
        e.preventDefault()
        setModalShow(false)
    }

    const openModal2 = (e) => {
        e.preventDefault()
        if (kabupaten.id === "" || kurir.id === "" || item.berat === "") {
            Swal.fire({
                title: 'Alamat yang di pilih tidak sesuai',
                text: 'Pilih alamat dengan benar, atau refresh halaman',
                confirmButtonText: 'Tutup',
            })
        } else {
            getTarifOngkir()
            setModalShow2(true)
        }
    }

    const closeModal2 = (e) => {
        e.preventDefault()
        setModalShow2(false)
    }

    useEffect(() => {
        getKecamatan()
    }, [kabupaten])


    useEffect(() => {
        getKabupaten()
    }, [provinsi])

    const getTarifOngkir = async () => {
        console.log(kabupaten.id)
        console.log(kurir.id)
        console.log(item.berat)
        if (kabupaten.id === "" || kurir.id === "" || item.berat === "") {
            Swal.fire({
                title: 'Alamat atau kuri yang di pilih tidak sesuai',
                text: 'Pilih alamat dengan benar, atau refresh halaman',
                confirmButtonText: 'Tutup',
            })
        } else {
            setPendingTarif(true)
            await axios.post('http://localhost:6001/item/getCostRO', {
                from: item.kabupaten.id,
                to: kabupaten.id,
                berat: item.berat,
                kurir: kurir.id
            })
                .then((response) => {
                    setPendingTarif(false)
                    const body = JSON.parse(response.data.body)
                    console.log(body)
                    setTarifOngkir(body.rajaongkir.results[0].costs)
                })
        }
    }

    // const getTarifOngkir = async () => {
    //     setPendingTarif(true)
    //     await axios.post('http://localhost:6001/item/getCost', {
    //         from: item.kecamatan.id,
    //         to: kecamatan.id,
    //         berat: item.berat,
    //         kurir: kurir.id
    //     })
    //         .then((response) => {
    //             setPendingTarif(false)
    //             console.log(response.data.tarif)
    //             setTarifOngkir(response.data.tarif)
    //         })
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
        setSelectProvinsi(value)
    }

    const inputKabupatenChange = (value) => {
        setKabupaten({
            id: value.value,
            kabupaten: value.label
        })
        setSelectKabupaten(value)
    }

    const inputKecamatanChange = (value) => {
        setKecamatan({
            id: value.value,
            kecamatan: value.label
        })
    }

    const getProvinsi = async () => {
        await axios.post('http://localhost:6001/item/getProvinsi')
            .then((response) => {
                const body = JSON.parse(response.data.body)
                console.log()
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

    const checkPaymentStatus = async (e, transactionToken) => {
        e.preventDefault()
        await axios.post('http://localhost:6001/transaksi/checkPaymentTransaksiStatus', {
            withCredentials: true,
            transactionToken
        })
        .then((response) => {
            getAllTransaksi()
            Swal.fire({
                title: 'Data berhasil diupdate!',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: 'green'
            })
        })
        .catch((error) => {
            Swal.fire({
                title: 'Permintaan gagal!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: 'orange'
            })
        })
    }

    const tryCancelTransaksi = (e) => {
        e.preventDefault()
        Swal.fire({
            title: 'Batalkan transaksi?',
            text: 'Jaminan sebesar Rp 50.000 tidak akan dikembalikan jika anda membatalkan transaksi',
            showCancelButton: true,
            confirmButtonText: 'Batalkan',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                cancelTransaksi()
            }
        })
    }

    const cancelTransaksi = async () => {
        dispatch(onLoad())
        await axios.post('http://localhost:6001/transaksi/cancelTransaksi', {
            withCredentials: true,
            id_transaksi: idTransaksi
        })
        .then((response) => {
            dispatch(onDone())
            getAllTransaksi()
            Swal.fire({
                title: 'Data berhasil diupdate!',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: 'green'
            })
        })
        .catch((error) => {
            dispatch(onDone())
            Swal.fire({
                title: 'Permintaan gagal!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: 'orange'
            })
        })
    }

    // const expandView = ({ data }) => {

    //     return(
    //     <div className="flex w-full">
    //         {data.status === "unconfirmed" ? 
    //         <div className="p-2">
    //             <div className='w-full flex flex-row gap-x-2 p-2 bg-orange-100 rounded'>
    //                 <div className='flex flex-col w-1/3'>
    //                     <span>Provinsi</span>
    //                     <Select placeholder="Provinsi" options={provinsiOpsi} className='basic-select' classNamePrefix="select" name="Provinsi" onChange={inputProvinsiChange} />
    //                 </div>
    //                 <div className='flex flex-col w-1/3'>
    //                     <span>Kabupaten / Kota</span>
    //                     <Select placeholder="Kabupaten" options={kabupatenOpsi} className='basic-select' classNamePrefix="select" name="Kabupaten" onChange={inputKabupatenChange} />
    //                 </div>
    //                 <div className='flex flex-col w-1/3'>
    //                     <span>Kecamatan</span>
    //                     <Select placeholder="Kecamatan" options={kecamatanOpsi} className='basic-select' classNamePrefix="select" name="Kecamatan" onChange={inputKecamatanChange} />
    //                 </div>
    //             </div>
    //             <div className="flex flex-col">
    //                 <span>Nama penerima</span>
    //                 <input type="text" value={namaPenerima} onChange={(e) => setNamaPenerima(e.target.value)} placeholder="nama" className="rounded l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2"></input>
    //             </div>
    //             <div className="flex flex-col">
    //                 <span>Alamat lengkap</span>
    //                 <input type="text" value={alamatLengkap} onChange={(e) => setAlamatLengkap(e.target.value)} placeholder="spt: jalan, gang, nomor rumah, blok" className="rounded l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2"></input>
    //             </div>
    //             <div className='w-full flex flex-row'>
    //                 <div className='flex flex-col w-2/3'>
    //                     <Select placeholder="Kurir" options={kurirOpsi} className='basic-select' classNamePrefix="select" name="Kurir" onChange={inputKurirChange} />
    //                 </div>
    //                 <button onClick={(e) => getTarifOngkir(e, data.berat)} className={`w-1/3 l-bg-light-brown border l-border-brown shadow shadow-orange-300`}>Cek</button>
    //             </div>
    //         </div>
    //         :
    //         <></>
    //         }
    //     </div>
    //     )
    // }

    const statusColor = (status) => {
        switch (status) {
            case "unconfirmed":
                return 'text-sky-500 border-yellow-500'
            case "confirmed":
                return 'text-yellow-500 border-yellow-500'
            case "payed":
                return 'text-green-500 border-green-500'
            case "canceled":
                return 'text-red-500 border-red-500'
            case "packaging":
                return 'text-sky-500 border-sky-500'
            case "onshipping":
                return 'text-yellow-500 border-yellow-500'
            case "delivered":
                return 'text-green-500 border-green-500'
            case "done":
                return 'text-green-500 border-green-500'
            default:
                return 'text-slate-500 border-slate-500'
        }
    }

    const openDetail = (e, transaksi) => {
        e.preventDefault()
        ReactSwal.fire({
            title: 'Detail',
            html: <div className=" w-full overflow-y-auto items-start flex flex-col text-left">
                <span>Nama penerima : {transaksi.nama_penerima}</span>
                <span>Alamat lengkap : {transaksi.alamat_lengkap}</span>
                <span>Nomor telepon : {transaksi.no_telp}</span>
                <span>Kabupaten: {transaksi.kabupaten.kabupaten}</span>
                <span>Provinsi : {transaksi.provinsi.provinsi}</span>
                <span>Catatan : {transaksi.catatan}</span>
                <span>Jasa pengiriman : {transaksi.kurir.code}, {transaksi.kurir.service}, <CurrencyFormat value={transaksi.kurir.harga} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span>
            </div>,
            showCloseButton: true,
        })
    }

    const columns = [
        {
            name: 'Item',
            cell: row => (
                <><div className="flex items-center">
                    <img src={row.item.gambar[0].url} className="h-10 w-10" alt={row.item._id} />
                    <span className="line-clamp-2 w-14">{row.item.nama_item}</span>
                </div></>
            )
        },
        {
            name: 'Harga',
            cell: row => (
                <><span><CurrencyFormat value={row.final_price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span></>
            )
        },
        {
            name: 'Status',
            cell: row => (
                <><span className={`font-mono rounded-full p-1 border ${statusColor(row.status)}`}>{row.status}</span></>
            )
        },
        {
            name: 'Total Pembayaran',
            cell: row => (
                <><span>{row.sub_total === null ? "belum dibuat" : <CurrencyFormat value={row.sub_total} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} />}</span></>
            )
        },
        {
            name: 'Konfirmasi',
            cell: row => (
                <button onClick={(e) => openModal(e, row)} className="underline text-sky-500">Lihat</button>
            )
        }
    ]

    const columnBayar = [
        {
            name: 'Item',
            cell: row => (
                <><div className="flex items-center">
                    <img src={row.item.gambar[0].url} className="h-10 w-10" alt={row.item._id} />
                    <span className="line-clamp-2 w-14">{row.item.nama_item}</span>
                </div></>
            )
        },
        {
            name: 'Harga',
            cell: row => (
                <><span><CurrencyFormat value={row.final_price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span></>
            )
        },
        {
            name: 'Status',
            cell: row => (
                <><span className={`font-mono rounded-full p-1 border ${statusColor(row.status)}`}>{row.status}</span><span onClick={(e) => checkPaymentStatus(e, row._id)} className=" underline text-slate-400 text-sm ml-1 cursor-pointer">update</span></>
            )
        },
        {
            name: 'Total Pembayaran',
            cell: row => (
                <><span>{row.sub_total === null ? "belum dibuat" : <CurrencyFormat value={row.sub_total} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} />}</span></>
            )
        },
        {
            name: 'Bayar',
            cell: row => (
                <button onClick={(e) => payTransaksi(e, row.transactionToken)} className="underline text-sky-500">Bayar</button>
            )
        }
    ]

    const columnPack = [
        {
            name: 'Item',
            cell: row => (
                <><div className="flex items-center">
                    <img src={row.item.gambar[0].url} className="h-10 w-10" alt={row.item._id} />
                    <span className="line-clamp-2 w-14">{row.item.nama_item}</span>
                </div></>
            )
        },
        {
            name: 'Harga',
            cell: row => (
                <><span><CurrencyFormat value={row.final_price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span></>
            )
        },
        {
            name: 'Status',
            cell: row => (
                <><span className={`font-mono rounded-full p-1 border ${statusColor(row.status)}`}>{row.status}</span></>
            )
        },
        {
            name: 'Total Pembayaran',
            cell: row => (
                <><span>{row.sub_total === null ? "belum dibuat" : <CurrencyFormat value={row.sub_total} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} />}</span></>
            )
        },
        {
            name: 'Aksi',
            cell: row => (
                <button onClick={(e) => openDetail(e, row)} className="underline text-sky-500">Lihat</button>
            )
        }
    ]

    const columnShip = [
        {
            name: 'Item',
            cell: row => (
                <><div className="flex items-center">
                    <img src={row.item.gambar[0].url} className="h-10 w-10" alt={row.item._id} />
                    <span className="line-clamp-2 w-14">{row.item.nama_item}</span>
                </div></>
            )
        },
        {
            name: 'Harga',
            cell: row => (
                <><span><CurrencyFormat value={row.final_price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span></>
            )
        },
        {
            name: 'Status',
            cell: row => (
                <><span className={`font-mono rounded-full p-1 border ${statusColor(row.status)}`}>{row.status}</span></>
            )
        },
        {
            name: 'Total Pembayaran',
            cell: row => (
                <><span>{row.sub_total === null ? "belum dibuat" : <CurrencyFormat value={row.sub_total} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} />}</span></>
            )
        },
        {
            name: 'Resi',
            cell: row => (
                <button onClick={(e) => openModalResi(row.resi, row.kurir.code, row._id)} className="underline text-sky-500">Lihat</button>
            )
        }
    ]

    const columnSelesai = [
        {
            name: 'Item',
            cell: row => (
                <><div className="flex items-center">
                    <img src={row.item.gambar[0].url} className="h-10 w-10" alt={row.item._id} />
                    <span className="line-clamp-2 w-14">{row.item.nama_item}</span>
                </div></>
            )
        },
        {
            name: 'Harga',
            cell: row => (
                <><span><CurrencyFormat value={row.final_price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span></>
            )
        },
        {
            name: 'Status',
            cell: row => (
                <><span className={`font-mono rounded-full p-1 border ${statusColor(row.status)}`}>{row.status}</span></>
            )
        },
        {
            name: 'Total Pembayaran',
            cell: row => (
                <><span>{row.sub_total === null ? "belum dibuat" : <CurrencyFormat value={row.sub_total} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} />}</span></>
            )
        }
    ]

    const columnBatal = [
        {
            name: 'Item',
            cell: row => (
                <><div className="flex items-center">
                    <img src={row.item.gambar[0].url} className="h-10 w-10" alt={row.item._id} />
                    <span className="line-clamp-2 w-14">{row.item.nama_item}</span>
                </div></>
            )
        },
        {
            name: 'Harga',
            cell: row => (
                <><span><CurrencyFormat value={row.final_price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span></>
            )
        },
        {
            name: 'Status',
            cell: row => (
                <><span className={`font-mono rounded-full p-1 border ${statusColor(row.status)}`}>{row.status}</span></>
            )
        },
        {
            name: 'Total Pembayaran',
            cell: row => (
                <><span>{row.sub_total === null ? "belum dibuat" : <CurrencyFormat value={row.sub_total} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} />}</span></>
            )
        }
    ]

    const columnsTarif = [
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
            // cell: row => (
            //     <><span>{row.cost[0].etd} Hari</span></>
            // )
            cell: row => (
                <button className="p-1 l-bg-light-brown shadow" onClick={
                    (e) => {
                        e.preventDefault()
                        setModalShow2(false)
                        setSelectKurir({
                            code: kurir.id,
                            service: row.service,
                            harga: row.cost[0].value
                        })
                    }

                }>Pilih</button>
            )
        }
    ]

    // const columnsTarif = [
    //     {
    //         name: 'Servis',
    //         selector: row => row.Service
    //     },
    //     {
    //         name: 'Tarif',
    //         selector: row => row.Tarif
    //     },
    //     {
    //         name: 'Perkiraan waktu',
    //         cell: row => (
    //             <span>{row['Perkiraan Waktu Kedatangan']} hari</span>
    //         )
    //     },
    //     {
    //         name: 'Aksi',
    //         cell: row => (
    //             <button className="p-1 l-bg-light-brown shadow" onClick={
    //                 (e) => {
    //                     e.preventDefault()
    //                     setModalShow2(false)
    //                     setSelectKurir({
    //                         code: row.Kode,
    //                         service: row.Service,
    //                         harga: row.Tarif.replace(/\D/g, '')
    //                     })
    //                 }

    //             }>Pilih</button>
    //         )
    //     }
    // ]

    const getAllTransaksi = async () => {
        setAllTransaksi([])
        setPending(true)
        dispatch(onLoad())
        await axios.post('http://localhost:6001/transaksi/getTransaksiBuyer', {
            withCredentials: true
        })
            .then(async (response) => {
                response.data.allTransaksi.map(async (transaksi) => {
                    await axios.get(`http://localhost:6001/item/getItem?itemId=${transaksi.id_item}`)
                        .then((response) => {
                            setTransaksiBaru([])
                            setTransaksiBayar([])
                            setTransaksiBatal([])
                            setTransaksiPack([])
                            setTransaksiShip([])
                            setTransaksiDone([])
                            transaksi.item = response.data.item
                            setAllTransaksi(t => [...t, transaksi])
                        })
                })
                setPending(false)
                dispatch(onDone())
                console.log(response.data.message)
            })
            .catch((error) => {
                setPending(false)
                dispatch(onDone())
                console.log(error.response.data.message)
            })
    }

    useEffect(() => {
        if (isLogin) {
            getAllTransaksi()
        }
        getProvinsi()
    }, [isLogin])

    useEffect(() => {
        const snapSrcUrl = "https://app.sandbox.midtrans.com/snap/snap.js"
        const myMidtransKey = "SB-Mid-client-ywqTrEjvn9CLL-Eo"
    
        const script = document.createElement('script')
        script.src = snapSrcUrl
        script.setAttribute('data-client-key', myMidtransKey)
        script.async = true
    
        document.body.appendChild(script)
    
        return () => {
            document.body.removeChild(script)
        }
    }, [])

    const payTransaksi = (e, transaction_id) => {
        e.preventDefault()
        window.snap.pay(transaction_id)
    }

    return (
        <div className="mt-2 min-h-screen">
            <WhiteCard>
                <div className="min-h-[500px]">
                    <Tabs>
                        <TabList>
                            <Tab>Baru</Tab>
                            <Tab>Perlu Bayar</Tab>
                            <Tab>Dikemas</Tab>
                            <Tab>Dalam Pengiriman</Tab>
                            <Tab>Selesai</Tab>
                            <Tab>Dibatalkan</Tab>
                        </TabList>

                        <TabPanel>
                            <DataTable
                                columns={columns}
                                data={transaksiBaru}
                                noDataComponent="Belum ada transaksi"
                                progressPending={pending}
                                // customStyles={customStyles}
                                noHeader={true}
                            />
                        </TabPanel>
                        <TabPanel>
                            <DataTable
                                columns={columnBayar}
                                data={transaksiBayar}
                                noDataComponent="Belum ada transaksi"
                                progressPending={pending}
                                // customStyles={customStyles}
                                noHeader={true}
                            />
                        </TabPanel>
                        <TabPanel>
                            <DataTable
                                columns={columnPack}
                                data={transaksiPack}
                                noDataComponent="Belum ada transaksi"
                                progressPending={pending}
                                // customStyles={customStyles}
                                noHeader={true}
                            />
                        </TabPanel>
                        <TabPanel>
                            <DataTable
                                columns={columnShip}
                                data={transaksiShip}
                                noDataComponent="Belum ada transaksi"
                                progressPending={pending}
                                // customStyles={customStyles}
                                noHeader={true}
                            />
                        </TabPanel>
                        <TabPanel>
                            <DataTable
                                columns={columnSelesai}
                                data={transaksiDone}
                                noDataComponent="Belum ada transaksi"
                                progressPending={pending}
                                // customStyles={customStyles}
                                noHeader={true}
                            />
                        </TabPanel>
                        <TabPanel>
                            <DataTable
                                columns={columnBatal}
                                data={transaksiBatal}
                                noDataComponent="Belum ada transaksi"
                                progressPending={pending}
                                // customStyles={customStyles}
                                noHeader={true}
                            />
                        </TabPanel>
                    </Tabs>
                </div>
                {/* <Select /> */}
                {/* <DataTable
                    columns={columns}
                    data={allTransaksi}
                    noDataComponent="Belum ada transaksi"
                    progressPending={pending}
                    // customStyles={customStyles}
                    noHeader={true}
                /> */}
            </WhiteCard>
            {modalShow && <FullModal handleClose={closeModal}>
                <div className="p-2 w-full lg:w-2/3 flex flex-col max-w-screen overflow-y-auto">
                    <span className="text-2xl font-bold w-full text-center mx-auto">Konfirmasi Pengiriman</span>
                    <div className='w-full l-bg-light-brown h-[1px] my-2'></div>
                    <div className='w-full flex flex-row gap-x-2 p-2 bg-orange-100 rounded'>
                        <div className='flex flex-col w-1/2'>
                            <span>Provinsi</span>
                            <Select placeholder="Provinsi" value={selectProvinsi} options={provinsiOpsi} className='basic-select' classNamePrefix="select" name="Provinsi" onChange={inputProvinsiChange} />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <span>Kabupaten / Kota</span>
                            <Select placeholder="Kabupaten" value={selectKabupaten} options={kabupatenOpsi} className='basic-select' classNamePrefix="select" name="Kabupaten" onChange={inputKabupatenChange} />
                        </div>
                        {/* <div className='flex flex-col w-1/3'>
                            <span>Kecamatan</span>
                            <Select placeholder="Kecamatan" options={kecamatanOpsi} className='basic-select' classNamePrefix="select" name="Kecamatan" onChange={inputKecamatanChange} />
                        </div> */}
                    </div>
                    <div className='w-full flex flex-row gap-x-4'>
                        <div className='flex flex-col w-2/3'>
                            <span>Kurir tersedia</span>
                            <Select placeholder="Kurir" options={kurirOpsi} className='basic-select' classNamePrefix="select" name="Kurir" onChange={inputKurirChange} />
                        </div>
                        <button onClick={(e) => openModal2(e)} className={`w-1/3 l-bg-light-brown my-auto self-center border l-border-brown shadow shadow-orange-300 h-fit`}>Pilih Kurir</button>
                    </div>
                    <div className="w-full l-bg-light-brown p-2 mt-1">
                        <span>Pengiriman : </span>
                        {selectKurir.code === "" ? <span>belum memilih</span> : <span>{selectKurir.service} <CurrencyFormat value={selectKurir.harga} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span>}
                        <br />
                        <span>Promo potongan ongkos kirim : </span>
                        {item.promo.ada ? <span className="text-green-500">-<CurrencyFormat value={item.promo.disc} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span> : <span className="">tidak ada</span>}
                        <br />
                        <span>Total ongkir : </span>
                        {selectKurir.code === "" ? <span>belum memilih</span> : <span>{selectKurir.service} <CurrencyFormat value={(selectKurir.harga - item.promo.disc) < 0 ? 0 : (selectKurir.harga - item.promo.disc)} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span>}
                    </div>
                    <div className="flex flex-col">
                        <span>Nama penerima</span>
                        <input type="text" value={namaPenerima} onChange={(e) => setNamaPenerima(e.target.value)} placeholder="nama" className="rounded l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2"></input>
                    </div>
                    <div className="flex flex-col">
                        <span>Alamat lengkap</span>
                        <input type="text" value={alamatLengkap} onChange={(e) => setAlamatLengkap(e.target.value)} placeholder="spt: jalan, gang, nomor rumah, blok" className="rounded l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2"></input>
                    </div>
                    <div className="flex flex-col">
                        <span>Nomor Telepon</span>
                        <input type="number" value={noTelp} onChange={(e) => setNoTelp(e.target.value)} placeholder="nomor telepon" className="rounded l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2"></input>
                    </div>
                    <div className="flex flex-col">
                        <span>Catatan <span className="text-orange-300">&#40;opsional&#41;</span></span>
                        <input type="text" value={catatan} onChange={(e) => setCatatan(e.target.value)} placeholder="catatan" className="rounded l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2"></input>
                    </div>
                    <div className="flex justify-between mt-2">
                        <button onClick={(e) => closeModal(e)} className="p-2 border border-orange-500 text-orange-500 rounded">Tutup</button>
                        <div>
                            <button onClick={(e) => showAlamat(e)} className="rounded p-2 text-white shadow bg-green-500">Gunakan alamat tersimpan</button>
                            <button onClick={(e) => tryCancelTransaksi(e)} className="p-2 bg-red-500 text-white rounded ml-2">Batalkan transaksi</button>
                            <button onClick={(e) => confirmTransaksi(e)} className="p-2 bg-green-500 text-white rounded ml-2">Konfirmasi transaksi</button>
                        </div>
                    </div>
                </div>
            </FullModal>}
            {modalShow2 && <Modal handleClose={closeModal2}>
                <DataTable
                    columns={columnsTarif}
                    data={tarifOnkir}
                    noDataComponent="Tarif tidak tersedia"
                    progressPending={pendingTarif}
                    // customStyles={customStyles}
                    noHeader={true}
                />
            </Modal>}
        </div>
    )
}

export default TransaksiPage