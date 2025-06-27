document.addEventListener("DOMContentLoaded", () => {
  const usuarioActivo = JSON.parse(sessionStorage.getItem("usuario"));
  const nombreSpan = document.getElementById("nombreUsuario");
  const cerrarSesionBtn = document.getElementById("cerrarSesion");

  if (usuarioActivo) {
    if (nombreSpan) nombreSpan.textContent = `USSER: ${usuarioActivo.nombre}`;
    if (cerrarSesionBtn) {
      cerrarSesionBtn.addEventListener("click", () => {
        sessionStorage.removeItem("usuario");
        window.location.href = "index.html";
      });
    }
  } else {
    if (nombreSpan) nombreSpan.textContent = "";
    if (cerrarSesionBtn) cerrarSesionBtn.style.display = "none";
  }
});




