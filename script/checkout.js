const numeroFactura = Math.floor(Math.random() * 1000000); // Generar número de factura aleatorio

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

document
  .getElementById("form-checkout")
  .addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevenir el envío tradicional del formulario

    // Obtener valores del formulario
    const form = e.target;
    const nombre = form.nombre.value;
    const email = form.email.value;
    const domicilio = form.domicilio.value;

    // Obtener carrito del localStorage
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    // Inicializar PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const logo = new Image();
    logo.src = "/img/logoPng.png";
    const aspectRatio = logo.width / logo.height;
    const desiredWidth = 40;
    const desiredHeight = desiredWidth / aspectRatio;
    doc.addImage(logo, "PNG", 150, 10, desiredWidth, desiredHeight);

    // Encabezado del PDF
    doc.setFontSize(18);
    doc.text(`Orden de Compra - N°: ${numeroFactura}`, 20, 20);

    doc.setFontSize(12);
    doc.text(`Cliente: ${nombre}`, 20, 30);
    doc.text(`Email: ${email}`, 20, 38);
    doc.text(`Domicilio: ${domicilio}`, 20, 46);
    doc.text(`Fecha: ${new Date().toLocaleString()}`, 20, 54);

    // Encabezados y cuerpo de la tabla
    const columnas = ["Producto", "Precio Unitario", "Cantidad", "Subtotal"];
    const filas = carrito.map((p) => [
      p.nombre,
      `$${p.precio}`,
      p.cantidad,
      `$${(p.precio * p.cantidad).toFixed(2)}`,
    ]);

    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

    // Tabla de productos
    doc.autoTable({
      head: [columnas],
      body: filas,
      startY: 65,
    });

    // Total al final
    doc.text(`Total: $${total.toFixed(2)}`, 20, doc.lastAutoTable.finalY + 10);

    // Guardar PDF con nombre personalizado
    doc.save(`OC-${numeroFactura}.pdf`);
    // Guardar la orden en localStorage para el administrador
    const orden = {
      id: numeroFactura,
      nombre,
      email,
      domicilio,
      fecha: new Date().toLocaleString(),
      productos: carrito,
      total,
    };

    const ordenesGuardadas =
      JSON.parse(localStorage.getItem("ordenesCompra")) || [];
    ordenesGuardadas.push(orden);
    localStorage.setItem("ordenesCompra", JSON.stringify(ordenesGuardadas));
    // Limpiar carrito y redirigir (opcional)
    localStorage.removeItem("carrito");
    Swal.fire({
      title: "Compra Finalizada!",
      text: "Una vez realizado el pago, se procederá a hacer el envío del pedido. Gracias!",
      icon: "success",
    });
    setTimeout(() => {
      window.location.href = "/index.html";
    }, 4000); // Redirigir después de 2 segundos
  });
