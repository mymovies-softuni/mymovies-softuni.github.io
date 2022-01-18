import { html } from "../../../node_modules/lit-html/lit-html.js"

export const loadingTemplate = () => {
    return html`<div class="loading"></div><div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`
}