export default function Login() {
    return /*html*/ `
        <div class="login-container">
            <div class="login-card">
                <!-- Logo y título -->
                <div class="login-header">
                    <div class="logo-container">
                        <div class="logo-icon">
                            <img src="/src/assets/icon_login.png" alt="CRUDZASO Logo" />
                        </div>
                        <h1 class="logo-text">CRUDZASO</h1>
                    </div>
                    <h2 class="welcome-title">Welcome back</h2>
                    <p class="welcome-subtitle">Enter your credentials to access the platform</p>
                </div>

                <form id="loginForm" class="login-form">
                    <div class="form-group">
                        <label for="email" class="form-label">Email or username</label>
                        <input 
                            type="text" 
                            id="email" 
                            name="email" 
                            class="form-input" 
                            placeholder="student@university.edu"
                            required
                        />
                    </div>

                    <div class="form-group">
                        <label for="password" class="form-label">Password</label>
                        <div class="password-input-wrapper">
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                class="form-input" 
                                placeholder="••••••••"
                                required
                            />
                            <button type="button" class="toggle-password" id="togglePassword">
                                <svg class="eye-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 4C4.5 4 2 10 2 10s2.5 6 8 6 8-6 8-6-2.5-6-8-6z" stroke="currentColor" stroke-width="1.5" fill="none"/>
                                    <circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="form-footer">
                        <a href="#" class="forgot-password">Forgot password?</a>
                    </div>

                    <button type="submit" class="btn-signin">Sign in</button>

                    <div class="register-link">
                        <span>Don't have an account?</span>
                        <a href="#" id="linkRegister" data-route="/register">Register</a>
                    </div>
                </form>

                <div id="errorMessage" class="message-container" style="display: none;"></div>
            </div>
        </div>
    `;
}