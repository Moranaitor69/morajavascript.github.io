const contenedor = document.getElementById("carrito");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function renderCarrito() {
    contenedor.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>No hay productos en el carrito.</p>";
        return;
    }

    carrito.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        const item = document.createElement("div");
        item.className = "item";
        item.innerHTML = `
      <p><strong>${producto.nombre}</strong> - Cantidad: ${producto.cantidad}</p>
      <div class="acciones">
        <p>$${subtotal.toLocaleString()}</p>
        <button onclick="restar(${index})">-</button>
        <button onclick="eliminar(${index})">Eliminar</button>
      </div>
    `;
        contenedor.appendChild(item);
    });

    const totalDiv = document.createElement("div");
    totalDiv.className = "total";
    totalDiv.textContent = `Total: $${total.toLocaleString()}`;
    contenedor.appendChild(totalDiv);
}

function restar(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
    } else {
        carrito.splice(index, 1);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
}

function eliminar(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
}

renderCarrito();
