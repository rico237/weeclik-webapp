import { alertConstants } from '../../constants';

export function alert(state = {}, action) {
    switch (action.type) {
        case alertConstants.CLEAR:
            return {};
        case alertConstants.ERROR:
            return {
                type: 'alert-danger',
                message: action.message
            };
        case alertConstants.SUCCESS:
            return {
                type: 'alert-success',
                message: action.message
            };
        default:
            return state;
    }
}