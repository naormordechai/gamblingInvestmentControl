import React from 'react';
import { Toolbar } from '../Navigation/Toolbar/Toolbar';
import styles from './Layout.module.scss';

export const Layout = (props) => {
    return (
        <>
            <Toolbar />
            <main className={styles.content}>
                {props.children}
            </main>
        </>
    )
}
