// login.js
// Componente de página de inicio de sesión (login)
// Exporta un formulario de autenticación para usuarios y administradores


import cutleryIcon from '../assets/cutlery.svg';

/**
 * Componente Login - Renderiza la página de inicio de sesión
 * Incluye formulario para seleccionar rol (visitante o administrador)
 * y campos para email y contraseña
 *  HTML de la página de login
 */
export default function Login() {
        return /*html*/ `
        <div class="login-container" aria-labelledby="login-title">

            <section class="card">

                <div class="logo">
                    <img src="${cutleryIcon}" alt="logo" style="width:28px;height:28px;border-radius:50%;" />
                </div>

                <h1>RestorApp</h1>
                <p class="subtitle">Login to your account</p>

                <form id="login-form" class="login_form">

                    <div class="field">
                        <label for="name">Full Name</label>
                        <div class="input-group">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="e.g. Jhn Doe"
                                required
                            />
                        </div>
                    </div>
                    
                    <div class="field">
                        <label for="email">Email Address</label>
                        <div class="input-group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div class="field">
                        <label for="password">Password</label>
                        <div class="input-group">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                            />
                        </div>
                    </div>

                    <div class="field">
                        <label for="role">Select Role</label>
                        <div class="input-group">
                            <select id="role" name="role">
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" class="btn">Sign In</button>
                </form>

                <p class="footer-text">
                    Don't have an account? <span>Sign up</span>
                </p>

            </section>

            <small class="copyright">
                RestorApp Academic Simulation
            </small>

        </div>
        `;
}
