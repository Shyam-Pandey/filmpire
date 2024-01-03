import React, { useState, useEffect } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { searchMovieByTitle } from '../../features/currentGenreOrCategory'

import useStyles from './style'

const Search = () => {
    const classes = useStyles();
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // console.log("Movies" + query)
            // console.log(searchMovieByTitle())
            dispatch(searchMovieByTitle(query));
            //dispatch(searchMovieByTitle(query));
        }
    };

    return (
        <div className={classes.searchContainer}>
            <TextField
                onKeyDown={handleKeyDown}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                variant="standard"
                InputProps={{
                    className: classes.inputs,
                    startAdornment: <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                }}

            />
        </div>
    )
}

export default Search