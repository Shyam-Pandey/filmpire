import React, { useEffect } from 'react';
import { Divider, LisItem, List, ListItemText, ListSubheader, ListItemIcon, CircularProgress, Box, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';

import { useGetGenresQuery } from '../../services/TMDB';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory'
import useStyles from './styles';
import genresIcons from '../../assets/genres';

const blueLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const redLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const categories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
];

function SideBar({ setMobileOpen }) {
    const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory)
    const { data, isFetching } = useGetGenresQuery();
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();
    console.log(genreIdOrCategoryName + " movies");
    return (
        <>
            <Link to="/" className={classes.imageLink}>
                <img className={classes.image} src={theme.palette.type === 'dark' ? redLogo : blueLogo} alt="logo" />
            </Link>
            <Divider />
            <List>
                <ListSubheader>Categories</ListSubheader>
                {
                    categories.map(({ label, value }) => (
                        <Link key={value} className={classes.links} to="/" >
                            <ListItem onClick={() => { dispatch(selectGenreOrCategory(value)) }} >
                                <ListItemIcon>
                                    <img src={genresIcons[label.toLowerCase()]} className={classes.genreImages} alt="category" height={30} />
                                </ListItemIcon>
                                <ListItemText primary={label} />
                            </ListItem>
                        </Link>
                    ))
                }
            </List>
            <Divider />
            <List>
                <ListSubheader>Genres</ListSubheader>
                {
                    isFetching ?
                        (<Box sx={{ display: "flex", justifyContent: "center" }}>
                            <CircularProgress width={50} />
                        </Box>) :
                        (data.genres.map(({ name, id }) => (
                            <Link key={name} className={classes.links} to="/" >
                                <ListItem onClick={() => { dispatch(selectGenreOrCategory(id)) }}>
                                    <ListItemIcon>
                                        <img src={genresIcons[name.toLowerCase()]} className={classes.genreImages} alt="genre" height={30} />
                                    </ListItemIcon>
                                    <ListItemText primary={name} />
                                </ListItem>
                            </Link>
                        ))
                        )
                }
            </List>
        </>
    );
}

export default SideBar;
