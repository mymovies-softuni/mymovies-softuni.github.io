import { html } from 'https://unpkg.com/lit-html?module';

export const notificationTemplate = (notification) => html`
<div class="alert alert-${notification.type}" role="alert">
    ${notification.content}
</div>
`;
