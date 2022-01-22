import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { onSnapshot, doc } from 'firebase/firestore';
import { commentsRef } from '../../firebase/movie';

import Comment from '../comment';

const useStyles = makeStyles((theme) => ({}));
const CommmentList = ({ movieID }) => {
    const [commentData, setCommentData] = useState([]);
    //return onSnapshot to unSub snapshot before unmount
    useEffect(
        () => onSnapshot(doc(commentsRef, movieID), (doc) => doc.data() && setCommentData(doc.data().comment)),
        []
    );

    return <Box>{commentData && commentData.map((data) => <Comment comment={data} />)}</Box>;
};

export default CommmentList;
