import { html } from 'https://unpkg.com/lit-html?module'

const homeTemplate = () => html`
    <section>
        <h3>Home Page</h3>

        <p>Some informational text</p>
    </section>
`;

export function homePage(ctx) {
    ctx.render(homeTemplate());
}