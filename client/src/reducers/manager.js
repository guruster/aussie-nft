import * as types from '../actions/types';

const initialState = {
  wallet: "",
  status: "",
  modalText: "",
  modalOpen: false,
  paymentOpen: false,
  nfts: [],
  quantity: 1
};

function managerReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.SET_WALLET:
      return {
        ...state,
        wallet: payload
      }

    case types.SET_MODAL:
      return {
        ...state,
        ...payload
      };
    case types.SHOW_PAYMENT:
      return {
        ...state,
        paymentOpen: payload
      }
    case types.SET_NFTS:
      return {
        ...state,
        nfts: payload
      }
    case types.SET_QUANTITY:
      return {
        ...state,
        quantity: payload
      }
    default:
      return state;
  }
}

export default managerReducer;
