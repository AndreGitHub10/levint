import React from "react";

const ProductDetail = (prop) => {
    const src = '/productphoto/keripik-singkong.jpg'
    const keterangan = "Ini adalah keterangan singkat dari item ini berisi hanya 1-2 baris saja untuk menghightlight produk"
    return(
        <div className="l-bg-light-brown shadow shadow-orange-300 min-h-screen w-full px-8 py-4 mt-8">
            <div className="grid grid-flow-col md:grid-cols-3 grid-cols-1 gap-16">
                <div className="">
                    <div className="w-full aspect-square flex items-center">
                        <img src={src} className="w-full max-w-full max-h-full" alt="keripik pisang"/>
                    </div>
                </div>
                <div className="md:col-span-2 text-black">
                    <span className="text-xl font-bold">Nama Item</span>
                    <p>{keterangan}</p>
                    <hr className="l-border-brown" />
                    
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;