import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  filled?: boolean;
  color?: "primary" | "secondary" | "danger" | "success" | "black" | "white";
  loading?: boolean;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  filled = true,
  color = "black",
  loading = false,
  className = "",
  disabled = false,
}) => {
  const baseClasses =
    "flex items-center justify-center w-full gap-2 rounded-md py-3 px-4 text-sm sm:text-base transition duration-300 ease-in-out shadow-md";
  const filledClasses = filled ? "text-white" : "text-black border";
  const colorClasses = {
    primary: filled
      ? "bg-blue-500 hover:bg-blue-600"
      : "border-blue-500 hover:border-blue-600",
    secondary: filled
      ? "bg-gray-500 hover:bg-gray-600"
      : "border-gray-500 hover:border-gray-600",
    danger: filled
      ? "bg-red-500 hover:bg-red-600"
      : "border-red-500 hover:border-red-600",
    success: filled
      ? "bg-green-500 hover:bg-green-600"
      : "border-green-500 hover:border-green-600",
    black: filled
      ? "bg-black hover:bg-white hover:text-black"
      : "border-black hover:border-white hover:text-black",
    white: filled
      ? "bg-white hover:bg-black hover:text-white"
      : "border-white hover:border-black hover:text-white",
  };
  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${filledClasses} ${
        colorClasses[color]
      } ${className} ${loading || disabled ? disabledClasses : ""}`}
      disabled={loading || disabled}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
