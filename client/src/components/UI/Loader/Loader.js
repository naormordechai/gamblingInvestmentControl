import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import styles from './Loader.module.scss';

export const Loader = () => {
    return (
        <Backdrop className={styles.backdrop} open={true} ><CircularProgress thickness={6.5} size={50} /></Backdrop >
    )
}
