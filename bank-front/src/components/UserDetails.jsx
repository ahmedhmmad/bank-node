
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function UserDetails({username,balance})
{
  
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        window.location.href = '/';
    };

    return (
        <div className="bg-white sm:py-10 m-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
                    <div className="mx-auto flex max-w-xs flex-col gap-y-3">
                    <dt className="text-base leading-7 text-gray-600">username</dt>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                            {username}
                        </dd>
                    </div>
                    <div className="mx-auto flex max-w-xs flex-col gap-y-3">
                    <dt className="text-base leading-7 text-gray-600">Date</dt>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                            {new Date().toDateString()}
                        </dd>
                    </div>
                    <div className="mx-auto flex max-w-xs flex-col gap-y-3">
                        <dt className="text-base leading-7 text-gray-600">Balance</dt>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                            {balance}
                        </dd>
                    </div>
                    <div className="mx-auto flex max-w-xs flex-col gap-y-3">
                        <button 
                            onClick={handleLogout} 
                            className="flex items-center justify-center mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                            Logout
                        </button>
                    </div>
                </dl>
            </div>
        </div>
    );
}

export default UserDetails;