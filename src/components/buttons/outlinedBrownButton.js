import React from "react";

const OutlinedBrownButton = ({children, onClick, type}) => {
    return(
        <button className={"l-font-brown p-1 border rounded w-full shadow-orange-300 l-border-brown bg-white"} onClick={(onClick && onClick)} type={(type && type)}>{children}</button>
    );
}

export default OutlinedBrownButton;