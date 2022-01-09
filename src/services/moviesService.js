Parse.initialize('87kzRb7J5iVV9srchvziUxjOzHe5XZASSe5X9HqA', 'SYwto6A61msEQ6ybX2kTMZF4l8g0aEJ4WZUhDMWV');
Parse.serverURL = 'https://parseapi.back4app.com';

export const createMovie = (title, description, imgUrl) => {
    const Movie = Parse.Object.extend('Movie');
    let newMovie = new Movie();
    let currentUser = Parse.User.current();
    
    newMovie.set('owner', currentUser);
    newMovie.set('title', title);
    newMovie.set('description', description);
    newMovie.set('imgUrl', imgUrl);
    
    return newMovie;
}

export const updateMovie = async (id, title, description, imgUrl) => {
    const Movie = Parse.Object.extend('Movie');
    try {
        let movie = await getMovie(id);
        movie[0].set('title', title);
        movie[0].set('description', description);
        movie[0].set('imgUrl', imgUrl);

        return movie[0];

    } catch (err) {
        return err;
    }
}



export const getMovie = async (id) => {
    const Movie = Parse.Object.extend('Movie');
    const movieQuery = new Parse.Query(Movie);
    movieQuery.get(id)
    try {
        const movie = await movieQuery.find()
        return movie;
    } catch(err) {
        return err;
    }

}

export const getAllMovies = async () => {
    const Movie = Parse.Object.extend('Movie');
    const movieQuery = new Parse.Query(Movie);

    try {
        const movies = await movieQuery.find();
        const parsedMovies = parseMoviesData(movies);
        return parsedMovies;
    } catch (err) {
        return err;
    }
};

export const getMyMovies = async () => {
    const Movie = Parse.Object.extend('Movie');
    const myMoviesQuery = new Parse.Query(Movie);
    try {
        const currentUser = await Parse.User.currentAsync()
        myMoviesQuery.equalTo('owner', currentUser)
        try {
            let myMovies = await myMoviesQuery.find();
            myMovies = parseMoviesData(myMovies);
            return myMovies;
        } catch (err) {
            return err;
        }
    } catch (err) {
        return err;
    }
};


export const searchMovie = async (text) => {
    const Movie = Parse.Object.extend('Movie');
    const query = new Parse.Query('Movie');

    query.fullText('title', text);
    try {
        let movies = await query.find();
        movies = parseMoviesData(movies);
        return movies;
    } catch (err) {
        return err
    }

}


export function parseMoviesData(movies) {
    return movies.reduce((acc, currentMovie) => {
        let movieData = {
            id: currentMovie.id,
            ownerId: currentMovie.attributes.owner.id,
            title: currentMovie.attributes.title,
            description: currentMovie.attributes.description,
            imgUrl: currentMovie.attributes.imgUrl,
        }
        acc.push(movieData);
        return acc;
    }, []);
}