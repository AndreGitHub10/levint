import React, { useEffect, useState } from "react";
import ProductCard from "./productCard";
import axios from "axios";
// import { data } from "./dataProduct";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProductPlace = () => {
    const [dataFeeds, setDataFeeds] = useState([])
    const [pendingFeeds, setPendingFeeds] = useState(false)
    const getDataFeeds = async () => {
        setPendingFeeds(true)
        await axios.get('http://localhost:6001/item/feeds')
            .then((response) => {
                setPendingFeeds(false)
                console.log(response.data)
                setDataFeeds(response.data.dataFeeds)
            })
            .catch((err) => {
                setPendingFeeds(false)
                console.log(err)
            })
    }

    useEffect(() => {
        getDataFeeds()
    }, [])
    return (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {
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
            }

            {pendingFeeds && 
                <Skeleton />
            }
        </div>
    )
}

export default ProductPlace;