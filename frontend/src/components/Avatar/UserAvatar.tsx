import Avatar from "boring-avatars";

const UserAvatar = ({name, colors, size, variant} : {name: string, colors: string[], size: string, variant: any} ) => {
    return (
        <Avatar name={name} size={size} variant={variant} colors={colors} />
    );
}

export default UserAvatar;