import type {FC, HTMLAttributes, ReactNode} from "react";
import clsx from "clsx";

type TextVariant =
    | "h1"
    | "p"

interface TextProps extends HTMLAttributes<HTMLElement> {
    variant?: TextVariant;
    children: ReactNode;
    className?: string;
}

const variantClasses: Record<TextVariant, string> = {
    h1: "text-[3rem] md:text-[3.5rem] lg:text-[4rem] font-bold text-white",
    p: "text-[1.5rem] text-gray-500",
};


export const Text: FC<TextProps> = ({
                                        variant = "p",
                                        children,
                                        className,
                                        ...props
                                    }) => {return (
    <p
        className={clsx(
            "font-spiegel leading-snug tracking-tight",
            variantClasses[variant],
            className
        )}
        {...props}
    >
        {children}
    </p>
);
};
