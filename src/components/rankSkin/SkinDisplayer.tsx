import { SingleSkinDisplay } from "./SingleSkinDisplay.tsx";
import DownloadIcon from "../../assets/icons/download.svg?react";
import {useCallback, useEffect, useRef, useState} from 'react';
import { toPng } from 'html-to-image';
import { useParams } from 'react-router-dom';
import {RatedSkinDisplay} from "./RatedSkinDisplay.tsx";
import type {RatedSkin} from "../../types";

type SkinDisplayerProps = {
    ratedSkins: RatedSkin[];
}

export const SkinDisplayer = ({ ratedSkins }: SkinDisplayerProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const skinAmount = ratedSkins.length;
    const { championKey } = useParams();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const scaleNode = () => {
            const container = ref.current;
            if (!container) return;

            const wrapper = container.parentElement;
            if (!wrapper) return;

            const wrapperWidth = wrapper.clientWidth;
            const wrapperHeight = wrapper.clientHeight;

            const baseWidth = 1370;
            const baseHeight = 810;

            const scaleX = wrapperWidth / baseWidth;
            const scaleY = wrapperHeight / baseHeight;

            const scale = Math.min(scaleX, scaleY);
            container.style.transform = `scale(${scale})`;
        };

        scaleNode();
        window.addEventListener('resize', scaleNode);
        return () => window.removeEventListener('resize', scaleNode);
    }, []);

    const onDownload = useCallback(() => {
        if (!ref.current || loading) {
            return;
        }

        setLoading(true);

        const container = ref.current;

        // Save current transform and size
        const originalTransform = container.style.transform;
        const originalWidth = container.style.width;
        const originalHeight = container.style.height;

        // Set scale to 1 and fix width/height for capture
        container.style.transform = 'scale(1)';
        container.style.width = '1370px';
        container.style.height = '810px';

        document.fonts.ready.then(() => {
            toPng(container, { cacheBust: true, skipFonts: true, pixelRatio: 1 })
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
                    // Restore original styles
                    container.style.transform = originalTransform;
                    container.style.width = originalWidth;
                    container.style.height = originalHeight;
                    setLoading(false);
                });
        });
    }, [loading, ratedSkins, skinAmount, championKey]);



    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center gap-4">
            <div className="w-full max-w-screen aspect-[1.69/1] relative overflow-hidden">
                <div
                    className="absolute top-0 left-0 w-[1370px] h-[810px] flex justify-center items-center origin-top-left"
                    ref={ref}
                    style={{ transform: 'scale(1)' }}
                    id="scalable-node"
                >
                    {skinAmount === 1 ? (
                        <SingleSkinDisplay skin={ratedSkins[0]} />
                    ) : (
                        <div className="flex flex-wrap bg-background relative w-full h-full">
                            {ratedSkins.map((skin) => (
                                <RatedSkinDisplay key={skin.id} skin={skin} amount={skinAmount} />
                            ))}
                        </div>
                    )}
                </div>
            </div>


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
                        loading ? 'animate-bounce' : ''
                    }`}
                />
            </button>
        </div>
    );
}
