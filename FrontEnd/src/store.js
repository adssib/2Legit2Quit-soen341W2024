import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reservationCreateReducer, reservationListReducer } from './reducers/reservationCreateReducer'; 
import { branchListReducer } from './reducers/branchReducers';

import {
  productDetailsReducer,
  productListReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
} from './reducers/productReducers';

import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './reducers/userReducers';

import {
  reservationDetailsReducer,
  reservationReducer,
  // Add other reservation-related reducers if available
} from './reducers/reservationReducers';

const reducer = combineReducers({
  branchList: branchListReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  reservationCreate: reservationCreateReducer,
  reservationList: reservationListReducer, 
  reservationReducer: reservationReducer,
  userDetails: userDetailsReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  reservationDetails: reservationDetailsReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },

  reservationDetails: {
    loading: false,
    error: null,
    reservation: {},
  },
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
});

export default store;
