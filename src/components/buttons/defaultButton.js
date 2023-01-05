const DefaultButton = ({children, onClick, type, disabled}) => {
    return(
        <button className="rounded text-white p-1 w-full shadow shadow-orange-300 l-border-brown l-bg-brown" onClick={onClick && onClick} type={type && type} disabled={disabled && disabled}>
            {children ? children : "Property name tidak ada"}
        </button>
    )
}

export default DefaultButton