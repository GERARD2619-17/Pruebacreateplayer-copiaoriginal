document.addEventListener('DOMContentLoaded', function() {
    const modalContent = document.querySelector('.modal-content');

    // Función para abrir el modal y cargar el contenido dinámicamente
    function openModalAndLoadContent(modalId, contentUrl, scriptUrl) {
        const modal = document.getElementById(modalId);
        fetch(contentUrl)
            .then(response => response.text())
            .then(data => {
                modalContent.innerHTML = data;
                const script = document.createElement('script');
                script.src = scriptUrl;
                document.body.appendChild(script);
            })
            .catch(error => console.error('Error al cargar el contenido del modal:', error));
    }

    // Ejemplo de cómo abrir el modal de crear jugador
    document.getElementById('miBoton').addEventListener('click', function() {
        openModalAndLoadContent('playerModal', 'CreatePlayer.html', 'CreatePlayer.js');
    });

    // Ejemplo de cómo abrir el modal de eliminar jugador
    document.getElementById('miBtnDelete').addEventListener('click', function() {
        openModalAndLoadContent('playerModalDelet', 'DeletePlayer.html', 'DeletePlayer.js');
    });

    // Ejemplo de cómo abrir el modal de actualizar jugador
    document.getElementById('miBtnUpdate').addEventListener('click', function() {
        openModalAndLoadContent('playerModalUpda', 'UpdatePlayer.html', 'UpdatePlayer.js');
    });
});
