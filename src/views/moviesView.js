import { html } from 'https://unpkg.com/lit-html?module'
import { getAllMovies, getMyMovies, searchMovie } from "../services/moviesService.js";

const moviesTemplate = (movies) => html`
    <h2>Movies Page</h2>
    ${movies.map(m => html`${movieTemplate(m)}`)}
`;

const movieTemplate = (movie) => html`
<div class="card" style="width: 18rem;">
    <img src="${movie.imgUrl}" width="600px" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title" .textContent=${movie.title}></h5>
        <p class="card-text" .textContent=${movie.description}></p>
        <a href="/movies/${movie.id}" class="btn btn-primary">Read More...</a>
    </div>
</div>
`;


export async function moviesPage(ctx) {
    const searchText = ctx.querystring.split('=').slice(-1).join('');
    try {
        if(searchText) {
            const movies = await searchMovie(searchText);
            console.log(movies)
            ctx.render(moviesTemplate(movies));
        } else {
            const movies = await getAllMovies();
            console.log(movies);
            ctx.render(moviesTemplate(movies));
        }
    } catch (err) {
        alert(err);
    }
}

export function myMoviesPage(ctx) {
    getMyMovies().then(movies => {
        console.log(movies);
        ctx.render(moviesTemplate(movies));
    });
}

