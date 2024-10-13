import {
  AppWindow,
  Blocks,
  Brain,
  Code,
  Component,
  Database,
  Figma,
  Frame,
  Gamepad,
  LayoutTemplate,
  Newspaper,
  Server,
  Youtube,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function CategoryBadge({
  category,
  className,
}: {
  category: string;
  className?: string;
}) {
  const [color, setColor] = useState<string>("gray");
  const [icon, setIcon] = useState<JSX.Element>(<div></div>);

  useEffect(() => {
    switch (category) {
      case "Web":
        setColor("blue");
        setIcon(<Code />);
        break;
      case "App":
        setColor("green");
        setIcon(<AppWindow />);
        break;
      case "Jeux":
        setColor("yellow");
        setIcon(<Gamepad />);
        break;
      case "Data":
        setColor("purple");
        setIcon(<Database />);
        break;
      case "Design":
        setColor("pink");
        setIcon(<Figma />);
        break;
      case "IA":
        setColor("red");
        setIcon(<Brain />);
        break;
      case "Extension":
        setColor("indigo");
        setIcon(<Blocks />);
        break;
      case "Vidéo":
        setColor("orange");
        setIcon(<Youtube />);
        break;
      case "Article":
        setColor("gray");
        setIcon(<Newspaper />);
        break;
      case "Frontend":
        setColor("blue");
        setIcon(<LayoutTemplate />);
        break;
      case "Backend":
        setColor("green");
        setIcon(<Server />);
        break;
      default:
        setColor("gray");
        setIcon(<Component />);
    }
  }, []);

  return (
    <div
      className={`rounded-sm p-2 text-sm font-semibold uppercase text-${color}-500 bg-${color}-100 ${className}`}
    >
      {icon}
      <span className="ml-2">{category}</span>
    </div>
  );
}
