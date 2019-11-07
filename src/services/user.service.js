import Parse from 'parse';
// import logo from '../assets/icons/LogoWeeclik.svg';

export const userService = {
    login,
    logout,
    register,
    getUser
};

function register(user) {
    // console.log(`[SERVICE] : register ${JSON.stringify(user, null, 2)}`);
    var newUser = new Parse.User();
    newUser.set("name", user.firstName + " " + user.lastName);
    newUser.set("username", user.email);
    newUser.set("password", user.password);
    newUser.set("email", user.email);
    newUser.set("isPro", true);
    newUser.set("ambassadeur", false);
    return newUser.signUp().then(handleResponse);
}

function login(username, password) {
    // console.log(`[SERVICE] : login ${username}, ${password}`);
    const user = Parse.User.logIn(username, password);
    return user.then(handleResponse);
}

function logout() {
    // console.log(`[SERVICE] : logout`);
    return Parse.User.logOut();
    // remove user from local storage to log user out
    // localStorage.removeItem('user');
}

function getUser() {
    var currentUser = Parse.User.current();
    // console.log(`[GET] : ${JSON.stringify(currentUser, null, 2)}`);
    return currentUser.fetch().then(() => {});
}

function handleResponse(response) {
    if (response) {
        // console.log(`[HANDLE] : -------${JSON.stringify(response, null, 2)}`);
    } else {
        ;
    }
    return response;
}