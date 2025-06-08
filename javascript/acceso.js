// Array 
const estudiantes = [
  { nombre: "Camila", edad: 20, clave: "cami123" },
  { nombre: "Leandro", edad: 22, clave: "leandro456" },
  { nombre: "Carlos", edad: 19, clave: "carlos789" },
  { nombre: "Laura", edad: 21, clave: "laura321" }
];

let intentosMaximos = 3;

//Para verificar si un estudiante está registrado
function verificarEstudiante(nombre, edad, clave) {
  return estudiantes.some(est => 
    est.nombre.toLowerCase() === nombre.toLowerCase().trim() &&
    est.edad === edad &&
    est.clave === clave
  );
}
//Para autenticar estudiante
function autenticarEstudiante() {
  let intentos = 0;

  while (intentos < intentosMaximos) {
    let nombre = prompt("Ingresa tu nombre:");
    if (nombre === null) return alert("Autenticación cancelada.");

    let edad = parseInt(prompt("Ingresa tu edad:"));
    if (isNaN(edad)) {
      alert("Edad inválida.");
      continue;
    }

    let clave = prompt("Ingresa tu contraseña:");
    if (clave === null) return alert("Autenticación cancelada.");

    if (verificarEstudiante(nombre, edad, clave)) {
      alert(`¡Bienvenid@ ${nombre}!\nAcceso concedido.`);
      console.log("Acceso exitoso:", nombre);
      return;
    } else {
      alert("Datos incorrectos.\n Se te ha denegado el acceso.");
      console.log("Intento fallido:", { nombre, edad, clave });
      intentos++;
    }
  }

  alert("Se han superado el número máximo de intentos.");
}

// Función principal
function iniciarSimulador() {
  console.log("Iniciando simulador de autenticación...");
  const deseaIngresar = confirm("¿Deseas intentar ingresar a la clase?");
  if (deseaIngresar) {
    autenticarEstudiante();
  } else {
    alert("Hasta la próxima.");
  }
}

// Con esta se llama al simulador 
iniciarSimulador();
