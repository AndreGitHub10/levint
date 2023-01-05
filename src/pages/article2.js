import React, { useEffect, useState } from "react"
// import axios from 'axios'
// import { useSearchParams } from 'react-router-dom'
import { WhiteCard } from "../components/cards/white-card"

const Article2 = () => {
    // const [konten, setKonten] = useState(null)
    // const [searchParams] = useSearchParams()

    // const getKonten = async () => {
    //     await axios.get(`http://localhost:6001/article?articleId=${searchParams.get('articleId')}`)
    //     .then((response) => {
    //         setKonten(response.data.article)
    //     })
    // }

    // useEffect(() => {
    //     getKonten()
    // }, [])

    return(
        <>
        {/* {konten === null ? 
            <WhiteCard>
                <div className="h-[500px]">
                    <p>Artikel tidak ditemukan</p>
                </div>
            </WhiteCard>
         :  */}
            <WhiteCard>
                <div className="flex flex-col">
                    <p className="text-2xl font-bold">Barang Antik Jadi Menarik dengan Nilai Sejarahnya</p>
                    <div>
                        <img className="" src="https://www.thoughtco.com/thmb/kQwl5vYoYOACYndTydkoTvJecyg=/3865x2576/filters:no_upscale():max_bytes(150000):strip_icc()/antique-irons-170722250-5b3979e046e0fb0037320214.jpg"></img>
                    </div>
                    <div>
                        <p className='whitespace-pre-line my-1'>
                        Barang-barang ini merupakan benda yang sudah berumur lebih dari ratusan tahun. Barang antik yaitu benda menarik yang sudah berusia tua seperti mebel, senjata, barang seni, maupun perabotan rumah tangga. Banyak sekali barang antik yang dijumpai di berbagai daerah atau tempat khusus dalam pasar lama.

                        Barang antik biasa dijual dengan di lelang dari kolektor kemudian disimpan sebagai suatu peninggalan sejarah zaman dulu. Bahkan tidak sedikit orang membeli barang antik karena menarik dari sejarah dan berapa lama barang tersebut ada. Seperti ibu saya,beliau sering kali mengumpulkan barang-barang antik yang tidak masuk akal harganya,akan tetapi tetap membeli karena menarik saja. Bukan masalah uang dalam membeli,namun dilihat dari nilai sejarah yang ada.

                        Ibu saya sudah membeli beberapa macam barang antik seperti uang,koin,setrika zaman dulu,lampu gantung kuno,almari,kayu bekas berumur tua, meja, kursi, dan masih banyak lagi. Entah saya juga heran beliau begitu suka barang antik yang belum tentu bisa dijual ke sembarang orang. Bahkan dilihat dari nilai sejarah barang antik itu sendiri bisa merinding jika tahu itu dulu dari zaman apa atau bekas apa seperti itu.

                        Dari dulu sampai sekarang barang antik memiliki nilai menarik,tetapi dilihat dari harganya tidak ada kata mahal bagi pecinta barang antik seperti ibu saya. Bagi mereka barang antik bukan hanya dilihat dari bentuk dan manfaat,tetapi yang terpenting dari nilai sejarah yang melekat pada barang antik itu sendiri.

                        Daerah yang menjual barang antik hingga ratusan juta rupiah biasanya memiliki pasar lelang tersendiri dan khusus. Seperti di kota lama Semarang, bermacam barang antik disuguhkan untuk menarik para wisatawan melihat bahkan membeli hanya karna menarik saja belum tentu mengetahui makna dari barang antik itu sendiri. Barang antik tidak akan dimakan usia jika kita menjaga dan merawat dengan baik dan sesuai.

                        Selain langka,memiliki barang antik memiliki nilai tinggi dan masih laku karena memiliki sejarah. Lain halnya dengan barang baru,barang bekas dan barang antik memiliki sejarah yang tidak dimiliki barang baru. Hal terssebut menjadikan nilai tambah bagi barang bekas dan barang baru. Misalnya barang antik tersebut pernah dimiliki oleh seseorang bangsawan ataupun kolektor dapat menambah nilai jual barang tersebut menjadi tinggi.

                        Keuntungan yang didapatkan jika mengoleksi barang antik:

                        1. Sebagai alat terapi dan pereda stress

                        Ketika seseorang sudah menyatakan bahwa mengoleksi barang antik menjadi hobi,maka orang tersebut akan meluapkan kepenatan dengan membeli barang antik tersebut. Ketika kita sudah mengalihkan rutinitas kita dengan merawat barang antik itu sendiri menjadi hal yang bagus bagi perbaikan emosi.

                        </p>
                    </div>
                </div>
            </WhiteCard>
            {/* } */}
        </>
    )
}

export default Article2