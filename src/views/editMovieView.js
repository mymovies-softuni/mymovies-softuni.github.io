import { html } from 'https://unpkg.com/lit-html?module';
import { getMovie, parseMoviesData, updateMovie } from '../services/moviesService.js';

const updateMovieTemplate = (movie, onSave) => html`
    <form @submit=${onSave} class="form-signin">
        <h2 class="form-signin-heading">Update ${movie.title}</h2>
        <label>Title</label>
        <input type="title" class="form-control" placeholder="Movie Title" autocomplete="" name="title" .value=${movie.title}>
        <label>Image URL</label>
        <input type="image-url" class="form-control" placeholder="Image URL" autocomplete="" name="image-url" .value=${movie.imgUrl}>
        <label>Description</label>
        <textarea rows="10" type="description" class="form-control" placeholder="Description" autocomplete="" name="description" .value=${movie.description}></textarea>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Save Movie</button>
    </form>
`;



export async function editPage(ctx) {
    try {
        let movie = await getMovie(ctx.params.id);
        movie = parseMoviesData(movie).pop();
        ctx.render(updateMovieTemplate(movie, onSave));
    } catch(err) {
        alert(err);
    }

    async function onSave(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const desc = formData.get('description');
        const img = formData.get('image-url');

        if((title && title !== '') && (desc && desc !== '') && (img && img !== '')) {
            try {
                let result = await updateMovie(ctx.params.id, title, desc, img);
                result.save();
                ctx.page.redirect('/movies/' + ctx.params.id);
            } catch(err) {
                alert(err);
            }


        } else {
            return;
        } 
            
    }
    
}