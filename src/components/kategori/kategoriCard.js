import React from "react";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { useNavigate } from "react-router-dom";

const KategoriCard = ({nama, id, gambar}) => {
    const navigate = useNavigate()
    const toList = (e, id) => {
        e.preventDefault()
        navigate(`/itemKategori?kategoriId=${id}`)
    }
    return(
        <div className="flex flex-col" onClick={(e) => toList(e, id)}>
            <div className="flex cursor-pointer border rounded shadow justify-items-center items-center h-[100px] w-[100px] aspect-square text-5xl p-2">
                {/* <LocalAtmIcon fontSize="inherit" className="mx-auto"/> */}
                <img src={gambar} alt={id} className="aspect-square transition ease-in-out duration-300 hover:scale-125" />
            </div>
            <span className="text-center self-center">{nama}</span>
        </div>
    );
}

export default KategoriCard;