import { html } from 'https://unpkg.com/lit-html?module';
import { toggleNotification } from '../middlewares/notificationsMiddleware.js';
import * as authService from '../services/authService.js';

const navigationTemplate = (isAuthenticated, email, onLogout, onSearch) => html`
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
    <form class="d-flex" @submit=${onSearch}>
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="search">
        <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
    <ul class="navbar-nav ms-auto">
        ${ isAuthenticated 
            ? html`
                <li class="nav-item">
                    <a class="nav-link">Welcome, ${email}</a>
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
    const isAuthenticated = authService.isAuthenticated();
    const currentUserEmail = authService.getCurrentUser().email;
    console.log(authService.getCurrentUser());
    return navigationTemplate(isAuthenticated, currentUserEmail, onLogout, onSearch);

    async function onLogout(e) {
        e.preventDefault();
        try {
            const response = await authService.logout();
            if(response) {
                ctx.page.redirect('/');
                toggleNotification(ctx, { content: 'Successfully logged out!', type: 'success'});
            }
        } catch (err) {
            toggleNotification(ctx, { content: err, type: 'danger'});
        }
 
    }

    function onSearch(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchTerm = encodeURIComponent(formData.get("search").trim());
        if(searchTerm && searchTerm !== '') {
            ctx.page.redirect(`/movies?search=${searchTerm}`);
        }
        
    }

}



