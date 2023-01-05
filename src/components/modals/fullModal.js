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

const FullModal = ({handleClose, children}) => {
    return(
        <Backdrop onClick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className='l-full-modal bg-white p-4 m-2 lg:m-10 h-fit'
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

export default FullModal