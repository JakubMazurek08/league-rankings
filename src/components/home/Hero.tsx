import { Text } from "../shared";

export const Hero = () => {
    return (
        <div className="min-h-screen gap-10 flex items-center justify-between translate-y-[-60px]">
            <div className="min-w-1/2 flex-1">
                <Text variant="h1">Build Your League Of Legends Skin Tier List<span className={'text-accent-500'}>.</span></Text>
                <Text variant="p">
                    Rank every skin for your chosen champion and generate a clean visual chart. Keep it for yourself or share it with friends.
                </Text>
            </div>
            <div className="hidden lg:flex flex-1 items-stretch">
                <img src="/images/hero.png" alt="Hero Image" className=" object-contain" />
            </div>
        </div>
    );
};
