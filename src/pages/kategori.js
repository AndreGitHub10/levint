import React, {useState, useEffect} from "react";
import { WhiteCard } from "../components/cards/white-card";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

const KategoriPage = () => {
    const [listKategori, setListKategori] = useState([])
    const navigate = useNavigate()

    const getKategori = async () => {
        await axios.get('http://localhost:6001/item/kategori')
        .then((response) => {
            setListKategori(response.data.dataKategori)
        })
    }

    const toList = (e, id) => {
        e.preventDefault()
        navigate(`/itemKategori?kategoriId=${id}`)
    }

    useEffect(() => {
        getKategori()
    }, [])
    return(
        <>
        <WhiteCard>
            <p className="mx-auto w-full text-center my-4 text-2xl font-bold">Kategori</p>
            <div className='w-full l-bg-light-brown h-[1px] mb-4'></div>
            <div className="flex flex-wrap lg:gap-10 gap-x-2 mb-4 justify-center">
            {listKategori.map(kat =>
                <div className="flex flex-col" key={kat.nama} onClick={(e) => toList(e, kat._id)}>
                    <div className="flex border border-orange-500 bg-white shadow justify-items-center items-center shadow-orange-300 h-[150px] w-[150px] aspect-square text-5xl p-2">
                        {/* <LocalAtmIcon fontSize="inherit" className="mx-auto"/> */}
                        <img src={kat.gambar} alt={kat.id} className="aspect-square" />
                    </div>
                    <span className="text-center text-orange-500 font-bold">{kat.nama}</span>
                </div>
                )}
            </div>
        </WhiteCard>
        </>
    )
}

export default KategoriPage