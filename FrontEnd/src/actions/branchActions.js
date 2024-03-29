import axios from 'axios';
import {
    BRANCH_LIST_REQUEST,
    BRANCH_LIST_SUCCESS,
    BRANCH_LIST_FAIL,
} from '../constants/branchConstants';

export const listBranches = () => async (dispatch) => {
    try {
        dispatch({ type: BRANCH_LIST_REQUEST });
        const { data } = await axios.get(`/api/branches/`);
        dispatch({
            type: BRANCH_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: BRANCH_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
