import { html } from 'https://unpkg.com/lit-html?module'
import * as authService from '../services/authService.js';
import { toggleNotification } from '../middlewares/notificationsMiddleware.js';
import { loadingTemplate } from './shared/loadingView.js';


const loginTemplate = (onLogin) => html`

<form  @submit=${onLogin} class="form-signin">
        <h2 class="form-signin-heading">Please sign in</h2>
        <label class="sr-only">Username</label>
        <input type="text" class="form-control" placeholder="Username" autocomplete="" name="username">
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" autocomplete="" name="password">
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>

`;

export function loginPage(ctx) {
    const onLogin = async (e) => {
        e.preventDefault();
        
        let formData = new FormData(e.currentTarget);

        let username = formData.get('username');
        let password = formData.get('password');

        if(!password || !username || username == '' || password == '') {
            return;
        }

        ctx.render(loadingTemplate());
        try {
            const user = await authService.login(username, password)
            ctx.page.redirect('/movies?page=1');
            toggleNotification(ctx, { content: 'Successfully logged in!', type: 'success'});
        } catch(err) {
            toggleNotification(ctx, { content: err, type: 'danger'});

        }
        
    }
    ctx.render(loginTemplate(onLogin));
}


