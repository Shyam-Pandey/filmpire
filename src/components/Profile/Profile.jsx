import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Typography } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

import { useGetMovieListQuery } from '../../services/TMDB';
import { setUser, userSelector } from '../../features/auth';
import Ratedcard from '../Ratedcard/Ratedcard';

function Profile() {
  const { isAuthenticated, user } = useSelector(userSelector);
  const favrotieMovie = [];
  const logOut = () => {
    localStorage.clear();
    window.location.href = '/';
  }

  const { data: favoriteMovies, refetch: refetchFavorite } = useGetMovieListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: watchlistMovies, refetch: refetchWatchlist } = useGetMovieListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });

  useEffect(() => {
    refetchFavorite();
    refetchWatchlist();
  }, [])

  return (
    <div>
      <Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant="h4" gutterBottom >My Profile : {user.username}</Typography>
          <Button onClick={logOut}>
            Log Out<ExitToApp />
          </Button>
        </Box>
        {
          !favoriteMovies?.results?.length && !watchlistMovies?.results?.length
            ? (<Typography>Please add some movies</Typography>)
            : (
              <Box>
                <Ratedcard title="Favorite Movie" data={favoriteMovies} />
                <Ratedcard title="Watchlist Movie" data={watchlistMovies} />
              </Box>
            )}
      </Box>
    </div>
  );
}
export default Profile;
