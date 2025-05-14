const cantidadCarrito = document.getElementById("cantidadCarrito");
const botonAgregarCarrito = document.querySelectorAll("#btnAgregar");

const agregarCarrito = () => {
  let cantidad = 0;
  for (let i = 0; i < botonAgregarCarrito.length; i++) {
    botonAgregarCarrito[i].addEventListener("click", () => {
      cantidad++;
      cantidadCarrito.textContent = cantidad;
    });
  }
};

agregarCarrito();
