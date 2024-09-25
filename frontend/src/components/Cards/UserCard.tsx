import { Fragment } from "react/jsx-runtime";
import { User } from "../../types/User";
import UserAvatar from "../Avatar/UserAvatar";
import { GithubLogo, LinkedinLogo, InstagramLogo, XLogo } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const UserCard = ({ user }: { user: User }) => {

    const [userProfile, setUserProfile] = useState(user);

    useEffect(() => {
        setUserProfile(user);
        console.log(user);
    }, [user]);

    return (
        userProfile && (
            <div className="p-4 sm:p-7 shadow-md rounded-md">
                <div className='bg-zinc-300 rounded py-10 px-5 h-[100px] border-gray-500'>
                    <div className='absolute cursor-pointer'>
                        <UserAvatar 
                            size="150px"
                            variant={user.profile.avatarData.variant}
                            name={user.profile.avatarData.name}
                            colors={user.profile.avatarData.colors}
                        />
                    </div>
                    <div className='flex flex-col gap-2 mt-40'>
                        <p className='text-white text-xs mt-2'>
                            Inscrit depuis
                        </p>
                        <p className='text-white text-xs'>
                            {user.createdAt}
                        </p>
                    </div>
                </div>
                <div className='bg-zinc-800 rounded px-5 py-5 min-h-[240px] border-gray-500'>
                    {user.name && (
                        <p className='ml-[170px] text-xs text-white font-light'>
                            Hello, mon nom est...
                        </p>
                    )}
                    <div className='ml-[170px] text-3xl text-white font-semibold'>
                        {user.name && user.name + " ! "}  
                    </div>
                    <div className='ml-[170px] text-white text-lg'>
                        {user.profile.bio}
                    </div>
                    {user.interests.length > 0 && (
                        <Fragment>
                            <hr className='ml-[170px] border-zinc-600 my-2'/>
                            <div className='flex flex-col gap-2 ml-[170px] mt-2'>
                                <p className='text-white text-sm font-semibold'>
                                    Mes préférences:
                                </p>
                                <div className='text-white text-sm flex flex-row flex-wrap gap-2'>
                                    {user.interests.map((interest, index) => (
                                        <div key={index} className="px-3 py-1 rounded-full text-sm bg-blue-600 text-white">
                                            {interest.name}
                                        </div>
                                    ))}
                                </div> 
                            </div>
                        </Fragment>
                    )}
                    {user.github || user.linkedin || user.instagram || user.x ? (
                        <Fragment>
                            <hr className='ml-[170px] border-zinc-600 my-2'/>
                            <div className='flex flex-row gap-4 flex-wrap ml-[170px] mt-2'>
                                {user.github && /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?github\.com\/[a-zA-Z0-9-_]+$/.test(user.github) && (
                                    <a href={user.github} target="_blank" className='text-white inline-flex rounded-lg py-1.5 px-1 hover:bg-gray-700 transition-all'>
                                        <GithubLogo size={24} />
                                        {user.github.split('/').pop()}
                                    </a>
                                )}
                                {user.linkedin && /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?linkedin\.com\/in\/[a-zA-Z0-9-_]+$/.test(user.linkedin) && (
                                    <a href={user.linkedin} target="_blank" className='text-white inline-flex rounded-lg py-1.5 px-1 hover:bg-gray-700 transition-all'>
                                        <LinkedinLogo size={24} />
                                        {user.linkedin.split('/').pop()}
                                    </a>
                                )}
                                {user.instagram && /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?instagram\.com\/[a-zA-Z0-9-_]+$/.test(user.instagram) && (
                                    <a href={user.instagram} target="_blank" className='text-white inline-flex rounded-lg py-1.5 px-1 hover:bg-gray-700 transition-all'>
                                        <InstagramLogo size={24} />
                                        {user.instagram.split('/').pop()}
                                    </a>
                                )}
                                {user.x && /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?(x|twitter)\.com\/[a-zA-Z0-9-_]+$/.test(user.x) && (
                                    <a href={user.x} target="_blank" className='text-white inline-flex rounded-lg py-1.5 px-1 hover:bg-gray-700 transition-all'>
                                        <XLogo  size={24} />
                                        {user.x.split('/').pop()}
                                    </a>
                                )}
                            </div>
                                </Fragment>
                            ) : null}
                </div>
            </div>
        )
    )

}

export default UserCard;