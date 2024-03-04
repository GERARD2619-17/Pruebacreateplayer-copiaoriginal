function submitForm() {
    // @ts-ignore
    const playerId = document.getElementById("playerId").value; // Obtener el ID del jugador a modificar
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
  
  
    const playerData = new FormData();
    playerData.append("data", JSON.stringify({ 
      name, 
      age, 
      height, 
      gender, 
      position }));
      playerData.append("id", playerId); // Agrega el ID del jugador al FormData
  
    sendToStrapi(playerData);
  }
  
  function sendToStrapi(playerData) {
    const playerId = playerData.get("id");
  
    fetch(`http://localhost:1337/api/players/${playerId}`, {
      method: 'PUT', 
      body: playerData,
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      showSuccessMessage();
      // Redirige al usuario a una página ficticia de inicio.
      window.location.href = 'MenuDashboard/html/ReaderPlayer.html';
    })
    .catch((error) => {
      console.error('Error al enviar datos:', error);
    });
    showSuccessModal();
  }  