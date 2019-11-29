import { userConstants } from '../../constants';

export function registration(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return {
                registering: true,
                isSigningUp: true
            };
        case userConstants.REGISTER_SUCCESS:
            // console.log(`------->${JSON.stringify(action, null, 2)}`);
            return {
                token: action.user.sessionToken,
                userId: action.user.objectId,
                user: action.user,
                isLoggedIn: true,
                isSigningUp: false
            };
        case userConstants.REGISTER_FAILURE:
            // console.log('WWW '+action.error.code)
            return {
                isSigningUp: false,
                msg: action.error.code //'L\'adresse e-mail ou mot de passe est invalide.'
                // error: action.error.data
            };
        default:
            return state;
    }
}