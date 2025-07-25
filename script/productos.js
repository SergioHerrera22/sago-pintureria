// 📦 Productos disponibles cargados desde JSON
const productos = [];

// 🎯 Referencias a elementos del DOM
const btnCarrito = document.querySelector(".btn-carrito");
const listGroup = document.querySelector(".list-group");
const totalCarrito = document.querySelector(".total-carrito");

document.addEventListener("DOMContentLoaded", () => {
  const usuarioLogueado = sessionStorage.getItem("usuarioLogueado");

  if (usuarioLogueado) {
    const nombre = JSON.parse(usuarioLogueado);
    const enlaceCuenta = document.querySelector(
      ".nav-link[href*='micuenta'], .nav-link[href*='login.html']"
    );

    if (enlaceCuenta) {
      enlaceCuenta.innerHTML = `<i class="fas fa-user"></i> ${nombre}`;
      enlaceCuenta.href = "#micuenta"; // O redirigir a alguna futura sección personalizada
    }
  }
});

// 🚀 Carga los productos desde productos.json y los guarda en el array global
const cargarProductosDesdeJSON = async () => {
  try {
    const res = await fetch("../script/productos.json");
    if (!res.ok) throw new Error("No se pudo cargar el archivo JSON");
    const data = await res.json();
    productos.push(...data);
    return data; // <-- Esto ayuda a depurar también
  } catch (err) {
    console.error("❌ Error al obtener productos:", err);
  }
};

// 📦 Obtiene el carrito guardado en localStorage o retorna un array vacío
const obtenerCarrito = () => {
  const data = localStorage.getItem("carrito");
  return data ? JSON.parse(data) : [];
};

// 💾 Guarda el carrito actualizado en localStorage
const guardarCarrito = (carrito) => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

// 💰 Calcula el total del carrito y lo muestra en el DOM
const actualizarTotalCarrito = () => {
  const carrito = obtenerCarrito();
  const total = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );
  totalCarrito.textContent = total.toFixed(2);
};

// 🗑️ Elimina un producto por ID del carrito
const eliminarProductoDelCarrito = (id) => {
  const carritoActualizado = obtenerCarrito().filter((item) => item.id !== id);
  guardarCarrito(carritoActualizado);
  renderizarCarrito();
  actualizarTotalCarrito();
};

// ➖ Disminuye la cantidad de un producto o lo elimina si llega a 0
const restarCantidadProducto = (id) => {
  const carrito = obtenerCarrito();
  const actualizado = carrito
    .map((item) =>
      item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
    )
    .filter((item) => item.cantidad > 0);
  guardarCarrito(actualizado);
  renderizarCarrito();
  actualizarTotalCarrito();
};

// ➕ Aumenta la cantidad de un producto
const sumarCantidadProducto = (id) => {
  const carrito = obtenerCarrito().map((item) =>
    item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
  );
  guardarCarrito(carrito);
  renderizarCarrito();
  actualizarTotalCarrito();
};

// 🛒 Agrega un producto al carrito (si existe, suma cantidad)
const agregarProductoAlCarrito = (producto) => {
  const carrito = obtenerCarrito();
  const existe = carrito.find((item) => item.id === producto.id);

  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito(carrito);
};

