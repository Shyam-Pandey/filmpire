import React, { useEffect, useReducer, useState } from 'react';
import { Modal, Box, Button, ButtonGroup, CircularProgress, Grid, Typography, useMediaQuery, Rating, DialogContent } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack, BorderColor } from '@mui/icons-material';

import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// Components

import { selectGenreOrCategory } from '../../features/currentGenreOrCategory'
import { useGetMovieQuery, useGetMovieListQuery, useGetRecommendationsQuery } from '../../services/TMDB';
import genresIcons from '../../assets/genres';
import useStyles from './styles';
import Movielist from '../Movielist/Movielist'
import Pagination from '../Pagination/Pagination';
import { userSelector } from '../../features/auth'

function MoviesInformation() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: favoriteMovies } = useGetMovieListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: watchlistMovies } = useGetMovieListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationsQuery({ list: '/recommendations', movie_id: id });
  //console.log(data)
  //console.log(favoriteMovies)
  // console.log(user.id + ' user id')
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  // useEffect(() => {
  //   setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id))
  // }, [favoriteMovies, data])

  useEffect(() => {
    setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id))
  }, [favoriteMovies, data])

  useEffect(() => {
    setIsMovieWatchlisted(!!watchlistMovies?.results?.find((movie) => movie?.id === data?.id))
  }, [watchlistMovies, data])

  const addToFavorite = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_API_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      favorite: !isMovieFavorited,
    });
    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_API_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchlisted,
    });
    setIsMovieWatchlisted((prev) => !prev);
  };

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
          <img className={classes.image} src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} alt="Movie" />
        </Grid>
        <Grid className='details' item container direction='column' lg={7}>
          <Typography variant='h5' textAlign='center'>
            {data?.title} {`Year:${data?.release_date.split('-')[0]}`}
          </Typography>
          <Typography variant='h7' textAlign='center' gutterBottom>
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
              {`${data?.runtime} min / ${data?.spoken_languages[0]?.name}`}
            </Typography>
          </Grid>
          <Grid className={classes.genreContainers} alignItems='center' textAlign='center' >
            {data?.genres?.map((genre) => (
              <Link key={genre.name} className={classes.links} to='/' onClick={() => { dispatch(selectGenreOrCategory(genre.id)) }}>
                <img src={genresIcons[genre.name.toLowerCase()]} className={classes.genreImages} alt="genre" height={20} />
                <Typography color="textPrimary" variant='subtitle1'>
                  {genre.name}
                </Typography>
              </Link>
            ))}
          </Grid>
          <Typography item="true" container="true" variant='h5'> Overview </Typography>
          <Typography item="true" container="true" variant='textSecondary'> {data?.overview} </Typography>
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
          <Grid item container style={{ marginTop: "1rem" }}>
            <div className={classes.buttonContainers}>
              <Grid item xs={12} sm={6} className={classes.buttonContainers} >
                <ButtonGroup size='small' >
                  <Button target="_blank" rel="hoopener noreffer" href={data?.homepage} endIcon={<Language />} >Webiste</Button>
                  <Button target="_blank" rel="hoopener noreffer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />} >IMDB</Button>
                  <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />} >Trailer</Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.buttonContainers} style={{ textUnderline: 'none' }} >
                <ButtonGroup size='small' >
                  <Button onClick={addToFavorite} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />} >
                    {isMovieFavorited ? "Unfavorite" : "Favorite"}
                  </Button>
                  <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />} >{isMovieWatchlisted ? 'Remove' : 'Watchlist'}</Button>
                  <Button endIcon={<ArrowBack />} xs={{ BorderColor: 'primary.main' }} style={{ textDecoration: 'none' }} >
                    <Typography style={{ textDecoration: 'none' }} component={Link} to='/' color='inherit' variant='subtitle2' >
                      Back
                    </Typography>
                  </Button>
                </ButtonGroup>
              </Grid>
            </div>
          </Grid>
        </Grid>

        <Box marginTop="5rem" width="100%">
          <Typography variant='h3' gutterBottom align='center'>
            You might also like.
          </Typography>
          {recommendations ?
            <Movielist movies={recommendations} numberOf={12} /> :
            (<Box>Sorry nothing found</Box>)}
        </Box>

        <Modal
          closeAfterTransition
          className={classes.modal}
          open={open}
          onClick={() => setOpen(false)}
        >
          <Box className={classes.box} >
            {data?.videos?.results?.length > 0 &&
              <iframe
                className={classes.video}
                title="Trailer"
                autoPlay
                style={{ border: "0" }}
                src={`https://www.youtube.com/embed/${data?.videos?.results[0]?.key}`}
              />
            }
          </Box>
        </Modal>
      </Grid>
    </>
  );
}
export default MoviesInformation;
