import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PosterSkeleton = ({ count }: { count: number }) => {
    const skeletons = [];
  
    for (let i = 0; i < count; i++) {
      skeletons.push(
        <div key={i} className="skeleton-item d-flex justify-content-start m-3">
          <Skeleton height={300} width={210} />
        </div>
      );
    }
  
    return (
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        {skeletons}
      </SkeletonTheme>
    )
}

export default PosterSkeleton;
