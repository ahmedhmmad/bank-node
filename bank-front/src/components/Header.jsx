
import logo from '../assets/logo.svg'
export default function Header()
{
    return (
        <header>
            <img src={logo} alt="Logo" />
            <h1> Node Bank</h1>
        </header>
    );
}