const productos = [
  {
    id: "add1",
    nombre: "RECUPLAST ATÉRMICO",
    descripcion:
      "Su fórmula con microesferas de vidrio refleja más del 80% de los rayos solares, reduciendo la temperatura interior y ahorrando energía eléctrica.",
    precio: 48500,
    imagenUrl: "../img/products/atermico.jpg",
    badges: ["Base Agua", "Reflectiva", "Impermeable"],
    cantidad: 0,
  },
  {
    id: "add2",
    nombre: "ACRILPLAST I/E",
    descripcion:
      "Es un látex de uso interior y exterior que proporciona un acabado mate homogéneo, resistente a la intemperie , a los lavados y gran poder cubritivo.",
    precio: 48500,
    imagenUrl: "../img/products/acrilpalst.jpg",
    badges: ["Lavable", "Mate", "Base Agua"],
    cantidad: 0,
  },
  {
    id: "add3",
    nombre: "BRILLOPLAST S/R",
    descripcion:
      "Esmalte sintético de secado rápido, de gran brillo y resistencia a la intemperie. Ideal para la protección y decoración de metal y madera.",
    precio: 48500,
    imagenUrl: "../img/products/brilloplastSR.jpg",
    badges: ["Base Solvente", "3 en 1", "Secado Rápido"],
    cantidad: 0,
  },
  {
    id: "add4",
    nombre: "RECUPLAST CIELORRASO",
    descripcion:
      "Látex con película de alta porosidad, que evita los problemas de condensación de humedad, especialmente enambientes mal ventilados.",
    precio: 48500,
    imagenUrl: "../img/products/cielorraso.jpg",
    badges: ["Base Agua", "Anti-Hongo", "Mate"],
    cantidad: 0,
  },
];
const btnCarrito = document.querySelector(".btn-carrito");
const listGroup = document.querySelector(".list-group");
const totalCarrito = document.querySelector(".total-carrito");
const userLogin = document.querySelector(".userLogin");

/* document.addEventListener("DOMContentLoaded", () => {
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
}); */

const calcularTotalCarrito = () => {
  const listaCarrito = leerElementosLocalStorage();
  const total = listaCarrito.reduce((acc, item) => {
    return acc + item.precio * item.cantidad;
  }, 0);
  totalCarrito.textContent = `${total.toFixed(2)}`;
};

const leerElementosLocalStorage = () => {
  let arrayElementos = localStorage.getItem("carrito");
  return arrayElementos ? JSON.parse(arrayElementos) : [];
};

const guardarCarrito = (carrito) => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const eliminarItem = (idElement) => {
  const listaCarrito = leerElementosLocalStorage();
  const nuevaLista = listaCarrito.filter((item) => item.id !== idElement);
  guardarCarrito(nuevaLista);
  renderizarCarrito();
  calcularTotalCarrito();
  if (nuevaLista.length === 0) {
    totalCarrito.textContent = "0.00";
  }
};

const disminuirCantidad = (idElement) => {
  const listaCarrito = leerElementosLocalStorage();
  const carritoActualizado = listaCarrito
    .map((producto) => {
      if (producto.id === idElement) {
        producto.cantidad -= 1;
      }
      return producto;
    })
    .filter((producto) => producto.cantidad > 0);
  guardarCarrito(carritoActualizado);
  renderizarCarrito();
  calcularTotalCarrito();
  if (carritoActualizado.length === 0) {
    totalCarrito.textContent = "0.00";
  }
};

const aumentarCantidad = (idElement) => {
  const listaCarrito = leerElementosLocalStorage();
  const carritoActualizado = listaCarrito.map((producto) => {
    if (producto.id === idElement) {
      producto.cantidad += 1;
    }
    return producto;
  });
  guardarCarrito(carritoActualizado);
  renderizarCarrito();
  calcularTotalCarrito();
  if (carritoActualizado.length === 0) {
    totalCarrito.textContent = "0.00";
  }
};

const agregarAlCarritoLocalStorage = (producto) => {
  let carrito = leerElementosLocalStorage();
  const productoExistente = carrito.find((item) => item.id === producto.id);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito(carrito);
};

