import axios from "axios"
import React, {useEffect, useState} from 'react'
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../stateSlice/loginSlice";
import Swal from 'sweetalert2'

const TablePaymentTopUp = ({getPaymentAccountDetail}) => {
    const [dataPayment, setDataPayment] = useState([]);
    const isLogin = useSelector((state) => state.login.isLogin)
    const [pending, setPending] = useState(true)
    const dispatch = useDispatch()
    // const [filterText, setFilterText] = useState('');
	// const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	// const filteredItems = dataPayment.filter(
	// 	item => item.nama_item && item.nama_item.toLowerCase().includes(filterText.toLowerCase()),
	// );

	// const subHeaderComponentMemo = useMemo(() => {
	// 	const handleClear = () => {
	// 		if (filterText) {
	// 			setResetPaginationToggle(!resetPaginationToggle);
	// 			setFilterText('');
	// 		}
	// 	};

	// 	return (
    //         <div className="flex flex-row justify-start ml-0 mr-auto">
    //         <input type='text' className="border border-r-0 border-orange-300 rounded-tl rounded-bl px-2" placeholder="Cari" onChange={(e) => setFilterText(e.target.value)} value={filterText}/>
    //         <button className=" rounded-tr rounded-br border border-l-0 border-orange-300 px-2" onClick={handleClear}>x</button>
    //         </div>
	// 	);
	// }, [filterText, resetPaginationToggle]);

    const statusColor = (status) => {
        switch (status) {
            case "belum dibayar":
                return 'text-sky-500 border-sky-500'
            case "telah dibayar":
                return 'text-green-500 border-green-500'
            case "expire":
                return 'text-red-500 border-red-500'
            case "ditolak":
                return 'text-red-500 border-red-500'
            case "pending":
                return 'text-yellow-500 border-yellow-500'
            default:
                return 'text-slate-500 border-slate-500'
        }
    }

    const checkPaymentStatus = async (e, transactionToken) => {
        e.preventDefault()
        await axios.post('http://localhost:8001/payment/checkPaymentStatus', {
            withCredentials: true,
            transactionToken
        })
        .then((response) => {
            if(response.data.topUpDetail.status == "telah dibayar"){
                getPaymentAccountDetail()
            }
            getAllPayment()
            Swal.fire({
                title: 'Data berhasil diupdate!',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: 'green'
            })
        })
        .catch((error) => {
            Swal.fire({
                title: 'Permintaan gagal!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: 'orange'
            })
        })
    }

    const getAllPayment = async () => {
        await axios.get(`http://localhost:8001/payment/getAllPayment`, {
            withCredentials: true
        })
        .then((response) => {
            setDataPayment(response.data.dataPayment)
            setPending(false)
        })
        .catch((err) => {
            setPending(false)
            if(err.response.status === 401){
                dispatch(logout())
            }
            console.log(err)
        })
    }

    useEffect(() => {
        getAllPayment()
    }, [isLogin])

    const columns = [
        {
            name: 'ID Pembayaran',
            selector: row => row._id,
            sortable: true
        },
        {
            name: 'Nominal',
            selector: row => row.topUpAmount,
            sortable: true,
            maxWidth: '600px'
        },
        {
            name: 'Status',
            sortable: true,
            cell: row => (
                <><span className={`font-mono rounded-full p-1 border ${statusColor(row.status)}`}>{row.status}</span><span onClick={(e) => checkPaymentStatus(e, row.order_id)} className=" underline text-slate-400 text-sm ml-1 cursor-pointer">update</span></>
            )
        },
        {
            name: 'Action',
            grow: 1,
            cell: row => (
                <div className="w-full flex gap-1">
                    <button className="text-orange-500 p-2 hover:bg-orange-300 shadow hover:shadow-lg focus:bg-orange-500 border focus:text-white outline-slate-100 rounded" type="button" id={row._id} onClick={(e) => payTopUp(e, row.transactionToken)}>Bayar</button>
                </div>
            )
        }
    ]

    const customStyles = {
        rows: {
            style: {
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem'
            }
        }
    }

    useEffect(() => {
        const snapSrcUrl = "https://app.sandbox.midtrans.com/snap/snap.js"
        const myMidtransKey = "SB-Mid-client-ywqTrEjvn9CLL-Eo"
    
        const script = document.createElement('script')
        script.src = snapSrcUrl
        script.setAttribute('data-client-key', myMidtransKey)
        script.async = true
    
        document.body.appendChild(script)
    
        return () => {
            document.body.removeChild(script)
        }
    }, [])

    const payTopUp = (e, transaction_id) => {
        e.preventDefault()
        window.snap.pay(transaction_id)
    }
    return(
        <div className="p-4">
            <DataTable
                columns={columns} 
                data={dataPayment} 
                noDataComponent="Belum ada pembayaran"
                progressPending={pending}
                pagination
                customStyles={customStyles}
            />
        </div>
    )
}

export default TablePaymentTopUp