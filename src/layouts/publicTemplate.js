import { Outlet } from "react-router-dom"
import LocalNavbar from "./navbar/navbar"

const PublicTemplate = () => {
    return <>
        <LocalNavbar />
        <div id='main' style={{paddingTop:"60px"}} className="container mx-auto">
            <Outlet />
        </div>
    </>
}

export default PublicTemplate