import React from "react";

const PromoCard = (prop) => {
    const folder = "/userPhoto/";
    return(
        <div className="l-bg-light-brown l-border-brown rounded-xl shadow shadow-orange-300 p-4 grid grid-cols-3">
            <div className="">
                <img src={folder + prop.src} className="rounded-full max-w-full aspect-square align-middle" alt="userPhoto"/>
            </div>
            <div className="col-span-2">
                <span>{prop.namaUser}</span>
                <span>12 lot dilelang mulai dari Rp. 70.000 ,-</span>
            </div>
            <div className="col-span-3">
                <span>{prop.text}</span>
            </div>
        </div>
    )
}

export default PromoCard;