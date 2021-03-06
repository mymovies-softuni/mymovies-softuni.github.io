import { html } from 'https://unpkg.com/lit-html?module';
import { createMovie } from '../services/moviesService.js';
import { toggleNotification } from '../middlewares/notificationsMiddleware.js';
import { loadingTemplate } from './shared/loadingView.js';


const addMovieTemplate = (onAdd) => html`
    <form @submit=${onAdd} class="form-signin">
        <h2 class="form-signin-heading">Create New Movie</h2>
        <label>Title</label>
        <input type="title" class="form-control" placeholder="Movie Title" autocomplete="" name="title">
        <label>Image URL</label>
        <input type="image-url" class="form-control" placeholder="Image URL" autocomplete="" name="image-url">
        <label>Description</label>
        <textarea rows="10" type="description" class="form-control" placeholder="Description" autocomplete="" name="description"></textarea>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Create Movie</button>
    </form>
`;


export function addMoviePage(ctx) {
    ctx.render(addMovieTemplate(onAdd));

    async function onAdd(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const desc = formData.get('description');
        const img = formData.get('image-url');

        if((title && title !== '') && (desc && desc !== '') && (img && img !== '')) {   
            ctx.render(loadingTemplate());
            try {
                let newMovie = createMovie(title, desc, img);
                newMovie = await newMovie.save();
                ctx.page.redirect('/movies/' + newMovie.id);
                toggleNotification(ctx, { content: `Sucessfully added ${newMovie.get('title')}.`, type: 'success'});
            } catch (err) {
                toggleNotification(ctx, { content: `${err}`, type: 'danger'});
            }
        } else {
            toggleNotification(ctx, { content: `Please make sure that all the fields are filled in.`, type: 'danger'});
        }
            
    }
}