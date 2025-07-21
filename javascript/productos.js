// productos.js
import { actualizarContadorCarrito } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const botonesComprar = document.querySelectorAll(".producto button");

  botonesComprar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const usuarioLogueado = sessionStorage.getItem("usuario");

      if (!usuarioLogueado) {
        Swal.fire({
          icon: "warning",
          title: "Debes iniciar sesión",
          text: "Por favor inicia sesión para agregar productos al carrito",
          confirmButtonText: "Ir al login"
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "login.html";
          }
        });
        return;
      }

      //  Obtener datos del producto desde la tarjeta HTML
      const tarjeta = e.target.closest(".producto");
      const nombre = tarjeta.querySelector("p:nth-of-type(1)").textContent;
      const precioTexto = tarjeta.querySelector(".precio").textContent;
      const precio = parseInt(precioTexto.replace(/\D/g, ''));

      const producto = { nombre, precio, cantidad: 1 };

      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

      const index = carrito.findIndex(p => p.nombre === producto.nombre);
      if (index !== -1) {
        carrito[index].cantidad++;
      } else {
        carrito.push(producto);
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarContadorCarrito();

      Swal.fire({
        icon: "success",
        title: "Producto agregado",
        text: `${nombre} fue agregado al carrito.`,
        timer: 1500,
        showConfirmButton: false,
      });
    });
  });

  actualizarContadorCarrito();
});
