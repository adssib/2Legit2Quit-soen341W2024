import {
    RESERVATION_DETAILS_REQUEST,
    RESERVATION_DETAILS_SUCCESS,
    RESERVATION_DETAILS_FAIL,
    UPDATE_CHECKIN_PROCESS_REQUEST,
    UPDATE_CHECKIN_PROCESS_SUCCESS,
    UPDATE_CHECKIN_PROCESS_FAIL,
    RESERVATION_CREATE_RESET
} from '../constants/reservationActionTypes';
import * as actionTypes from '../constants/actionTypes';

const initialState = {
    loading: false,
    error: null,
    reservation: {},
    success: false, // Make sure to include this if you're using it in your logic
};

export const reservationDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESERVATION_DETAILS_REQUEST:
            return { ...state, loading: true, error: null };
        case RESERVATION_DETAILS_SUCCESS:
            return { loading: false, error: null, reservation: action.payload };
        case RESERVATION_DETAILS_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const updateCheckInProcessReducer = (state = { success: false }, action) => {
    switch (action.type) {
        case UPDATE_CHECKIN_PROCESS_REQUEST:
            return { loading: true, success: false };
        case UPDATE_CHECKIN_PROCESS_SUCCESS:
            return { loading: false, success: true };
        case UPDATE_CHECKIN_PROCESS_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};


export const reservationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_RESERVATION_REQUEST:
            // Set loading to true to indicate that the reservation creation is in progress
            return {
                ...state,
                loading: true,
            };
        case actionTypes.CREATE_RESERVATION_SUCCESS:
            // Handle successful reservation creation
            return {
                ...state,
                loading: false,
                reservation: action.payload, // Assuming action.payload contains the newly created reservation
            };
        case actionTypes.CREATE_RESERVATION_FAIL:
            // Handle reservation creation failure
            return {
                ...state,
                loading: false,
                error: action.payload, // Assuming action.payload contains the error message
            };

            // In your reservation reducer
        case RESERVATION_CREATE_RESET:
             return { 
                ...state,
                loading: false, error: null, success: false };

        default:
            return state;
    }
};

export default reservationReducer;