document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // @ts-ignore
        const email = document.getElementById('email').value;
        // @ts-ignore
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:1337/api/auth/local', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier: email,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                // Almacena el token de autenticación en localStorage.
                localStorage.setItem('jwt', data.jwt);

                // Obtiene el rol del usuario del backend usando el JWT
                const userRole = await obtenerRolDelUsuario(data.jwt);

                // Escaneo de permisos según el rol
                let permissions;
                if (userRole === 'SuperAdmin') {
                    permissions = ['create', 'read', 'update', 'delete'];
                    window.location.href = '/MenuDashboard/html/Dashboard.html'; // Redireccionar al usuario SuperAdmin a la página Dashboard.html
                } else if (userRole === 'Admin') {
                    permissions = ['create', 'read'];
                    window.location.href = 'MenuDashboard/html/ReaderPlayer.html'; // Redireccionar al usuario Admin a la página ReaderPlayer.html
                } else {
                    console.error('Rol de usuario desconocido');
                    return;
                }

                // Almacena los permisos en localStorage.
                localStorage.setItem('permissions', JSON.stringify(permissions));

                // Mensaje flotante según el rol
                const mensajeFlotante = `Su rol es ${userRole}`;
                alert(mensajeFlotante);
            } else {
                console.error('Error de inicio de sesión');
            }
        } catch (error) {
            console.error('Error de red: ' + error);
        }
    });
});

// Función para obtener el rol del usuario del backend usando el JWT
async function obtenerRolDelUsuario(jwtToken) {
    try {
        const response = await fetch('http://localhost:1337/api/users-permissions/roles/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            // Aquí deberías parsear la respuesta y extraer el rol del usuario
            return data.name;
        } else {
            console.error('Error al obtener el rol del usuario');
            return null;
        }
    } catch (error) {
        console.error('Error de red al obtener el rol: ' + error);
        return null;
    }
}