// 🧾 Muestra el contenido actual del carrito en el DOM
const renderizarCarrito = () => {
  listGroup.innerHTML = "";
  const carrito = obtenerCarrito();
  const mensajeVacio = document.querySelector(".mensaje-carrito-vacio");
  const btnFinalizar = document.querySelector(".btn-finalizar-compra");

  if (!mensajeVacio || !btnFinalizar) {
    console.warn("Faltan elementos para el carrito en el DOM.");
    return;
  }

  if (carrito.length === 0) {
    mensajeVacio.style.display = "block";
    btnFinalizar.style.display = "none";
    totalCarrito.textContent = "0.00";
    return;
  }

  mensajeVacio.style.display = "none";
  btnFinalizar.style.display = "inline-block";

  carrito.forEach((producto) => {
    const item = document.createElement("li");
    item.className =
      "list-group-item d-flex justify-content-between align-items-center";

    item.innerHTML = `
      <div>
        <h6 class="mb-1 fw-bold">${producto.nombre}</h6>
        <p class="mb-0"><small class="text-muted">Precio: $${producto.precio}</small></p>
        <p class="mb-0"><small class="text-muted">Cantidad: ${producto.cantidad}</small></p>
      </div>
      <div class="btn-group btn-group-sm">
        <button class="btn btn-outline-secondary btn-restar">−</button>
        <button class="btn btn-outline-secondary btn-sumar">+</button>
        <button class="btn btn-outline-danger btn-eliminar">🗑️</button>
      </div>
    `;

    // Eventos
    item
      .querySelector(".btn-eliminar")
      .addEventListener("click", () => eliminarProductoDelCarrito(producto.id));
    item
      .querySelector(".btn-sumar")
      .addEventListener("click", () => sumarCantidadProducto(producto.id));
    item
      .querySelector(".btn-restar")
      .addEventListener("click", () => restarCantidadProducto(producto.id));

    listGroup.appendChild(item);
  });
};

// 🧱 Crea una card visual de producto
function crearProductoCard(producto) {
  const { id, nombre, descripcion, precio, imagenUrl, badges = [] } = producto;

  const card = document.createElement("div");
  card.className = "col-12 col-md-6 col-lg-4 col-xl-3 scale-in-bottom";

  card.innerHTML = `
    <div class="card-body text-center d-flex flex-column align-items-center p-0">
      <div class="card product-card shadow-drop-2-bottom text-center">
        <div class="container-img">
          <img src="${imagenUrl}" alt="${nombre}" class="product-image mb-0" />
        </div>
        <div class="card-body">
          <h5 class="card-title">${nombre}</h5>
          <p class="card-text-description">${descripcion}</p>
          <div class="d-flex flex-wrap gap-2 mb-3 justify-content-center">
            ${badges
              .map(
                (badge) =>
                  `<span class="badge bg-info text-dark">${badge}</span>`
              )
              .join("")}
          </div>
          <div class="card-footer d-flex flex-column gap-2">
            <span class="card-price fw-bold">$${precio}</span>
            <button class="btn btn-primary btn-sm btn-cart" data-id="${id}">🛒 Agregar al carrito</button>
          </div>
        </div>
      </div>
    </div>
  `;
  return card;
}

// 🧩 Renderiza todas las tarjetas de productos en el DOM
const renderizarProductos = () => {
  const contenedor = document.querySelector(".container-products");
  contenedor.innerHTML = "";

  productos.forEach((producto) => {
    const card = crearProductoCard(producto);
    contenedor.appendChild(card);
  });

  // Eventos de agregar al carrito con feedback
  contenedor.querySelectorAll(".btn-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.getAttribute("data-id");
      const producto = productos.find((p) => p.id === id);

      if (producto) {
        agregarProductoAlCarrito(producto);
        mostrarToast("Producto agregado al carrito");

        btn.classList.remove("btn-primary");
        btn.classList.add("btn-success");
        btn.textContent = "✔ Agregado";

        setTimeout(() => {
          btn.classList.remove("btn-success");
          btn.classList.add("btn-primary");
          btn.innerHTML = "🛒 Agregar al carrito";
        }, 1500);
      }
    });
  });
};

// 🎉 Notificación visual con Toastify
const mostrarToast = (mensaje) => {
  Toastify({
    text: mensaje,
    duration: 3000,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    close: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
};

// 🧠 Evento principal cuando el DOM está listo

document.addEventListener("DOMContentLoaded", async () => {
  await cargarProductosDesdeJSON(); // Espera que se carguen los productos
  renderizarProductos(); // Ahora sí, productos ya tiene datos
});

// 🛒 Botón para abrir el carrito
btnCarrito.addEventListener("click", () => {
  renderizarCarrito();
  actualizarTotalCarrito();
});
