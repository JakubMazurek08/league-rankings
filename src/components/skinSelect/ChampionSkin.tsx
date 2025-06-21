import {Link} from "react-router-dom";
import {Text} from "../shared";

type ChampionSkinProps = {
    name: string;
    id: number;
}

export const ChampionSkin = ({name, id} : ChampionSkinProps) => {
    return <Link className={'flex flex-col items-center gap-4'} to={`${id}`}>
        <img src={`https://cdn.communitydragon.org/latest/champion/${String(id).slice(0, -3)}/portrait/skin/${String(id).slice(-3)}`} alt=""/>
        <Text>{name}</Text>
    </Link>
}