import {SkinRanker} from "../components/rankSkin/SkinRanker.tsx";
import {useState} from "react";
import {SkinDisplayer} from "../components/rankSkin/SkinDisplayer.tsx";
import type {RatedSkin} from "../types";


export const RankSkinPage = () => {
    const [ratedSkins, setRatedSkins] = useState<RatedSkin[]>([]);

    if(ratedSkins[0]){
        return <SkinDisplayer ratedSkins={ratedSkins}/>
    }else{
        return <SkinRanker setRatedSkin={setRatedSkins}/>
    }
}