const renderizarCarrito = () => {
  listGroup.innerHTML = "";
  let listaCarrito = leerElementosLocalStorage();
  const mensajeVacio = document.querySelector(".mensaje-carrito-vacio");
  const btnFinalizar = document.querySelector(".btn-finalizar-compra");

  if (!mensajeVacio || !btnFinalizar) {
    console.warn("Faltan elementos del DOM: mensaje o botón de finalizar");
    return;
  }

  if (listaCarrito.length === 0) {
    mensajeVacio.style.display = "block";
    btnFinalizar.style.display = "none";
    totalCarrito.textContent = "0.00";
    return;
  } else {
    mensajeVacio.style.display = "none";
    btnFinalizar.style.display = "inline-block";
  }

  listaCarrito.forEach((producto) => {
    const nuevoElemento = document.createElement("li");
    nuevoElemento.className =
      "list-group-item d-flex justify-content-between align-items-center";

    nuevoElemento.innerHTML = `
      <div>
        <h6 class="mb-1 fw-bold">${producto.nombre}</h6>
        <p class="mb-0"><small class="text-muted">Precio: $${producto.precio}</small></p>
        <p class="mb-0"><small class="text-muted">Cantidad: ${producto.cantidad}</small></p>
      </div>
      <div class="btn-group btn-group-sm" role="group">
        <button class="btn btn-outline-secondary btn-restar">−</button>
        <button class="btn btn-outline-secondary btn-sumar">+</button>
        <button class="btn btn-outline-danger btn-eliminar">🗑️</button>
      </div>
    `;

    // Eventos individuales
    nuevoElemento
      .querySelector(".btn-eliminar")
      .addEventListener("click", () => eliminarItem(producto.id));
    nuevoElemento
      .querySelector(".btn-sumar")
      .addEventListener("click", () => aumentarCantidad(producto.id));
    nuevoElemento
      .querySelector(".btn-restar")
      .addEventListener("click", () => disminuirCantidad(producto.id));

    listGroup.append(nuevoElemento);
  });
};

btnCarrito.addEventListener("click", () => {
  renderizarCarrito();
  calcularTotalCarrito();
});

function crearProductoCard(producto) {
  const { id, nombre, descripcion, precio, imagenUrl, badges = [] } = producto;

  const div = document.createElement("div");
  div.className = "col-12 col-md-6 col-lg-4 col-xl-3 scale-in-bottom";
  div.innerHTML = `
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
                (texto) =>
                  `<span class="badge bg-info text-dark">${texto}</span>`
              )
              .join("")}
          </div>
          <div class="card-footer d-flex flex-column justify-content-around align-items-center gap-2">
            <span class="card-price fw-bold">$${precio}</span>
            <button class="btn btn-primary btn-sm btn-cart" data-id="${id}">🛒 Agregar al carrito</button>
          </div>
        </div>
      </div>
    </div>
  `;
  return div;
}

const renderizarProductos = () => {
  const contenedorProductos = document.querySelector(".container-products");
  contenedorProductos.innerHTML = "";

  productos.forEach((producto) => {
    const productoCard = crearProductoCard(producto);
    contenedorProductos.appendChild(productoCard);
  });

  // Asignar eventos de agregar al carrito
  const btnsAgregar = contenedorProductos.querySelectorAll(".btn-cart");
  btnsAgregar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      });
      const id = e.currentTarget.getAttribute("data-id");
      const producto = productos.find((p) => p.id === id);
      if (producto) agregarAlCarritoLocalStorage(producto);
      btn.classList.remove("btn-primary");
      btn.classList.add("btn-success");
      btn.innerHTML = "✔ Agregado";

      setTimeout(() => {
        btn.classList.remove("btn-success");
        btn.classList.add("btn-primary");
        btn.innerHTML = "🛒 Agregar al carrito";
      }, 1500);
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  // Verificar si hay un usuario logueado
  const nombreUsuario = sessionStorage.getItem("usuarioLogueado");
  if (nombreUsuario) {
    userLogin.textContent = `Hola, ${JSON.parse(nombreUsuario)}`;
    userLogin.href = "#micuenta"; // Cambia el enlace a la sección de cuenta
  } else {
    userLogin.textContent = "Iniciar Sesión";
    userLogin.href = "/pages/login.html"; // Redirige al login si no hay usuario
  }

  if (nombreUsuario) {
    renderizarProductos();

    // Ocultar el loader una vez que los productos reales se cargan
    const skeleton = document.getElementById("skeleton-loader");
    if (skeleton) skeleton.style.display = "none";
    // Simula un retraso de carga de 1 segundo
  }
});
