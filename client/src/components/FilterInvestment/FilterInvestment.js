import React, { useEffect, useState } from 'react';
import {
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
  InputAdornment
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import styles from './FilterInvestment.module.scss';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const FORM_FILTER = {
  date: new Date().toISOString(),
  status: 'Profit',
  minPrice: 0,
  maxPrice: 100
};

export const FilterInvestment = (props) => {
  const [form, setForm] = useState(FORM_FILTER);

  useEffect(() => {
    console.log('props.filterBy', props.filterBy);
    setForm((prevForm) => ({ ...prevForm, ...props.filterBy }));
  }, [props.filterBy]);

  const dateHandler = (date) => {
    if (date !== 'Invalid Date') {
      setForm((prevForm) => ({ ...prevForm, date }));
    }
  };

  const onChangeHandler = (event) => {
    const { name } = event.target;
    let { value } = event.target;
    value = name === 'minPrice' || name === 'maxPrice' ? +value : value;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  return (
    <section className={styles.container}>
      <div className={styles.container__firstRow}>
        <h3>Filter Investment</h3>
        <IconButton size="small" onClick={() => props.setIsOpenDialog(false)}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={styles.container__formControl}>
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
      </div>
      <Select
        onChange={onChangeHandler}
        variant="filled"
        style={{ width: '265.86px', textAlign: 'center' }}
        value={form.status}
        name="status"
      >
        <MenuItem value="All">
          <em>All</em>
        </MenuItem>
        <MenuItem value="Profit">
          <em>Profit</em>
        </MenuItem>
        <MenuItem value="Loss">
          <em>Loss</em>
        </MenuItem>
      </Select>

      <TextField
        onChange={onChangeHandler}
        type="number"
        variant="filled"
        placeholder="min price"
        name="minPrice"
        value={form.minPrice}
        InputProps={{
          startAdornment: <InputAdornment position="start">&#8362;</InputAdornment>,
        }}
        classes={{ root: styles.addEdit__inputs__input }} />

      <TextField
        onChange={onChangeHandler}
        type="number"
        variant="filled"
        placeholder="max price"
        name="maxPrice"
        value={form.maxPrice}
        InputProps={{
          startAdornment: <InputAdornment position="start">&#8362;</InputAdornment>,
        }}
        classes={{ root: styles.addEdit__inputs__input }} />

      <Button
        classes={{ root: styles.addEdit__inputs__btn }}
        onClick={() => props.onFilterHandler(form)}
      >
        Search
      </Button>
    </section>
  );
};
