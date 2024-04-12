import './NavMenu.css'
import { showForm } from '../../redux/slices/SignInSlice';
import { useDispatch } from 'react-redux';

const NavMenu = () => {

    const dispatch = useDispatch();

    const showFormSignIn = () => {
        dispatch(showForm());
    }

    return (
        <div className="options">
            <a className='show-tracks' href="#">Show Tracks</a>
            <button className='btn btn-signin' onClick={showFormSignIn}>SIGN-IN</button>
        </div>
    )
}

export default NavMenu
