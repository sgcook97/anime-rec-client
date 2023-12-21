import { useRouter } from "next/router"
import axios from "axios";
import React, { useEffect, useState } from "react";
import AnimeGrid from "./AnimeGrid";
import Header from "./Header";


function AnimeSelection( props : any ) {

    const api_url = process.env.NEXT_PUBLIC_SAMNROLL_API_URL;
    const router = useRouter();

    const [topAnime, setTopAnime] = useState(null);
    const [searchVal, setSearchVal] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedAnimeIds, setSelectedAnimeIds] = useState<number[]>([]);

    function fetchTopAnime() {
        axios({
            method: "GET",
            url: api_url + "topanime",
            params: {
                num_anime : 30
            },
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
        .then((response) => {
            const res =response.data;
            res.access_token && props.setToken(res.access_token);
            setTopAnime(res);
            setLoading(false);
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })
    }

    const handleSelect = (animeId: number) => {
        const index = selectedAnimeIds.indexOf(animeId);
        if (index !== -1) {
            const updatedIds = [...selectedAnimeIds];
            updatedIds.splice(index, 1);
            setSelectedAnimeIds(updatedIds);
        } else {
            if (selectedAnimeIds.length < 15) {
                setSelectedAnimeIds([...selectedAnimeIds, animeId]);
            } else {
                // Limit the selection to 10 anime posters
                // Display a message or prevent further selection
                alert('Please select only up to 15 anime');
            }
        }
    };

    const handleSubmit = () => {
        console.log(props.activeUser.userId)
        console.log(selectedAnimeIds)
        axios({
            method: "POST",
            url: api_url + "submit-ratings",
            data: {
                userId: props.activeUser.userId,
                animeIds : selectedAnimeIds 
            },
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
        .then((response) => {
            const res =response.data;
            res.access_token && props.setToken(res.access_token);
            localStorage.setItem('hasRatings', res.userData.hasRatings);
            router.push('/');
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
    };

    useEffect(() => {
        if (topAnime === null) {
            fetchTopAnime();
        }
    }, [topAnime]);


    return (
        <div className='anime-selection'>
            <Header 
                header='Select 5-15 Anime'
                removeToken={props.removeToken}
                searchVal={searchVal}
                setSearchVal={setSearchVal}
                handleLogout={props.handleLogout}
                searchbox={false}
            />
            <AnimeGrid
                animes={topAnime}
                onSelect={handleSelect}
                selectedAnimeIds={selectedAnimeIds}
            />
            <footer className="selection-footer">
                <button className="finished-button" onClick={handleSubmit}>
                    Finished
                </button>
            </footer>
        </div>
    );
}

export default AnimeSelection;