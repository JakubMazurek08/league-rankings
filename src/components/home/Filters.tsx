import  { useState, useEffect, useCallback } from "react";

import TopIcon from '../../assets/lanes/top.svg?react';
import JungleIcon from '../../assets/lanes/jungle.svg?react';
import MiddleIcon from '../../assets/lanes/middle.svg?react';
import BottomIcon from '../../assets/lanes/bottom.svg?react';
import SupportIcon from '../../assets/lanes/support.svg?react';
import * as React from "react";

type Role = "TOP" | "JUNGLE" | "MIDDLE" | "BOTTOM" | "SUPPORT";

type FiltersProps = {
    filters: ("TOP"|"JUNGLE"|"MIDDLE"|"BOTTOM"|"SUPPORT")[];
    setFilters: React.Dispatch<React.SetStateAction<Role[]>>;
};

const ICONS: { id: Role; Icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
    { id: "TOP", Icon: TopIcon },
    { id: "JUNGLE", Icon: JungleIcon },
    { id: "MIDDLE", Icon: MiddleIcon },
    { id: "BOTTOM", Icon: BottomIcon },
    { id: "SUPPORT", Icon: SupportIcon },
];

export const Filters = ({ filters, setFilters }: FiltersProps) => {
    const [localFilters, setLocalFilters] = useState<("TOP"|"JUNGLE"|"MIDDLE"|"BOTTOM"|"SUPPORT")[]>(filters);

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setFilters(localFilters);
        }, 100);
        return () => clearTimeout(handler);
    }, [localFilters, setFilters]);

    const toggleFilter = useCallback(
        (id: Role) => {
            setLocalFilters((current) =>
                current.includes(id) ? current.filter((f) => f !== id) : [...current, id]
            );
        },
        []
    );

    return (
        <div className="flex gap-4">
            {ICONS.map(({ id, Icon }) => {
                const isActive = localFilters.includes(id);
                return (
                    <button
                        key={id}
                        type="button"
                        onClick={() => toggleFilter(id)}
                        aria-pressed={isActive}
                        className="w-10 h-10"
                    >
                        <Icon
                            className={`${isActive ? "fill-accent-500" : "fill-gray-500"} cursor-pointer`}
                        />
                    </button>
                );
            })}
        </div>
    );
};
