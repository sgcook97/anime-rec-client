import React, { useEffect, useState } from "react";
import ListHeading from "./ListHeading";
import axios from "axios";
import PosterSkeleton from "./PosterSkeleton";
import AnimeList from "./AnimeList";
import StarRating from "./StarRating";

interface AnimeDetail {
    animeId: number;
    title: string;
    pic?: string;
    synopsis: string;
}

interface ContentRecs {
    animeId: number;
    anime_details: AnimeDetail[];
}

function AnimeDetails( props : any ) {

    const api_url = process.env.NEXT_PUBLIC_SAMNROLL_API_URL;

    const animeId = props.anime?.animeId;
    const animeTitle = props.anime?.title;
    const pic = props.anime?.pic;
    const synopsis = props.anime?.synopsis;
    const [loading, setLoading] = useState(true);
    const [contentRecs, setContentRecs] = useState<ContentRecs | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    const fetchContentRecs = () => {
        setLoading(true);
        axios({
            method: "GET",
            url: `${api_url}content-recs?animeId=${animeId}`,
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
        .then((response) => {
            const res = response.data;
            res.access_token && props.setToken(res.access_token);
            setContentRecs(res);
            setError(null); // Reset error state
        })
        .catch((error) => {
            setLoading(false);
            if (error.response) {
                setError(error.response.data.message); // Set error message
            } else {
                setError('An error occurred while fetching data.'); // Set a generic error message
            }
        })
    }

    useEffect(() => {
        if (contentRecs === null || contentRecs.animeId !== animeId) {
            fetchContentRecs();
        }
    }, [animeId]);

    useEffect(() => {
        if (contentRecs !== null) {
            setLoading(false);
        }
    }, [contentRecs]);

    return (
        <>
            <div className="details-head">
                <p className="back-arrow m-0" onClick={props.onBack}>{'<- '}{props.backText}</p>
                <div className="title-heading">
                    <ListHeading heading={animeTitle} link={false} />
                </div>
            </div>
            <div className="anime-details">
                <img src={pic} alt={animeTitle} className="anime-img-lrg" />
                <p>{synopsis}</p>
            </div>
            <div className="rating">
                <StarRating 
                    userId={props.activeUser?.userId}
                    animeId={animeId}
                    token={props.token}
                />
            </div>
            <ListHeading heading='Similar Titles' link={false} />
            {error && <p className="error-message">{error}</p>}
            <div className='anime-row'>
                {loading ? <PosterSkeleton count={10} /> : (contentRecs ? <AnimeList animes={contentRecs.anime_details} onSelect={props.onSelect} /> : null)}
            </div>
        </>
    );
}

export default AnimeDetails;