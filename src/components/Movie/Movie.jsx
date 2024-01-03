import React from 'react';
import { Typography, CircularProgress, Grow, Tooltip, Rating, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles'

function Movie({ movie, i }) {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie} >
      <Grow in timeout={(i * 1) * 250} style={{ transformOrigin: "center" }}>
        <Link className={classes.links} to={`/movie/${movie.id}`} >
          <img
            className={classes.image}
            src={movie.poster_path ?
              `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'http://www.filmurray.com/200/300'} alt="Movie"
          />
          <Typography className={classes.title} variant='h6'>{movie.original_title}</Typography>
          <Tooltip disableTouchListener title={`${movie.vote_average} / 10 `} >
            <div  >
              <Rating name="read-only" value={movie.vote_average / 2} readOnly precision={0.1} />
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  )
}
export default Movie;