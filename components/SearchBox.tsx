import React from "react";

const SearchBox = (props : any) => {
    return (
        <div className="col">
            <input className="form-control search-box" 
                value={props.searchVal}
                onChange={(event) => props.setSearchVal(event.target.value)}
                placeholder="Enter an anime..." 
            />
            <button className="search-button" onClick={props.onSearch}>Search</button>
        </div>
    );
}

export default SearchBox;