import { Fragment, useState } from "react"
import useAuthStore from "../../store/useAuthStore";
import UserInformation from "./components/UserInformation";

const Profile = () => {

    const { user } = useAuthStore();

    const [menu, setMenu] = useState('info');

    const handleSwitchMenu = (menu: string) => {
        setMenu(menu);
    }

    return (
        <Fragment>
            <div className="flex flex-col items-center h-screen  mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
                <div className="flex flex-col px-6 py-10 mt-4 bg-white rounded-lg w-full">
                    <div className="card-header">
                        <h1 className="text-4xl font-bold">Profile</h1>
                        <p className="text-lg font-semibold">Bienvenue sur votre profile</p>
                        <div className="flex flex-row justify-center items-center gap-5 mt-4 text-black horizontal-menu gap-10">
                            <a onClick={() => { handleSwitchMenu('info') }} className={`text-lg cursor-pointer ${menu === "info" ? "font-bold underline" : "font-semibold"}`}>Informations</a>
                            <a onClick={() => { handleSwitchMenu('ressources') }} className={`text-lg cursor-pointer ${menu === "ressources" ? "font-bold underline" : "font-semibold"}`}>Ressources</a>
                            <a onClick={() => { handleSwitchMenu('likes') }} className={`text-lg cursor-pointer ${menu === "likes" ? "font-bold underline" : "font-semibold"}`}>Likes</a>
                        </div>
                        <hr className="mt-4" />
                    </div>
                    <div className="card-body">
                        {menu === "info" ? (
                            <UserInformation />
                        ) : menu === "ressources" ? (
                            <Fragment></Fragment>
                        ) : menu === "likes" ? (
                            <Fragment></Fragment>
                        ) : (
                            <Fragment></Fragment>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Profile