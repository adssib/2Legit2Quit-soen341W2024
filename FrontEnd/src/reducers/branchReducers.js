import {
    BRANCH_LIST_REQUEST,
    BRANCH_LIST_SUCCESS,
    BRANCH_LIST_FAIL,
} from '../constants/branchConstants';

export const branchListReducer = (state = { branches: [] }, action) => {
    switch (action.type) {
        case BRANCH_LIST_REQUEST:
            return { loading: true, branches: [] };
        case BRANCH_LIST_SUCCESS:
            return { loading: false, branches: action.payload };
        case BRANCH_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
