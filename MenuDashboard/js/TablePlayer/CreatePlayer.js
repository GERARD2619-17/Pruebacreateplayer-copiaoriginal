// Código para crear un jugador
function submitFormCreate() {
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

  const imageInput = document.getElementById("image");
  // @ts-ignore
  const image = imageInput.files[0]; // Obtener el primer archivo (asumimos que solo se permite un archivo)

  const playerData = new FormData();
  playerData.append("data", JSON.stringify({ 
    name, 
    age, 
    height, 
    gender, 
    position }));
  playerData.append("files.image", image);

  sendCreationToStrapi(playerData);
}

function sendCreationToStrapi(playerData) {
  fetch('http://localhost:1337/api/players', {
    method: 'POST',
    body: playerData,
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    // @ts-ignore
    showCreationSuccessMessage();
  })
  .catch((error) => {
    console.error('Error al enviar datos:', error);
  });
  showCreationSuccessModal();
}

function showCreationSuccessModal() {
  const modal = document.getElementById("createSuccessModal");
  const successMessageElement = document.getElementById("createSuccessMessage");

  successMessageElement.innerText = '¡El jugador se ha creado con éxito!';
  modal.style.display = "block";
}

function closeSuccessModal() {
  const modal = document.getElementById("successModal");
  modal.style.display = "none";
  window.location.href = 'MenuDashboard/html/ReaderPlayer.html';
}

function showSuccessMessage() {
  throw new Error("Function not implemented.");
}
