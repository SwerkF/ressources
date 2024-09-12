import Avatar from "boring-avatars";
import { useEffect, useState } from "react";
import { AvatarProps } from "boring-avatars";

const RandomAvatar = ({refresh, setUserAvatar, currentColors, setCurrentColors} : {refresh: boolean, setUserAvatar: any, currentColors: string[], setCurrentColors: any} ) => {

    const [avatar, setAvatar] = useState<any>({
        name: "XXXXXXX",
        variant: "beam",
        colors: ["#C271B4", "#C20D90"],
    });

    useEffect(() => {
        // Generate a random name and colors
        let name = Math.random().toString(36).substring(7);
        let colors = Array.from({ length: 2 }, () => {
            return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        }).filter(color => color !== '#000000' && color !== '#ffffff');

        setCurrentColors(colors);

        setAvatar({
            name,
            variant: "beam",
            colors
        });
        setUserAvatar(avatar);

    }, [refresh]);

    useEffect(() => {
        setAvatar({
            name: avatar.name,
            variant: "beam",
            colors: currentColors
        });
        setUserAvatar(avatar);
    }, [currentColors]);

    return (
        <Avatar name={avatar.name} size={'150px'} variant={avatar.variant} colors={avatar.colors} />
    );
}

export default RandomAvatar;