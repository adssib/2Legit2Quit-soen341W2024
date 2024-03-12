import axios from 'axios';

// Action Type
export const CREATE_RESERVATION_SUCCESS = 'CREATE_RESERVATION_SUCCESS';
export const CREATE_RESERVATION_FAIL = 'CREATE_RESERVATION_FAIL';

export const createReservation = (reservationData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
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
