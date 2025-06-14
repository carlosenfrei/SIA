

const header = document.createElement("header");
header.className = "header__container";
header.id = "header";

// Nav
const nav = document.createElement("nav");
nav.className = "navbar navbar-expand-lg bg-transparent";

// Container fluid
const container = document.createElement("div");
container.className = "container-fluid";

// Logo
const logoLink = document.createElement("a");
logoLink.className = "navbar-brand";
logoLink.href = "/index.html";

const logoImg = document.createElement("img");
logoImg.className = "header__img";
logoImg.src = "/imagenes/logoDptoAgrim.jpg";
logoImg.alt = "Logo Dto Agrimensura";
logoLink.appendChild(logoImg);

// Botón hamburguesa
const toggler = document.createElement("button");
toggler.className = "navbar-toggler";
toggler.type = "button";
toggler.setAttribute("data-bs-toggle", "collapse");
toggler.setAttribute("data-bs-target", "#navbarNavDropdown");
toggler.setAttribute("aria-controls", "navbarNavDropdown");
toggler.setAttribute("aria-expanded", "false");
toggler.setAttribute("aria-label", "Toggle navigation");

const togglerIcon = document.createElement("span");
togglerIcon.className = "navbar-toggler-icon";
toggler.appendChild(togglerIcon);

// Collapse nav
const collapseDiv = document.createElement("div");
collapseDiv.className = "collapse navbar-collapse";
collapseDiv.id = "navbarNavDropdown";

// Lista nav
const navList = document.createElement("ul");
navList.className = "navbar-nav";

// Inicio
const navInicio = document.createElement("li");
navInicio.className = "nav-item";
const aInicio = document.createElement("a");
aInicio.className = "nav-link font__a--altura";
aInicio.href = "/index.html";
aInicio.setAttribute("aria-current", "page");
aInicio.textContent = "Inicio";
navInicio.appendChild(aInicio);

// Inventario
const navInventario = document.createElement("li");
navInventario.className = "nav-item";
const aInventario = document.createElement("a");
aInventario.className = "nav-link font__a--altura";
aInventario.href = "/pages/inventario.html";
aInventario.textContent = "Inventario";
navInventario.appendChild(aInventario);

// Reserva
const navReserva = document.createElement("li");
navReserva.className = "nav-item";
const aReserva = document.createElement("a");
aReserva.className = "nav-link font__a--altura";
aReserva.href = "/pages/Modificacion.html";
aReserva.textContent = "Reserva";
navReserva.appendChild(aReserva);


// Modificacion
const navModificacion = document.createElement("li");
navModificacion.className = "nav-item";
const aModificacion = document.createElement("a");
aModificacion.className = "nav-link font__a--altura";
aModificacion.href = "/pages/Modificacion.html";
aModificacion.textContent = "Modificacion";
navModificacion.appendChild(aModificacion);



// Agregar nav items al ul
navList.appendChild(navInicio);
navList.appendChild(navInventario);
if (user && user.id != null){
    navList.appendChild(navReserva);
}
if (user && user.administrador === true){
    navList.appendChild(navModificacion);
}




// Agregar nav list al collapse
collapseDiv.appendChild(navList);

// Botón cerrar sesión
const btnCerrar = document.createElement("button");
btnCerrar.type = "button";
btnCerrar.className = "btn btn-outline-secondary ms-auto"; // Alineado a la derecha
btnCerrar.textContent = "Cerrar Sesión";

// Acción al hacer click
btnCerrar.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    window.location.href = "/index.html"; // o la página de login
});

// Armar el nav
container.appendChild(logoLink);
container.appendChild(toggler);
container.appendChild(collapseDiv);
container.appendChild(btnCerrar);

nav.appendChild(container);
header.appendChild(nav);

// Insertar al principio del body
document.body.prepend(header);

//Muestra usuairo en pantalla 

const spanUser = document.createElement("span");
spanUser.textContent = `Sesión: ${user.id || "Invitado"}`;
spanUser.className = "me-3 fw-bold";

container.insertBefore(spanUser, btnCerrar); // antes del botón
