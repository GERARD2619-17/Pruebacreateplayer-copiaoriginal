// Función para mostrar el mensaje flotante
function showFloatingMessage(message) {
    var floatingMessage = document.getElementById("floatingMessage");
    var messageText = document.getElementById("messageText");
    messageText.textContent = message;

    // Mostrar el mensaje flotante
    floatingMessage.classList.remove("hidden");

    // Cerrar el mensaje flotante después de 10 segundos
    setTimeout(function() {
        floatingMessage.classList.add("hidden");
    }, 10000);
}

// Función para realizar el inicio de sesión
async function login(username, password) {
    try {
        const response = await fetch('http://localhost:1337/api/auth/local', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier: username,
                password: password
            })
        });
        const data = await response.json();

        // Si la autenticación es exitosa, obtener el nombre de usuario y el rol del usuario y mostrar el mensaje flotante
        if (response.ok) {
            const token = data.jwt;
            const userInfoResponse = await fetch('http://localhost:1337/api/users/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const userData = await userInfoResponse.json();

            // Obtener el nombre de usuario y el rol del usuario
            const username = userData.username;
            const userRole = userData.role;

            // Crear el mensaje de bienvenida con el nombre de usuario y el rol
            const welcomeMessage = `¡Bienvenido, ${username}! Tu rol es: ${userRole}`;

            // Mostrar el mensaje flotante
            showFloatingMessage(welcomeMessage);
        }

        return data;
    } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        throw error;
    }
}

// Llamar a la función de inicio de sesión con las credenciales del usuario
login('nombredeusuario', 'contraseña');

// Evento para cerrar el mensaje flotante haciendo clic en el botón "Cerrar"
var closeButton = document.getElementById("closeButton");
closeButton.onclick = function() {
    var floatingMessage = document.getElementById("floatingMessage");
    floatingMessage.classList.add("hidden");
};
