import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AnimeGrid = (props: any) => {
    const { animes, onSelect, selectedAnimeIds } = props;

    const chunkArray = (arr: any, size: any) => {
        return Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
            arr.slice(index * size, index * size + size)
        );
    };

    const rows = chunkArray(animes || Array(15).fill(null), 5);

    return (
        <>
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="anime-row">
                    {row.map((anime: any, index: any) => (
                        <div
                            key={index}
                            className="d-flex justify-content-center m-3 anime-item"
                            onClick={() => onSelect(anime.id)}
                        >
                            {anime ? (
                                <div className={`poster-selection ${selectedAnimeIds.includes(anime.id) ? 'selected' : ''}`}>
                                    <img
                                        src={anime.pic}
                                        alt={anime.title}
                                        className="anime-img"
                                    />
                                </div>
                            ) : (
                                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                                    <Skeleton className="anime-skeleton" height={300} width={210} />
                                </SkeletonTheme>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};

export default AnimeGrid;