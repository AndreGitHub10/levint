import { WhiteCard } from "../components/cards/white-card"
import CurrencyInput from 'react-currency-input-field'
import { useEffect, useState } from "react"
import DefaultButton from "../components/buttons/defaultButton"
import { useDispatch, useSelector } from "react-redux"
import CurrencyFormat from 'react-currency-format'
import { onLoad, onDone } from '../components/stateSlice/loadingSlice.js';
import axios from "axios"
import Swal from 'sweetalert2'
import TablePaymentTopUp from "../components/table/TablePaymentTopUp"

const PembayaranPage = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.login.dataUser)
    const isLogin = useSelector((state) => state.login.isLogin)
    const [paymentAccount, setPaymentAccount] = useState([])
    const [nominal, setNominal] = useState(0)

    const createInvoice = async (event) => {
        event.preventDefault()
        if(nominal < 10000) {
            Swal.fire({
                title: 'Permintaan gagal!',
                text: 'Minimal top up adalah 10.000',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: 'orange'
            })
        } else {
            dispatch(onLoad())
            await axios.post('http://localhost:8001/payment/topUp', {
                withCredentials: true,
                topUpAmount: nominal
            })
            .then((response) => {
                dispatch(onDone())
                Swal.fire({
                    title: 'Permintaan berhasil!',
                    text: response.data.message,
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: 'green'
                })
            })
            .catch((err) => {
                dispatch(onDone())
                Swal.fire({
                    title: 'Permintaan gagal!',
                    text: err.response.data,
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: 'orange'
                })
            })
        }
    }

    const getPaymentAccountDetail = async () => {
        await axios.get('http://localhost:8001/payment/getPaymentAccountDetail', {
            withCredentials: true
        })
        .then((response) => {
            console.log(response.data.paymentAccount)
            setPaymentAccount(response.data.paymentAccount)
        })
        .catch((error) => {
            console.log(error.response.data.message)
        })
    }

    useEffect(() => {
        if(isLogin) {
            getPaymentAccountDetail()
        }
    }, [isLogin])

    return (
        <div className="mt-2 min-h-screen">
            <WhiteCard>
                <form className="flex flex-col lg:flex-row gap-y-4" onSubmit={createInvoice}>
                    <div className="">
                        <p>Saldo anda</p>
                        <p className="text-4xl font-bold"><CurrencyFormat value={paymentAccount.saldo ? paymentAccount.saldo : 0} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></p>
                    </div>
                    <div className="flex flex-col lg:mr-0 lg:ml-auto lg:mx-auto lg:max-w-lg gap-y-2 l-bg-light-brown p-4 rounded">
                        <label className="font-bold">Nominal Top Up</label>
                        <span className="text-sm">min. 10.000</span>
                        <CurrencyInput
                            id="example"
                            name="example"
                            placeholder="Nominal"
                            onValueChange={(value) => setNominal(parseInt(value))}
                            value={nominal.toString()}
                            prefix="Rp "
                            groupSeparator="."
                            decimalSeparator=","
                            required={true}
                            className="border-0 border-b border-orange-300 px-0 py-1 focus:outline-none focus:border-orange-500 bg-transparent"
                        />
                        <DefaultButton type={'submit'}>Create Invoice</DefaultButton>
                    </div>
                </form>
            </WhiteCard>
            <WhiteCard>
                <TablePaymentTopUp getPaymentAccountDetail={getPaymentAccountDetail} />
            </WhiteCard>
        </div>
    )
}

export default PembayaranPage