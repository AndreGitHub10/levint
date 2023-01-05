const DefaultButton = ({children, onClick, type, disabled}) => {
    return(
        <button className={`rounded text-white p-1 w-full shadow ` + (disabled === true ? `bg-slate-300` : `l-border-brown l-bg-brown shadow-orange-500`)} onClick={onClick && onClick} type={type && type} disabled={disabled ? disabled : false}>
            {children ? children : "Property name tidak ada"}
        </button>
    )
}

export default DefaultButton