import { Fragment, useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import PasswordModal from "../components/Modal/PasswordModal";
import Button from "../components/Button/Button";

const Profile = () => {
    
    const { user } = useContext(UserContext) as any;
    const { setUser } = useContext(UserContext) as any;
    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState(user);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        };

        setUserProfile(user);
        console.log(user);
    }, [user])

    const handleSubmit = (e: any) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
    
        fetch('http://localhost:3000/api/users/me', {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            setUser(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen max-w-[40rem]">
            <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <img src={user && user.profile.image} alt="avatar" className="max-w-32 max-h-32 rounded-full mx-auto" />
                        <h1 className="block text-2xl mt-3 font-bold text-gray-800 dark:text-white">Profile</h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                            Welcome {user && user.name}
                        </p>
                        <form className="mt-5" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-6">
                                <div className="flex flex-col items-start">
                                    <label className="text-gray-700 dark:text-neutral-300" htmlFor="name">Name</label>
                                    <input type="text" id="name" name="name" value={userProfile && userProfile.name} onChange={(e) => setUserProfile({...userProfile, name: e.target.value})} className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-600 rounded-md dark:bg-neutral-800 dark:text-neutral-100 focus:border-blue-500 focus:outline-none focus:ring" />
                                </div>
                                {userProfile && userProfile.isGoogle ? null : (
                                    <Fragment>
                                        <div className="flex flex-col items-start">
                                    
                                        <Fragment>
                                            <label className="text-gray-700 dark:text-neutral-300" htmlFor="email">Email</label>
                                            <input type="email" id="email" name="email" value={userProfile && userProfile.email} onChange={(e) => setUserProfile({...userProfile, email: e.target.value})} className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-600 rounded-md dark:bg-neutral-800 dark:text-neutral-100 focus:border-blue-500 focus:outline-none focus:ring" />                                       
                                        </Fragment>
                                    
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <Button color="neutral" size="sm" text="Changer le mot de passe" onClick={() => { setShow(true) }} />
                                        </div>
                                    </Fragment>
                                )}
                                    
                                
                                <hr className="border-gray-200 dark:border-neutral-700" />
                                <div className="flex flex-col items-start">
                                    <label className="text-gray-700 dark:text-neutral-300" htmlFor="bio">Bio</label>
                                    <textarea id="bio" name="bio" value={userProfile && userProfile.profile.bio} onChange={(e) => setUserProfile({...userProfile, profile: {bio: e.target.value}})} className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-600 rounded-md dark:bg-neutral-800 dark:text-neutral-100 focus:border-blue-500 focus:outline-none focus:ring" />
                                </div>
                                <div className="flex flex-col items-start">
                                    <label className="text-gray-700 dark:text-neutral-300" htmlFor="image">Image</label>
                                    <input type="file" name="image" id="image" className="block mt-1 w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                                        file:bg-gray-50 file:border-0
                                        file:me-4
                                        file:py-3 file:px-4
                                        dark:file:bg-neutral-700 dark:file:text-neutral-400" />
                                </div>
                                <div className="flex flex-col items-start">
                                    <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <PasswordModal show={show} handleClose={() => setShow(false)} user={userProfile} />
        </div>
    )
}

export default Profile;