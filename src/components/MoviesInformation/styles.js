import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    containerSpaceAround: {
        display: 'flex',
        justifyContent: 'space-around',
        margin: '10px 0 !important',
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
            flexDirection: "column",
        },
    },
    links: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        textDecoration: 'none',
        color: theme.palette.text.primary,
        [theme.breakpoints.down('sm')]: {
            padding: '0.5rem 1rem'
        },
    }
    ,
    image: {
        borderRadius: '20px',
        boxShadow: '0.5em 1em 1em rgb(64,64,70)',
        width: "80%",
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto',
            width: "88%",
            height: '300px',
            marginBottom: '30px'
        }
    },
    genreContainers: {
        display: 'flex',
        margin: '10px 0 !important',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    castImage: {
        width: '100%',
        height: '8em',
    },
    topCast: {
        textDecoration: 'none'
    },
    characterNames: {
        fontSize: '1rem',
    }
}))