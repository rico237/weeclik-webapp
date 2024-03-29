// import {  }
import { history } from '../../helpers';
import { userService } from '../../services';
import { alertActions } from './';
import { userConstants } from '../../constants';

export const userActions = {
    login,
    logout,
    getInfo,
    register,
    loginFB
}

/**
 * Action qui enregistre un nouvel user
 * @param {*} user 
 */
function register(user) {
    return dispatch => {
        dispatch(request(user));
        // console.log(`[ACTION] : register ${JSON.stringify(user, null, 2)}`);
        userService.register(user)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/user');
                    // dispatch(alertActions.success('Registration successful'));
                    // console.log(`[ACTION] : register ${user}`);
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                    // console.error(`[ACTION]> : bad register ${error}`);
                }
            );
    };
    
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
/**
 * Action pour se connecter
 * @param {*} username 
 * @param {*} password 
 */
function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));
        // console.log(`[ACTION] : login ${username}`);
        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/user');
                    // console.log(`[ACTION] : login ${JSON.stringify(user, null, 2)}`);
                },
                error => {
                    // console.error(`[ACTION]> : bad login ${error.code}`);
                    // if (error.code === 101) {
                    //     // alert('L\'adresse e-mail ou mot de passe est invalide.');
                    //     console.error(`[ACTION]> : bad login ${error.message}`);
                    // }
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                    // console.error(`[ACTION]> : bad login ${error}`);
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function loginFB(/*userID, name, email, picture*/) {
    console.log("------------");
    // return dispatch => {
    //     dispatch(request({ userID }));
    //     userService.loginFB(userID, name, email, picture)
    //         .then(
    //             user => {
    //                 dispatch(success(user));
    //                 history.push('/user');
    //                 // console.log(`[ACTION] : login ${JSON.stringify(user, null, 2)}`);
    //             },
    //             error => {
    //                 // console.error(`[ACTION]> : bad login ${error.code}`);
    //                 // if (error.code === 101) {
    //                 //     // alert('L\'adresse e-mail ou mot de passe est invalide.');
    //                 //     console.error(`[ACTION]> : bad login ${error.message}`);
    //                 // }
    //                 dispatch(failure(error));
    //                 dispatch(alertActions.error(error));
    //                 // console.error(`[ACTION]> : bad login ${error}`);
    //             }
    //         );
    // };

    // function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    // function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    // function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    // console.log(`[ACTION] : logout ${userConstants.LOGOUT}`);
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function getInfo() {
    // const aa = userService.getUser();
    // console.log(`[---------] : ${JSON.stringify(aa, null, 2)}`);
    return { type: userConstants.GET_REQUEST }
    // userService.getUserInfo();
    // return dispatch => {
    //     dispatch(request());
    // };

    // function request() { return { type: userConstants.GET_REQUEST } }
    // function success(user) { return { type: userConstants.GET_SUCCESS, user } }
    // function failure(error) { return { type: userConstants.GET_FAILURE, error } }
}