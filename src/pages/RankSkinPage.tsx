import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Text, Button} from "../components/shared";
import {Ratings} from "../components/rankSkin/Ratings.tsx";

type Skin = {
    id: string;
    name: string;
    rarity: string;
}

type Ratings = {
    Concept?: number;
    Model?: number;
    Recall?: number;
    "SVX/FVX"?: number;
    Splash?: number;
}

type RatedSkin = {
    id: number;
    skinId: string;
    name: string;
    ratings: Ratings;
}

type ChampionData = {
    name: string;
    skins: Skin[];
}

export const RankSkinPage = () => {
    const [ratedSkins, setRatedSkins] = useState<RatedSkin[]>([]);
    const [currentId, setCurrentId] = useState<number>(1);
    const [maxId, setMaxId] = useState<number>(1);

    const [currentRatings, setCurrentRatings] = useState<Ratings>({});
    const {championKey, skinId} = useParams();


    useEffect(() => {
        fetch(`https://cdn.communitydragon.org/latest/champion/${championKey}/data`)
            .then(res => res.json()
                .then((data:ChampionData) => {
                    if(skinId === "all"){
                        const ratedSkins : RatedSkin[] = data.skins.map((skin,id)=>({
                                id: id,
                                skinId: skin.id,
                                name: skin.name,
                                ratings: {},
                        }));
                        setRatedSkins(ratedSkins);
                        setMaxId(ratedSkins.length);
                    }else if(skinId === "epic"){
                        const ratedSkins: RatedSkin[] = data.skins
                            .filter(skin => skin.rarity !== "kNoRarity")
                            .map((skin, id) => ({
                                id,
                                skinId: skin.id,
                                name: skin.name,
                                ratings: {},
                            }));
                        setRatedSkins(ratedSkins);
                        setMaxId(ratedSkins.length);
                    }else{
                        const ratedSkins: RatedSkin[] = data.skins
                            .filter(skin => skin.id == skinId)
                            .map((skin, id) => ({
                                id,
                                skinId: skin.id,
                                name: skin.name,
                                ratings: {},
                            }));
                        setRatedSkins(ratedSkins);
                        setMaxId(1);
                    }
                }))
    },[championKey])

    const handleClick = () => {
        if(currentRatings.Concept && currentRatings.Model && currentRatings.Recall && currentRatings.Splash && currentRatings["SVX/FVX"]){
            setRatedSkins((prevState) => {
                const updatedSkins = [...prevState];
                console.log(updatedSkins);
                updatedSkins[currentId - 1] = {
                    ...updatedSkins[currentId - 1],
                    ratings: currentRatings,
                };
                return updatedSkins;
            });
            setCurrentId(prevState => prevState + 1);
            setCurrentRatings({});
            if(currentId === maxId){
                console.log(ratedSkins)
                alert("Finished");
            }
        }
    }


    return <div className={'w-full'}>
        {!ratedSkins[0] ? <Text>Loading...</Text> :
            <>
                <div className={'flex justify-between w-full'}>
                    <Text variant={'h1'}>{ratedSkins[currentId-1].name}</Text>
                    <Text className={maxId === 1 ? "hidden" : ""} variant={'h1'} >{currentId}/{maxId}</Text>
                </div>

                <div className={'flex items-center justify-between gap-16'}>
                    <Ratings value={currentRatings} onChange={setCurrentRatings} />
                    <div className="hidden lg:flex flex-1 items-stretch">
                        <img className={'object-contain rounded-xl'} src={`https://cdn.communitydragon.org/latest/champion/${String(ratedSkins[currentId-1].skinId).slice(0, -3)}/splash-art/skin/${String(ratedSkins[currentId-1].skinId).slice(-3)}`} alt=""/>
                    </div>
                </div>

                <Button onClick={handleClick}> {currentId === maxId ? "Finish" : "Next"} </Button>
            </>
        }
    </div>
}