import {Link} from "react-router-dom";

type ChampionIconProps = {
    id: number,
    name: string,
    championKey: string,
}

export const ChampionIcon = ({id, name, championKey}: ChampionIconProps) => {
    if (name==="none"){
        return <div className={'flex flex-col items-center gap-2'}>
            <img className={'size-32'} src={"/images/generic.png"} alt={"generic"}/>
            <small className={'text-gray-500 font-spiegel text-[16px]'}>{name}</small>
        </div>
    }
    return <Link to={`/${championKey}`} className={'flex flex-col items-center gap-2'}>
        <img  src={`https://cdn.communitydragon.org/latest/champion/${id}/square`} alt={name}/>
        <small className={'text-gray-500 font-spiegel text-[16px]'}>{name}</small>
    </Link>
}