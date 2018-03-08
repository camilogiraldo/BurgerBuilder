import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../utility";
const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.id });
  return updateObject(state, {
    orders: state.orders.concat(newOrder),
    loading: false,
    purchased: true
  });
};

const purchaseBurgerFailed = (state, action) => {
  return updateObject(state, { loading: false });
};

const purchaseBurgerStarted = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchOrderStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchOrderSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false
  });
};

const fetchOrderFailed = (state, action) => {
  return updateObject(state, { loading: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGUER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGUER_FAILED:
      return purchaseBurgerFailed(state, action);
    case actionTypes.PURCHASE_BURGER_STARTED:
      return purchaseBurgerStarted(state, action);
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrderStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrderSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAILED:
      return fetchOrderFailed(state, action);

    default:
      return state;
  }
};

export default reducer;
