import * as actionTypes from './actionTypes';
import * as investmentService from '../../../services/investment';

export const updateCriteria = (criteria) => {
    return {
        type: actionTypes.UPDATE_CRITERIA,
        payload: criteria
    }
}

const startRequestApi = () => {
    return {
        type: actionTypes.START_REQUEST_API
    }
};

const requestApiFailed = (data) => {
    return {
        type: actionTypes.REQUEST_API_FAILED,
        payload: data
    }
};

const finsiehdLoadInvestmentSucess = data => {
    return {
        type: actionTypes.LOADING_INVESTMENTS_SUCCESS,
        payload: data
    }
};

const investmentAddedSucess = data => {
    return {
        type: actionTypes.ADDED_INVESTMENT_SUCCESS,
        payload: data
    }
}

const investmentUpdatedSucess = data => {
    return {
        type: actionTypes.UPDATED_INVESTMENT_SUCCESS,
        payload: data
    }
}

const investmentDeletedSuccess = investmentId => {
    return {
        type: actionTypes.DELETED_INVESTMENT_SUCCESS,
        payload: investmentId
    }
}


export const loadInvestments = (criteria) => async (dispatch) => {
    dispatch(startRequestApi());
    try {
        const { status, data } = await investmentService.getInevstments(criteria);
        if (status === 200) {
            dispatch(finsiehdLoadInvestmentSucess(data.result))
        }
    } catch (err) {
        console.log(err.message);
        dispatch(requestApiFailed(err))
    }
}

export const addInvestment = (investment) => async (dispatch) => {
    dispatch(startRequestApi());
    try {
        const { status, data } = await investmentService.addInvestment(investment);
        if (status === 200 || status === 201) {
            dispatch(investmentAddedSucess(data.result));
        }
    } catch (err) {
        dispatch(requestApiFailed(err));
    }
};

export const updateInvestment = investment => async (dispatch) => {
    dispatch(startRequestApi());
    try {
        const { status, data } = await investmentService.updateInvestment(investment);
        if (status === 200 || status === 201) {
            dispatch(investmentUpdatedSucess(investment));
        }
    } catch (err) {
        dispatch(requestApiFailed(err));
    }
};

export const deleteInvestment = investmentId => async (dispatch) => {
    dispatch(startRequestApi());
    try {
        const { status, data } = await investmentService.deleteInvestment(investmentId);
        if (status === 200 || status === 201) {
            dispatch(investmentDeletedSuccess(data.result));
        }
    } catch (err) {
        dispatch(requestApiFailed(err));
    }
};