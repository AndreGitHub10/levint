import { motion } from "framer-motion";
import Backdrop from "../backdrop";

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 300
        }
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
}

const Modal = ({handleClose, children}) => {
    return(
        <Backdrop onClick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className='l-modal bg-white p-4 lg:w-1/2'
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {children}
            </motion.div>
        </Backdrop>
    )
}

export default Modal