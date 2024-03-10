import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer,userUpdateProfileReducer, } from './reducers/userReducers'

const reducer = combineReducers({
  productList:productListReducer,
  productDetails:productDetailsReducer,
  userLogin:userLoginReducer,
  userRegister:userRegisterReducer,
  userDetails:userDetailsReducer,
  userUpdateProfile:userUpdateProfileReducer,
});

const userInfoFromStorage = LocalStorage.getItem('userInfo') ?
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
