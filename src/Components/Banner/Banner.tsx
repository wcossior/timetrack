import logo from '../../assets/logo.svg';
import './Banner.css';
import Clock from '../Clock/Clock';
import CurrentDate from '../CurrentDate/CurrentDate';
import BannerVideo from '../BannerVideo/BannerVideo';
import Menu from '../Menu/Menu';
import NavMenu from '../NavMenu/NavMenu';
import Check from '../Check/Check';
import Message from '../Message/Message';

const Banner = () => {

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
            <Message />
        </div>
    )
}

export default Banner
