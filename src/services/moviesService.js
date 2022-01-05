import * as request from './requester.js';
import * as api from './api.js';


export const getAll = () => request.get(api.movies);
export const getMovie = (id) => request.get(`${api.movies}/${id}`);
export const createMovie = (title, imageUrl, description) => request.post(`${api.movies}`, {title, img: imageUrl, description});
export const updateMovie = (id, title, imageUrl, description) => request.put(`${api.movies}/${id}`, {title, img: imageUrl, description});
export const getMyMovies = (ownerId) => request.get(`${api.movies}?where=_ownerId%3D%22${ownerId}%22`);
export const deleteMovie = (id) => request.del(`${api.movies}/${id}`);