import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

import Comment from '../comment';

const useStyles = makeStyles((theme) => ({}));
const CommmentList = ({ name, comment }) => {
    const [user] = useAuthState(auth);
    return (
        <Box>
            <Comment />
            <Comment />
        </Box>
    );
};

export default CommmentList;
