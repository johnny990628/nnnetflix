import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
        width: '25rem',
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
        backgroundColor: 'var(--searchbar-color)',
        color: 'var(--text-color)',
    },
    listImg: { marginLeft: '1rem' },
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
    const handlePopoverInputChange = (e) => {
        setValue(e.target.value);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
        setOpen(true);
    };
    useEffect(async () => {
        let results = await API.getSearch(value);
        if (results) setResult(results.slice(0, 10));
    }, [value]);
    return (
        <>
            {type === 'bar' && (
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
            )}
            {type === 'icon' && (
                <IconButton className={classes.iconBtn} onClick={handleClick}>
                    <Search />
                </IconButton>
            )}
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
                {type === 'icon' && (
                    <Box className={classes.searchbar}>
                        <Search sx={{ color: 'var(--text-color)', margin: '0 10px' }} />
                        <TextField
                            variant="standard"
                            InputProps={{
                                classes: {
                                    input: classes.input,
                                },
                            }}
                            onChange={handlePopoverInputChange}
                            value={value}
                        />
                    </Box>
                )}
                <List>
                    {result &&
                        result.map((item) => {
                            return (
                                <ListItem
                                    key={item.id}
                                    component={Link}
                                    to={`/movie/${item.id}`}
                                    button
                                    disablePadding
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <ListItemButton sx={{ minHeight: '100px' }}>
                                        <ListItemText primary={item.title} />
                                        <img
                                            src={`${IMG_URL_SM}${item.poster_path || item.backdrop_path}`}
                                            className={classes.listImg}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                </List>
            </Popover>
        </>
    );
};

export default SearchBar;
