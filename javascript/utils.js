// utils.js
export function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  const contador = document.getElementById("contadorCarrito");
  if (contador) {
    contador.textContent = total;
  }
}
