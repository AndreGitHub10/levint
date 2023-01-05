import React, { useEffect, useState } from "react";
import KategoriCard from "./kategoriCard";
// import { data } from "./dataKategori";
import axios from "axios";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Kategori = () => {
    const [pendingKategori, setPendingKategori] = useState(false)
    const [listKategori, setListKategori] = useState([])

    const getKategori = async () => {
        setPendingKategori(true)
        await axios.get('http://localhost:6001/item/kategori')
        .then((response) => {
            setListKategori(false)
            setListKategori(response.data.dataKategori)
        })
        .catch((error) => {
            setPendingKategori(false)
            console.log(error)
        })
    }

    useEffect(() => {
        getKategori()
    }, [])

    return(
        // <div className="grid grid-cols-4 md:grid-cols-8 md:gap-12 gap-4">
        <div className="flex flex-row lg:gap-x-4 gap-x-2 mb-4 overflow-x-auto l-hide-scroll">
        {listKategori.map(kat =>
            <KategoriCard
                key={kat._id}
                gambar={kat.gambar}
                id={kat._id}
                nama={kat.nama}
            />
            )}
            {pendingKategori && 
                <Skeleton height={"100px"} />
            }
        </div>
    );
}

export default Kategori;