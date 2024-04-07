import axios from 'axios';

import {
    RESERVATION_DETAILS_REQUEST,
    RESERVATION_DETAILS_SUCCESS,
    RESERVATION_DETAILS_FAIL,
    UPDATE_CHECKIN_PROCESS_REQUEST,
    UPDATE_CHECKIN_PROCESS_SUCCESS,
    UPDATE_CHECKIN_PROCESS_FAIL,
    RESERVATION_CREATE_RESET
} from '../constants/reservationActionTypes';

import { USER_LOGIN_SUCCESS } from '../constants/userConstants';
import * as actionTypes from '../constants/actionTypes';


// Action Types
export const CREATE_RESERVATION_REQUEST = 'CREATE_RESERVATION_REQUEST';
export const CREATE_RESERVATION_SUCCESS = 'CREATE_RESERVATION_SUCCESS';
export const CREATE_RESERVATION_FAIL = 'CREATE_RESERVATION_FAIL';
export const CREATE_RESERVATION_RESET = 'CREATE_RESERVATION_RESET';
export const RESERVATION_LIST_REQUEST = 'RESERVATION_LIST_REQUEST';
export const RESERVATION_LIST_SUCCESS = 'RESERVATION_LIST_SUCCESS';
export const RESERVATION_LIST_FAIL = 'RESERVATION_LIST_FAIL';



export const createReservation = (reservationData) => async (dispatch, getState) => {
    try {
        const { userLogin: { userInfo } } = getState();
        if (!userInfo) {
            dispatch({
                type: CREATE_RESERVATION_FAIL,
                payload: 'User not logged in',
            });
            return; 
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post('/api/reservations/', reservationData, config);

        dispatch({
            type: CREATE_RESERVATION_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: CREATE_RESERVATION_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};
export const listReservations = () => async (dispatch, getState) => {
    try {
        dispatch({ type: RESERVATION_LIST_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get('/api/reservations/', config);

        dispatch({
            type: RESERVATION_LIST_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: RESERVATION_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};



export const getReservationDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: RESERVATION_DETAILS_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/reservations/${id}`, config);

        dispatch({
            type: RESERVATION_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: RESERVATION_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateCheckInProcess = (id, checkInData) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_CHECKIN_PROCESS_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/reservations/${id}/check-in/`, checkInData, config);

        dispatch({
            type: UPDATE_CHECKIN_PROCESS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_CHECKIN_PROCESS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

// Example action creator using the constants
export const createReservationRequest = () => ({
    type: actionTypes.CREATE_RESERVATION_REQUEST
});

export const resetReservationSuccess = () => (dispatch) => {
    console.log('Dispatching RESERVATION_CREATE_RESET');
    dispatch({ type: RESERVATION_CREATE_RESET });
};