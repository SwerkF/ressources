import { Ressource } from "../../types/Ressource";
import Badge from "../Badge/Badge";
import CategoryBadge from "../Badge/CategoryBadge";
import Button from "../Button/Button";

const RessourceCard = ({ ressource, onClick }:  { ressource: Ressource, onClick: (ressource: Ressource) => void }) => {

    const handleDateCalc = (date: string) => {

        const currentDate = new Date();
        const createdAt = new Date(date);
        const diff = currentDate.getTime() - createdAt.getTime();
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(weeks / 4);
        const years = Math.floor(months / 12);

        if (years > 0) {
            return `${years} years ago`;
        } else if (months > 0) {
            return `${months} months ago`;
        } else if (weeks > 0) {
            return `${weeks} weeks ago`;
        } else if (days > 0) {
            return `${days} days ago`;
        } else if (hours > 0) {
            return `${hours} hours ago`;
        } else if (minutes > 0) {
            return `${minutes} minutes ago`;
        } else {
            return `${seconds} seconds ago`;
        }
    }

    return (
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <img className="w-auto min-h-60 object-cover rounded-t-xl" src={ressource.image} alt={ressource.title} />
            <div className="p-4 md:p-5">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    {ressource.title}
                </h3>
                <div className="flex flex-wrap gap-2 mt-1">
                    {ressource.categories.map((category, index) => (
                        (index < 3) ? (
                            <CategoryBadge key={index} category={category} />
                        ) : (
                            (index == 3) ? (
                                <Badge key={index} color="secondary" text={`+${ressource.categories.length - 3}`} />
                            ) : (
                                null
                            )
                        )
                    ))}
                </div>
                <div className="mt-4">
                    <Button onClick={() => { onClick(ressource) }} className="mt-3" color="primary" size="sm" text="View ressource"></Button>
                </div>
                <p className="mt-5 text-xs text-gray-500 dark:text-neutral-500">
                    Published {handleDateCalc(ressource.createdAt)}
                </p>
            </div>
        </div>
    );
}

export default RessourceCard;