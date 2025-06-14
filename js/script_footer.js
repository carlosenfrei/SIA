// Crear el footer
const footer = document.createElement('footer');
footer.className = 'footer-container';

// Crear contenido central
const contenidoCentral = document.createElement('div');
contenidoCentral.className = 'footer-content';

const linea1 = document.createElement('p');
linea1.textContent = 'Salón de Instrumental Virtual';

const linea2 = document.createElement('p');
linea2.textContent = 'Creado por: Carlos Enrique Freixas';

const linea3 = document.createElement('p');
linea3.textContent = 'Versión 1 - Año 2025 - Derechos Reservados';

contenidoCentral.appendChild(linea1);
contenidoCentral.appendChild(linea2);
contenidoCentral.appendChild(linea3);

// Crear imágenes laterales
const imgIzquierda = document.createElement('img');
imgIzquierda.src = '/imagenes/logo1.png'; // Cambia a la ruta correcta
imgIzquierda.alt = 'Logo izquierdo';
imgIzquierda.className = 'footer-img';

const imgDerecha = document.createElement('img');
imgDerecha.src = '/imagenes/logo2.png'; // Cambia a la ruta correcta
imgDerecha.alt = 'Logo derecho';
imgDerecha.className = 'footer-img';

// Agregar todo al footer
footer.appendChild(imgIzquierda);
footer.appendChild(contenidoCentral);
footer.appendChild(imgDerecha);

// Agregar el footer al body
document.body.appendChild(footer);