import { Star } from "lucide-react";
import {type Dispatch, type SetStateAction, useState} from "react";
import { Text } from "../shared";
import type {Ratings} from "../../types";

// const starColors = [
//     "#ff4c4c", "#ff6b4c", "#ff884c", "#ffa64c", "#ffc04c",
//     "#ffd84c", "#e4ff4c", "#a8ff4c", "#6cff4c", "#4cff76",
// ];

const starColors = [
    "#FC466B", "#FF5083", "#FF5BA3", "#FF64C1", "#FC6FE5",
    "#E678FE", "#A96AFF", "#8068FF", "#5C62FF", "#415EFA",
];

const categories: (keyof Ratings)[] = ["Model", "SVX/FVX", "Recall", "Splash", "Concept"];

type RatingsProps = {
    value: Ratings;
    onChange: Dispatch<SetStateAction<Ratings>>;
    showErrors?: boolean;
};

export const StarRatings = ({ value, onChange, showErrors }: RatingsProps) => {
    const handleRatingChange = (category: keyof Ratings, newValue: number) => {
        onChange({
            ...value,
            [category]: newValue,
        });
    };

    return (
        <div className="shrink-0 space-y-6">
            {categories.map((label) => {
                const isInvalid = showErrors && !value[label];
                return (
                    <div key={label} className={"flex flex-col gap-1"}>
                        <Text className="text-lg font-semibold">
                            {label}
                            {isInvalid && <span style={{ color: "#ef4444" }} className="ml-1">*</span>}
                        </Text>

                        <StarRating
                            value={value[label]}
                            onChange={(val) => handleRatingChange(label, val)}
                            showError={isInvalid}
                        />
                    </div>
                );
            })}
        </div>
    );
};




type StarRatingProps = {
    value: number;
    onChange: (value: number) => void;
    showError?: boolean;
};

const StarRating = ({ value, onChange, showError }: StarRatingProps) => {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <div className="flex gap-1 p-1 rounded-md transition-all">
            {[...Array(10)].map((_, index) => {
                const starValue = index + 1;
                const active = hovered !== null ? hovered >= starValue : value >= starValue;
                const color = starColors[index];
                const strokeColor = active
                    ? color
                    : showError
                        ? "#ef4444"
                        : "#999999";

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
                                strokeWidth: 0.5,
                                stroke: strokeColor,
                                fill: active ? color : "none",
                            }}
                        />
                    </button>
                );
            })}
        </div>
    );
};

