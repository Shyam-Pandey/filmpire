import React from 'react';
import { setUser, userSelector } from '../../features/auth';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Typography } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

function Profile() {
  const { isAuthenticated, user } = useSelector(userSelector);
  const favrotieMovie = [];
  const logOut = () => {
    localStorage.clear();
    window.location.href = '/';
  }
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
          !favrotieMovie.length ?
            (<Typography>Please add some movies</Typography>)
            : (<Box>
              <Typography>Favrite Movies</Typography>
            </Box>)
        }
      </Box>
    </div>
  );
}
export default Profile;
