// agregado.js
import { actualizarContadorCarrito } from "./utils.js";

const contenedor = document.getElementById("carrito");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function renderCarrito() {
    contenedor.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>No hay productos en el carrito.</p>";
        actualizarContadorCarrito();
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

    actualizarContadorCarrito(); // 🔄 Actualizar contador después de renderizar
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

document.getElementById("btnFinalizarCompra").addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire("Tu carrito está vacío", "Agrega productos antes de comprar", "warning");
        return;
    }

    const resumen = carrito.map(p => `${p.nombre} x${p.cantidad} = $${(p.precio * p.cantidad).toLocaleString()}`).join("<br>");
    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

    Swal.fire({
        title: "🛍 Resumen de tu pedido",
        html: `
            ${resumen}
            <hr>
            <strong>Total:</strong> $${total.toLocaleString()}
        `,
        showCancelButton: true,
        confirmButtonText: "Continuar con la compra",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            mostrarFormularioCompra();
        }
    });
});

renderCarrito();

function mostrarFormularioCompra() {
    Swal.fire({
        title: "📝 Datos para el envío",
        html: `
            <input type="text" id="nombre" class="swal2-input" placeholder="Nombre completo">
            <input type="text" id="direccion" class="swal2-input" placeholder="Dirección">
            <input type="email" id="email" class="swal2-input" placeholder="Correo electrónico">
        `,
        confirmButtonText: "Comprar",
        focusConfirm: false,
        preConfirm: () => {
            const nombre = document.getElementById("nombre").value;
            const direccion = document.getElementById("direccion").value;
            const email = document.getElementById("email").value;

            if (!nombre || !direccion || !email) {
                Swal.showValidationMessage("Por favor completa todos los campos");
                return false;
            }

            return { nombre, direccion, email };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const pedido = {
                cliente: result.value,
                productos: carrito,
                total: carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0)
            };

            fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                body: JSON.stringify(pedido),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log("Pedido enviado:", data);

                const pedidoJSON = JSON.stringify(pedido, null, 2);
                const blob = new Blob([pedidoJSON], { type: "application/json" });
                const url = URL.createObjectURL(blob);

                const link = document.createElement("a");
                link.href = url;
                link.download = "pedido_" + new Date().toISOString().split("T")[0] + ".json";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                Swal.fire("¡Compra realizada!", "Tu pedido fue registrado exitosamente y descargado.", "success");

                carrito = [];
                localStorage.removeItem("carrito");
                renderCarrito();
            })
            .catch(error => {
                console.error("Error al enviar el pedido:", error);
                Swal.fire("Error", "No se pudo registrar el pedido. Intenta más tarde.", "error");
            });
        }
    });
}

// Hacer accesibles las funciones desde el HTML dinámico
window.restar = restar;
window.eliminar = eliminar;
