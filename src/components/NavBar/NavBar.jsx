import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, Brightness4, Brightness7, AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useStyles from './styles';
import SideBar from '../SideBar/SideBar';

function NavBar() {
  const theme = useTheme();
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:640px)');
  const isAuthenticated = true;
  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => setMobileOpen((prevoius => !prevoius))}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            className={classes.avatarButton}
            onClick={() => { }}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && 'Search...'}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={() => { }}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to="/profile/:id"
                className={classes.linkButton}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: '30px', height: '30px' }}
                  alt="Profile"
                  src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/user-male-circle-blue-512.png" />
              </Button>
            )}
          </div>
          {isMobile && 'Search...'}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevoius => !prevoius))}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
}
export default NavBar;
