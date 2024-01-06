import React from 'react'
import { Typography, Button } from '@mui/material'
import useStyles from './styles';

const Pagination = ({ currentPage, totalPages, setPage }) => {
    const classes = useStyles();
    const handlePrev = () => {
        console.log("HandlePrev")
        if (currentPage > 1) {
            setPage((prevPage) => prevPage - 1)

        }
    }
    const handleNext = () => {
        console.log("HandleNext")
        if (currentPage <= totalPages) {
            setPage((prevPage) => prevPage + 1)
        }
    }
    if (totalPages === 0) return null;
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button className={classes.button} onClick={handlePrev} variant="contained" color="primary" type="button" >Prev</Button>
            <Typography className={classes.pageNumber} >{currentPage}</Typography>
            <Button className={classes.button} onClick={handleNext} variant="contained" color="primary" type="button" >Next</Button>
        </div>
    )
}

export default Pagination;