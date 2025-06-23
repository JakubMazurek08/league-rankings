import type { FC, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: "default" | "ghost";
}

export const Button: FC<ButtonProps> = ({
                                            className,
                                            children,
                                            variant = "default",
                                            ...props
                                        }) => {
    return (
        <button
            className={clsx(
                "font-spiegel text-[1.5rem] font-medium cursor-pointer rounded-md px-6 py-2 outline-none transition-all duration-150 min-w-60",
                variant === "default" &&
                "text-gray-500 bg-gray-800 border-2 border-gray-800 hover:border-accent-800",
                variant === "ghost" &&
                "text-gray-500 bg-transparent border-none hover:text-accent-500",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
