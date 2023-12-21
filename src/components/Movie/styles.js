import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    movie: {
        padding: '8px',
    },
    title: {
        color: theme.palette.text.primary,
        fontSize: '10px',
        textAlign: 'center',
        textOverflow: 'ellipsis',
        width: '150px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        marginTop: '10px',
        marginBottom: '0'
    },

    links: {
        textDecoration: 'none',
        color: 'black',
        fontWeight: 'bolder',
        [theme.breakpoints.up('xs')]: {
            display: 'flex',
            flexDirection: 'column',
        },
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'none'
        }
    },
    image: {
        height: "300px",
        objectFit: "cover",
        borderRadius: '15px',
        marginBottom: '10px',
        '&:hover': {
            transform: 'scale(1.05)'
        }
    }
}));
