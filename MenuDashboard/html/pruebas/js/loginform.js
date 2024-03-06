document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    // @ts-ignore
    const email = document.getElementById("email").value;
    // @ts-ignore
    const password = document.getElementById("password").value;

    try {
        const response = await fetch('http://localhost:1337/api/auth/local', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier: email,
                password: password
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            // Aquí puedes guardar el token de sesión en el almacenamiento local
            localStorage.setItem('token', data.jwt);
            // Redirige a la página de Dashboard o la página principal según el rol del usuario
            if (data.user.role === 'superAdmin' || data.user.role === 'admin') {
                window.location.href = "/MenuDashboard/html/Dashboard.html";
            } else {
                window.location.href = "/MenuDashboard/html/ReaderPlayer.html";
            }
        } else {
            // Manejar errores de inicio de sesión
            alert(data.message);
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
});
