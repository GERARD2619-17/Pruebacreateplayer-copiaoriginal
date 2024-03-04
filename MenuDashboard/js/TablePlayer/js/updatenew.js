// Función para actualizar un jugador
async function updatePlayer() {
  // Obtén los valores de los campos del formulario
  // @ts-ignore
  const playerId = document.getElementById("playerId").value;
  // @ts-ignore
  const name = document.getElementById("name").value;
  // @ts-ignore
  const age = document.getElementById("age").value;
  // @ts-ignore
  const height = document.getElementById("height").value;
  // @ts-ignore
  const gender = document.getElementById("gender").value;
  // @ts-ignore
  const position = document.getElementById("position").value;

  // Prepara los datos del jugador para la actualización
  const playerData = {
    name,
    age,
    height,
    gender,
    position
  };

  // Recupera el token de autenticación de localStorage
  const token = localStorage.getItem('token');

  // Realiza la solicitud PUT a la API de Strapi para actualizar el jugador
  try {
    const response = await fetch(`http://localhost:1337/api/players/${playerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Usa el token de autenticación recuperado
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(playerData)
    });

    if (!response.ok) {
      throw new Error('La actualización del jugador falló');
    }

    const data = await response.json();
    console.log('Éxito:', data);
    showSuccessModal();
    window.location.href = '/MenuDashboard/html/ReaderPlayer.html';
  } catch (error) {
    console.error('Error:', error);
  }
}

// Función para mostrar el modal de éxito
function showSuccessModal() {
  const modal = document.getElementById("successModal");
  modal.style.display = "block";
}

// Evento para cerrar el modal
document.addEventListener("DOMContentLoaded", function() {
  const closeButtons = document.querySelectorAll(".close");
  closeButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      const modalId = this.getAttribute("data-modal");
      closeModal(modalId);
    });
  });
});

// Función para cerrar el modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "none";
}
