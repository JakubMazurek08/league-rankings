import { Star } from "lucide-react";
import { Text } from "./Text.tsx";

type StarRatingDisplayProps = {
    value: number;
    isFolded?: boolean;
    isSmall?: boolean;
};

export const StarRatingDisplay = ({
                                      value,
                                      isFolded = false,
                                      isSmall = false,
                                  }: StarRatingDisplayProps) => {
    const starColors = [
        "#FC466B", "#FF5083", "#FF5BA3", "#FF64C1", "#FC6FE5",
        "#E678FE", "#A96AFF", "#8068FF", "#5C62FF", "#415EFA",
    ];

    const foldedStarColor = starColors[value - 1] || "#f59e0b";

    if (isFolded) {
        return (
            <Text className="flex items-center text-true-white gap-1 text-lg font-medium">
                {value}
                <Star
                    className="size-5"
                    style={{
                        strokeWidth: 0.5,
                        stroke: foldedStarColor,
                        fill: foldedStarColor,
                    }}
                />
            </Text>
        );
    }

    return (
        <div className={`flex ${isSmall ? "gap-[1px] min-w-40" : "gap-1 min-w-70"}`}>
            {[...Array(value)].map((_, index) => (
                <Star
                    key={index}
                    className={isSmall ? "size-4" : "size-6"}
                    style={{
                        strokeWidth: 0.5,
                        stroke: starColors[index],
                        fill: starColors[index],
                    }}
                />
            ))}
        </div>
    );
};
