import React from 'react';
import { Grid } from '@mui/material';
import Movie from '../Movie/Movie';
import useStyles from './styles';

function Movielist({ movies, numberOf }) {
    const classes = useStyles();
    // console.log(movies)
    return (
        <Grid container className={classes.moviesContainer} >
            {movies.results.slice(0, numberOf).map((movie, i) => (
                <Movie key={i} movie={movie} i={i} />
            ))}
        </Grid>
    )
}

export default Movielist;