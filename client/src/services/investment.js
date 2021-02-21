import axios from 'axios';
const URL = (process.env.NODE_ENV !== 'development')
    ? '/investment'
    : '//localhost:8080/investment';

export const getInevstments = async (criteria) => {
    return await axios.post(URL, criteria);
};

export const addInvestment = async (investment) => {
    return await axios.post(`${URL}/add-investment`, investment);
};

export const updateInvestment = async (investment) => {
    return await axios.put(`${URL}/${investment._id}`, investment);
};

export const deleteInvestment = async (investmentId) => {
    return await axios.delete(`${URL}/${investmentId}`);
}