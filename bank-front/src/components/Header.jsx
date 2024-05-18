import logo from '../assets/logo.svg';


export default function Header() {
    return (
        <header className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <img src={logo} alt="Logo" className="h-40 w-40" />
            </div>
        </header>
    );
}
