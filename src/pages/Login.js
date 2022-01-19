import React from 'react';
import { SignInWithGoogle } from '../firebase/auth';
import { Box, Button } from '@mui/material';

const Login = () => {
    return (
        <Box>
            <Button variant="contained" onClick={SignInWithGoogle}>
                Sign in with google
            </Button>
        </Box>
    );
};

export default Login;
