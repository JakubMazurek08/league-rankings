export type Skin = {
    id: string;
    name: string;
    rarity?: string;
}

export type Ratings = {
    Concept: number;
    Model: number;
    Recall: number;
    "SVX/FVX": number;
    Splash: number;
}

export type RatedSkin = {
    id: string;
    isSkipped: boolean;
    queueId: number;
    name: string;
    ratings: Ratings;
}

export type ChampionData = {
    name: string;
    skins: Skin[];
}
