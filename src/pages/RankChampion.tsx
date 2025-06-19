import {Text, Button} from "../components/shared";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ChampionSkin} from "../components/rankChampion/ChampionSkin.tsx";

type Skin = {
    id: number;
    name: string;
}

type ChampionData = {
    name: string;
    skins: Skin[];
}

export const RankChampion = () => {
    const {championKey} = useParams();
    const [championData, setChampionData] = useState<ChampionData|undefined>()

    useEffect(() => {
        fetch(`https://cdn.communitydragon.org/latest/champion/${championKey}/data`)
            .then(res => res.json()
            .then((data) => {
                setChampionData(data)
            }))
    }, []);

    return <>
        <img className={'w-screen fixed -z-10 top-0 left-0 opacity-10'}
             src={`https://cdn.communitydragon.org/latest/champion/${championKey}/splash-art/centered`} alt=""/>
        {
            championData ?
                <div>
                    <Text className={'text-center my-[15vh]'} variant={'h1'}>Rank {championData.name} Skins</Text>
                    <div className={'flex justify-center gap-10 mb-10'}>
                        <Button>Rank All Skins</Button>
                        <Button>Rank All Epic+ Skins</Button>
                    </div>
                    <div className={'flex flex-wrap justify-center gap-10'}>
                        {championData.skins.map((skin: Skin) => (
                            <ChampionSkin name={skin.name} id={skin.id} key={skin.id} />
                        ))}
                    </div>
                </div>
                : null
        }
    </>
}