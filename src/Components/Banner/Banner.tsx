import logo from '../../assets/logo.svg';
import './Banner.css';
import Clock from '../Clock/Clock';
import CurrentDate from '../CurrentDate/CurrentDate';
import BannerVideo from '../BannerVideo/BannerVideo';
import Menu from '../Menu/Menu';
import NavMenu from '../NavMenu/NavMenu';
import Check from '../Check/Check';
import Message from '../Message/Message';
import SignIn from '../SignIn/SignIn';
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from 'react-redux';

const Banner = () => {

    const formVisibility = useSelector((state: RootState) => state.signin.visible);


    return (
        <div className='center'>
            <div className='banner'>
                <BannerVideo />
                <img className='logo' src={logo} alt="logo" />
                <NavMenu />
                <Menu />
                <div className='date-time-container'>
                    <Clock />
                    <CurrentDate />
                </div>
                <Check />
            </div>
            {formVisibility &&
                <SignIn />
            }
            {/* <Message type="error"/> */}
        </div>
    )
}

export default Banner
