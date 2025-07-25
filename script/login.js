const users = [
  {
    id: 1,
    email: "admin@admin.com",
    password: "admin",
    nombre: "Administrador",
  },
];
// Colocar en todas tus páginas justo después del navbar (o en el script de sesión)
const user = sessionStorage.getItem("usuarioLogueado");
if (user && JSON.parse(user) === "Administrador") {
  const nav = document.querySelector(".navbar-nav.ms-auto");
  const li = document.createElement("li");
  li.className = "nav-item";
  li.innerHTML = `
    <a class="nav-link" href="/pages/admin.html">
      <i class="fas fa-tools"></i> Admin
    </a>`;
  nav.appendChild(li);
}

const formulario = document.querySelector("#login-form");

const guardarEnSessionStorage = (clave, valor) => {
  sessionStorage.setItem(clave, valor);
};

// Redirige si ya hay usuario logueado
const usuarioLogueado = sessionStorage.getItem("usuarioLogueado");
if (usuarioLogueado) {
  window.location.href = "../index.html";
}

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const datosFormulario = Object.fromEntries(new FormData(event.target));

  // Validación básica
  if (!datosFormulario.email || !datosFormulario.password) {
    mostrarError("Todos los campos son obligatorios");
    return;
  }

  const usuario = users.find(
    (user) =>
      user.email === datosFormulario.email &&
      user.password === datosFormulario.password
  );

  if (usuario) {
    guardarEnSessionStorage("usuarioLogueado", JSON.stringify(usuario.nombre));
    window.location.href = "../index.html";
  } else {
    mostrarError("Credenciales inválidas. Por favor, intenta nuevamente.");
  }

  // Guardar los datos del formulario (opcional)
  guardarEnSessionStorage("datosFormulario", JSON.stringify(datosFormulario));
  console.log("Datos del formulario:", datosFormulario);
});

// Función opcional para mostrar error en pantalla
function mostrarError(mensaje) {
  const contenedor = document.querySelector("#mensaje-error");
  if (contenedor) {
    contenedor.textContent = mensaje;
    contenedor.style.color = "red";
  } else {
    alert(mensaje); // fallback
  }
}
export default {
  users,
};
