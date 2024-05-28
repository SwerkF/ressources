import { useState } from "react";


const PasswordModal = ({ show, handleClose, user }: { show: boolean, handleClose: () => void, user: any }) => {

    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');

    const handleOnSubmit = (e: any) => {
        e.preventDefault();
        if (password.newPassword !== password.confirmPassword) {
            setError('Passwords do not match');
            return;
        } 

        if (password.newPassword.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        // must contain special characters, numbers, uppercase, lowercase
        const strength = getPasswordStrength(password.newPassword);

        if (strength.special + strength.number + strength.uppercase + strength.lowercase < 5) {
            setError('Password must contain special characters, numbers, uppercase and lowercase letters');
            return;
        }

        setError('');

        console.log(password);

        /*
        fetch('http://localhost:3000/api/users/me', {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(password)
        })*/
    }

    const getPasswordStrength = (password: string) => {
        // calc passwors strength with special characters, numbers, uppercase, lowercase

        const strength = {
            'special': 0,
            'number': 0,
            'uppercase': 0,
            'lowercase': 0,
            'length': password.length >= 8 ? 1 : 0,
        }

        const special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const number = /[0-9]/;
        const uppercase = /[A-Z]/;
        const lowercase = /[a-z]/;
        
        if (special.test(password)) {
            strength.special = 1;
        }
        if (number.test(password)) {
            strength.number = 1;
        }
        if (uppercase.test(password)) {
            strength.uppercase = 1;
        }
        if (lowercase.test(password)) {
            strength.lowercase = 1;
        }

        return {"strength": strength.special + strength.number + strength.uppercase + strength.lowercase + strength.length, "special": strength.special, "number": strength.number, "uppercase": strength.uppercase, "lowercase": strength.lowercase};

    }

    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${show ? 'block' : 'hidden'}`}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={(handleClose)}>
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white dark:bg-neutral-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className="bg-white dark:bg-neutral-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex justify-center sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <h3 className="text-3xl mt-5 leading-6 font-medium text-gray-900 dark:text-white" id="modal-headline mt-4">
                                    Change Password
                                </h3>
                                <p className="text-sm mt-3 text-gray-600 dark:text-neutral-400">
                                    Update your password
                                </p>
                                <hr className="my-4 border-gray-200 dark:border-neutral-700" />
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-700 dark:text-neutral-300">Password Strength:</span>
                                    <div className="flex items-center gap-2">
                                        {password.newPassword &&  getPasswordStrength(password.newPassword).strength < 2 ? ( 
                                            <div className="flex items-center gap-2">
                                                <span className="text-red-500">Weak</span>
                                            </div>
                                        ) : getPasswordStrength(password.newPassword).strength < 4 ? (
                                            <div className="flex items-center gap-2">
                                                <span className="text-yellow-500">Medium</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span className="text-green-500">Strong</span>
                                            </div>
                                        )}                                        


                                    </div>
                                </div>  
                                <form className="mt-5" onSubmit={handleOnSubmit}>
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="flex flex-col items-start">
                                            <label className="text-gray-700 dark:text-neutral-300" htmlFor="oldPassword">Old Password</label>
                                            <input type="password" id="oldPassword" name="oldPassword" value={password.oldPassword} onChange={(e) => setPassword({...password, oldPassword: e.target.value})} className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-600 rounded-md dark:bg-neutral-800 dark:text-neutral-100 focus:border-blue-500 focus:outline-none focus:ring" />
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <label className="text-gray-700 dark:text-neutral-300" htmlFor="newPassword">New Password</label>
                                            <input type="password" id="newPassword" name="newPassword" value={password.newPassword} onChange={(e) => setPassword({...password, newPassword: e.target.value})} className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-600 rounded-md dark:bg-neutral-800 dark:text-neutral-100 focus:border-blue-500 focus:outline-none focus:ring" />
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <label className="text-gray-700 dark:text-neutral-300" htmlFor="confirmPassword">Confirm Password</label>
                                            <input type="password" id="confirmPassword" name="confirmPassword" value={password.confirmPassword} onChange={(e) => setPassword({...password, confirmPassword: e.target.value})} className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-600 rounded-md dark:bg-neutral-800 dark:text-neutral-100 focus:border-blue-500 focus:outline-none focus:ring" />
                                        </div>
                                        {error && (
                                            <div className="flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c-3.905 0-7.063-3.158-7.063-7.063V9.937c0-3.905 3.158-7.063 7.063-7.063h-4.688" />
                                                </svg>
                                                <span className="text-red-500">{error}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center">
                                            <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Update</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    );
}

export default PasswordModal;