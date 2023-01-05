import axios from "axios"
import { useDispatch } from "react-redux"
import { login, logout } from "../components/stateSlice/loginSlice"

const USER_API_URL = "http://localhost:4001/user/"

export const LoginAction = async (email, password) => {
    const dispatch = useDispatch()
    return await axios.post(USER_API_URL + 'login', {
        email,
        password
    })
    .then((response) => {
        dispatch(login(response.data.user))
    })
    .catch((err) => {
        console.log(err)
    })
}

export const CheckLogin = async () => {
    const dispatch = useDispatch()
    await axios.get('http://localhost:4001/user/getUser', {
        withCredentials: true
    }).then((response) => {
        console.log(response.data)
        dispatch(login(response.user))
    // return response.data
    })
    .catch((err) => {
        console.log(err.response.data);
        dispatch(logout())
    // return err.response.data
    })
}