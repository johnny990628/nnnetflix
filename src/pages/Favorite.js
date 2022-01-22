import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation } from 'react-router-dom';

import { auth } from '../firebase/auth';
import { getCurrentLikeList, getCurrentCollectList } from '../firebase/user';
import FavoriteList from '../components/favoritelist';

import API from '../api/api';
const Like = () => {
    const [user] = useAuthState(auth);
    const [list, setList] = useState([]);
    const location = useLocation();

    useEffect(async () => {
        if (user) {
            const movieList =
                location.pathname === '/like'
                    ? await getCurrentLikeList(user.uid)
                    : await getCurrentCollectList(user.uid);

            setList(await Promise.all(movieList.map(async (movie) => await API.getMovieInfo(movie))));
        }
    }, [location, user]);

    return (
        <Box>
            <FavoriteList list={list} title={location.pathname === '/like' ? '我的最愛' : '我的收藏'} />
        </Box>
    );
};

export default Like;
