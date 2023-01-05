import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';

const LoginButton = () => {
    return(
        <Link className="rounded outline outline-amber-300 text-amber-300" to="/login">
            <LoginIcon></LoginIcon>
            Login
        </Link>
    );
}

export default LoginButton;