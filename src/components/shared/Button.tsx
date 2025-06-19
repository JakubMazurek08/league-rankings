import type { FC, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

export const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
    return (
        <button
            className={clsx(
                "font-spiegel text-[1.5rem] font-medium text-gray-500",
                "bg-gray-800 border-2 border-gray-800 hover:border-accent-800 cursor-pointer",
                "rounded-md px-6 py-2 outline-none",
                "transition-all duration-150",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
