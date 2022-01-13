import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Layout from './components/layout';
import Login from './pages/Login';
import { auth } from './firebase';

const App = () => {
    const [user] = useAuthState(auth);
    return (
        <>
            <Layout />
        </>
    );
};

export default App;
