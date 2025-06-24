import {SingleSkinDisplay} from "./SingleSkinDisplay.tsx";
import type {RatedSkin} from "../../types";

type SkinDisplayerProps = {
    ratedSkins : RatedSkin[];
}

export const SkinDisplayer = ({ratedSkins}:SkinDisplayerProps) => {
    const skinAmount = ratedSkins.length;
    return (
        <div className="min-h-screen w-full flex flex-col justify-center">
            {skinAmount === 1 ? <SingleSkinDisplay skin={ratedSkins[0]} />
                : null
            }
        </div>
    );


}