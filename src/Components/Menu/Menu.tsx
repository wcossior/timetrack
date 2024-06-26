import { useState } from 'react'
import './Menu.css'
import menu from '../../assets/menu.svg';
import close from '../../assets/close.svg';
import { useDispatch } from 'react-redux';
import { showForm } from '../../redux/slices/SignInSlice';

const Menu = () => {
    const dispatch = useDispatch();
    
    const showFormSignIn = () => {
        dispatch(showForm());
    }
    const [activeMenu, setActiveMenu] = useState('');

    const showMenu = () => {
        setActiveMenu('show-menu');
    }

    const hideMenu = () => {
        setActiveMenu('hide-menu');
    }

    return (
        <div>
            <img className='menu-icon' src={menu} alt="menu" onClick={showMenu} />
            <div className={`menu-container ${activeMenu}`}>
                <div className='menu'>
                    <img className='close' src={close} alt="close-menu" onClick={hideMenu} />
                    <p className="menu-options clickable" onClick={showFormSignIn}>Sign in</p>
                    <p className="menu-options">Show Tracks</p>
                </div>
            </div>
        </div>
    )
}

export default Menu
