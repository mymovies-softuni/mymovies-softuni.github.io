import { html } from '../../../node_modules/lit-html/lit-html.js';

export const notificationTemplate = (notification) => html`
<div class="alert alert-${notification.type}" role="alert">
    ${notification.content}
</div>
`;
