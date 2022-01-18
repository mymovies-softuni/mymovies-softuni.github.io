Parse.initialize('87kzRb7J5iVV9srchvziUxjOzHe5XZASSe5X9HqA', 'SYwto6A61msEQ6ybX2kTMZF4l8g0aEJ4WZUhDMWV');
Parse.serverURL = 'https://parseapi.back4app.com';

export const register = (username, password, email) => {
    const newUser = new Parse.User();
    newUser.set('username', username);
    newUser.set('password', password);
    newUser.set('email', email);

    return newUser;
}

export const login = async (username, password) => {
    try {
        return Parse.User.logIn(username, password);
    } catch (err) {
        return err;
    }
    
}

export async function logout() {
    if(isAuthenticated()) {
        try {
            const response = Parse.User.logOut();
        } catch(err) {
            return err;
        }
    }
}

export const getCurrentUser = () => {
    const user = Parse.User.current();
    if(user) {
        const username = user.get('username');
        const email = user.get('email');
        const id = user.id;
        return {
            username,
            email,
            id
        }
    }
    return false;

}

export function isAuthenticated() {
    const user = Parse.User.current();
    return Boolean(user);
}


