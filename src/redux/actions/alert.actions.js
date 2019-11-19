import { alertConstants } from '../../constants';

export const alertActions = {
    clear,
    error,
    success
};

function clear() {
    return { type: alertConstants.CLEAR };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}