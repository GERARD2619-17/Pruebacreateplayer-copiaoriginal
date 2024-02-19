// Suponiendo que tienes el token de autenticación del usuario almacenado en una variable llamada token
const token = '...'; // Aquí deberías obtener el token de tu aplicación

// Suponiendo que tienes la URL de la API de Strapi para obtener la información del usuario y sus roles y permisos
const apiUrl = 'http://localhost:1337/api/users/me';

// Configuración de la petición HTTP
const options = {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
};

// Realizar la solicitud a la API de Strapi
fetch(apiUrl, options)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al obtener la información del usuario');
    }
    return response.json();
  })
  .then(data => {
    // Aquí puedes acceder a la información del usuario, incluidos sus roles y permisos
    console.log('Información del usuario:', data);
    
    // Por ejemplo, para acceder a los roles del usuario
    const roles = data.roles;
    console.log('Roles del usuario:', roles);
    
    // Y para acceder a los permisos
    const permisos = data.permisos;
    console.log('Permisos del usuario:', permisos);
    
    // Luego, puedes verificar los roles y permisos y realizar acciones en consecuencia en tu aplicación
    if (roles.includes('admin')) {
      console.log('El usuario tiene el rol de administrador. Puede acceder a todas las funciones de administración.');
      // Realizar acciones específicas para usuarios con el rol de administrador
    } else if (roles.includes('editor')) {
      console.log('El usuario tiene el rol de editor. Puede editar contenido.');
      // Realizar acciones específicas para usuarios con el rol de editor
    } else {
      console.log('El usuario tiene un rol desconocido o no tiene roles asignados.');
      // Realizar acciones por defecto para usuarios sin roles específicos
    }
    
    // Aquí también podrías verificar los permisos específicos y realizar acciones en consecuencia
    // Por ejemplo, si el usuario tiene permisos específicos para una función en particular
    if (permisos.includes('crear')) {
      console.log('El usuario tiene permiso para crear contenido.');
      // Realizar acciones específicas para usuarios con permisos de creación
    } else {
      console.log('El usuario no tiene permiso para crear contenido.');
      // Realizar acciones en caso de que el usuario no tenga permisos de creación
    }
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
