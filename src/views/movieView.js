import { html } from 'https://unpkg.com/lit-html?module';
import { getMovie, parseMoviesData, deleteMovie } from '../services/moviesService.js';
import { getCurrentUser } from '../services/authService.js';
import { toggleNotification } from '../middlewares/notificationsMiddleware.js';
import { loadingTemplate } from './shared/loadingView.js';

const movieTemplate = (movie, isOwner, onDelete) => html`
<div>
    <div class="myCard" style="width: 18rem;">
        <img src="${movie.imgUrl}" class="card-img-top" alt="...">
    </div>
    <div class="myCardBody">
        <h5 class="card-title" .textContent=${movie.title}></h5>
        <p class="card-text" .textContent=${movie.description}></p>
        ${ isOwner
            ? html`


                <div class="btn-group" role="group" aria-label="Basic outlined example">
                    <a class="btn btn-sm btn-outline-secondary" href="/movies/${movie.id}/edit">Edit</a>
                    <a @click=${onDelete} class="btn btn-sm btn-outline-danger" href="javascript:void(0)">Delete</a>
                </div>
            `
            : null
        }

    </div>
</div>
`;

export async function moviePage(ctx) {
    ctx.render(loadingTemplate());
    try {
        let [ movie ] = [...await getMovie(ctx.params.id)];
        let isOwner = getCurrentUser().id === movie.attributes.owner.id;
        [ movie ] = [...parseMoviesData(movie)];
        ctx.render(movieTemplate(movie, isOwner, onDelete));
    } catch(err) {
        return err;
    }

    async function onDelete(e) {
        e.preventDefault();

        confirm('Are you sure about that?');
        if(confirm) {
            ctx.render(loadingTemplate());
            try {
                const result = await deleteMovie(ctx.params.id)
                console.log(result.status);
                ctx.page.redirect('/movies?page=1');
            } catch(err) {
                toggleNotification(ctx, { content: err.message, type: 'danger'});
            }
        }
    }
}