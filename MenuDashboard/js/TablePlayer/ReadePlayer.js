/**********************************************************************************************************/
// Obtener datos de la tabla este lo redirige al formulario
fetch("http://localhost:1337/api/players")
  .then(res => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  })
  .then(data => {
    console.log(data);

    if (data && data.data && data.data.length > 0) {
      var temp = "";

      data.data.forEach(itemData => {
        if (itemData.id && itemData.attributes && itemData.attributes.name && itemData.attributes.age) {
          temp += `<tr>`;
          temp += `<td>${itemData.id}</td>`;
          temp += `<td>${itemData.attributes.name}</td>`;
          temp += `<td>${itemData.attributes.age}</td>`;
          temp += `<td>${itemData.attributes.height}</td>`;
          temp += `<td>${itemData.attributes.gender}</td>`;
          temp += `<td>${itemData.attributes.position}</td>`;
         /* temp += `<td><button id="miBtnReade" onclick="editarItem(${itemData.id})"><i class="bi bi-file-text-fill"></i></i></button></td>`;*/
          temp += `<td><button id="miBtnUpdate" onclick="editarItem(${itemData.id})"><i class="bi bi-pencil-square"></i></button></td>`; //boton editar
          temp += `<td><button id="miBtnDelete" onclick="eliminarItem(${itemData.id})"><i class="bi bi-trash3"></i></button></td>`;//boton eliminiar
          temp += `</tr>`;
          
        } else {
          console.error("Campo(s) undefined en el siguiente objeto:", itemData);
        }
      });

      document.getElementById('data').innerHTML = temp;
    } else {
      console.error("Los datos recibidos no tienen el formato esperado.");
    }
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });

  function mostrarMensajeExito(mensaje) {
  // Muestra el modal de éxito con el mensaje proporcionado
  document.getElementById('successMessage').innerHTML = mensaje;
  document.getElementById('successModal').style.display = 'block';
 }
 
 function closeSuccessModal() {
  document.getElementById('successModal').style.display = 'none';
}
