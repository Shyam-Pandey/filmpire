import React from 'react'
import { Typography, Box } from '@mui/material'
import Movie from '../Movie/Movie'

import useStyles from './style';

const Ratedcard = ({ title, data }) => {
    const classes = useStyles();
    return (
        <div>
            <Typography variant="h6" gutterBottom>{title}</Typography>
            <Box display="flex" flexWrap="wrap" className={classes.container} >
                {data?.results?.map((movie, i) => (
                    <Movie key={movie.id} movie={movie} i={i} />
                ))}
            </Box>
        </div>
    )
}

export default Ratedcard