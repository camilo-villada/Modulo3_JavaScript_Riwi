import router from "./routes/router.js";
import { getSession } from "./services/authService.js";

// App entry point
document.addEventListener("DOMContentLoaded", function() {
    let session = getSession();
    let currentPath = window.location.pathname;
    
    let publicRoutes = ["/", "/login", "/register"];
    let isPublicRoute = publicRoutes.indexOf(currentPath) !== -1;
    
    // Redirect logged users away from public routes
    if (session && isPublicRoute) {
        if (session.role === "admin") {
            window.history.replaceState({}, "", "/dashboard");
        } else {
            window.history.replaceState({}, "", "/tasks");
        }
    }
    
    router();
});

window.addEventListener("popstate", router)
