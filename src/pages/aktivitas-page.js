import React from 'react'
import axios from 'axios'
import { WhiteCard } from '../components/cards/white-card'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import Swal from 'sweetalert2'
import DataTable from 'react-data-table-component';
import { useState } from 'react'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'

const AktivitasPage = () => {
    const [allAktivitas, setAllAktivitas] = useState([])
    const [aktivitasLelang, setAktivitasLelang] = useState([])
    const [aktivitasRiwayat, setAktivitasRiwayat] = useState([])
    const [pending, setPending] = useState(false)
    const navigate = useNavigate()

    const toLelang = (e, id_item) => {
        e.preventDefault()
        navigate(`/item?itemId=${id_item}`)
    }

    const getAllAktivitas = async () => {
        setPending(true)
        await axios.get('http://localhost:6001/item/getAktivitasBid', {
            withCredentials: true
        })
        .then((response) => {
            setPending(false)
            setAllAktivitas(response.data.allAktivitas)
        })
        .catch((error) => {
            setPending(false)
        })
    }

    useEffect(() => {
        setAktivitasLelang([])
        setAktivitasRiwayat([])
        if(allAktivitas !== []) {
            allAktivitas.map((aktivitas) => {
                switch (aktivitas.jaminan.status) {
                    case "jaminan":
                        setAktivitasLelang(t => [...t, aktivitas])
                        return
                    case "return":
                        setAktivitasRiwayat(t => [...t, aktivitas])
                        return
                    default:
                        return
            }})
        }
    }, [allAktivitas])

    useEffect(() => {
        getAllAktivitas()
    }, [])

    const columnLelang = [
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
            name: 'Jenis lelang',
            cell: row => (
                <><span className={`p-1 rounded border ${row.open_bid ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}>{row.open_bid ? 'Terbuka' : 'Tertutup'}</span></>
            )
        },
        {
            name: 'Bid anda',
            cell: row => (
                <><span>{row.open_bid ? <CurrencyFormat value={row.bid_price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /> : '-'}</span></>
            )
        },
        {
            name: 'Posisi peringkat',
            cell: row => (
                <><span>{row.open_bid ? (`peringkat ${row.peringkat} dari ${row.jumlah_bidder} bidder`) : '-' }</span></>
            )
        },
        {
            name: 'Bid tertinggi',
            cell: row => (
                <><span>{row.open_bid ? <CurrencyFormat value={row.high_bid} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /> : '-'}</span></>
            )
        },
        {
            name: 'Aksi',
            cell: row => (
                <button onClick={(e) => toLelang(e, row.item._id)} className="underline text-sky-500">Lihat pelelangan</button>
            )
        }
    ]
    
    return(
        <>
            <WhiteCard>
            <div className="min-h-[500px]">
                    <Tabs>
                        <TabList>
                            <Tab>Lelang diikuti</Tab>
                            <Tab>Riwayat lelang diikuti</Tab>
                        </TabList>

                        <TabPanel>
                            <DataTable
                                columns={columnLelang}
                                data={aktivitasLelang}
                                noDataComponent="Belum ada aktivitas"
                                progressPending={pending}
                                // customStyles={customStyles}
                                noHeader={true}
                            />
                        </TabPanel>
                        <TabPanel>
                            <DataTable
                                columns={columnLelang}
                                data={aktivitasRiwayat}
                                noDataComponent="Belum ada aktivitas"
                                progressPending={pending}
                                // customStyles={customStyles}
                                noHeader={true}
                            />
                        </TabPanel>
                    </Tabs>
                </div>
            </WhiteCard>
        </>
    )
}

export default AktivitasPage