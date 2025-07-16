document.addEventListener("DOMContentLoaded", () => {
  const usuarioActivo = JSON.parse(sessionStorage.getItem("usuario"));
  const nombreSpan = document.getElementById("nombreUsuario");
  const cerrarSesionBtn = document.getElementById("cerrarSesion");
  const botonLoginGrande = document.getElementById("botonLoginGrande");
  const btnLoginHeader = document.getElementById("btnLoginHeader"); // NUEVO

  if (usuarioActivo) {
    if (nombreSpan) nombreSpan.textContent = `USUARIO: ${usuarioActivo.nombre}`;
    if (cerrarSesionBtn) {
      cerrarSesionBtn.style.display = "inline-block";
      cerrarSesionBtn.addEventListener("click", () => {
        sessionStorage.removeItem("usuario");
        window.location.href = "index.html";
      });
    }
    if (botonLoginGrande) botonLoginGrande.style.display = "none";
    if (btnLoginHeader) btnLoginHeader.style.display = "none"; // OCULTAR header login
  } else {
    if (nombreSpan) nombreSpan.textContent = "";
    if (cerrarSesionBtn) cerrarSesionBtn.style.display = "none";
    if (botonLoginGrande) botonLoginGrande.style.display = "block";
    if (btnLoginHeader) btnLoginHeader.style.display = "inline-block"; // MOSTRAR header login
  }
});
