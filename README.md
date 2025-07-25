# 🖌️ SAGO Pinturería

Sitio web para una pinturería, con carrito de compras, renderizado dinámico de productos, y diseño responsive. Proyecto creado como parte de práctica en desarrollo web.

---

## 🧭 Descripción

Tienda online para venta de pinturas, impermeabilizantes, revestimientos y productos relacionados. Ofrece navegación fluida por secciones, carrito funcional, y diseño adaptable a dispositivos móviles.

---

## 🌟 Características principales

- Navegación por secciones: **Inicio**, **Productos**, **Servicios**, **Nosotros**, **Contacto**.
- Interfaz responsive con **Bootstrap 5** y estilos personalizados.
- Carga dinámica de productos desde `productos.json` mediante `fetch`.
- Carrito de compras funcional con **localStorage** y actualización en tiempo real.
- Notificaciones visuales con **Toastify.js**.
- Gestión de usuario logueado con `sessionStorage`.

---

## 🗂️ Estructura del proyecto

```
sago-pintureria/
├── index.html
├── productos.html
├── servicios.html
├── nosotros.html
├── contacto.html
├── pages/
│   └── checkout.html
├── css/
│   └── style.css
├── img/
│   ├── carrusel/
│   ├── categorias/
│   ├── promociones/
│   └── productos/
├── script/
│   ├── productos.js
│   └── productos.json
└── README.md
```

---

## 🛠️ Tecnologías utilizadas

| Tecnología       | Uso                                              |
| ---------------- | ------------------------------------------------ |
| HTML5 / CSS3     | Estructura semántica y estilo básico             |
| Bootstrap 5      | Componentes UI (navbar, grid, modales)           |
| JavaScript (ES6) | Carrito de compras, DOM dinámico, almacenamiento |
| Toastify.js      | Notificaciones de acción al usuario              |
| SCSS             | Organización y compilación de estilos            |
| Live Server      | Desarrollo local                                 |

---

## 🧩 Funcionalidades

- Carga dinámica de productos desde archivo JSON.
- Renderizado de tarjetas con nombre, descripción, imagen, precio y botones.
- Agregar, quitar o modificar cantidad de productos en el carrito.
- Modal de carrito con resumen de productos y total.
- Gestión básica de sesión de usuario (`sessionStorage`).
- Opción para mostrar el nombre del usuario logueado y cerrar sesión.

---

## 🚧 Próximas mejoras

- Categorización y filtros por producto.
- Backend para persistencia de pedidos y usuarios.
- Integración con sistema de pagos.
- Panel de administrador para ver órdenes (usando `localStorage` como base).
- Mejora de rendimiento en la carga inicial de productos.

---

## 🌐 Demo

Versión desplegada:
[https://sago-pintureria.vercel.app](https://sago-pintureria.vercel.app)
