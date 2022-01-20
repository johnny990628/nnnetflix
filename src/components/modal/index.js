import React, { useEffect, useState, useRef } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextareaAutosize,
} from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

const Modal = ({ open, handleModal }) => {
    const classes = useStyles();
    return (
        <Box className={classes.container}>
            <Dialog open={open} onClose={() => handleModal(false)}>
                <DialogTitle>留言</DialogTitle>
                <DialogContent>
                    <TextareaAutosize minRows={5} placeholder="留下您的評論..." sx={{ width: '20rem' }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleModal(false)}>提交</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Modal;
