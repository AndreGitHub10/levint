import React, { useEffect } from 'react';
import Carousels from '../carousels/carousels';
import Kategori from '../kategori/kategori';
import Promo from '../promo/promo';
import ProductPlace from '../lelangs/productPlace';
import { useNavigate } from "react-router-dom";
// import Helmet from 'react-helmet'
// import axios from 'axios'
// axios.defaults.withCredentials = true



const Beranda = () => {
    const navigate = useNavigate()
    const toKategori = (e) => {
        e.preventDefault()
        navigate(`/kategori`)
    }
    // useEffect(() => {
    //     const snapSrcUrl = "https://app.sandbox.midtrans.com/snap/snap.js"
    //     const myMidtransKey = "SB-Mid-client-ywqTrEjvn9CLL-Eo"
    
    //     const script = document.createElement('script')
    //     script.src = snapSrcUrl
    //     script.setAttribute('data-client-key', myMidtransKey)
    //     script.async = true
    
    //     document.body.appendChild(script)
    
    //     return () => {
    //         document.body.removeChild(script)
    //     }
    // }, [])
    
    // const payTopUp = (e) => {
    //     e.preventDefault()
    //     window.snap.pay('06e59196-2cd7-4972-87e2-f6969602e79a', {
    //         onSuccess: function(result){
    //             document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2)
    //         },
    //         onPending: function(result){
    //             document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2)
    //         },
    //         onError: function(result){
    //             document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2)
    //         }
    //     })
    // }
    return(
        <div className="pt-4 pb-4">
            <Carousels/>
            <div className="flex justify-between mt-4 mb-4">
                <span className='text-2xl'>Kategori</span>
                <span onClick={(e) => toKategori(e)}>Lihat semua</span>
            </div>
            <Kategori/>
            {/* <div className="flex justify-between mt-4 mb-4">
                <span>Promo toko menarik</span>
                <a href='https://google.com' target="_blank" rel='noreferrer'>Lihat semua</a>
            </div>
            <Promo/> */}
            <div className="flex justify-between mt-4 mb-4">
                <span className='text-2xl'>Lelang sedang berlangsung</span>
            </div>
            <ProductPlace/>
            {/* <button onClick={(e) => payTopUp(e)}>pay</button> */}
            {/* <pre><div id="result-json">hasil json</div></pre> */}
            {/* <Helmet>
            <script src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key="SB-Mid-client-ywqTrEjvn9CLL-Eo"></script>
            <script type="text/javascript">
                document.getElementById('pay-button').onclick = function(){
                    snap.pay('b03be07e-608b-4abb-bc43-52bad938c926', {
                        onSuccess: function(result){
                            document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2)
                        },
                        onPending: function(result){
                            document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2)
                        },
                        onError: function(result){
                            document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2)
                        }
                    })
                }
            </script>
            </Helmet> */}
        </div>
    );
}

export default Beranda;