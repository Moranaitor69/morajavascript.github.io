document.addEventListener("DOMContentLoaded", () => {
  const nombreUsuario = document.getElementById("nombreUsuario");
  const btnCerrarSesion = document.getElementById("cerrarSesion");
  const btnLoginHeader = document.getElementById("btnLoginHeader");

  // Verificar si hay sesión activa
  const usuario = JSON.parse(sessionStorage.getItem("usuario"));

  if (usuario) {
    // Mostrar nombre y botón cerrar sesión
    nombreUsuario.textContent = `Hola, ${usuario.nombre}`;
    btnCerrarSesion.style.display = "inline-block";
    if (btnLoginHeader) btnLoginHeader.style.display = "none";
  } else {
    // Si no hay sesión, ocultar botón cerrar sesión y nombre
    nombreUsuario.textContent = "";
    btnCerrarSesion.style.display = "none";
    if (btnLoginHeader) btnLoginHeader.style.display = "inline-block";
  }

  // Cerrar sesión
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", () => {
      // ❌ Eliminar sesión
      sessionStorage.removeItem("usuario");

      // ❌ Vaciar carrito
      localStorage.removeItem("carrito");

      // ❌ (Opcional) Resetear contador visual si lo tienes
      const contador = document.getElementById("contadorCarrito");
      if (contador) contador.textContent = "0";

      // ✅ Mostrar mensaje y redirigir
      Swal.fire({
        icon: "info",
        title: "Sesión cerrada",
        text: "Se ha cerrado sesión y se vació el carrito.",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "index.html";
      });
    });
  }
});
