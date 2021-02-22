import React, { useEffect, useState } from 'react';
import { GICList } from '../../components/GICList/GICList';
import { GICHeaderList } from '../../components/GICHeaderList/GICHeaderList';
import styles from './GICContainer.module.scss';
import { AddEditInvestment } from '../../components/AddEditInvestment/AddEditInvestment';
import { DialogTransition } from '../../Shared/DialogTranstion/DialogTransition';

import { useDispatch, useSelector } from 'react-redux';

import * as actionsInvestment from '../../store/actions/investmentActions/index';
import { Loader } from '../../components/UI/Loader/Loader';
import { EmptyTemplate } from '../../components/UI/EmptyTemplate/EmptyTemplate';
import { FilterInvestment } from '../../components/FilterInvestment/FilterInvestment';

export const GICContainer = (props) => {
  const [isOpenAddDialog, setIsOpenAddDialog] = useState(false);
  const [isOpenFilterDialog, setIsOpenFilterDialog] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const criteria = useSelector((state) => state.investmentReducer.criteria);
  const error = useSelector((state) => state.investmentReducer.error);
  const investments = useSelector(
    (state) => state.investmentReducer.investments
  );
  const isLoading = useSelector((state) => state.investmentReducer.isLoading);
  const isFinished = useSelector((state) => state.investmentReducer.isFinished);

  const dispatch = useDispatch();

  useEffect(() => {
    if (criteria.hasMore && !criteria.isAddedOrDeleted) {
      dispatch(actionsInvestment.loadInvestments(criteria));
    }
  }, [criteria, dispatch]);

  const fetchMoreData = () => {
    if (investments.length >= criteria.skip + criteria.limit) {
      const updatedCriteria = {
        ...criteria,
        skip: criteria.skip + criteria.limit,
        hasMore: true,
        isAddedOrDeleted: false,
      };
      updateCriteria(updatedCriteria);
    } else {
      const updatedCriteria = {
        ...criteria,
        hasMore: false,
        isAddedOrDeleted: false,
      };
      updateCriteria(updatedCriteria);
    }
  };

  const openAddEditDialogHandler = (data) => {
    const dataRequired = data && data.sum ? data : null;
    setSelectedInvestment(dataRequired);
    setIsOpenAddDialog(true);
  };

  const updateCriteria = (criteria) => {
    dispatch(actionsInvestment.updateCriteria(criteria));
  };

  const addInvestmentHandler = (investment) => {
    dispatch(actionsInvestment.addInvestment(investment));
    setIsOpenAddDialog(false);
  };

  const updateInvestmentHandler = (investment) => {
    dispatch(actionsInvestment.updateInvestment(investment));
    setIsOpenAddDialog(false);
  };

  const deleteInvestmentHandler = (investmentId) => {
    dispatch(actionsInvestment.deleteInvestment(investmentId));
  };

  const openFilterDialog = () => {
    setIsOpenFilterDialog(true);
  };

  const closeDialogTransition = () => {
    setIsOpenAddDialog(false);
    setIsOpenFilterDialog(false);
  };

  const onFilterHandler = (data) => {
    console.log(data);
    const criteria = {
      skip: 0,
      limit: 20,
      hasMore: true,
      isAddedOrDeleted: false,
      filterBy: { ...data },
    };
    setIsOpenFilterDialog(false);
    updateCriteria(criteria);
  };

  return (
    <section className={styles.container}>
      {isLoading && <Loader />}
      {error ? error.message : <>
        {investments.length > 0 && (
          <>
            <GICHeaderList
              title="Gambling investment control list"
              openAddDialog={openAddEditDialogHandler}
              openFilterDialog={openFilterDialog}
            />
            <GICList
              onOpenEditDialog={openAddEditDialogHandler}
              criteria={criteria}
              onDeleteInestment={deleteInvestmentHandler}
              fetchMoreData={fetchMoreData}
              investments={investments}
            />
          </>
        )}
        {isFinished && investments.length === 0 && (
          <EmptyTemplate
            title="No investments yet"
            btnText="click here to add the first one"
            onClicked={openAddEditDialogHandler}
          />
        )}
      </>}
      <DialogTransition
        open={isOpenAddDialog || isOpenFilterDialog}
        className="padding-md"
        handleCloseDialogTransition={closeDialogTransition}
      >
        {isOpenAddDialog && (
          <AddEditInvestment
            data={selectedInvestment}
            setIsOpenDialog={setIsOpenAddDialog}
            onAddInvestment={addInvestmentHandler}
            onUpdateInvestment={updateInvestmentHandler}
          />
        )}
        {isOpenFilterDialog && (
          <FilterInvestment
            filterBy={criteria.filterBy}
            setIsOpenDialog={setIsOpenFilterDialog}
            onFilterHandler={onFilterHandler}
          />
        )}
      </DialogTransition>
    </section>
  );
};
