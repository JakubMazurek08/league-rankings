import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Text, Button} from "../shared";
import type {ChampionData, RatedSkin, Ratings} from "../../types";
import {StarRatings} from "./StarRatings.tsx";

type SkinRankerProps = {
    setRatedSkin: React.Dispatch<React.SetStateAction<RatedSkin[]>>;
}

const defaultRatings: Ratings = {
    Concept: 0,
    Model: 0,
    Recall: 0,
    "SVX/FVX": 0,
    Splash: 0,
};

export const SkinRanker = ({setRatedSkin}:SkinRankerProps) => {
    const [ratedSkins, setRatedSkins] = useState<RatedSkin[]>([]);
    const [currentId, setCurrentId] = useState<number>(1);
    const [maxId, setMaxId] = useState<number>(1);
    const [showErrors, setShowErrors] = useState(false);

    const [currentRatings, setCurrentRatings] = useState<Ratings>(defaultRatings);
    const {championKey, skinId} = useParams();

    useEffect(() => {
        console.log(ratedSkins);
    }, [ratedSkins]);

    useEffect(() => {
        fetch(`https://cdn.communitydragon.org/latest/champion/${championKey}/data`)
            .then(res => res.json()
                .then((data:ChampionData) => {
                    if(skinId === "all"){
                        const ratedSkins : RatedSkin[] = data.skins.map((skin,id)=>({
                            queueId: id,
                            isSkipped: false,
                            id: skin.id,
                            name: skin.name,
                            ratings: defaultRatings,
                        }));
                        setRatedSkins(ratedSkins);
                        setMaxId(ratedSkins.length);
                    }else if(skinId === "epic"){
                        const ratedSkins: RatedSkin[] = data.skins
                            .filter(skin => skin.rarity !== "kNoRarity")
                            .map((skin, id) => ({
                                queueId: id,
                                isSkipped: false,
                                id: skin.id,
                                name: skin.name,
                                ratings: defaultRatings,
                            }));
                        setRatedSkins(ratedSkins);
                        setMaxId(ratedSkins.length);
                    }else{
                        const ratedSkins: RatedSkin[] = data.skins
                            .filter(skin => skin.id == skinId)
                            .map((skin, id) => ({
                                queueId: id,
                                isSkipped: false,
                                id: skin.id,
                                name: skin.name,
                                ratings: defaultRatings,
                            }));
                        setRatedSkins(ratedSkins);
                        setMaxId(1);
                    }
                }))
    },[championKey, skinId])

    const finishRating = () => {
        console.log(ratedSkins)
        setRatedSkin(ratedSkins.filter(skin=>!skin.isSkipped));
    }

    const handleNext = () => {
        const allRated: boolean = Boolean(
            currentRatings.Concept &&
            currentRatings.Model &&
            currentRatings.Recall &&
            currentRatings.Splash &&
            currentRatings["SVX/FVX"]
        );

        if (!allRated) {
            setShowErrors(true);
            return;
        }

        setShowErrors(false);

        setRatedSkins((prevState) => {
            const updatedSkins = [...prevState];
            updatedSkins[currentId - 1] = {
                ...updatedSkins[currentId - 1],
                ratings: currentRatings,
            };

            if (currentId === maxId) {
                setRatedSkin(updatedSkins.filter(skin => !skin.isSkipped));
                return updatedSkins;
            }

            const next = updatedSkins[currentId];
            if (next) {
                setCurrentRatings(next.ratings ?? defaultRatings);
            }

            setCurrentId(prev => prev + 1);

            return updatedSkins;
        });

    };




    const handlePrevious = () => {
        setCurrentRatings(ratedSkins[currentId-2].ratings ?? defaultRatings);
        setCurrentId(currentId - 1);
    }


    const handleSkip = () => {
        setRatedSkins((prevState) => {
            const updatedSkins = [...prevState];
            updatedSkins[currentId - 1] = {
                ...updatedSkins[currentId - 1],
                isSkipped: true
            };
            return updatedSkins;
        });
        setCurrentId(prevState => prevState + 1);
        setCurrentRatings(defaultRatings);
        if(currentId === maxId){
            finishRating();
        }
    }


    return <div className={'w-full min-h-screen flex flex-col justify-center gap-4'}>
        {!ratedSkins[0] ? <Text>Loading...</Text> :
            <>
                <div className={'flex justify-between w-full'}>
                    <Text variant={'h1'}>{ratedSkins[currentId-1].name}</Text>
                    <Text className={maxId === 1 ? "hidden" : ""} variant={'h1'} >{currentId}/{maxId}</Text>
                </div>

                <div className={'flex items-center justify-between gap-16'}>
                    <StarRatings
                        value={currentRatings}
                        onChange={setCurrentRatings}
                        showErrors={showErrors}
                    />
                    <div className="hidden lg:flex flex-1 items-stretch">
                        <img className={'object-contain rounded-xl'} src={`https://cdn.communitydragon.org/latest/champion/${String(ratedSkins[currentId-1].id).slice(0, -3)}/splash-art/skin/${String(ratedSkins[currentId-1].id).slice(-3)}`} alt=""/>
                    </div>
                </div>

                <div className={'flex flex-wrap w-full justify-between'}>
                    <div className={'flex gap-2 flex-wrap'}>
                        <Button onClick={handleNext}> {currentId === maxId ? "Finish" : "Next"} </Button>
                        <Button onClick={handlePrevious} className={currentId === 1 ? "hidden" : "Next"}>Previous</Button>
                    </div>
                    <Button onClick={handleSkip} variant={"ghost"}>Skip</Button>
                </div>

            </>
        }
    </div>
}