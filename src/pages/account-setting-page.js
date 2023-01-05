import {WhiteCard} from '../components/cards/white-card'
import { useSelector, useDispatch } from "react-redux";
import {InputBorderBottom} from '../components/input/input-border-bottom'
import Select from 'react-select'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import React, {useState, useEffect} from 'react';
import FullModal from '../components/modals/fullModal'
import axios from 'axios'
import Nopict from '../components/images/nopict.png'
import {onLoad, onDone} from '../components/stateSlice/loadingSlice'
import { login } from "../components/stateSlice/loginSlice"
import { Link, useNavigate } from 'react-router-dom';
import AddOutlined from '@mui/icons-material/AddOutlined'
import Delete from '@mui/icons-material/Delete'

const imageTypeRegex = /image\/(png|jpg|jpeg)/i;

const AccountSettingPage = () => {
    const navigate = useNavigate()
    const ReactSwal = withReactContent(Swal)
    const [modalShow, setModalShow] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.login.dataUser)
    const [namaPenerima1, setNamaPenerima1] = useState("")
    const [noTelp1, setNoTelp1] = useState("")
    const [alamatLengkap1, setAlamatLengkap1] = useState("")
    const [provinsi1, setProvinsi1] = useState({
        id: "",
        provinsi: ""
    })
    const [kabupaten1, setKabupaten1] = useState({
        id: "",
        kabupaten: ""
    })
    const [kecamatan1, setKecamatan1] = useState({
        id: "",
        kecamatan: ""
    })
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [alamatLengkap, setAlamatLengkap] = useState('')
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
    const [selectProvinsi, setSelectProvinsi] = useState(null)
    const [selectKabupaten, setSelectKabupaten] = useState(null)
    const [selectKecamatan, setSelectKecamatan] = useState(null)
    const [provinsiOpsi, setProvinsiOpsi] = useState([])
    const [kabupatenOpsi, setKabupatenOpsi] = useState([])
    const [provinsiOpsi1, setProvinsiOpsi1] = useState([])
    const [kabupatenOpsi1, setKabupatenOpsi1] = useState([])
    const [kecamatanOpsi, setKecamatanOpsi] = useState([])
    const formData = new FormData()

    const closeModal = (e) => {
        e.preventDefault()
        setModalShow(false)
    }

    const updateUser = async (e) => {
        dispatch(onLoad())
        e.preventDefault()
        await axios.post('http://localhost:4001/user/updateUser', {
            withCredentials: true,
            name,
            username,
            phone,
            alamat: {
                provinsi: provinsi,
                kabupaten: kabupaten,
                kecamatan: kecamatan,
                alamat_lengkap: alamatLengkap
            }
        })
        .then((response) => {
            dispatch(onDone())
            Swal.fire({
                title: 'Berhasil!',
                icon: 'success',
                text: response.data.message,
                confirmButtonText: 'Oke',
                confirmButtonColor: 'blue',
            })
        })
        .catch((err) => {
            dispatch(onDone())
            Swal.fire({
                title: 'Gagal!',
                text: err.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: 'orange'
            })
        })
    }

    const savedAlamat = (e) => {
        e.preventDefault()
        ReactSwal.fire({
            title: 'Alamat tersimpan',
            html: <div className="h-[400px] w-full overflow-y-auto gap-y-2 flex flex-col">
                {user.savedAlamat.map((alamat) => {
                    return <div className='rounded p-2 flex flex-row justify-between text-slate-700 border shadow bg-sky-100'>
                        <div className='flex flex-col text-left'>
                            <span className='font-bold text-lg text-black'>{alamat.nama_penerima}</span>
                            <span>{alamat.no_telp}</span>
                            <span>{alamat.alamat_lengkap}, {alamat.kabupaten.kabupaten}, {alamat.provinsi.provinsi}</span>
                        </div>
                        <button onClick={(e) => deleteAlamat(e, alamat._id)} className='text-red-500'><Delete /></button>
                    </div>
                })}
                {/* <button onClick={(e) => {e.preventDefault(); setModalShow(true)}} className='l-bg-brown rounded text-white p-2'><AddOutlined />Tambah item</button> */}
            </div>,
            showCloseButton: true,
            confirmButtonText: "Tambah item",
            confirmButtonColor: 'green'
        }).then((result) => {
            if(result.isConfirmed) {
                setModalShow(true)
            }
        })
    }

    const inputProvinsiChange1 = (value) => {
        setProvinsi1({
            id: value.value,
            provinsi: value.label
        })
    }

    const inputKabupatenChange1 = (value) => {
        setKabupaten1({
            id: value.value,
            kabupaten: value.label
        })
    }

    useEffect(() => {
        getKabupaten1()
    }, [provinsi1])

    // const tambahAlamat = (e) => {
    //     e.preventDefault()
    //     ReactSwal.fire({
    //         title: 'Tambah alamat',
    //         html: <div className="h-[400px] w-full overflow-y-auto">
    //                 <div className='w-full flex flex-row gap-x-2 p-2 bg-orange-100 rounded'>
    //                     <div className='flex flex-col w-1/2'>
    //                         <span>Provinsi</span>
    //                         <Select placeholder="Provinsi" options={provinsiOpsi1} className='basic-select' classNamePrefix="select" name="Provinsi" onChange={inputProvinsiChange1} />
    //                     </div>
    //                     <div className='flex flex-col w-1/2'>
    //                         <span>Kabupaten / Kota</span>
    //                         <Select placeholder="Kabupaten" options={kabupatenOpsi1} className='basic-select' classNamePrefix="select" name="Kabupaten" onChange={inputKabupatenChange1} />
    //                     </div>
    //                 </div>
    //                 <div className="flex flex-col">
    //                     <span>Nama penerima</span>
    //                     <input type="text" value={namaPenerima1} onChange={(e) => setNamaPenerima1(e.target.value)} placeholder="nama" className="rounded l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2"></input>
    //                 </div>
    //                 <div className="flex flex-col">
    //                     <span>Alamat lengkap</span>
    //                     <input type="text" value={alamatLengkap1} onChange={(e) => setAlamatLengkap1(e.target.value)} placeholder="spt: jalan, gang, nomor rumah, blok" className="rounded l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2"></input>
    //                 </div>
    //                 <div className="flex flex-col">
    //                     <span>Nomor Telepon</span>
    //                     <input type="number" value={noTelp1} onChange={(e) => setNoTelp1(e.target.value)} placeholder="nomor telepon" className="rounded l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2"></input>
    //                 </div>
    //             <button onClick={(e) => addAlamat(e)} className='l-bg-brown rounded text-white p-2'><AddOutlined />Simpan</button>
    //         </div>,
    //         showCloseButton: true,
    //     })
    // }

    const addAlamat = async (e) => {
        e.preventDefault()
        dispatch(onLoad())
        setModalShow(false)
        await axios.post('http://localhost:4001/user/addAlamat', {
            withCredentials: true,
            alamat: {
                provinsi: provinsi1,
                kabupaten: kabupaten1,
                kecamatan: kecamatan1,
                alamat_lengkap: alamatLengkap1,
                nama_penerima: namaPenerima1,
                no_telp: noTelp1
            }
        })
        .then((response) => {
            dispatch(onDone())
            dispatch(login(response.data.user))
            Swal.fire({
                timer: 'Berhasil!',
                text: response.data.message,
                icon: 'success'
            })
        })
        .catch((error) => {
            dispatch(onDone())
            Swal.fire({
                timer: 'Gagal!',
                text: error.response.data.message,
                icon: 'error'
            })
        })
    }

    const deleteAlamat = async (e, id_alamat) => {
        e.preventDefault()
        dispatch(onLoad())
        await axios.post('http://localhost:4001/user/deleteAlamat', {
            withCredentials: true,
            id_alamat
        })
        .then((response) => {
            dispatch(onDone())
            dispatch(login(response.data.user))
            Swal.fire({
                title: 'Berhasil!',
                text: response.data.message,
                icon: 'success'
            })
        })
        .catch((error) => {
            dispatch(onDone())
            Swal.fire({
                title: 'Gagal!',
                text: error.response.data.message,
                icon: 'warning'
            })
        })
    }

    const tryChangePhoto = async (e) => {
        e.preventDefault()
        const file = await Swal.fire({
            title: 'Select image',
            input: 'file',
            inputAttributes: {
                'accept': 'image/*',
                'aria-label': 'Upload your profile picture'
            }
        })

        if (file) {
            const reader = new FileReader()
            formData.append('image', file.value)
            dispatch(onLoad())
            await axios.post('http://localhost:6001/item/image', formData)
            .then(async (response) => {
                const imageUrl = response.data.urls[0].url
                console.log(imageUrl)
                await axios.post('http://localhost:4001/user/updatePhoto', {
                    withCredentials: true,
                    url: imageUrl
                }).then((response) => {
                    dispatch(onDone())
                    dispatch(login(response.data.user))
                    Swal.fire({
                        title: 'Berhasil!',
                        icon: 'success',
                        text: response.data.message,
                        confirmButtonText: 'Oke',
                        confirmButtonColor: 'blue',
                    })
                }).catch((err) => {
                    dispatch(onDone())
                    Swal.fire({
                        title: 'Gagal!',
                        text: err.response.data.message,
                        icon: 'error',
                        confirmButtonText: 'OK',
                        confirmButtonColor: 'orange'
                    })
                    console.log(err.response.data.message)
                })
            }).catch((err) => {
                dispatch(onDone())
                Swal.fire({
                    title: 'Gagal untuk menyimpan gambar!',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: 'orange'
                })
            })
            
        }
        // Swal.fire({
        //     title: 'Submit your Github username',
        //     html: true,
        //     text: `<input type='file' id='fileToUploadAlert' accept='/image\/(png|jpg|jpeg)/i'>\n`,
        //     showCancelButton: true,
        //     confirmButtonColor: "#07A803",
        //     confirmButtonText: "Upload",
        //     closeOnConfirm: false,
        //     showLoaderOnConfirm: true
        //   }).then((result) => {
        //     if (result.isConfirmed) {
        //       Swal.fire({
        //         title: `${result.value.login}'s avatar`,
        //         imageUrl: result.value.avatar_url
        //       })
        //     }
        //   })
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
        setSelectKecamatan(value)
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
                setProvinsiOpsi1(prov)
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

    const getKabupaten1 = async () => {
        await axios.post('http://localhost:6001/item/getKabupaten', {
            province: provinsi1.id
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
                setKabupatenOpsi1(kab)
            })
    }

    // const getKecamatan = async () => {
    //     await axios.post('http://localhost:6001/item/getKecamatan', {
    //         city: kabupaten.id
    //     })
    //         .then((response) => {
    //             // const body = JSON.parse(response.data.body)
    //             console.log(response.data)
    //             const kec = []
    //             response.data.links.map((kecamatan) => {
    //                 kec.push({
    //                     value: kecamatan.kode,
    //                     label: kecamatan.kecamatan
    //                 })
    //             })
    //             setKecamatanOpsi(kec)
    //         })
    // }

    // useEffect(() => {
    //     setKecamatan({
    //         id: "",
    //         kecamatan: ""
    //     })
    //     setSelectKecamatan(null)
    //     // getKecamatan()
    // }, [kabupaten])


    useEffect(() => {
        setKabupaten({
            id: "",
            kabupaten: ""
        })
        setSelectKabupaten(null)
        getKabupaten()
    }, [provinsi])

    useEffect(() => {
        getProvinsi()
        setName(user.name)
        setUsername(user.username)
        setEmail(user.email)
        setPhone(user.phone)
        // if(user.alamat.provinsi.id) {
        setSelectProvinsi({value: user.alamat.provinsi.id, label: user.alamat.provinsi.provinsi})
        // }
        // setProvinsi(user.alamat.provinsi)
        setSelectKabupaten({value: user.alamat.kabupaten.id, label: user.alamat.kabupaten.kabupaten})
        // setKabupaten(user.alamat.kabupaten)
        // setKecamatan({value: user.alamat.kecamatan.id, label: user.alamat.kecamatan.kecamatan})
        // setKecamatan(user.alamat.kecamatan)
        setAlamatLengkap(user.alamat.alamat_lengkap)
    }, [])
    return(
        <WhiteCard>
            <div className="flex flex-col lg:flex-row lg:px-10 mb-6">
                <div className='lg:w-[300px]'>
                    <div className='flex flex-col justify-center items-center'>
                        <img className="w-[170px] h-[170px] rounded-full border border-orange-300" src={(user.photo === '' ? Nopict : user.photo)} alt={user._id}
                            onError={(e) => {
                                e.currentTarget.src = Nopict
                                e.currentTarget.onerror = null
                            }}
                        />
                    </div>
                    <div className='flex flex-col px-10 mt-10 gap-y-4'>
                        <button onClick={(e) => tryChangePhoto(e)} className='l-bg-brown text-white shadow rounded px-4 py-2'>Ubah foto profil</button>
                        {/* <button className='l-bg-brown text-white shadow rounded px-4 py-2'>Ganti password</button> */}
                        <button onClick={(e) => savedAlamat(e)} className='l-bg-brown text-white shadow rounded px-4 py-2'>Alamat tersimpan</button>
                        <a href='http://localhost:3001' target="_blank" className='l-bg-brown text-white shadow rounded px-4 py-2 text-center'>Toko</a>
                    </div>
                </div>
                <div className='w-full'>
                    <div className='justify-between flex items-stretch gap-x-4 my-4'>
                        <div className="flex flex-col w-full">
                            <label className='font-bold'>Username</label>
                            <InputBorderBottom value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className='font-bold'>Nama Lengkap</label>
                            <InputBorderBottom value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <div className='justify-between flex items-stretch gap-x-4 my-4'>
                        <div className="flex flex-col w-full">
                            <label className='font-bold'>Email</label>
                            <InputBorderBottom value={email} disabled={true} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className='font-bold'>Nomor Telepon</label>
                            <InputBorderBottom value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    </div>
                    <div className='justify-between flex flex-col items-stretch gap-x-4 my-4'>
                        <label className='font-bold'>Alamat</label>
                        <div className='w-full flex lg:flex-row flex-col gap-x-4 py-2'>
                            <div className='flex flex-col lg:w-1/2'>
                                <span className='font-bold'>Provinsi</span>
                                <Select placeholder="Provinsi" value={selectProvinsi} options={provinsiOpsi} className='basic-select' classNamePrefix="select" name="Provinsi" onChange={inputProvinsiChange} />
                            </div>
                            <div className='flex flex-col lg:w-1/2'>
                                <span className='font-bold'>Kabupaten / Kota</span>
                                <Select placeholder="Kabupaten" value={selectKabupaten} options={kabupatenOpsi} className='basic-select' classNamePrefix="select" name="Kabupaten" onChange={inputKabupatenChange} />
                            </div>
                            {/* <div className='flex flex-col lg:w-1/3'>
                                <span className='font-bold'>Kecamatan</span>
                                <Select placeholder="Kecamatan" value={selectKecamatan} options={kecamatanOpsi} className='basic-select' classNamePrefix="select" name="Kecamatan" onChange={inputKecamatanChange} />
                            </div> */}
                        </div>
                        <div className="flex flex-col w-full my-4">
                            <label className='font-bold'>Alamat Lengkap</label>
                            <textarea value={alamatLengkap} onChange={(e) => setAlamatLengkap(e.target.value)} className='border-0 border-b border-orange-300 px-0 pb-2 focus:outline-none focus:border-orange-500'/>
                        </div>
                    </div>
                    <div className='flex'>
                        <button onClick={(e) => updateUser(e)} className='ml-auto mr-0 l-bg-brown text-white shadow rounded px-4 py-2'>Simpan</button>
                    </div>
                </div>
            </div>
            {modalShow && <FullModal handleClose={closeModal}>
                <div className="p-2 w-full lg:w-2/3 flex flex-col max-w-screen overflow-y-auto">
                    <span className="text-2xl font-bold w-full text-center mx-auto">Tambah alamat pengiriman</span>
                    <div className='w-full l-bg-light-brown h-[1px] my-2'></div>
                    <div className='w-full flex flex-row gap-x-2 p-2 bg-orange-100 rounded'>
                        <div className='flex flex-col w-1/2'>
                            <span>Provinsi</span>
                            <Select placeholder="Provinsi" options={provinsiOpsi1} className='basic-select' classNamePrefix="select" name="Provinsi" onChange={inputProvinsiChange1} />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <span>Kabupaten / Kota</span>
                            <Select placeholder="Kabupaten" options={kabupatenOpsi1} className='basic-select' classNamePrefix="select" name="Kabupaten" onChange={inputKabupatenChange1} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span>Nama penerima</span>
                        <input type="text" value={namaPenerima1} onChange={(e) => setNamaPenerima1(e.target.value)} placeholder="nama" className="rounded l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2"></input>
                    </div>
                    <div className="flex flex-col">
                        <span>Alamat lengkap</span>
                        <input type="text" value={alamatLengkap1} onChange={(e) => setAlamatLengkap1(e.target.value)} placeholder="spt: jalan, gang, nomor rumah, blok" className="rounded l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2"></input>
                    </div>
                    <div className="flex flex-col">
                        <span>Nomor Telepon</span>
                        <input type="number" value={noTelp1} onChange={(e) => setNoTelp1(e.target.value)} placeholder="nomor telepon" className="rounded l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2"></input>
                    </div>
                    <div className="flex justify-between mt-2">
                        <button onClick={(e) => closeModal(e)} className="p-2 border border-orange-500 text-orange-500 rounded">Batal</button>
                        
                        <button onClick={(e) => addAlamat(e)} className="p-2 bg-green-500 text-white rounded ml-2">Simpan</button>
                    </div>
                </div>
            </FullModal>}
        </WhiteCard>
    )
}

export default AccountSettingPage