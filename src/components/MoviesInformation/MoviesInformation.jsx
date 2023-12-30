import React, { useReducer } from 'react';
import { Modal, Box, Button, ButtonGroup, CircularProgress, Grid, Typography, useMediaQuery, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';

import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { selectGenreOrCategory } from '../../features/currentGenreOrCategory'
import { useGetMovieQuery } from '../../services/TMDB';
import genresIcons from '../../assets/genres';
import useStyles from './styles';

function MoviesInformation() {
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id)
  const dispatch = useDispatch();
  const classes = useStyles();
  console.log(data)
  if (isFetching) {
    <Box display='flex' flexDirection='column' justifyContent='center'>
      <CircularProgress size="8rem" />
    </Box>
  }
  else if (error) return `Error! ${error.message}`;
  return (
    <>
      <Grid item container className={classes.containerSpaceAround} >
        <Grid item sm={12} lg={4}>
          <img className={classes.image} src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} alt="" />
        </Grid>
        <Grid className='details' item container direction='column' lg={7}>

          <Typography variant='h5' textAlign='center'>
            {data?.title} {`Year:${data?.release_date.split('-')[0]}`}
          </Typography>
          <Typography variant='h5' textAlign='center' gutterBottom>
            {data?.tagline}
          </Typography>

          <Grid item container className={classes.containerSpaceAround} >
            <Box display='flex' align='center'>
              <Rating name="read-only" value={data?.vote_average / 2} readOnly precision={0.1} />
              <Typography variant='subtitle1' gutterBottom style={{ marginLeft: '10px' }} textAlign='center' >
                {(data?.vote_average)?.toFixed(2)}/10
              </Typography>
            </Box>
            <Typography variant='h6'>
              {`${data?.runtime} min / ${data?.spoken_languages[0].name}`}
            </Typography>
          </Grid>
          <Grid className={classes.genreContainers} alignItems='center' textAlign='center' >
            {data?.genres?.map((genre) => (
              <Link key={genre.name} className={classes.links} to='/' onClick={() => { dispatch(selectGenreOrCategory(genre.id)) }}>
                <img src={genresIcons[genre.name.toLowerCase()]} className={classes.genreImages} alt="genre" height={30} />
                <Typography color="textPrimary" variant='subtitle1'>
                  {genre.name}
                </Typography>
              </Link>
            ))}
          </Grid>
          <Typography item="true" container="true" variant='h5'> Overview </Typography>
          <Typography item="true" container="true" variant='subtitle2'> {data?.overview} </Typography>
          <Typography item="true" container="true" variant='h5'> Top Cast </Typography>
          <Grid item container spacing={2}>
            {data && data?.credits?.cast?.map((character, i) => (
              character.profile_path && <Grid key={i} item xs={4} md={2} className={classes.topCast} component={Link} to={`/characters/${character.id}`}>
                <img key={character?.profile_path} className={classes.castImage} src={`https://image.tmdb.org/t/p/w500/${character?.profile_path}`} />
                <Typography className={classes.characterNames} color='textPrimary'>{character.name}</Typography>
                <Typography color='textSecondary'> {character.character.split('/')[0]}</Typography>
              </Grid>
            )).slice(0, 6)}
          </Grid>
        </Grid>
      </Grid >
    </>
  );
}
export default MoviesInformation;
