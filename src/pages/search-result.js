import React, { useEffect, useState } from "react"
import { useLocation, useSearchParams } from "react-router-dom"
import axios from "axios"
import SeparateProductCard from "../components/lelangs/separateProductCard"

const SearchResult = () => {
    const [searchParams] = useSearchParams()
    const [dataItem, setDataItem] = useState([])
    const location = useLocation()

    const getSearchItem = async () => {
        // let searchableCity = str.replace(/,/g, "");
        let url = "http://localhost:6001/item/searchItem";
    
        await axios.post(url, {
            searchWord: searchParams.get('q')
        })
        .then((response) => {
            setDataItem(response.data.result)
        })
        .catch((error) => {
            setDataItem(error.response.data.result)
        })
    }
    
    useEffect(() => {
        getSearchItem()
    }, [location.key])

    useEffect(() => {
        getSearchItem()
    }, [])

    return(
        <>
            <div className="my-4">
                <span>Hasil pencarian : <span className="text-red-500 font-bold">{searchParams.get('q')}</span></span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
                {dataItem.map(data => 
                    <SeparateProductCard 
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
                        status={data.status}
                    />
                )}
                {/* {JSON.stringify(dataItem)} */}
            </div>
        </>
    )
}

export default SearchResult