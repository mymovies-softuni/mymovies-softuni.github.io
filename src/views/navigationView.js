import { html } from '../../node_modules/lit-html/lit-html.js'
import * as authService from '../services/authService.js'

const navigationTemplate = (isAuthenticated, email, onLogout) => html`
<div class="container-fluid">
    <a class="navbar-brand" href="/">Hollywood Storage</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
        <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="/movies">Movies</a>
        </li>
        ${ isAuthenticated
            ? html`        
                <li class="nav-item">
                    <a class="nav-link" href="/movies/my-movies"> My Movies</a>
                </li>
            `
            : null
        }
    </ul>
    <ul class="navbar-nav ms-auto">
        ${ isAuthenticated 
            ? html`
                <li class="nav-item">
                    <a class="nav-link">Welcome, ${email}.</a>
                </li>             
                <li class="nav-item">
                    <a @click=${onLogout} class="nav-link" href="javascript:void(0)">| Logout</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/movies/add">| Add movie +</a>
                </li>
            `
            : html`
                <li lcass="nav-item">
                    <a class="nav-link">Welcome, Guest.</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/register">| Register</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/login">Login</a>
                </li>
            `}
    </ul>
</div>
`;

export function renderNavigation(ctx) {
    return navigationTemplate(ctx.isAuthenticated, ctx.email, onLogout);

    function onLogout(e) {
        e.preventDefault();
        authService.logout();
        ctx.page.redirect('/');
    }

}

