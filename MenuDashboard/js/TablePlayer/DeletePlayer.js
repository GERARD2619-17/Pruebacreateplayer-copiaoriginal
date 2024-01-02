function deletePlayer() {
    // Obtén el valor del campo 'id' del formulario
    // @ts-ignore
    var playerId = document.getElementById("id").value;
  
    // Construye la URL del endpoint de eliminación de jugadores
    var apiUrl = "http://localhost:1337/api/players/" + playerId;
  
    // Realiza la solicitud DELETE
    fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Jugador eliminado:', data);
      // Puedes realizar acciones adicionales después de eliminar el jugador si es necesario
    })
    .catch(error => {
      console.error('Error al eliminar el jugador:', error);
      // Manejo de errores aquí
    });
  }
  
  // Asigna la función deletePlayer al botón de actualización
  document.querySelector('button').addEventListener('click', deletePlayer);
  