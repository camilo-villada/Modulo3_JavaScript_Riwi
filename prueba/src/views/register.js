

export default function Register() {
    return /*html*/ `
        <div class="register-container">
            <div class="register-card">
                <!-- Logo y título -->
                <div class="register-header">
                    <div class="logo-container">
                        <div class="logo-icon">
                            <img src="/src/assets/icon_login.png" alt="CRUDZASO Logo" />
                        </div>
                        <h1 class="logo-text">CRUDZASO</h1>
                    </div>
                </div>

                <div class="register-content">
                    <h2 class="register-title">Create account</h2>
                    <p class="register-subtitle">Join the academic performance platform today</p>

                    <!-- Formulario -->
                    <form id="registerForm" class="register-form">
                        <!-- Full Name -->
                        <div class="form-group">
                            <label for="fullName" class="form-label">Full Name</label>
                            <input 
                                type="text" 
                                id="fullName" 
                                name="fullName" 
                                class="form-input" 
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        <!-- Email address -->
                        <div class="form-group">
                            <label for="email" class="form-label">Email address</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                class="form-input" 
                                placeholder="student@university.edu"
                                required
                            />
                        </div>

                        <!-- Password -->
                        <div class="form-group">
                            <label for="password" class="form-label">Password</label>
                            <div class="password-input-wrapper">
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    class="form-input" 
                                    placeholder="Create a password"
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

                        <!-- Confirm Password -->
                        <div class="form-group">
                            <label for="confirmPassword" class="form-label">Confirm Password</label>
                            <div class="password-input-wrapper">
                                <input 
                                    type="password" 
                                    id="confirmPassword" 
                                    name="confirmPassword" 
                                    class="form-input" 
                                    placeholder="Confirm password"
                                    required
                                />
                                <button type="button" class="toggle-password" id="toggleConfirmPassword">
                                    <svg class="eye-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10 4C4.5 4 2 10 2 10s2.5 6 8 6 8-6 8-6-2.5-6-8-6z" stroke="currentColor" stroke-width="1.5" fill="none"/>
                                        <circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- Submit button -->
                        <button type="submit" class="btn-register">Register</button>

                        <!-- Sign in link -->
                        <div class="signin-link">
                            <span>Already have an account?</span>
                            <a href="#" id="linkSignin" data-route="/login">Sign in</a>
                        </div>
                    </form>

                    <!-- Mensajes de error/éxito -->
                    <div id="registerMessage" class="message-container" style="display: none;"></div>
                </div>
            </div>
        </div>
    `;
}
