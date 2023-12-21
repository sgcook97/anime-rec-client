import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SearchSkeleton() {
    const dummyPosters = Array.from({ length: 15 }).fill(null);

    const chunkArray = (arr: any, size: any) => {
        return Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
            arr.slice(index * size, index * size + size)
        );
    };

    const rows = chunkArray(dummyPosters, 5);

    return (
        <>
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="anime-row">
                    {row.map((_ : any, index : any) => (
                        <div 
                            key={index}
                            className="d-flex justify-content-center m-3"
                        >
                            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                                <Skeleton height={300} width={210} />
                            </SkeletonTheme>
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};

export default SearchSkeleton;