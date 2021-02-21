import React from 'react'
import { Button } from '@material-ui/core';
import styles from './EmptyTemplate.module.scss';

export const EmptyTemplate = (props) => {
    return (
        <div className={styles.emptyTemplate}>
            <h2 className={styles.emptyTemplate__title}>{props.title}</h2>
            <Button classes={{root: styles.emptyTemplate__btn}} onClick={props.onClicked}>{props.btnText}</Button>
        </div>
    )
}
