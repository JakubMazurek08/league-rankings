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
    isSkipped: boolean;
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
    const [showErrors, setShowErrors] = useState(false);

    const [currentRatings, setCurrentRatings] = useState<Ratings>({});
    const {championKey, skinId} = useParams();


    useEffect(() => {
        fetch(`https://cdn.communitydragon.org/latest/champion/${championKey}/data`)
            .then(res => res.json()
                .then((data:ChampionData) => {
                    if(skinId === "all"){
                        const ratedSkins : RatedSkin[] = data.skins.map((skin,id)=>({
                                id: id,
                                isSkipped: false,
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
                                isSkipped: false,
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
                                isSkipped: false,
                                skinId: skin.id,
                                name: skin.name,
                                ratings: {},
                            }));
                        setRatedSkins(ratedSkins);
                        setMaxId(1);
                    }
                }))
    },[championKey])

    const finishRating = () => {
        console.log(ratedSkins)
        alert("Finished");
    }

    const handleNext = () => {
        const allRated: boolean = Boolean(
            currentRatings.Concept &&
            currentRatings.Model &&
            currentRatings.Recall &&
            currentRatings.Splash &&
            currentRatings["SVX/FVX"]
        );

        if (allRated) {
            setShowErrors(false);

            setRatedSkins((prevState) => {
                const updatedSkins = [...prevState];
                updatedSkins[currentId - 1] = {
                    ...updatedSkins[currentId - 1],
                    ratings: currentRatings,
                };

                const next = updatedSkins[currentId];
                if (next) {
                    setCurrentRatings(next.ratings);
                }

                return updatedSkins;
            });

            console.log(currentId === maxId);

            if (currentId === maxId) {
                finishRating();
                return;
            }

            setCurrentId((prev) => prev + 1);

        } else {
            setShowErrors(true);
        }
    };



    const handlePrevious = () => {
        setCurrentRatings(ratedSkins[currentId-2].ratings);
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
        setCurrentRatings({});
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
                    <Ratings
                        value={currentRatings}
                        onChange={setCurrentRatings}
                        showErrors={showErrors}
                    />
                    <div className="hidden lg:flex flex-1 items-stretch">
                        <img className={'object-contain rounded-xl'} src={`https://cdn.communitydragon.org/latest/champion/${String(ratedSkins[currentId-1].skinId).slice(0, -3)}/splash-art/skin/${String(ratedSkins[currentId-1].skinId).slice(-3)}`} alt=""/>
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