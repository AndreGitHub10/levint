import { useEffect, useState } from "react"
import axios from "axios"
import { WhiteCard } from "../components/cards/white-card"
import DefaultButton from "../components/buttons/default-button"
import moment from 'moment'

const EmailVerificationRequestPage = () => {
    const [email, setEmail] = useState('')
    const [countDown, setCoutDown] = useState(null)
    const [timeLeft, setTimeLeft] = useState('')

    const emailVerificationHandler = async () => {
        await axios.post(`http://localhost:4001/user/emailVerification`, {
            email: email
        })
        .then((response) => {
            console.log(response.data.message)
            setCoutDown(response.data.diff)
        })
        .catch((err) => {
            console.log(err.response.data.message)
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if(countDown !== null){
                if(countDown !== 0){
                    setCoutDown((prevCountDown) => prevCountDown - 1)
                    setTimeLeft(moment.utc(countDown*1000).format('mm:ss'))
                } else {
                    setCoutDown(0)
                    setTimeLeft('')
                }
            }
        }, 1000);

        return () => clearInterval(interval)
    }, [countDown])

    return(
        <div className='mt-10 md:w-1/2 justify-self-center m-auto'>
            <WhiteCard sectionTitle={'Permintaan verifikasi email'}>
            {countDown === null ?
            <span>Masukkan email yang anda daftarkan, pastikan email anda masih aktif!</span>
            :
            <span className="text-center">Link verifikasi telah dikirim ke email anda..</span>
            }
            <div className="flex flex-col">
                <span>Email</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2" required disabled={(countDown === null || countDown === 0) ? false : true}></input>
            </div>
            <DefaultButton onClick={() => emailVerificationHandler()} disabled={(countDown === null || countDown === 0) ? false : true}>Kirim ulang {timeLeft !== '' && `(${timeLeft})`}</DefaultButton>
            </WhiteCard>
        </div>
    )
}

export default EmailVerificationRequestPage