import { userConstants } from '../../constants';

let user = JSON.parse(localStorage.getItem(`Parse/${process.env.REACT_APP_APP_ID}/currentUser`));
const initialState = user ? { isConnect: true, user } : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
                // console.log(`------->${JSON.stringify(action, null, 2)}`);
            return {
                token: action.user.sessionToken,
                userId: action.user.objectId,
                user: action.user,
                isConnect: true
            };
        case userConstants.LOGIN_FAILURE:
            // console.log(`------->${JSON.stringify(action, null, 2)}`);
            return {
                msg: 'L\'adresse e-mail ou le mot de passe est invalide.'
            };
        case userConstants.LOGOUT:
            return {  };
        default:
            return state;
    }
}