import {Text} from "../shared";
import type {RatedSkin} from "../../types";
import {StarRatingDisplay} from "../shared/StarRatingDisplay.tsx";
import clsx from "clsx";

type RatedSkinProps = {
    skin: RatedSkin
    amount: number;
}

const mapScoreToGradeAndColor = (score:number) => {
    if (score < 0 || score > 100) {
        throw new Error("Score must be between 0 and 100");
    }

    if (score <= 50) {
        return 'C'
    } else if (score <= 75) {
        return 'B'
    } else if (score <= 90) {
        return 'A'
    } else {
        return 'S'
    }
}



export const RatedSkinDisplay = ({ skin, amount }: RatedSkinProps) => {
    const ratingSum = Object.values(skin.ratings).reduce((sum, val) => sum + val, 0);
    const ratingPercent = ratingSum / 50 * 100;
    const grade = mapScoreToGradeAndColor(ratingPercent);

    let sizeClass = "";
    let layoutClass = "";

    if (amount <= 2) {
        sizeClass = "w-1/2";
        layoutClass = "flex-col items-start justify-center";
    } else if (amount <= 4) {
        sizeClass = "w-1/2";
        layoutClass = "flex-row items-end";
    } else if (amount <= 6) {
        sizeClass = "w-1/3";
        layoutClass = "flex-row items-end";
    } else if (amount <= 8) {
        sizeClass = "w-1/2";
        layoutClass = "flex-row items-center";
    } else if (amount <= 12) {
        sizeClass = "w-1/3";
        layoutClass = "flex-row items-center";
    } else if (amount <= 16) {
        sizeClass = "w-1/4";
        layoutClass = "flex-row items-end";
    } else {
        sizeClass = "w-1/5";
        layoutClass = "flex-row items-center";
    }

    const containerClass = clsx("flex gap-2 p-6", layoutClass);

    // Ratings layout
    let ratingsLayoutClass = "";
    if (amount <= 2) {
        ratingsLayoutClass = "flex-row items-end";
    } else if (amount <= 6) {
        ratingsLayoutClass = "flex-col-reverse items-start";
    } else {
        ratingsLayoutClass = "flex-row items-center";
    }

    const ratingsContainerClass = clsx("flex gap-1 justify-between w-full", ratingsLayoutClass);

    const isSmall = amount > 2;
    const isFolded = amount > 8;
    const championId = String(skin.id).slice(0, -3);
    const skinCode = String(skin.id).slice(-3);

    let imageSrc: string;
    if (amount <= 2) {
        imageSrc = `https://cdn.communitydragon.org/latest/champion/${championId}/splash-art/skin/${skinCode}`;
    } else if (amount <= 4) {
        imageSrc = `https://cdn.communitydragon.org/latest/champion/${championId}/splash-art/centered/skin/${skinCode}`;
    } else if (amount <= 6) {
        imageSrc = `https://cdn.communitydragon.org/latest/champion/${championId}/portrait/skin/${skinCode}`;
    } else {
        imageSrc = `https://cdn.communitydragon.org/latest/champion/${championId}/square/skin/${skinCode}`;
    }

    const imageClass = clsx(
        "rounded-lg w-full",
        {
            "": amount <= 2,
            "aspect-[300/207]": amount > 2 && amount <= 4,
            "": amount > 4 && amount <= 6,
            "": amount > 6,
        }
    );

    const gradeClass = clsx(
        "size-30 mx-20 my-2",
        {
            "": amount <= 2,
            "aspect-[300/207]": amount > 2 && amount <= 4,
            "": amount > 4 && amount <= 6,
            "": amount > 6,
        }
    );
    return (
        <div className={`${sizeClass} flex flex-col justify-center`}>
            <Text className="text-true-white font-bold text-start">{skin.name}</Text>
            <div className={containerClass}>
                <div>
                    <img src={imageSrc} alt={`${skin.name} image`} className={imageClass} />
                </div>

                <div id="rating" className={ratingsContainerClass}>
                    <div>
                        {Object.entries(skin.ratings).map(([category, rating]) => (
                            <div key={category} className="flex items-center justify-between">
                                <p className={` text-true-white font-spiegel ${isSmall?'text-lg w-20': 'w-24'}`}>{category}</p>
                                <StarRatingDisplay value={rating} isFolded={isFolded} isSmall={isSmall}/>
                            </div>
                        ))}
                    </div>

                    <img
                        className={gradeClass}
                        src={`/ratings/${grade}.png`}
                        alt={`${grade} grade`}
                    />
                </div>
            </div>
        </div>
    );
};
