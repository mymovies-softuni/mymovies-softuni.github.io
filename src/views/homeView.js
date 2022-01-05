import { html } from '../../node_modules/lit-html/lit-html.js';

const homeTemplate = () => html`
    <section>
        <h3>Home Page</h3>

        <p>Some informational text</p>
    </section>
`;

export function homePage(ctx) {
    ctx.render(homeTemplate());
}