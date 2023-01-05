import React from "react";

const BrownButton = (props) => {
    return(
        <button className="text-white p-1 rounded w-full shadow-orange-300 l-border-brown l-bg-brown">{props.label}</button>
    );
}

export default BrownButton;