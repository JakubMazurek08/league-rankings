import type { FC, InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export const Input: FC<InputProps> = ({ className, ...props }) => {
    return (
        <input
            className={clsx(
                "font-spiegel text-[1.5rem] font-normal text-gray-500",
                "bg-gray-800 rounded-md px-4 py-2 outline-none",
                "focus:border-accent-800 focus:ring-2 focus:ring-accent-800 transition-all duration-150",
                className
            )}
            {...props}
        />
    );
};
