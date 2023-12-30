import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/TMDB';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory'
import Movielist from '../Movielist/Movielist';


function Movies() {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
  // console.log(genreIdOrCategoryName);
  // console.log(page + " page")

  if (isFetching) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress width={50} />
      </Box>)
  }
  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies found!
          <br />
          Please try something else or check your internet connection.
        </Typography>
      </Box>
    )
  }

  if (error) {
    throw error;
  }
  return (
    <div>
      <Movielist movies={data} />
    </div>
  )
};
export default Movies;
