import { notificationTemplate } from "../views/shared/notificationView.js";

const notificationsElement = document.querySelector('.notifications');


export const toggleNotification = (ctx, notification) => {
    notificationsElement.style.display = 'block';
    ctx.render(notificationTemplate(notification), notificationsElement);
    setTimeout(() => {
        notificationsElement.style.display = 'none';
    }, 3000);
}