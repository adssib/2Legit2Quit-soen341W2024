import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import {
  productDetailsReducer,
  productListReducer ,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer} from './reducers/productReducers';
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducers';

const reducer = combineReducers({
  productList:productListReducer,
  productDetails:productDetailsReducer,
  productDelete: productDeleteReducer,  
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  
  userLogin:userLoginReducer,
  userRegister:userRegisterReducer,
  userDetails:userDetailsReducer,
  userDelete:userDeleteReducer,
  userUpdate:userUpdateReducer,
  userUpdateProfile:userUpdateProfileReducer,
  userList:userListReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
  JSON.parse(localStorage.getItem('userInfo')) : null

const initialState={
     cart : { cartItems : cartItemsFromStorage},
     userLogin: {userInfo: userInfoFromStorage}

}

const middleware=[thunk]


const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
