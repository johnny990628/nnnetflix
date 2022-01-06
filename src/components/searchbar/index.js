import React, { useState, useEffect } from 'react';
import {
    IconButton,
    TextField,
    Typography,
    Box,
    Popover,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

import API, { IMG_URL_SM } from '../../api/api';

const useStyles = makeStyles((theme) => ({
    searchbar: {
        display: 'flex',
        alignItems: 'center',
        width: '20%',
        backgroundColor: 'var(--searchbar-color)',
        '&:hover': {
            backgroundColor: 'var(--searchbar-color-hover)',
        },
        borderRadius: '5px',
        padding: '5px',
    },
    input: {
        color: 'var(--text-color)',
        flexGrow: 1,
    },
    iconBtn: { color: 'var(--text-color)', marginRight: '10px' },
    searchButton: { marginRight: '20px' },
    popover: {
        minWidth: '20%',
        maxHeight: '60%',
    },
    img: { marginLeft: '2rem' },
}));

const SearchBar = ({ type }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [value, setValue] = useState('');
    const [open, setOpen] = useState(false);
    const [result, setResult] = useState([]);
    const handleChange = (e) => {
        setAnchorEl(e.currentTarget);
        setValue(e.target.value);
        setOpen(true);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };
    useEffect(async () => {
        let results = await API.getSearch(value);
        if (results) setResult(results.slice(0, 10));
    }, [value]);
    return (
        <>
            {type === 'bar' && (
                <>
                    <Box className={classes.searchbar}>
                        <Search sx={{ color: 'var(--text-color)', margin: '0 10px' }} />
                        <TextField
                            variant="standard"
                            InputProps={{
                                classes: {
                                    input: classes.input,
                                },
                            }}
                            onChange={handleChange}
                            value={value}
                        />
                    </Box>
                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        classes={{ paper: classes.popover }}
                        disableAutoFocus={true}
                        disableEnforceFocus={true}
                    >
                        <List>
                            {result &&
                                result.map((item) => {
                                    return (
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemText primary={item.title} />
                                                <img
                                                    src={`${IMG_URL_SM}${item.poster_path || item.backdrop_path}`}
                                                    className={classes.img}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                        </List>
                    </Popover>
                </>
            )}
            {type === 'icon' && (
                <IconButton className={classes.iconBtn}>
                    <Search />
                </IconButton>
            )}
        </>
    );
};

export default SearchBar;
