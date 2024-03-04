// JavaScript para crear jugador
function submitFormCreate() {
    // @ts-ignore
    const name = document.getElementById("nameCreate").value;
    // @ts-ignore
    const age = document.getElementById("ageCreate").value;
    // @ts-ignore
    const height = document.getElementById("heightCreate").value;
    // @ts-ignore
    const gender = document.getElementById("genderCreate").value;
    // @ts-ignore
    const position = document.getElementById("positionCreate").value;
  
    const playerData = new FormData();
    playerData.append("name", name);
    playerData.append("age", age);
    playerData.append("height", height);
    playerData.append("gender", gender);
    playerData.append("position", position);
  
    sendToStrapi(playerData); // función sendToStrapi() definida en tu código
  }
  
  // JavaScript para editar jugador
  function updatePlayer() {
    // @ts-ignore
    const playerId = document.getElementById("playerIdUpdate").value;
    // @ts-ignore
    const name = document.getElementById("nameUpdate").value;
    // @ts-ignore
    const age = document.getElementById("ageUpdate").value;
    // @ts-ignore
    const height = document.getElementById("heightUpdate").value;
    // @ts-ignore
    const gender = document.getElementById("genderUpdate").value;
    // @ts-ignore
    const position = document.getElementById("positionUpdate").value;
  
    const playerData = new FormData();
    playerData.append("data", JSON.stringify({  
        name,  
        age,  
        height,  
        gender,  
        position  
    }));
    playerData.append("id", playerId);
  
    sendToStrapi(playerData); // función sendToStrapi() definida en tu código
  }
  
  // JavaScript para eliminar jugador
  function deletePlayer() {
    // @ts-ignore
    const playerId = document.getElementById("idDelete").value;
  
    fetch(`http://localhost:1337/api/players/${playerId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Aquí puedes mostrar un mensaje de éxito o realizar alguna otra acción si es necesario
    })
    .catch((error) => {
        console.error('Error al eliminar el jugador:', error);
    });
  }
  