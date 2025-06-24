import {Text, Button} from "../components/shared";
import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {ChampionSkin} from "../components/skinSelect/ChampionSkin.tsx";
import type {ChampionData, Skin} from "../types";

export const SkinSelectPage = () => {
    const {championKey} = useParams();
    const [championData, setChampionData] = useState<ChampionData|undefined>()
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://cdn.communitydragon.org/latest/champion/${championKey}/data`)
            .then(res => res.json()
            .then((data) => {
                setChampionData(data)
            }))
    }, []);

    return <>
        <img className={'w-screen fixed -z-10 top-0 left-0 hidden lg:block opacity-10'}
             src={`https://cdn.communitydragon.org/latest/champion/${championKey}/splash-art/centered`} alt=""/>
        {
            championData ?
                <div>
                    <Text className={'text-center my-[15vh]'} variant={'h1'}>Rank {championData.name} Skins</Text>
                    <div className={'flex flex-wrap justify-center gap-10 mb-10'}>
                        <Button onClick={()=>{navigate("all")}}>Rank All Skins</Button>
                        <Button onClick={()=>{navigate("epic")}}>Rank All Epic+ Skins</Button>
                    </div>
                    <div className={'flex flex-wrap justify-center gap-10'}>
                        {championData.skins.map((skin: Skin) => (
                                <ChampionSkin name={skin.name} id={skin.id} key={skin.id}/>
                        ))}
                    </div>
                </div>
                : null
        }
    </>
}