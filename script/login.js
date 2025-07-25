// Asegúrate de que users.js esté incluido antes de este script en tu HTML con un <script src="../users.js"></script>
// O si usas módulos ES6, usa la siguiente línea:
// import { users } from "../users.js";

const users = [
  {
    id: 1,
    email: "admin@admin.com",
    password: "admin",
    nombre: "Administrador",
  },
];

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
