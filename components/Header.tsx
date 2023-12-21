import React, { useState } from "react";
import ListHeading from "./ListHeading";
import SearchBox from "./SearchBox";
import axios from "axios";
import { useRouter } from "next/router";

const Header = (props : any) => {
    
    const api_url = process.env.NEXT_PUBLIC_SAMNROLL_API_URL;
    const [searchVal, setSearchVal] = useState('');
    const router = useRouter();

    const handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        router.push({
            pathname: '/search',
            query: {
                searchedTitle: searchVal,
            },
        });
    };

    function logMeOut() {
        axios({
            method: "POST",
            url: api_url + "logout",
        })
        .then((response) => {
            props.removeToken();
            props.handleLogout();
            router.push('/')
        })
        .catch((error) => {
            console.error("Error logging out:", error);
        });
    }

    return (
        <div className='row d-flex mt-4 mb-4 app-head'>
            <ListHeading heading={props.header} link={props.link} />
            { props?.searchbox ? (
                <div className="col search-bar">
                    <SearchBox searchVal={searchVal} setSearchVal={setSearchVal} onSearch={handleSearch} />
                </div>
            ) : null}
            <div className="col col-sm-4 logout">
                <button className="login-button" onClick={logMeOut}>Log Out</button>
            </div>
        </div>
    );
};

export default Header;