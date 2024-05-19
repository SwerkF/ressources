import { Category } from "../../types/Category";
import Badge from "./Badge";

const CategoryBadge = ({ category }: { category: Category }) => {

    switch (category.name) {
        case 'Design':
            return <Badge color="primary" text={category.name} />;
        
        case 'Code':
            return <Badge color="warning" text={category.name} />;
        
        case 'Video':
            return <Badge color="success" text={category.name} />;
        
        case 'Tutoriel':
            return <Badge color="danger" text={category.name} />;
        
        default:
            return <Badge color="secondary" text={category.name} />;
    }
}

export default CategoryBadge;