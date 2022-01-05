import { renderNavigation } from "../views/navigationView.js";
const nav = document.querySelector('nav');

export const navigationMiddleware = (ctx, next) => {
    ctx.render(renderNavigation(ctx), nav);
    next();
};