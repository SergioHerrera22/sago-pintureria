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

    // Encabezado del PDF
    doc.setFontSize(18);
    doc.text("Factura de Compra - SAGO Pinturas", 20, 20);

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
    doc.save("factura-compra.pdf");

    // Limpiar carrito y redirigir (opcional)
    localStorage.removeItem("carrito");
    alert("\u00a1Gracias por tu compra!");
    window.location.href = "/index.html";
  });
