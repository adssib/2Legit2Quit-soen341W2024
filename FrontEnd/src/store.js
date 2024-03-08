import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import { productListReducer, productDetailsReducer } from './reducers/productReducers'

const reducer = combineReducers({
  productList:productListReducer,
  productDetails:productDetailsReducer,
  
});

const initialState={}

const middleware=[thunk]

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
