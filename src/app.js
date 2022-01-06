import { renderMiddleware } from './middlewares/renderMiddleware.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import { navigationMiddleware } from './middlewares/navigationMiddleware.js';

import page from "//unpkg.com/page/page.mjs"

import { homePage } from './views/homeView.js';
import { loginPage } from './views/loginView.js';
import { moviesPage, myMoviesPage } from './views/moviesView.js';
import { moviePage } from './views/movieView.js';
import { addMoviePage } from './views/addMovie.js';
import { editPage } from './views/editMovieView.js';
import { registerPage } from './views/registerView.js';


page(renderMiddleware);
page(authMiddleware);
page(navigationMiddleware);

page('/', moviesPage);
page('/login', loginPage);
page('/register', registerPage);
page('/movies', moviesPage);
page('/movies/add', addMoviePage);
page('/movies/my-movies', myMoviesPage);
page('/movies/:id/edit', editPage);
page('/movies/:id', moviePage);

page.start();