import "./styles/style.css";
import "./styles/login.css";
import "./styles/dashboard.css";
import "./styles/menu.css";
import "./styles/my-orders.css";
import { router } from "./routes/router.js";




document.addEventListener('DOMContentLoaded', () =>{
    const session = localStorage.getItem("session");

    if(session){
        // Si ya hay sesión, redirigimos según el rol
        const user = JSON.parse(session);
        if(user.role === "admin"){
            window.history.pushState({}, "", "/dashboard");
        }else{
            window.history.pushState({}, "", "/menu");
        }
    }

    router()
})

// Escuchar eventos de navegación (botones atrás/adelante del navegador)
window.addEventListener('popstate', () => {
    router();
});