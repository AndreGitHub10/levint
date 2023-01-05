import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import DefaultButton from '../components/buttons/default-button'
import {WhiteCard} from '../components/cards/white-card'
import { onLoad, onDone } from '../components/stateSlice/loadingSlice'

const AccountVerificationPage = () => {
    const [searchParams] = useSearchParams()
    const [accepted, setAccepted] = useState(null)
    const dispatch = useDispatch()

    const confirmAccount = async () => {
        dispatch(onLoad())
        await axios.get(`http://localhost:4001/user/verification/${searchParams.get('ct')}`)
        .then((response) => {
            dispatch(onDone())
            console.log(response.data.message)
            setAccepted(true)
        })
        .catch((err) => {
            dispatch(onDone())
            console.log(err.response.data.message)
            setAccepted(false)
        })
    }
    return(
        <div className='mt-10 md:w-1/2 justify-self-center m-auto'>
            {accepted === null ?
            <WhiteCard>
                <span>Anda baru saja meminta untuk mendaftarkan akun menggunakan email ini, jika ini bukan anda silahkan keluar dan abaikan...</span>
                <p>Jika ini memang benar anda, silahkan klik tombol dibawah untuk menkonfirmasi akun anda</p>
                <DefaultButton onClick={() => confirmAccount()}>Konfirmasi</DefaultButton>
            </WhiteCard>
            :
            (accepted === true ?
                <WhiteCard sectionTitle={'Berhasil'}>
                    <span className='text-center'>Akun berhasil diverifikasi, silahkan <a href='http://localhost:3000/login' className='underline text-blue-500'>login</a></span>
                </WhiteCard>
                :
                <WhiteCard sectionTitle={'Gagal'}>
                    <span className='text-center'>Maaf, link verifikasi telah kadaluarsa,<br/> silahkan konfirmasi kembali email anda <br/><a href='http://localhost:3000/email-verify-request' className='underline text-blue-500'>Kirim ulang</a> link verifikasi ke email anda</span>
                </WhiteCard>
                )
            }
        </div>
    )
}

export default AccountVerificationPage