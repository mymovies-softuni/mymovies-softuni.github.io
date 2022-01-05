import * as request from './requester.js';
import * as api from './api.js';


export function storeUserData({accessToken, email, _id}) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('email', email);
    localStorage.setItem('id', _id);
}

export function getData() {
    const token = localStorage.getItem("accessToken");
    const email = localStorage.getItem("email");
    const _id = localStorage.getItem("id");

    return { token, email, _id };
}

export function login(email, password) {
    return request.post(api.login, { email, password })
        .then(data => {
            storeUserData(data);
        });
}

export function logout() {
    if(isAuthenticated()) {
        request.get(api.logout)
            .then(() => {
                localStorage.clear();
            })
    }

    localStorage.clear();
}

export function isAuthenticated() {
    const token = localStorage.getItem('accessToken');
    return Boolean(token);
}