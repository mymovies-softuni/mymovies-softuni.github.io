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
        let [ movie ] = [...await getMovie(id)];
        movie.set('title', title);
        movie.set('description', description);
        movie.set('imgUrl', imgUrl);

        try {
            movie = await movie.save();
            return movie;
        } catch(err) {
            return err;
        }
        
    } catch (err) {
        return err;
    }
}



export const getMovie = async (id) => {
    const Movie = Parse.Object.extend('Movie');
    const movieQuery = new Parse.Query(Movie);
    movieQuery.get(id)
    try {
        const movie = await movieQuery.find();
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

export function parseMoviesData(movie) {
    if(movie.className == 'Movie') {
        movie = [movie];
    }
    const movies = movie.reduce((acc, movie) => {
        let currentMovie = {
            id: movie.id,
            title: movie.attributes.title,
            description: movie.attributes.description,
            imgUrl: movie.attributes.imgUrl,
            ownerId: movie.attributes.owner.id
        }
        acc.push(currentMovie);
        return acc
    }, []);
    return movies;
}


export const countMovies = async () => {
    const Movie = Parse.Object.extend('Movie');
    const countQuery = new Parse.Query(Movie);

    const count = await countQuery.count();
    return count
}

export const retrieveQuery = (string) => {
    const queryObj = string.split("&").reduce((acc, current) => {
        let [ key, value ] = [...current.split("=")];
        acc[key] = value;
        return acc;
    }, {})

    return queryObj;
}

export const paginateMovies = async (page, searchTerm, user) => {
    page = Number(page);
    const Movie = Parse.Object.extend('Movie');
    const paginateQuery = new Parse.Query(Movie);

    if(searchTerm) {
        paginateQuery.fullText('title', searchTerm);
    }

    if(user) {
        paginateQuery.equalTo('owner', user);
    }

    if(page > 1) {
        paginateQuery.limit(6);
        paginateQuery.skip((page - 1) * 6);
    } else {
        paginateQuery.limit(6);
    }

    try {
        const currentMovies = await paginateQuery.find();
        return currentMovies;
    } catch(err) {
        return err;
    }
    
}