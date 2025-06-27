document.addEventListener("DOMContentLoaded", () => {
  const botonesComprar = document.querySelectorAll(".producto button");
  const contador = document.getElementById("contador-carrito");

  function actualizarContador() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    contador.textContent = total;
  }

  botonesComprar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
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
      actualizarContador();
    });
  });

  actualizarContador(); // Al cargar la página
});
