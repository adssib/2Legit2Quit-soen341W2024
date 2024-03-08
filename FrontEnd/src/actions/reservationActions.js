import axios from 'axios';

// Action Type
export const CREATE_RESERVATION_SUCCESS = 'CREATE_RESERVATION_SUCCESS';
export const CREATE_RESERVATION_FAIL = 'CREATE_RESERVATION_FAIL';

// Action Creator for creating a reservation
export const createReservation = (reservationData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                // Include other headers like Authorization if needed
            },
        };

        // Replace `/api/reservations/` with your actual endpoint
        const { data } = await axios.post('/api/reservations/', reservationData, config);

        dispatch({
            type: CREATE_RESERVATION_SUCCESS,
            payload: data,
        });

        // Additional actions on success, e.g., redirect or display a success message
    } catch (error) {
        dispatch({
            type: CREATE_RESERVATION_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });

        // Additional actions on failure, e.g., display an error message
    }
};
