import { html } from 'https://unpkg.com/lit-html?module'
import * as authService from '../services/authService.js';

const loginTemplate = (onLogin) => html`

<form  @submit=${onLogin} class="form-signin">
        <h2 class="form-signin-heading">Please sign in</h2>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" autocomplete="" name="email">
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" autocomplete="" name="password">
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>

`;

export function loginPage(ctx) {
    const onLogin = (e) => {
        e.preventDefault();
        
        let formData = new FormData(e.currentTarget);

        let email = formData.get('email');
        let password = formData.get('password');

        if(!password || !email || email == '' || password == '') {
            return;
        }

        authService.login(email, password)
            .then(() => {
                ctx.page.redirect('/');
            });
    }
    ctx.render(loginTemplate(onLogin));
}


