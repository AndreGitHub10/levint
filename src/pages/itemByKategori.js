import React, { useEffect, useState } from "react";
import { WhiteCard } from "../components/cards/white-card";
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import ProductCard from "../components/lelangs/productCard";

const ItemByKategoriPage = () => {
    const [searchParams] = useSearchParams()
    const [dataFeeds, setDataFeeds] = useState([])

    const getLelangByKategori = async () => {
        await axios.get(`http://localhost:6001/item/getItemByKategori?kategoriId=${searchParams.get('kategoriId')}`)
        .then((response) => {
            console.log(response.data)
            setDataFeeds(response.data.dataFeeds)
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        getLelangByKategori()
    }, [])
    
    return(
        <>
            <WhiteCard>
            <p className="mx-auto w-full text-center my-4 text-2xl font-bold">Item</p>
            <div className='w-full l-bg-light-brown h-[1px] mb-4'></div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {dataFeeds.length > 0 ?
                dataFeeds.map(data =>
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
                <span>Item tidak ditemukan</span>
            }
        </div>
            </WhiteCard>
        </>
    )
}

export default ItemByKategoriPage