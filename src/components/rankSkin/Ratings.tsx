import { Star } from "lucide-react";
import { useState } from "react";
import { Text } from "../shared";

// const starColors = [
//     "#ff4c4c", "#ff6b4c", "#ff884c", "#ffa64c", "#ffc04c",
//     "#ffd84c", "#e4ff4c", "#a8ff4c", "#6cff4c", "#4cff76",
// ];

const starColors = [
    "#FC466B", "#FF5083", "#FF5BA3", "#FF64C1", "#FC6FE5",
    "#E678FE", "#A96AFF", "#8068FF", "#5C62FF", "#415EFA",
];

const categories = ["Model", "SVX/FVX", "Recall", "Splash", "Concept"];

type RatingsProps = {
    value: Record<string, number>;
    onChange: (ratings: Record<string, number>) => void;
};

export const Ratings = ({ value, onChange }: RatingsProps) => {
    const handleRatingChange = (category: string, newValue: number) => {
        onChange({ ...value, [category]: newValue });
    };

    return (
        <div className="shrink-0 space-y-6">
            {categories.map((label) => (
                <div key={label} className="flex flex-col gap-1">
                    <Text className="text-lg font-semibold">{label}</Text>
                    <StarRating
                        value={value[label]}
                        onChange={(val) => handleRatingChange(label, val)}
                    />
                </div>
            ))}
        </div>
    );
};



type StarRatingProps = {
    value: number;
    onChange: (value: number) => void;
};

export const StarRating = ({ value, onChange }: StarRatingProps) => {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <div className="flex gap-1">
            {[...Array(10)].map((_, index) => {
                const starValue = index + 1;
                const active = hovered !== null ? hovered >= starValue : value >= starValue;
                const color = starColors[index];

                return (
                    <button
                        key={index}
                        onClick={() => onChange(starValue)}
                        onMouseEnter={() => setHovered(starValue)}
                        onMouseLeave={() => setHovered(null)}
                        className="focus:outline-none"
                    >
                        <Star
                            className="size-10 transition-colors"
                            style={{
                                stroke: active ? color : "#999999",
                                fill: active ? color : "none",
                            }}
                        />
                    </button>
                );
            })}
        </div>
    );
};
