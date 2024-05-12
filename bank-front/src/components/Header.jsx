
import logo from '../assets/logo.svg';
import './header.module.css';
export default function Header()
{
    return (
        <header>
            <img src={logo} alt="Logo" />
            <h1> Node Bank</h1>
        </header>
    );
}