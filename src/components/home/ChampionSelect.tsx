import {Text, Input} from "../shared";
import {useEffect, useState, useMemo} from "react";
import {Filters} from "./Filters.tsx";
import {ChampionIcon} from "./ChampionIcon.tsx";

type Role = "TOP" | "JUNGLE" | "MIDDLE" | "BOTTOM" | "SUPPORT";

type Champion = {
    id: number;
    name: string,
    key: string,
}

type ChampionRoles = {
    TOP: {
        [key: number]: number;
    }
    JUNGLE: {
        [key: number]: number;
    }
    MIDDLE: {
        [key: number]: number;
    }
    BOTTOM: {
        [key: number]: number;
    }
    SUPPORT: {
        [key: number]: number;
    }
}

export const ChampionSelect = () => {
    const [champions, setChampions] = useState<Champion[]|undefined>(undefined);
    const [championRoles, setChampionRoles] = useState<ChampionRoles|undefined>(undefined);
    const [filters, setFilters] = useState<Role[]>([])
    const [search, setSearch] = useState<string>("")

    useEffect(() => {
        fetch('https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champion-statistics/global/default/rcp-fe-lol-champion-statistics.js')
            .then(res => res.text())
            .then(text => {
                const match = text.match(/JSON\.parse\('([^']+)'\)/);
                if (match) {
                    const jsonString = match[1];
                    const data = JSON.parse(jsonString);
                    setChampionRoles(data);
                } else {
                    console.error('No JSON found.');
                }
            });
        fetch('https://cdn.communitydragon.org/latest/champions')
            .then(res => res.json().then(data => {
                const sortedData = data.sort((a:Champion, b:Champion) => a.name.localeCompare(b.name));
                setChampions(sortedData);
            }))
}, []);

    const filteredChampions = useMemo(() => {
        if(!champions || !championRoles){
            return undefined;
        }
        return champions.filter(champ => {
            const matchesSearch = champ.name.toLowerCase().includes(search.toLowerCase());
            const matchesRole = filters.length === 0 || filters.some(role => championRoles[role][champ.id]);
            const isNotNone = champ.name !== "None";
            return matchesSearch && matchesRole && isNotNone;
        });
    }, [champions, championRoles, search, filters]);

    return <div>
        <Text variant="h1">Select Champion</Text>
        <div>
            <div className={'flex justify-between'}>
                <Filters filters={filters} setFilters={setFilters}/>
                <Input onChange={(e) => setSearch(e.currentTarget.value)}
                placeholder="Search..."/>
            </div>

            <div className={'flex flex-wrap gap-16 mt-8 min-h-[50vh] justify-center'}>
                {
                    !filteredChampions?
                        Array.from({ length: 20 }, (_, i) => (
                            <ChampionIcon championKey={'none'} name="none" id={i} />
                        ))
                        :
                    filteredChampions.map((champion) => (
                        <ChampionIcon championKey={champion.key} name={champion.name} id={champion.id}/>
                    ))
                }
            </div>
        </div>
    </div>
}




