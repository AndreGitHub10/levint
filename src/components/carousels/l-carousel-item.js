import React from "react";
import streetLamp from '../images/street-lamp.png';

const LCarouselItem = () => {
    return(
        <img src={streetLamp} alt="..." className="flex
        justify-center
        text-3xl md:text-7xl 
        p-6 w-50 h-50 bg-slate-300 md:p-10 md:w-60 md:h-60 md:bg-green-300
        items-center
        drop-shadow-md	
        rounded-md"/>
    );
}

export default LCarouselItem;