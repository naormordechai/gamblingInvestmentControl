import React from 'react';
import styles from './GICRow.module.scss';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import moment from 'moment';

export const GICRow = (props) => {
    return (
        <div className={`${styles.row} ${props.investment.status.toLowerCase()}`}>
            <span>{moment(props.investment.date).format('DD.MM.YYYY')}</span>
            <span>{props.investment.status}</span>
            <span>{props.investment.sum}</span>
            <div className={styles.row__icons}>
                <IconButton onClick={() => props.openDialogHandler(props.investment)} size="small" classes={{ root: styles.row__icons__btnIcon }}>
                    <EditIcon />
                </IconButton>
                <IconButton size="small" classes={{ root: styles.row__icons__btnIcon }} onClick={() => props.deleteInvestment(props.investment._id)}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    )
}
