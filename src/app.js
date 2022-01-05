import { renderMiddleware } from './middlewares/renderMiddleware.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import { navigationMiddleware } from './middlewares/navigationMiddleware.js';

import page from '../node_modules/page/page.mjs';

import { homePage } from './views/homeView.js';
import { loginPage } from './views/loginView.js';
import { moviesPage, myMoviesPage } from './views/moviesView.js';
import { moviePage } from './views/movieView.js';
import { addMoviePage } from './views/addMovie.js';
import { editPage } from './views/editMovieView.js';


page(renderMiddleware);
page(authMiddleware);
page(navigationMiddleware);

page('/', homePage);
page('/login', loginPage);
page('/movies', moviesPage);
page('/movies/add', addMoviePage);
page('/movies/my-movies', myMoviesPage);
page('/movies/:id/edit', editPage);
page('/movies/:id', moviePage);

page.start();