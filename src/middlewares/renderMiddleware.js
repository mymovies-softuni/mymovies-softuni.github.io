import { render } from 'https://unpkg.com/lit-html?module';
const main = document.querySelector('main');


const contextRenderer = (templateResult, location) =>  {
    if (!location) {
        render(templateResult, main)
    } else {
        render(templateResult, location)
    }

}

export function renderMiddleware(ctx, next) {
    ctx.render = contextRenderer;
    next();
}