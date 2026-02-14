export async function loginUser(name, email, password, role) {
    // Obtener todos los usuarios desde db.json
    const res = await fetch(`/db.json`);
    const data = await res.json();
    const users = data.users;

    // Validar manualmente en el cliente
    const user = users.find(u => 
        u.name.toLowerCase() === name.toLowerCase() &&
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password &&
        u.role === role
    );

    return user || null;
}
