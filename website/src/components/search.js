import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <div className='sticky-div'>
        <form
        action="/"
        method="get"
        autoComplete="off">
        <label htmlFor="header-search">
            <span className="visually-hidden">
                Search...
            </span>
        </label>
        <input style={{width: '100%', marginBottom: 30, padding: 10, border: 'sold 3px black'}}
            value={searchQuery}
            onInput={(e) => setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder="Type to search ..."
            name="s"
        />
    </form>
    </div>
);

export default SearchBar;