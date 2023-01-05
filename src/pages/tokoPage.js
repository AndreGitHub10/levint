import React, { useEffect, useState } from 'react'
import Person from '@mui/icons-material/Person'
import { WhiteCard } from '../components/cards/white-card'
import Chat from '@mui/icons-material/Chat'
import LocationOn from '@mui/icons-material/LocationOn'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import axios from 'axios'
import ProductCard from "../components/lelangs/productCard";

const TokoPage = () => {
    const [searchParams] = useSearchParams()
    const isLogin = useSelector((state) => state.login.isLogin)
    const dispatch = useDispatch()
    const [sellerItem, setSellerItem] = useState(null)
    const [dataItem, setDataItem] = useState([])

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

    useEffect(() => {
        const getSeller = async () => {
            await axios.get(`http://localhost:5001/seller/getSellerPublic?sellerId=${searchParams.get('sellerId')}`)
                .then((response) => {
                    setSellerItem(response.data.seller)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        const getItemBySeller = async () => {
            await axios.get(`http://localhost:6001/item/getItemBySellerId?sellerId=${searchParams.get('sellerId')}`)
            .then((response) => {
                setDataItem(response.data.dataFeeds)
            })
            .catch((error) => {
                console.log(error.response.data.message)
            })
        }
        getItemBySeller()
        getSeller()
    }, [])


    return(
        <>
        <div className='mt-4 gap-y-2'>
            <WhiteCard>
                <div className='w-full flex content-between l-bg-light-brown items-center p-4 px-10'>
                    <div className="w-fit flex">
                        <div id="circle-avatar" className="text-center grid place-items-center rounded-full mb-4 bg-black h-16 w-16 aspect-square">
                            <Person />
                        </div>
                        <div className='flex flex-col ml-2'>
                            <span className='ml-2 text-lg font-bold'>{sellerItem !== null && sellerItem.nama_toko}</span>
                            <span><LocationOn className='mx-0'/>{sellerItem !== null && `${sellerItem.alamat.kecamatan.kecamatan}, ${sellerItem.alamat.kabupaten.kabupaten}, ${sellerItem.alamat.provinsi.provinsi}`}</span>
                        </div>
                    </div>
                    <div className='flex flex-col ml-auto mr-0 gap-y-1 lg:w-28'>
                        <button onClick={(e) => tryMessage(e)} className="border l-border-brown rounded"><Chat />Chat</button>
                    </div>
                </div>
            </WhiteCard>
            <WhiteCard>
                <span className='font-bold text-xl mx-auto w-full'>Item yang sedang dilelang oleh toko ini</span>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mt-4">
            {dataItem.length > 0 ?
                dataItem.map(data =>
                    <ProductCard
                        key={data.id_item}
                        id_item={data.id_item} 
                        nama_item={data.nama_item} 
                        harga_dasar={data.harga_dasar} 
                        total_bidder={data.total_bidder} 
                        tanggal_mulai={data.tanggal_mulai}
                        tanggal_akhir={data.tanggal_akhir} 
                        kota={data.kota} 
                        gambar_src={data.gambar.url} 
                        gambar_id={data.gambar.id}
                    />
                )
                :
                <span>Belum ada produk</span>
            }
            </div>
            </WhiteCard>
        </div>
        </>
    )
}

export default TokoPage