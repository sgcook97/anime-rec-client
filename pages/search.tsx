import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import userHandler from '../utils/userHandler';
import useToken from '../utils/useToken';
import Header from '../components/Header';
import ListHeading from '../components/ListHeading';
import SearchResults from '../components/SearchResults';
import AnimeDetails from '../components/AnimeDetails';
import SearchSkeleton from '../components/SearchSkeleton';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const Search = () => {
    const api_url = process.env.NEXT_PUBLIC_SAMNROLL_API_URL;
    const router = useRouter();
    const { searchedTitle } = router.query;

    const [animeDetailsArray, setAnimeDetailsArray] = useState(null);
    const { handleLoginSuccess, isLoggedIn, getActiveUser, handleLogout } = userHandler();
    const { setToken, token, removeToken } = useToken();
    const [searchVal, setSearchVal] = useState('');
    const [selectedAnime, setSelectedAnime] = useState(null);
    const [prevSearchVal, setPrevSearchVal] = useState('');

    const activeUser = getActiveUser();

    useEffect(() => {
        if (searchedTitle) {
            const title = Array.isArray(searchedTitle) ? searchedTitle[0] : searchedTitle;
    
            if (title !== prevSearchVal) {
                handleBack();
                setAnimeDetailsArray(null);
                axios({
                    method: 'GET',
                    url: `${api_url}search?title=${encodeURIComponent(title)}`,
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    const animeDetails = response.data;
                    setAnimeDetailsArray(animeDetails);
                    setPrevSearchVal(title);
                })
                .catch((error) => {
                    console.error('Error searching anime:', error);
                });
            }
        }
    }, [searchedTitle, token, prevSearchVal]);

    const handleAnimeSelection = (anime : any) => {
        setSelectedAnime(anime);
    };
    
    const handleBack = () => {
        setSelectedAnime(null);
    };

    return (
        <div className='index-app'>
            <div className='container-fluid home-app'>
                <Header 
                        header='SamnRoll'
                        token={token}
                        removeToken={removeToken}
                        searchVal={searchVal}
                        setSearchVal={setSearchVal}
                        handleLogout={handleLogout}
                        searchbox={true}
                        link={true}
                />
                { selectedAnime ? (
                    <AnimeDetails
                        anime={selectedAnime}
                        onBack={handleBack}
                        backText={'Back to results'}
                        token={token}
                        onSelect={handleAnimeSelection}
                        activeUser={activeUser?.userId}
                    />
                ) : (
                    <>
                        <ListHeading heading='Search Results' link={false} />
                        <div className='search-results'>
                            <SearchResults animes={animeDetailsArray}  onSelect={handleAnimeSelection} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Search;
