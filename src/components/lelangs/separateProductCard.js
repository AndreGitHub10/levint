import React from "react";
import CurrencyFormat from "react-currency-format";
import Countdown from 'react-countdown'
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined'
import { useNavigate } from "react-router-dom";
import moment from 'moment'
import Timer from '@mui/icons-material/TimerOutlined'
import Favorite from '@mui/icons-material/Favorite'
import Share from '@mui/icons-material/Share'

const SeparateProductCard = ({ id_item, nama_item, harga_dasar, total_bidder, tanggal_akhir, tanggal_mulai, kota, gambar_src, gambar_id, status }) => {
    const navigate = useNavigate()
    const countdownRender = ({ days, hours, minutes, completed }) => {
        if (completed) {
            return <span>Pelelangan telah berakhir</span>
        } else if (days == 0) {
            return <span className='leading-none'><Timer sx={{ fontSize: 18 }} />{hours}j {minutes}m lagi</span>
        } else {
            return <span className='leading-none'><Timer sx={{ fontSize: 18 }} />{days}h {hours}j lagi</span>
        }
    }

    const countdownRenderMulai = ({ days, hours, minutes, completed }) => {
        if (completed) {
            return <span>Pelelangan dimulai</span>
        } else if (days == 0) {
            return <span className='text-sm'>Akan dimulai : {hours} jam {minutes} menit lagi</span>
        } else {
            return <span className='text-sm'>Akan dimulai : {days} hari {hours} jam lagi</span>
        }
    }

    const statusRender = (status) => {
        switch (status) {
            case 'new':
                return(
                    <div className="flex flex-col">
                        <span>Tidak ada jadwal lelang</span>
                        <span className="font-normal"><LocationOnOutlined sx={{ fontSize: 18 }} />{kota.kabupaten}</span>
                    </div>
                )
            case 'onLelang':
                return(
                    <div className="flex flex-col text-sm font-bold">
                        <span className="text-lg text-red-500"><CurrencyFormat value={harga_dasar} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></span>

                        {moment(tanggal_mulai).isSameOrAfter(Date.now()) ?
                            <span><Countdown date={tanggal_mulai} renderer={countdownRenderMulai} /></span>
                            :
                            <span><Countdown date={tanggal_akhir} renderer={countdownRender} /></span>
                        }

                        <span className="font-normal">{total_bidder} Bid</span>
                        <span className="font-normal"><LocationOnOutlined sx={{ fontSize: 18 }} />{kota.kabupaten}</span>
                    </div>
                )
            case 'endLelang':
                return(
                    <div className="flex flex-col text-sm font-bold">
                        <span>Pelelangan berakhir</span>
                        <span className="font-normal"><LocationOnOutlined sx={{ fontSize: 18 }} />{kota.kabupaten}</span>
                    </div>
                )
            default:
                return (<div><span>status tidak terdefinisi</span></div>)
        }
    }

    const navigateToItemDetail = (event) => {
        event.preventDefault()
        navigate(`/item?itemId=${id_item}`)
        console.log('klik')

    }
    return (
        <div className="shadow w-[200px] h-[350px] border relative mx-auto">
            <div className="w-full h-[180px] aspect-square bg-white items-center justify-items-center flex m-auto">
                <img src={gambar_src} alt={gambar_id} className="max-h-full h-auto w-auto max-w-full m-auto" onClick={navigateToItemDetail} />
                <div className="absolute right-3 left-auto top-[150px]">
                    {/* <button className={`h-[28px] w-[28px] rounded-full shadow aspect-square text-slate-700 bg-white/70 hover:bg-white`}><Favorite sx={{ fontSize: 20 }} /></button> */}
                    <button className={`h-[28px] w-[28px] rounded-full shadow aspect-square text-slate-700 bg-white/70 hover:bg-white ml-2`}><Share sx={{ fontSize: 20 }} /></button>
                </div>
            </div>

            <div className="px-2 py-1 h-[170px] bg-white">
                <p className="line-clamp-2 leading-tight mb-1" onClick={navigateToItemDetail}>{nama_item}</p>
                {statusRender(status)}
                {/* <div className="flex flex-col text-sm font-bold">
                    <span className="text-lg text-red-500"><CurrencyFormat value={harga_dasar} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></span>

                    {moment(tanggal_mulai).isSameOrAfter(Date.now()) ?
                        <span><Countdown date={tanggal_mulai} renderer={countdownRenderMulai} /></span>
                        :
                        <span><Countdown date={tanggal_akhir} renderer={countdownRender} /></span>
                    }

                    <span className="font-normal">{total_bidder} Bid</span>
                    <span className="font-normal"><LocationOnOutlined sx={{ fontSize: 18 }} />{kota.kabupaten}</span>
                </div> */}
            </div>
        </div>
    )
}

export default SeparateProductCard;