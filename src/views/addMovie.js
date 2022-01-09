import { html } from 'https://unpkg.com/lit-html?module';
import { createMovie } from '../services/moviesService.js';
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
    async function onAdd(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const desc = formData.get('description');
        const img = formData.get('image-url');

        if((title && title !== '') && (desc && desc !== '') && (img && img !== '')) {   
            try {
                let newMovie = createMovie(title, desc, img);
                newMovie = await newMovie.save();
                ctx.page.redirect('/movies/' + newMovie.id);
            } catch (err) {
                alert(err);
            }
        }
            
    }
    ctx.render(addMovieTemplate(onAdd));
}