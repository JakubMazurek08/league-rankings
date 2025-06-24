import type {RatedSkin} from "../../types";
import {Text} from "../shared";
import {StarRatingDisplay} from "../shared/StarRatingDisplay.tsx";

type SingleSkinDisplayProps = {
    skin: RatedSkin;
}

const mapScoreToGradeAndColor = (score:number) => {
    if (score < 0 || score > 100) {
        throw new Error("Score must be between 0 and 100");
    }

    let grade = '';
    let color = '';

    if (score <= 50) {
        grade = 'C';
        color = '#D90000';
    } else if (score <= 75) {
        grade = 'B';
        color = '#FF7F51';
    } else if (score <= 90) {
        grade = 'A';
        color = '#95FC46';
    } else {
        grade = 'S';
        color = '#FCC246';
    }

    return { grade, color };
}

export const SingleSkinDisplay = ({ skin }: SingleSkinDisplayProps) => {
        const ratingSum = Object.values(skin.ratings).reduce((sum, val) => sum + val, 0);
        const ratingPercent = ratingSum / 50 * 100;
        const {grade, color} = mapScoreToGradeAndColor(ratingPercent);

        return (
        <div className="relative">
            <img
                src={`https://cdn.communitydragon.org/latest/champion/${String(skin.id).slice(0, -3)}/splash-art/skin/${String(skin.id).slice(-3)}`}
                alt="Splash Art"
                className="rounded-lg w-full h-auto block"
            />

            <div className="absolute bottom-4 left-10 rounded-xl bg-black/50 flex flex-col p-4">
                <Text className="text-true-white font-bold">{skin.name}</Text>

                <div className="flex items-center gap-4">
                    <div>
                        {Object.entries(skin.ratings).map(([category, rating]) => (
                            <div key={category} className="flex items-center">
                                <Text className={'w-24 text-true-white'}>{category}</Text>
                                <StarRatingDisplay value={rating} />
                            </div>
                        ))}
                    </div>

                    <h1
                        style={{color: color}}
                        className={`font-splash text-[140px] pr-10`}>{grade}</h1>
                </div>
                <small className={'font-spiegel text-true-white text-lg'}>League-Rankings.com</small>
            </div>
        </div>
    );
};
