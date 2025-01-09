import useAuthStore from "../../../store/useAuthStore";

const UserInformation = () => {

    const { user } = useAuthStore();

    return (
        user && (
            <div className="flex flex-row justify-center items-center gap-2 mt-4 text-black horizontal-menu gap-10 py-10">
                <div className="flex flex-col items-center">
                    <img src={user?.avatarData} alt="avatar" className="w-52 h-52 rounded-full" />
                    <p className="text-lg font-semibold">{user?.username}</p>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold">Identifiant</label>
                        <p className="text-lg">@{user.uniqueuser}</p>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold">Nom</label>
                        <p className="text-lg">{user?.name}</p>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold">Description</label>
                        <p className="text-lg">{user?.bio}</p>
                    </div>
                </div>
            </div>
        )
    )
}

export default UserInformation;