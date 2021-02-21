import React, { useEffect, useState } from 'react';
import styles from './AddEditInvestment.module.scss';
import CloseIcon from '@material-ui/icons/Close';
import { Button, IconButton, InputAdornment, MenuItem, Select, TextField } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const FORM_IINVESTMENT = {
    sum: 0,
    status: 'Profit',
    date: new Date().toISOString(),
}

export const AddEditInvestment = (props) => {
    const [form, setForm] = useState(FORM_IINVESTMENT);
    
    useEffect(() => {
        if (props.data) {
            setForm({ ...props.data });
        } 
    }, [])

    const onChangeHandler = ev => {
        const name = ev.target.name;
        const value = name === 'sum' ? parseInt(ev.target.value) : ev.target.value;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };


    const dateHandler = date => {
        if (date !== 'Invalid Date') {
            setForm(prevForm => ({ ...prevForm, date }))
        }
    }

    const onSaveInvestment = () => {
        if (props.data) {
            props.onUpdateInvestment(form);
        } else {
            props.onAddInvestment(form);
        }
    };

    return (
        <section className={styles.addEdit}>
            <div className={styles.addEdit__firstRow}>
                <h3>{props.data ? 'Edit' : 'Add'} Investment</h3>
                <IconButton size="small" onClick={() => props.setIsOpenDialog(false)}>
                    <CloseIcon />
                </IconButton>
            </div>
            <div className={styles.addEdit__inputs}>
                <TextField
                    onChange={onChangeHandler}
                    type="number"
                    variant="filled"
                    placeholder="sum"
                    name="sum"
                    value={form.sum}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">&#8362;</InputAdornment>,
                    }}
                    classes={{ root: styles.addEdit__inputs__input }} />
                <Select onChange={onChangeHandler} variant="filled" style={{ width: '265.86px', textAlign: 'center' }} value={form.status} name="status">
                    <MenuItem value="Profit">
                        <em>Profit</em>
                    </MenuItem>
                    <MenuItem value="Loss">
                        <em>Loss</em>
                    </MenuItem>
                </Select>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        onChange={dateHandler}
                        value={form.date}
                        name="date"
                        inputVariant="filled"
                        disableToolbar
                        format="MM/dd/yyyy"
                        margin="none"
                        style={{ width: '265.86px', textAlign: 'center' }}
                    />
                </MuiPickersUtilsProvider>
                <Button classes={{ root: styles.addEdit__inputs__btn }} onClick={onSaveInvestment}>{props.data ? 'Update' : 'Add'}</Button>
            </div>
        </section >
    )
}
