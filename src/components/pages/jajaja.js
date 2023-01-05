const Jajaja = () => {
    const login = async () => {
        await fetch('http://localhost:4001/user/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({email:'aaa@ggg.ccc', password:'12345678'})
        })
    }
    const logout = async () => {
        await fetch('http://localhost:4001/user/logout', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            method: 'POST'
        })
    }
    return(
        <div>
            <button onClick={() => login()}>login</button>
            <button onClick={() => logout()}>logout</button>
        </div>
    )
}

export default Jajaja