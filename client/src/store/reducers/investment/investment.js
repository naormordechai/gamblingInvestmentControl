import * as actionTypes from '../../actions/investmentActions/actionTypes';

const initialState = {
  investments: [],
  criteria: {
    skip: 0,
    limit: 20,
    hasMore: true,
    isAddedOrDeleted: false,
  },
  isLoading: false,
  isFinished: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  const copyInvestments = [...state.investments];
  switch (action.type) {
    case actionTypes.START_REQUEST_API:
      return {
        ...state,
        isLoading: true,
        isFinished: false,
      };
    case actionTypes.LOADING_INVESTMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isFinished: true,
        error: null,
        investments: state.criteria.skip === 0 ? action.payload : state.investments.concat(action.payload), // This condition because of filter does not wnat to concat initially
      };
    case actionTypes.UPDATE_CRITERIA:
      return {
        ...state,
        criteria: action.payload,
      };
    case actionTypes.REQUEST_API_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isFinished: true,
      };
    case actionTypes.ADDED_INVESTMENT_SUCCESS:
    case actionTypes.DELETED_INVESTMENT_SUCCESS:
      return {
        ...state,
        investments: action.payload,
        isLoading: false,
        isFinished: true,
        criteria: {
          ...state.criteria,
          skip: 0,
          limit: 20,
          hasMore: true,
          isAddedOrDeleted: true,
        },
      };
    case actionTypes.UPDATED_INVESTMENT_SUCCESS:
      const requiredIndex = state.investments.findIndex(
        (investment) => investment._id === action.payload._id
      );
      copyInvestments[requiredIndex] = action.payload;
      return {
        ...state,
        investments: copyInvestments,
        isLoading: false,
        isFinished: true,
      };
    default:
      return state;
  }
};

export default reducer;
