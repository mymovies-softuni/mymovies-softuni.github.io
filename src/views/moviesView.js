import { html } from 'https://unpkg.com/lit-html?module'
import { countMovies, getMyMovies, paginateMovies, parseMoviesData } from "../services/moviesService.js";
import { retrieveQuery } from '../services/moviesService.js';

const moviesTemplate = (movies, activePage, totalPages) => html`
    <h2>Movies Page</h2>

    <nav aria-label="Page navigation example">
        <ul class="pagination">
            ${totalPages.map(page => html`<li class="page-item"><a class="page-link" href="/movies?page=${page}" ${activePage == page ? 'active' : null}>${page}</a></li>`)}
        </ul>
    </nav>
    
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
    const searchTerms = retrieveQuery(ctx.querystring);
    searchTerms.page ? searchTerms : searchTerms.page = '1';
    try {
        if(searchTerms.search) {
            let paginatedMovie = await paginateMovies(searchTerms.page, searchTerms.search);
            paginatedMovie = parseMoviesData(paginatedMovie);
            let pages = (paginatedMovie.length / 6) + 1
            const totalPages = [];
            for (let i = 1; i <= pages; i++) {
                totalPages.push(i + '');
            }
            ctx.render(moviesTemplate(paginatedMovie, searchTerms.page, totalPages));
        } else {
            let paginatedMovie = await paginateMovies(searchTerms.page);
            paginatedMovie = parseMoviesData(paginatedMovie);
            let pages = await countMovies();
            pages = (pages / 6) + 1
            const totalPages = [];
            for (let i = 1; i <= pages; i++) {
                totalPages.push(i + '');
            }
            ctx.render(moviesTemplate(paginatedMovie, searchTerms.page, totalPages));
        }
    } catch (err) {
        alert(err);
    }
}

export async function myMoviesPage(ctx) {
    const searchTerms = retrieveQuery(ctx.querystring);
    searchTerms.page ? searchTerms : searchTerms.page = '1';
    let paginatedMovie = await paginateMovies(searchTerms.page, null, Parse.User.current());
    paginatedMovie = parseMoviesData(paginatedMovie);
    let pages = await getMyMovies();
    pages = (pages.length / 6) + 1
    const totalPages = [];
    for (let i = 1; i <= pages; i++) {
        totalPages.push(i + '');
    }

    ctx.render(moviesTemplate(paginatedMovie, searchTerms.page, totalPages));

}

