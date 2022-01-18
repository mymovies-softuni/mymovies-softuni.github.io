import { html } from 'https://unpkg.com/lit-html?module';

export const loadingTemplate = () => {
    return html`<div class="loading"></div><div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`
}