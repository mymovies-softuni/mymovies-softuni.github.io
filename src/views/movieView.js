import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteMovie, getMovie } from "../services/moviesService.js";

const movieTemplate = (movie, isOwner, onDelete) => html`
<div>
    <div class="myCard" style="width: 18rem;">
        <img src="${movie.img}" class="card-img-top" alt="...">
    </div>
    <div class="myCardBody">
        <h5 class="card-title" .textContent=${movie.title}></h5>
        <p class="card-text" .textContent=${movie.description}></p>
        ${ isOwner
            ? html`


                <div class="btn-group" role="group" aria-label="Basic outlined example">
                    <a class="btn btn-sm btn-outline-secondary" href="/movies/${movie._id}/edit">Edit</a>
                    <a @click=${onDelete} class="btn btn-sm btn-outline-danger" href="javascript:void(0)">Delete</a>
                </div>
            `
            : null
        }

    </div>
</div>
`;

export function moviePage(ctx) {
    getMovie(ctx.params.id).then(m => {
        let isOwner = ctx.id === m._ownerId
        ctx.render(movieTemplate(m, isOwner, onDelete));
    })

    function onDelete(e) {
        e.preventDefault();

        confirm('Are you sure about that?');
        if(confirm) {
            deleteMovie(ctx.params.id)
                .then(() => {
                    ctx.page.redirect('/movies');
                });
        }
    }
}