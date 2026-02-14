import Login from "../views/login.js";
import Register from "../views/register.js";
import Dashboard from "../views/dashboard.js";
import MyTasks from "../views/myTasks.js";
import Profile from "../views/profile.js";
import { initLoginController } from "../auth/loginController.js";
import { initRegisterController } from "../auth/registerController.js";
import { initDashboardController } from "../controllers/dashboardController.js";
import { initTasksController } from "../controllers/tasksController.js";
import { initProfileController } from "../controllers/profileController.js";
import { getSession } from "../services/authService.js";
import { ROLES, DEFAULT_ROUTES } from "../constants/auth.js";

// Route definitions with role-based access
const routes = {
    "/": { component: Login, isPublic: true },
    "/login": { component: Login, isPublic: true },
    "/register": { component: Register, isPublic: true },
    "/dashboard": { component: Dashboard, isPublic: false, allowedRoles: [ROLES.ADMIN] },
    "/tasks": { component: MyTasks, isPublic: false, allowedRoles: [ROLES.USER] },
    "/profile": { component: Profile, isPublic: false, allowedRoles: [ROLES.USER, ROLES.ADMIN] }
};

let linksIntercepted = false;

// Navigate without page reload
export function navigateTo(path) {
    window.history.pushState({}, "", path);
    router();
}

// Handle SPA navigation via data-route attribute
function interceptLinks() {
    if (linksIntercepted) return;
    linksIntercepted = true;

    document.addEventListener("click", (event) => {
        const link = event.target.closest("[data-route]");
        if (link) {
            event.preventDefault();
            const path = link.getAttribute("data-route");
            navigateTo(path);
        }
    });
}

// Remove trailing slash from path
function normalizePath(path) {
    if (path.endsWith("/") && path !== "/") {
        return path.slice(0, -1);
    }
    return path;
}

// Get home route for user role
function getDefaultRouteForUser(session) {
    return DEFAULT_ROUTES[session.role] || "/tasks";
}

// Check if user can access route
function hasRoutePermission(session, route) {
    if (!route.allowedRoles) return true;
    return route.allowedRoles.includes(session.role);
}

function isPublicPath(path) {
    return path === "/" || path === "/login" || path === "/register";
}

// Main router - handles auth and permissions
export default function router() {
    let path = normalizePath(window.location.pathname);
    
    let route = routes[path];
    if (!route) {
        route = routes["/"];
        path = "/";
    }

    const session = getSession();

    if (!route.isPublic && !session) {
        navigateTo("/login");
        return;
    }

    if (session && route.isPublic && isPublicPath(path)) {
        navigateTo(getDefaultRouteForUser(session));
        return;
    }

    if (session && route.allowedRoles && !hasRoutePermission(session, route)) {
        navigateTo(getDefaultRouteForUser(session));
        return;
    }

    renderView(route, path);
}

// Render component and init controller
function renderView(route, path) {
    const app = document.getElementById("app");
    if (!app) return;
    
    app.innerHTML = route.component();
    interceptLinks();
    initControllers(path);
}

// Map routes to their controllers
function initControllers(path) {
    const controllerMap = {
        "/": initLoginController,
        "/login": initLoginController,
        "/register": initRegisterController,
        "/dashboard": initDashboardController,
        "/tasks": initTasksController,
        "/profile": initProfileController
    };
    
    const initController = controllerMap[path];
    if (initController) {
        initController();
    }
}
