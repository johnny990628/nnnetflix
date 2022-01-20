import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/auth';
import { getComments } from '../../firebase/movie';

import Comment from '../comment';

const useStyles = makeStyles((theme) => ({}));
const CommmentList = ({ movieID }) => {
    const [commentData, setCommentData] = useState([]);
    const getCommentData = async () => {
        const commentCollection = await getComments(movieID);
        setCommentData(commentCollection);
    };
    useEffect(() => {
        getCommentData();
    }, []);
    return <Box>{commentData && commentData.map((data) => <Comment comment={data} />)}</Box>;
};

export default CommmentList;
