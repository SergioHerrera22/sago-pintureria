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
// Precargar datos del contacto (si existen en localStorage)
const datosGuardados = JSON.parse(localStorage.getItem("datosContacto"));
if (datosGuardados) {
  document.getElementById("inputName4").value = datosGuardados.nombre || "";
  document.getElementById("inputEmail4").value = datosGuardados.email || "";
  document.getElementById("inputPhone4").value = datosGuardados.telefono || "";
}

// Escuchar el envío del formulario
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("inputName4").value;
  const email = document.getElementById("inputEmail4").value;
  const telefono = document.getElementById("inputPhone4").value;

  // Validación básica
  if (!nombre || !email) {
    Swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      text: "Por favor, completá al menos tu nombre y correo.",
    });
    return;
  }

  // Guardar los datos básicos en localStorage
  localStorage.setItem(
    "datosContacto",
    JSON.stringify({ nombre, email, telefono })
  );

  // Mostrar mensaje de éxito
  Swal.fire({
    icon: "success",
    title: "Consulta enviada",
    text: "Gracias por contactarnos. ¡Te responderemos pronto!",
  });

  // Resetear formulario
  this.reset();
});
