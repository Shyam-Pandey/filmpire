import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  toolbar: {
    height: '30px',
  },
  content: {
    flexGrow: 1,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '2em',
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '17em',
    },
  },
}));
