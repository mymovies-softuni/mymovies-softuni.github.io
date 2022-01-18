import { html } from 'https://unpkg.com/lit-html?module'
import { countMovies, createPagesArray, getMyMovies, paginateMovies, parseMoviesData } from "../services/moviesService.js";
import { retrieveQuery } from '../services/moviesService.js';
import { loadingTemplate } from './shared/loadingView.js';

const moviesTemplate = (movies, activePage, totalPages) => html`
    <h2>Movies Page</h2>

    <nav id="pagination" aria-label="Page navigation example">
        <ul class="pagination">
            ${totalPages.map(page => html`<li class="page-item ${activePage == page ? 'active' : null}"><a class="page-link" href="/movies?page=${page}">${page}</a></li>`)}
        </ul>
    </nav>
    <div id="movies">
        ${movies.map(m => html`${movieTemplate(m)}`)}
    </div>
    
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
    const searchTerms = retrieveQuery(ctx.querystring);
    searchTerms.page ? searchTerms : searchTerms.page = '1';
    ctx.render(loadingTemplate());
    try {
        if(searchTerms.search) {
            let paginatedMovie = await paginateMovies(searchTerms.page, searchTerms.search);
            paginatedMovie = parseMoviesData(paginatedMovie);
            const totalPages = createPagesArray(paginatedMovie.length);

            ctx.render(moviesTemplate(paginatedMovie, searchTerms.page, totalPages));

        } else {
            let paginatedMovie = await paginateMovies(searchTerms.page);
            paginatedMovie = parseMoviesData(paginatedMovie);
            let pages = await countMovies();
            const totalPages = createPagesArray(pages)
            ctx.render(moviesTemplate(paginatedMovie, searchTerms.page, totalPages));

        }
    } catch (err) {
        alert(err);
    }
}

export async function myMoviesPage(ctx) {
    const searchTerms = retrieveQuery(ctx.querystring);
    searchTerms.page ? searchTerms : searchTerms.page = '1';
    ctx.render(loadingTemplate());
    let paginatedMovie = await paginateMovies(searchTerms.page, null, Parse.User.current());
    paginatedMovie = parseMoviesData(paginatedMovie);
    let pages = await getMyMovies();
    const totalPages = createPagesArray(pages.length);

    ctx.render(moviesTemplate(paginatedMovie, searchTerms.page, totalPages));

}

