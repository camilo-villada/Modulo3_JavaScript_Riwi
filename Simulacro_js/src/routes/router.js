import Login from '../pages/login.js';
import Dashboard from "../pages/dashboard.js";
import Menu from '../pages/menu.js';
import MyOrders from '../pages/my-orders.js';
import { initLoginController } from "../auth/login.controller.js";
import { initDashboardController } from "../auth/dashboard.controller.js";
import { initMenuController } from "../auth/menu.controller.js";
import { initMyOrdersController } from "../auth/myOrders.controller.js";


const routes = {
  "/": Login,
  "/login": Login,
  "/dashboard": Dashboard,
  "/menu": Menu,
  "/my-orders": MyOrders
};

export function router(){
  const path = window.location.pathname;
  const view = routes[path] || Login;

  const app = document.getElementById("app");
  app.innerHTML = view();

  // Inicializar controlador si estamos en login
  if(path === "/" || path === "/login"){
    initLoginController()
  }

  if(path === "/dashboard"){
    initDashboardController();
  }

  if(path === "/menu"){
    initMenuController();
  }

  if(path === "/my-orders"){
    initMyOrdersController();
  }
}

  