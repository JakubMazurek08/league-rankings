import { SingleSkinDisplay } from "./SingleSkinDisplay.tsx";
import type { RatedSkin } from "../../types";
import DownloadIcon from "../../assets/icons/download.svg?react";
import { useCallback, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { useParams } from 'react-router-dom';

type SkinDisplayerProps = {
    ratedSkins: RatedSkin[];
}

export const SkinDisplayer = ({ ratedSkins }: SkinDisplayerProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const skinAmount = ratedSkins.length;
    const { championKey } = useParams();

    const [loading, setLoading] = useState(false);

    const onDownload = useCallback(() => {
        if (!ref.current || loading) {
            return;
        }

        setLoading(true);

        document.fonts.ready.then(() => {
            toPng(ref.current!, { cacheBust: true, skipFonts: true })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    if (skinAmount === 1) {
                        link.download = `${ratedSkins[0].name.replace(/ /g, '-')}-rating.png`;
                    } else {
                        link.download = `${championKey}-ratings.png`;
                    }
                    link.href = dataUrl;
                    link.click();
                    console.log("Download triggered");
                })
                .catch((err) => {
                    console.error("Error during PNG export:", err);
                })
                .finally(() => {
                    setLoading(false);
                });
        });
    }, [loading, ratedSkins, skinAmount, championKey]);

    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center gap-4">
            {skinAmount === 1 ? <div ref={ref}><SingleSkinDisplay skin={ratedSkins[0]} /></div> : null}

            <button
                onClick={onDownload}
                disabled={loading}
                aria-busy={loading}
                className={`size-16 cursor-pointer fill-white flex items-center justify-center rounded ${
                    loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'
                }`}
                title={loading ? "Downloading..." : "Download image"}
            >
                <DownloadIcon
                    className={`size-16 fill-white transition-transform ${
                        loading ? 'animate-spin' : ''
                    }`}
                />
            </button>
        </div>
    );
}
