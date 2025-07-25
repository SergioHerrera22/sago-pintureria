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
