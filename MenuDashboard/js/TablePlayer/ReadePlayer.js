// Inicialización de modales
document.addEventListener("DOMContentLoaded", function () {
  const modals = ["playerModal", "playerModalUpda", "playerModalDelet"];
  modals.forEach(modalId => document.getElementById(modalId).style.display = "none");
 
  document.getElementById("miBoton").addEventListener("click", () => document.getElementById("playerModal").style.display = "block");
 
  document.querySelectorAll(".close").forEach(button => button.addEventListener("click", () => {
     // @ts-ignore
     const modalId = button.dataset.modal;
     document.getElementById(modalId).style.display = "none";
  }));
 
  window.onclick = function (event) {
     if (event.target.classList.contains("modal")) {
       // @ts-ignore
       document.querySelectorAll(".modal").forEach(modal => modal.style.display = "none");
     }
  };
 });
 
 // Fetch de datos
 fetch("http://localhost:1337/api/players")
  .then(res => {
     if (!res.ok) throw new Error("Network response was not ok");
     return res.json();
  })
  .then(data => {
     if (data && data.data && data.data.length > 0) {
       const temp = data.data.map(itemData => {
         if (itemData.id && itemData.attributes && itemData.attributes.name && itemData.attributes.age) {
           return `<tr>
                     <td>${itemData.id}</td>
                     <td>${itemData.attributes.name}</td>
                     <td>${itemData.attributes.age}</td>
                     <td>${itemData.attributes.height}</td>
                     <td>${itemData.attributes.gender}</td>
                     <td>${itemData.attributes.position}</td>
                     <td><button id="miBtnUpdate" onclick="editarItem(${itemData.id})"><i class="bi bi-pencil-square"></i></button></td>
                     <td><button id="miBtnDelete" onclick="eliminarItem(${itemData.id})"><i class="bi bi-trash3"></i></button></td>
                  </tr>`;
         } else {
           console.error("Campo(s) undefined en el siguiente objeto:", itemData);
           return '';
         }
       }).join('');
 
       document.getElementById('data').innerHTML = temp;
     } else {
       console.error("Los datos recibidos no tienen el formato esperado.");
     }
  })
  .catch(error => console.error("Error fetching data:", error));
 
 // Funciones de edición y eliminación
 function editarItem(itemId) {
  console.log("Editar item con ID:", itemId);
  window.location.href = '/MenuDashboard/html/UpdatePlayer.html?id=' + itemId;
 }
 
 function eliminarItem(itemId) {
  console.log("Eliminar item con ID:", itemId);
  if (confirm("¿Estás seguro de que deseas eliminar este jugador?")) {
     document.getElementById('playerModalDelet').style.display = 'block';
  }
 }
 
 // Funciones de formulario y mensajes
 function submitForm() {
  console.log("Formulario enviado");
  mostrarMensajeExito("Jugador creado o actualizado exitosamente.");
 }
 
 function mostrarMensajeExito(mensaje) {
  document.getElementById('successMessage').innerHTML = mensaje;
  document.getElementById('successModal').style.display = 'block';
 }
 
 function closeSuccessModal() {
  document.getElementById('successModal').style.display = 'none';
 }
 
