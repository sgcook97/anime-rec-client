import React from "react";

const AnimeList = (props : any) => {
    const displayableAnimes = props.animes?.filter((anime : any) => anime.pic);

    const onSelect = props.onSelect;

    return (
        <>
            {displayableAnimes?.slice(0, 10).map((anime : any, index : any) => {
                return (
                    <div key={index} className="d-flex justify-content-start m-3">
                        <img 
                            src={anime.pic}
                            alt={anime.title}
                            className="anime-img"
                            onClick={() => onSelect(anime)}
                        />
                    </div>
                );
            })}                
        </>
    );
}

export default AnimeList;