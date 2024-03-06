document.addEventListener('DOMContentLoaded', () => {
    // Verifica si hay un token de autenticación almacenado
    const token = localStorage.getItem('token');
    if (token) {
        // Redirige al usuario al "home" si el token existe
        window.location.href = '/MenuDashboard/html/Dashboard.html';
    } else {
        // Si no hay token, procede con la lógica existente para el formulario de inicio de sesión
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
                    localStorage.setItem('token', data.jwt);

                    // Redirige al usuario a la página ficticia de inicio.
                    window.location.href = '/MenuDashboard/html/Dashboard.html';
                } else {
                    console.error('Error de inicio de sesión');
                }
            } catch (error) {
                console.error('Error de red: ' + error);
            }
        });
    }

    // Asegúrate de que el botón de cierre de sesión exista antes de asignarle un controlador de eventos
    const cerrarSesionBtn = document.querySelector('.title-SignOut');
    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener('click', () => {
            // Elimina el token de autenticación del localStorage
            localStorage.removeItem('token');

    if (loggedIn) {
        // Verificar el rol del usuario después de iniciar sesión
        const userRole = await checkUserRole();

        // Manejar el rol del usuario
        switch (userRole) {
            case 'Authenticated':
                console.log('El usuario está autenticado.');
                break;
            case 'Admin':
                console.log('El usuario es un administrador.');
                break;
            case 'Unauthenticated':
                console.log('El usuario no está autenticado.');
                break;
            case 'Unauthorized':
                console.log('El usuario no tiene permisos suficientes.');
                break;
            case 'Error':
                console.log('Se produjo un error al verificar el rol del usuario.');
                break;
            default:
                console.log('Rol desconocido.');
                break;
        }
    } else {
        console.log('Error al iniciar sesión');
    }
}
