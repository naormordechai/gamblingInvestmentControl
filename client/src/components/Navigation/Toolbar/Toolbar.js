import React, { useState } from 'react';
import styles from './Toolbar.module.scss';
import Avatar from '@material-ui/core/Avatar';

export const Toolbar = (props) => {
    return (
        <header className={styles.header}>
            <span className={styles.header__appName}>GIC</span>
            <Avatar classes={{colorDefault: styles.colorAvatar}}>NM</Avatar>
        </header>
    )

}