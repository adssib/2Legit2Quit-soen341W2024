import {
    CREATE_RESERVATION_REQUEST,
    CREATE_RESERVATION_SUCCESS,
    CREATE_RESERVATION_FAIL,
    CREATE_RESERVATION_RESET,
    RESERVATION_LIST_REQUEST,
    RESERVATION_LIST_SUCCESS,
    RESERVATION_LIST_FAIL
} from '../constants/reservationActionTypes';

const initialState = {
    loading: false,
    reservation: {},
    error: null,
    success: false,
};

export const reservationCreateReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_RESERVATION_REQUEST:
            return { ...state, loading: true, error: null };
        case CREATE_RESERVATION_SUCCESS:
            return { loading: false, success: true, reservation: action.payload, error: null };
        case CREATE_RESERVATION_FAIL:
            return { loading: false, error: action.payload, success: false };
        case CREATE_RESERVATION_RESET:
            return initialState;
        default:
            return state;
    }
};
export const reservationListReducer = (state = { reservations: [] }, action) => {
    switch (action.type) {
        case RESERVATION_LIST_REQUEST:
            return { loading: true, reservations: [] };
        case RESERVATION_LIST_SUCCESS:
            return { loading: false, reservations: action.payload };
        case RESERVATION_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
