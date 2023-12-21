import React, { useEffect, useState } from "react";
import Header from "./Header";
import ListHeading from "./ListHeading";
import AnimeList from "./AnimeList";
import Link from "next/link";
import axios from "axios";
import PosterSkeleton from "./PosterSkeleton";
import AnimeDetails from "./AnimeDetails";

function Home(props: any) {
    const api_url = process.env.NEXT_PUBLIC_SAMNROLL_API_URL;

    const [recs, setRecs] = useState(null);
    const [searchVal, setSearchVal] = useState('');
    const [topAnime, setTopAnime] = useState(null);
    const [loading, setLoading] = useState(true);

    const activeUser = props.activeUser;

    const [selectedAnime, setSelectedAnime] = useState(null);

    const handleAnimeSelection = (anime: any) => {
        setSelectedAnime(anime);
    };

    const handleBack = () => {
        setSelectedAnime(null);
    };

    function fetchUserRecs() {
        axios({
            method: "GET",
            url: `${api_url}recs?userId=${activeUser.userId}`,
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
        .then((response) => {
            const res = response.data
            res.access_token && props.setToken(res.access_token)
            setRecs(res.recs)
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
    }

    function fetchTopAnime() {
        axios({
            method: "GET",
            url: api_url + "topanime",
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
        .then((response) => {
            const res = response.data
            res.access_token && props.setToken(res.access_token)
            setTopAnime(res)
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
    }

    useEffect(() => {
        if (recs === null) {
            fetchUserRecs();
        }
        if (topAnime === null) {
            fetchTopAnime();
        }
    }, [recs, topAnime]);

    useEffect(() => {
        if (recs !== null && topAnime !== null) {
            setLoading(false);
        }
    }, [recs, topAnime]);

    return (
        <div className='container-fluid home-app'>
            <Header
                header='SamnRoll'
                token={props.token}
                removeToken={props.removeToken}
                searchVal={searchVal}
                setSearchVal={setSearchVal}
                handleLogout={props.handleLogout}
                searchbox={true}
                link={true}
            />
            {selectedAnime ? (
                <AnimeDetails
                    activeUser={activeUser}
                    anime={selectedAnime} 
                    onBack={handleBack} 
                    backText={'Back to home'} 
                    token={props.token}
                    onSelect={handleAnimeSelection}
                />
            ) : (
                <>
                    <ListHeading heading='User Recommendations' link={false} />
                    <div className='anime-row'>
                        {loading ? <PosterSkeleton count={10} /> : <AnimeList animes={recs} onSelect={handleAnimeSelection} />}
                    </div>
                    <ListHeading heading='Most Popular' link={false} />
                    <div className='anime-row'>
                        {loading ? (
                            <PosterSkeleton count={10} />
                        ) : (
                            <AnimeList animes={topAnime} onSelect={handleAnimeSelection} />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;