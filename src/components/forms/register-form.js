import React from "react";
import '../../index.css';
import RegisterButton from "../buttons/registerButton";
import OutlinedBrownButton from "../buttons/outlinedBrownButton";
import GoogleIcon from '@mui/icons-material/Google';

const LoginForm = () => {
    return(
        <div className="l-bg-light-brown grid p-4 gap-y-4 rounded-lg shadow-md shadow-orange-300 w-4/6 l-border-brown h-fit">
            <h2 className="justify-self-center">Register Form</h2>
            <div className="h-px w-full l-bg-brown"></div>
            <div className="flex flex-col">
                <span className="ml-4">Username</span>
                <input placeholder="Username" className="rounded-full l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2"></input>
            </div>
            <div className="flex flex-col">
                <span className="ml-4">Email</span>
                <input placeholder="Email" className="rounded-full l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2"></input>
            </div>
            <div className="flex flex-col">
                <span className="ml-4">Password</span>
                <input placeholder="Password" className="rounded-full l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2"></input>
            </div>
            <div className="flex flex-col">
                <span className="ml-4">Password</span>
                <input placeholder="Password" className="rounded-full l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2"></input>
            </div>
            {/* <div className="w-1/2 justify-self-center"> */}
                <RegisterButton/>
            {/* </div> */}
            <span>atau</span>
            <div>
                <OutlinedBrownButton label="Google"/>
            </div>
        </div>
    );
}

export default LoginForm;