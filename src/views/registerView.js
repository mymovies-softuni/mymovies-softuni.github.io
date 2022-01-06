import { html } from 'https://unpkg.com/lit-html?module'
import * as authService from '../services/authService.js';

const registerTemplate = (onRegister) => html`

<form  @submit=${onRegister} class="form-signin">
        <h2 class="form-signin-heading">Please Register</h2>
        <label class="sr-only">Email address</label>
        <input type="email" class="form-control" placeholder="Email address" autocomplete="" name="email">
        <label class="sr-only">Password</label>
        <input type="password"class="form-control" placeholder="Password" autocomplete="" name="password">
        <label class="sr-only">Repeat Password</label>
        <input type="password" class="form-control" placeholder="Repeat Password" autocomplete="" name="repeat-password">
        <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
      </form>

`;

export function registerPage(ctx) {
    const onRegister = (e) => {
        e.preventDefault();
        
        let formData = new FormData(e.currentTarget);

        let email = formData.get('email');
        let password = formData.get('password');
        let repass = formData.get('repeat-password');

        if(!password || !email || email == '' || password == '' || repass !== password) {
            return;
        }

        authService.register(email, password)
            .then(() => {
                ctx.page.redirect('/movies');
            });
    }
    ctx.render(registerTemplate(onRegister));
}


