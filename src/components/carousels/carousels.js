import React from "react";
// import streetLamp from '../images/street-lamp.png';
// import { initialState } from './data.js';
// import LCarouselItem from "./l-carousel-item";
import {Carousel} from 'flowbite-react'
import 'flowbite'
import 'flowbite-react'
import { useNavigate } from "react-router-dom";



const Carousels = () => {
  const navigate = useNavigate()
  return(
    <>
    {/* <div className="grid grid-rows-3 md:grid-rows-2 grid-flow-col grid-cols-2 md:grid-cols-3 gap-x-2"> */}
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel>
          <div className="w-full" onClick={(e) => {
            e.preventDefault()
            navigate('/article')
            }}>
            <img src="https://www.thoughtco.com/thmb/kQwl5vYoYOACYndTydkoTvJecyg=/3865x2576/filters:no_upscale():max_bytes(150000):strip_icc()/antique-irons-170722250-5b3979e046e0fb0037320214.jpg" alt="carousel1"></img>
          </div>
          <div className="w-full" onClick={(e) => {
            e.preventDefault()
            navigate('/article')
            }}>
            <img
            src="https://www.wallpaperup.com/uploads/wallpapers/2014/08/13/421661/e607e98881b88341dff95ba315bd6ecb.jpg"
            alt="..."
            />
          </div>
        </Carousel>
      </div>
      {/* <div id="default-carousel" className="relative" data-carousel="static"> */}
        {/* <!-- Carousel wrapper --> */}
        {/* <div className="relative h-56 overflow-hidden rounded-lg md:h-96"> */}
            {/* <!-- Item 1 --> */}
            {/* <div className="hidden duration-700 ease-in-out" data-carousel-item>
                <span className="absolute text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 sm:text-3xl dark:text-gray-800">First Slide</span>
                <img src="/docs/images/carousel/carousel-1.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
            </div> */}
            {/* <!-- Item 2 --> */}
            {/* <div className="hidden duration-700 ease-in-out" data-carousel-item>
                <img src="/docs/images/carousel/carousel-2.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
            </div> */}
            {/* <!-- Item 3 --> */}
            {/* <div className="hidden duration-700 ease-in-out" data-carousel-item>
                <img src="/docs/images/carousel/carousel-3.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
            </div> */}
        {/* </div> */}
        {/* <!-- Slider indicators --> */}
        {/* <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
            <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 1" data-carousel-slide-to="0"></button>
            <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
            <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        </div> */}
        {/* <!-- Slider controls --> */}
        {/* <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                <span className="sr-only">Previous</span>
            </span>
        </button>
        <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                <span className="sr-only">Next</span>
            </span>
        </button> */}
    {/* </div> */}
      {/* <div id="carous"> */}
      
        {/* <img src="https://res.cloudinary.com/levint-app/image/upload/v1669853719/Images/images_3_yv4rdf.jpg" alt="carousel1"></img> */}
      
      {/* </div> */}
      
      {/* <div className="justify-center flex flex-col col-span-2 row-span-2">
        <div className="flex justify-center w-full gap-2" style={{marginTop:"-25px"}}>
          <a href="#item1" className="btn btn-xs">1</a> 
          <a href="#item2" className="btn btn-xs">2</a> 
          <a href="#item3" className="btn btn-xs">3</a> 
          <a href="#item4" className="btn btn-xs">4</a>
          <a href="#item5" className="btn btn-xs">5</a>
          <a href="#item6" className="btn btn-xs">6</a>
          <a href="#item7" className="btn btn-xs">7</a>
        </div>
      </div> */}
      {/* <div className="bg-cyan-300">
        <img src="productPhoto/keripik-singkong.jpg" alt="cc1" className="min-w-full h-32"/>
      </div>
      <div className="bg-red-300">
        <img src="productPhoto/keripik-tempe.jpg" alt="cc2" className="min-w-full h-32"/>
      </div>
    </div> */}
    </>
  );
}

export default Carousels;