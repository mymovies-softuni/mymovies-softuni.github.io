import { html } from 'https://unpkg.com/lit-html?module'
import { getAll, getMyMovies } from "../services/moviesService.js";


const myMovies = [
    {
        id: "2",
        title: "Black Panther",
        description: "A great movie about a great black panther.",
        url: "https://upload.wikimedia.org/wikipedia/en/d/d6/Black_Panther_%28film%29_poster.jpg"
    },
    {
        id: "3",
        title: "A walk to remember",
        description: "A wonderfull drama with some wonderfull stories pitched up in one very interesting movie.",
        url: "https://m.media-amazon.com/images/M/MV5BMzU3NTYxM2MtNjViMS00YmNlLWEwM2MtYWI2MzgzNTkxODFjXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg"
    },
    {
        id: "4",
        title: "Mirrors",
        description: "A very scary movie about some very scary things.",
        url: "https://kiefersutherland.net/wp-content/uploads/2018/10/Mirrors.jpg"
    },
    {
        id: "5",
        title: "Secret Window",
        description: "A wonderful movie with Jhonny Dep",
        url: "https://jhohadli.files.wordpress.com/2017/10/v1.jpg"
    },
]

const moviesTemplate = (movies) => html`
    <h2>Movies Page</h2>
    ${movies.map(m => html`${movieTemplate(m)}`)}
`;

const movieTemplate = (movie) => html`
<div class="card" style="width: 18rem;">
    <img src="${movie.img}" width="600px" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title" .textContent=${movie.title}></h5>
        <p class="card-text" .textContent=${movie.description}></p>
        <a href="/movies/${movie._id}" class="btn btn-primary">Read More...</a>
    </div>
</div>
`;


export function moviesPage(ctx) {
    getAll().then(movies => {
        ctx.render(moviesTemplate(movies));
    });
}

export function myMoviesPage(ctx) {
    getMyMovies(ctx.id).then(movies => {
        ctx.render(moviesTemplate(movies));
    });
}

