import { html } from 'https://unpkg.com/lit-html?module'
import * as authService from '../services/authService.js';
import { toggleNotification } from '../middlewares/notificationsMiddleware.js';


const registerTemplate = (onRegister) => html`

<form  @submit=${onRegister} class="form-signin">
        <h2 class="form-signin-heading">Please Register</h2>
        <label class="sr-only">Username</label>
        <input type="text" class="form-control" placeholder="Username" autocomplete="" name="username">
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
    const onRegister = async (e) => {
        e.preventDefault();
        
        let formData = new FormData(e.currentTarget);

        let username = formData.get('username');
        let email = formData.get('email');
        let password = formData.get('password');
        let repass = formData.get('repeat-password');

        if(!password || !email || !username || email == '' || password == '' || username == '' || repass !== password ) {
            return;
        }

        try {
            const response = await authService.register(username, password, email).signUp();
            ctx.page.redirect('/');
            toggleNotification(ctx, { content: 'Your successfully registered in our movie portal.', type: 'success'});
        } catch(err) {
            toggleNotification(ctx, { content: err, type: 'danger'});
        }
        
        

    }
    ctx.render(registerTemplate(onRegister));
}


