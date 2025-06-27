let usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];

const formulario = document.getElementById("formLogin");
const btnRegistrar = document.getElementById("btnRegistrar");

// LOGIN
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const clave = document.getElementById("clave").value.trim();

  const usuario = usuariosRegistrados.find(
    (u) => u.correo === correo && u.clave === clave
  );

  if (usuario) {
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
    window.location.href = "index.html";
  } else {
    mostrarMensaje("Usuario no encontrado. Regístrate primero.", true);
  }
});

// REGISTRO
btnRegistrar.addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const clave = document.getElementById("clave").value.trim();

  const existe = usuariosRegistrados.some((u) => u.correo === correo);
  if (existe) {
    mostrarMensaje("Ese correo ya está registrado.", true);
    return;
  }

  const nuevoUsuario = { nombre, correo, clave };
  usuariosRegistrados.push(nuevoUsuario);

  localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));
  sessionStorage.setItem("usuario", JSON.stringify(nuevoUsuario));

  mostrarMensaje("Registro exitoso. ¡Bienvenido!");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);
});

function mostrarMensaje(texto, esError = false) {
  const mensaje = document.getElementById("mensaje");
  mensaje.textContent = texto;
  mensaje.style.color = esError ? "red" : "green";
}
