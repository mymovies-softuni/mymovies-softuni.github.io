import * as authService from '../services/authService.js'

export function authMiddleware(ctx, next) {
    if (localStorage.getItem('accessToken')) {
        let userData = authService.getData();
        ctx.isAuthenticated = authService.isAuthenticated();
        ctx.email = userData.email;
        ctx.token = userData.token;
        ctx.id = userData._id;
    }
    next();
}