import React from "react";
import PromoCard from "./promoCard";
import { data } from "./dataPromo";

const Promo = () => {
    return(
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {
                data.map(promo =>
                    <PromoCard 
                        key={promo.id}
                        src={promo.src}
                        namaUser={promo.namaUser}
                        text={promo.text}
                    />
                )
            }
        </div>
    )
}

export default Promo;