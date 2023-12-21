import { makeStyles } from '@mui/styles';

const drawerWidth = 240;
export default makeStyles((theme) => ({
  toolbar: {
    height: '80px',
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '240px',
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
      flexWrap: 'wrap',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      felxShrink: 0,
    },
  },
  linkButton: {
    '&hover': {
      color: 'white !important',
      textDecoration: 'none',
    },
  },
}));
