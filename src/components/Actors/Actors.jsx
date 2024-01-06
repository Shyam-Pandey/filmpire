import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Typography, Box, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import Movielist from '../Movielist/Movielist'
import { useGetActorQuery, useGetMoviesByCharacterQuery } from '../../services/TMDB'
import useStyles from "./styles"
import Pagination from '../Pagination/Pagination';




function Actors() {
  const { id } = useParams();
  const navigate = useNavigate()
  const { data, isFetching, error } = useGetActorQuery(id);
  const [page, setPage] = useState(1);
  const { data: movies } = useGetMoviesByCharacterQuery({ id, page })
  const classes = useStyles();
  console.log(data)
  // console.log(data.cast[0].id)
  return (
    <>
      <Grid container spacing={3}  >
        <Grid item lg={5} xl={3.5} style={{ marginLeft: "20px" }}>
          <img
            className={classes.characterImage}
            src={data?.profile_path ?
              `https://image.tmdb.org/t/p/w500/${data?.profile_path}` : 'http://www.filmurray.com/200/300'} alt="Movie"
          />
        </Grid>
        <Grid item lg={7} xl={8} className={classes.characterDetails}  >
          <Typography variant='h2' gutterBottom >
            {data?.name}
          </Typography>
          <Typography variant='h5' gutterBottom>
            {`Born on ${data?.birthday}`} in {data?.place_of_birth}
          </Typography>
          <Typography color="textSecondary" variant='body1' paragraph style={{ marginTop: "10px" }}>
            {data?.biography || 'Sorry no biography found yet...'}
          </Typography>
          <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '50px' }}>
            <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>IMDB</Button>
            <Button startIcon={<ArrowBack />} onClick={() => navigate.goBack()} color="primary">Back</Button>
          </Box>
        </Grid>
      </Grid>
      <Box width="100%" style={{ paddingRight: "20px", paddingLeft: '20px', marginTop: '20px' }}>
        <Typography variant='h3' gutterBottom align='center'>
          Movies
        </Typography>
        {movies ?
          <Movielist movies={movies} numberOf={12} /> :
          (<Box>Sorry nothing found</Box>)}
        <Pagination currentPage={page} setPage={setPage} totalPages={movies?.total_pages} />
      </Box>

    </>
  );
}
export default Actors;
