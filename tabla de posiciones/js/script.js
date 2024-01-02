let equipos = {};
  let equipoSeleccionado = '';

  function agregarPartido() {
    // @ts-ignore
    const equipo1 = document.getElementById('equipo1').value.trim();
    // @ts-ignore
    const resultado1 = parseInt(document.getElementById('resultado1').value);
    // @ts-ignore
    const equipo2 = document.getElementById('equipo2').value.trim();
    // @ts-ignore
    const resultado2 = parseInt(document.getElementById('resultado2').value);

    if (equipo1 === '' || equipo2 === '' || isNaN(resultado1) || isNaN(resultado2)) {
      mostrarMensaje('Todos los campos son obligatorios y deben ser números.');
      return;
    }

    actualizarTabla(equipo1, resultado1, equipo2, resultado2);
    limpiarFormulario();
  }

  function actualizarTabla(equipo1, resultado1, equipo2, resultado2) {
    // Actualizar los datos de la tabla de posiciones
    actualizarEquipo(equipo1, resultado1, resultado2);
    actualizarEquipo(equipo2, resultado2, resultado1);

    // Ordenar y mostrar la tabla actualizada
    mostrarTabla();
    mostrarMensaje('Partido agregado correctamente.', 'success');
  }

  function actualizarEquipo(nombreEquipo, golesFavor, golesContra) {
    if (!equipos[nombreEquipo]) {
      equipos[nombreEquipo] = { puntos: 0, diferenciaGoles: 0 };
    }

    equipos[nombreEquipo].puntos += calcularPuntos(golesFavor, golesContra);
    equipos[nombreEquipo].diferenciaGoles += golesFavor - golesContra;
  }

  function calcularPuntos(golesFavor, golesContra) {
    if (golesFavor > golesContra) {
      return 3; // Gana el equipo
    } else if (golesFavor === golesContra) {
      return 1; // Empate
    } else {
      return 0; // Pierde el equipo
    }
  }

  function mostrarTabla() {
    const tabla = document.querySelector('.table tbody');

    // Limpiar la tabla antes de actualizarla
    tabla.innerHTML = '';

    // Ordenar equipos por puntos y diferencia de goles
    const equiposOrdenados = Object.entries(equipos).sort((a, b) => {
      if (b[1].puntos !== a[1].puntos) {
        return b[1].puntos - a[1].puntos;
      } else {
        return b[1].diferenciaGoles - a[1].diferenciaGoles;
      }
    });

    // Llenar la tabla con los datos ordenados
    equiposOrdenados.forEach((equipo) => {
      // @ts-ignore
      const fila = tabla.insertRow();
      const celdaEquipo = fila.insertCell(0);
      const celdaPuntos = fila.insertCell(1);
      const celdaDiferenciaGoles = fila.insertCell(2);
      const celdaAcciones = fila.insertCell(3);

      celdaEquipo.textContent = equipo[0];
      celdaPuntos.textContent = equipo[1].puntos;
      celdaDiferenciaGoles.textContent = equipo[1].diferenciaGoles;

      const botonModificar = document.createElement('button');
      botonModificar.className = 'btn btn-primary btn-sm mr-2';
      botonModificar.textContent = 'Modificar';
      botonModificar.addEventListener('click', () => abrirModalModificar(equipo[0]));
      celdaAcciones.appendChild(botonModificar);

      const botonEliminar = document.createElement('button');
      botonEliminar.className = 'btn btn-danger btn-sm';
      botonEliminar.textContent = 'Eliminar';
      botonEliminar.addEventListener('click', () => eliminarEquipo(equipo[0]));
      celdaAcciones.appendChild(botonEliminar);
    });
  }

  function abrirModalModificar(nombreEquipo) {
    equipoSeleccionado = nombreEquipo;
    // @ts-ignore
    $('#modalModificar').modal('show');
  }

  function modificarResultados() {
    // @ts-ignore
    const nuevoResultado1 = parseInt(document.getElementById('nuevoResultado1').value);
    // @ts-ignore
    const nuevoResultado2 = parseInt(document.getElementById('nuevoResultado2').value);

    if (isNaN(nuevoResultado1) || isNaN(nuevoResultado2)) {
      mostrarMensaje('Los nuevos resultados deben ser números.');
      return;
    }

    const antiguoResultado1 = parseInt(prompt('Ingresa el resultado anterior del equipo ' + equipoSeleccionado + ' (Equipo 1):'));
    const antiguoResultado2 = parseInt(prompt('Ingresa el resultado anterior del equipo ' + equipoSeleccionado + ' (Equipo 2):'));

    if (isNaN(antiguoResultado1) || isNaN(antiguoResultado2)) {
      mostrarMensaje('Los resultados anteriores deben ser números.');
      return;
    }

    // Actualizar la tabla
    equipos[equipoSeleccionado].puntos -= calcularPuntos(antiguoResultado1, antiguoResultado2);
    equipos[equipoSeleccionado].diferenciaGoles -= antiguoResultado1 - antiguoResultado2;

    equipos[equipoSeleccionado].puntos += calcularPuntos(nuevoResultado1, nuevoResultado2);
    equipos[equipoSeleccionado].diferenciaGoles += nuevoResultado1 - nuevoResultado2;

    // Cerrar el modal y mostrar la tabla actualizada
    // @ts-ignore
    $('#modalModificar').modal('hide');
    mostrarTabla();
    mostrarMensaje('Resultados modificados correctamente.', 'success');
  }

  function eliminarEquipo(nombreEquipo) {
    if (confirm('¿Estás seguro de eliminar al equipo ' + nombreEquipo + '?')) {
      delete equipos[nombreEquipo];
      mostrarTabla();
      mostrarMensaje('Equipo eliminado correctamente.', 'success');
    }
  }

  function limpiarFormulario() {
    // @ts-ignore
    document.getElementById('equipo1').value = '';
    // @ts-ignore
    document.getElementById('resultado1').value = '';
    // @ts-ignore
    document.getElementById('equipo2').value = '';
    // @ts-ignore
    document.getElementById('resultado2').value = '';
  }

  function mostrarMensaje(mensaje, tipo = 'danger') {
    const mensajeElemento = document.getElementById('mensaje');
    mensajeElemento.textContent = mensaje;
    mensajeElemento.className = 'alert alert-' + tipo;
    mensajeElemento.classList.remove('d-none');

    setTimeout(() => {
      mensajeElemento.classList.add('d-none');
    }, 3000);
  }