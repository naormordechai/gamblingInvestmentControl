import React from 'react';
import styles from './GICHeaderList.module.scss';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Button, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

export const GICHeaderList = (props) => {
    return (
        <div className={styles.headerList}>
            <span className={styles.headerList__text}>{props.title}</span>
            <IconButton size="medium" classes={{ root: styles.headerList__btn }} onClick={props.openAddDialog}>
                <AddCircleIcon />
            </IconButton>
            <Button
                classes={{ root: styles.headerList__actionBtn }}
                variant="contained"
                startIcon={<SearchIcon />}
                size="small"
                onClick={props.openFilterDialog}
            >
                Filter
      </Button>
        </div>
    )
}
