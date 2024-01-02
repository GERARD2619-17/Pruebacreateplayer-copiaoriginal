/*para modal formulario*/
/*-------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
  // Oculta el modal al cargar la página
  document.getElementById("playerModal").style.display = "none";

  // Agrega un escuchador de eventos al botón "Crear Jugador"
  document.getElementById("miBoton").addEventListener("click", function () {
    // Muestra el modal
    document.getElementById("playerModal").style.display = "block";
  });

  // Agrega un escuchador de eventos al botón de cerrar del modal
  document.getElementById("closeModal").addEventListener("click", function () {
    // Oculta el modal al hacer clic en el botón de cerrar
    document.getElementById("playerModal").style.display = "none";
  });

  // Cierra el modal haciendo clic fuera del contenido
  window.onclick = function (event) {
    // Verifica si se hizo clic en el área de fondo del modal
    if (event.target.id === "playerModal") {
      // Oculta el modal
      document.getElementById("playerModal").style.display = "none";
    }
  };
});
/*-------------------------------------------------*/
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
          temp += `<td><button onclick="editarItem(${itemData.id})">Editar</button></td>`;
          temp += `<td><button onclick="eliminarItem(${itemData.id})">Eliminar</button></td>`;
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

function mostrarFormularioEdicion(itemId) {
  // Usa el mismo fetch para obtener los detalles del jugador con el ID especificado
  fetch(`http://localhost:1337/api/players/${itemId}`)
    .then(res => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then(jugador => {
      // Verifica que se haya obtenido el jugador
      if (jugador && jugador.id) {
        // Preenche los campos del formulario con los datos existentes
        // @ts-ignore
        document.getElementById('name').value = jugador.attributes.name || "";
        // @ts-ignore
        document.getElementById('age').value = jugador.attributes.age || "";
        // @ts-ignore
        document.getElementById('height').value = jugador.attributes.height || "";
        // @ts-ignore
        document.getElementById('gender').value = jugador.attributes.gender || "";
        // @ts-ignore
        document.getElementById('position').value = jugador.attributes.position || "";

        // Muestra el formulario de edición
        document.getElementById('playerForm').style.display = 'block';
      } else {
        console.error("No se pudo obtener el jugador con ID:", itemId);
      }
    })
    .catch(error => {
      console.error("Error fetching player data:", error);
    });
}


/*function editarItem(itemId) {
  // Lógica para editar el item con el ID especificado
  console.log("Editar item con ID:", itemId);

  // Muestra el formulario de edición
  mostrarFormularioEdicion(itemId);

  // Redirige a la página de edición con el ID del jugador como parámetro
  //window.location.href = `players.html?id=${itemId}`;
  window.location.href = '/tablasprueba/players.html?id=' + itemId;

}//fin del bloque que se comento */

function editarItem(itemId) {
    // Lógica para editar el item con el ID especificado
    console.log("Editar item con ID:", itemId);
  
    // Muestra el formulario de edición
    mostrarFormularioEdicion(itemId);
  
    // Redirige a la página de edición con el ID del jugador como parámetro
    window.location.href = '/MenuDashboard/html/UpdatePlayer.html?id=' + itemId;
  }
  
function eliminarItem(itemId) {
  // Lógica para eliminar el item con el ID especificado
  console.log("Eliminar item con ID:", itemId);

  // Puedes agregar la lógica para confirmar y luego eliminar el item
  // Por ejemplo, puedes usar una confirmación o un modal para pedir confirmación.
  var confirmacion = confirm("¿Estás seguro de que deseas eliminar este jugador?");
  if (confirmacion) {
    // Lógica para eliminar el item con el ID especificado
    console.log("Item eliminado con ID:", itemId);
    // Redirige a la página de edición con el ID del jugador como parámetro
    window.location.href = '/MenuDashboard/html/DeletePlayer.html?id=' + itemId;
  }
}

function submitForm() {
  // Lógica para enviar el formulario (crear o actualizar jugador)
  // Puedes utilizar fetch para enviar una solicitud POST o PUT a tu API.
  console.log("Formulario enviado");
  // Después de enviar el formulario, puedes mostrar un mensaje de éxito
  mostrarMensajeExito("Jugador creado o actualizado exitosamente.");
  
}

function mostrarMensajeExito(mensaje) {
  // Muestra el modal de éxito con el mensaje proporcionado
  document.getElementById('successMessage').innerHTML = mensaje;
  document.getElementById('successModal').style.display = 'block';

}

function closeSuccessModal() {
  // Cierra el modal de éxito
  document.getElementById('successModal').style.display = 'none';
}

