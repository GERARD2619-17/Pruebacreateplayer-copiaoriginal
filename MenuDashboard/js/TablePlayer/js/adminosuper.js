document.addEventListener("DOMContentLoaded", async () => {
    // Obtener el token de autenticación desde localStorage
    const token = localStorage.getItem('token');
  
    if (token) {
      try {
        // Decodificar el token para obtener la información del usuario, incluido su rol
        // @ts-ignore
        const decodedToken = jwt_decode(token);
        
        // Obtener el rol del usuario del token decodificado
        const userRole = decodedToken.role;
  
        // Mostrar el rol de usuario en la consola para verificar
        console.log("Rol de usuario detectado:", userRole);
  
        // Resto del código...
        
        // Obtener datos de la tabla este lo redirige al formulario
        const data = await fetch("http://localhost:1337/api/players");
        const jsonData = await data.json();
  
        if (jsonData && jsonData.data && jsonData.data.length > 0) {
          var temp = "";
  
          jsonData.data.forEach(itemData => {
            if (itemData.id && itemData.attributes && itemData.attributes.name && itemData.attributes.age) {
              temp += `<tr>`;
              temp += `<td>${itemData.id}</td>`;
              temp += `<td>${itemData.attributes.name}</td>`;
              temp += `<td>${itemData.attributes.age}</td>`;
              temp += `<td>${itemData.attributes.height}</td>`;
              temp += `<td>${itemData.attributes.gender}</td>`;
              temp += `<td>${itemData.attributes.position}</td>`;
  
              // Condición para ocultar botones según el rol
              if (userRole !== 'Administrador') {
                temp += `<td><button onclick="editarItem(${itemData.id})">Editar</button></td>`;
                temp += `<td><button onclick="eliminarItem(${itemData.id})">Eliminar</button></td>`;
              } else {
                // Si el usuario es administrador, no mostrar los botones
                temp += `<td style="display: none;"></td>`;
                temp += `<td style="display: none;"></td>`;
              }
  
              temp += `</tr>`;
            } else {
              console.error("Campo(s) undefined en el siguiente objeto:", itemData);
            }
          });
  
          document.getElementById('data').innerHTML = temp;
        } else {
          console.error("Los datos recibidos no tienen el formato esperado.");
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    } else {
      console.error('No se encontró ningún token de autenticación en localStorage');
    }
  });
  
  // Lógica para editar el item con el ID especificado
  function editarItem(itemId) {
    console.log("Editar item con ID:", itemId);
    mostrarFormularioEdicion(itemId);
    window.location.href = '/MenuDashboard/html/UpdatePlayer.html?id=' + itemId;
  }
  
  // Lógica para eliminar el item con el ID especificado
  function eliminarItem(itemId) {
    console.log("Eliminar item con ID:", itemId);
    var confirmacion = confirm("¿Estás seguro de que deseas eliminar este jugador?");
    if (confirmacion) {
      console.log("Item eliminado con ID:", itemId);
      window.location.href = '/MenuDashboard/html/DeletePlayer.html?id=' + itemId;
    }
  }
     