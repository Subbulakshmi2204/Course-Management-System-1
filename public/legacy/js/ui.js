/* =========================================================================
   ui.js — reusable UI-update module
   -------------------------------------------------------------------------
   Small, DOM-only helpers that every page was previously re-implementing
   inline (password-eye toggles, alert boxes, the "Login/Register" vs
   "<name> ▾ / Log Out" nav swap). Nothing here touches storage directly —
   it reads auth/api state and renders it.
   ========================================================================= */

import { isLoggedIn, getCurrentUser, logout } from './auth.js';
import { getUnreadNotificationCount } from './api.js';

/** Flips a password <input> between type="password"/"text" and swaps the
 *  Bootstrap Icons eye/eye-slash class on its toggle icon. */
export function togglePasswordVisibility(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (!input || !icon) return;

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('bi-eye');
        icon.classList.add('bi-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
    }
}

/** Shows a Bootstrap alert box. `message` may contain trusted inline HTML
 *  (e.g. a link), same as the original inline scripts relied on. */
export function showAlert(elementId, message, type = 'danger') {
    const box = document.getElementById(elementId);
    if (!box) return;
    box.className = `alert alert-${type}`;
    box.innerHTML = message;
    box.classList.remove('d-none');
}

export function hideAlert(elementId) {
    const box = document.getElementById(elementId);
    if (box) box.classList.add('d-none');
}

/** Swaps the nav's Login/Register buttons for a "<name> ▾ / Log Out"
 *  menu (with an unread-notification badge) wherever #navAuthArea is
 *  present and someone is logged in. No-op on pages without that element
 *  or when nobody is signed in — the default markup is left as-is. */
export function renderAuthNav() {
    const area = document.getElementById('navAuthArea');
    if (!area || !isLoggedIn()) return;

    const user = getCurrentUser();
    const firstName = user && user.name ? user.name.split(' ')[0] : 'Account';
    const unread = user ? getUnreadNotificationCount(user.id) : 0;
    const badge = unread > 0
        ? `<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size:10px;">${unread > 9 ? '9+' : unread}</span>`
        : '';

    area.innerHTML = `
        <a href="notifications.html" class="btn btn-outline-secondary position-relative px-3" title="Notifications">
            <i class="bi bi-bell-fill"></i>${badge}
        </a>
        <div class="dropdown">
            <a class="btn btn-outline-primary dropdown-toggle px-4" href="#" role="button" data-bs-toggle="dropdown">
                <i class="bi bi-person-check-fill me-1"></i>${firstName}
            </a>
            <ul class="dropdown-menu dropdown-menu-end shadow-sm">
                <li><span class="dropdown-item-text small text-muted">${user ? user.email : ''}</span></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="notifications.html"><i class="bi bi-bell me-2"></i>Notifications${unread > 0 ? ` <span class="badge bg-danger rounded-pill ms-1">${unread}</span>` : ''}</a></li>
                <li><a class="dropdown-item" href="#" id="navLogoutBtn"><i class="bi bi-box-arrow-right me-2"></i>Log Out</a></li>
            </ul>
        </div>`;

    const logoutBtn = document.getElementById('navLogoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
            window.location.reload();
        });
    }
}

/** Logs out and sends the visitor back to the login page. Exposed on
 *  window for pages with a static "Logout" button wired via onclick="". */
export function handleLogout(redirectTo = 'user-login.html') {
    logout();
    window.location.href = redirectTo;
}
window.handleLogout = handleLogout;

// Every page that imports ui.js gets the nav swap for free, same as the
// old course-player.js behavior.
document.addEventListener('DOMContentLoaded', renderAuthNav);