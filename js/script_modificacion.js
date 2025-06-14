
let lista_instrumento = JSON.parse(localStorage.getItem("lista_instrumento")) || [];
const lista_usuario = JSON.parse(localStorage.getItem("lista_usuario")) || [];
const user = JSON.parse(localStorage.getItem("usuario")); // Esta variable podría no ser necesaria si el control de admin es externo, pero la mantengo por si la usas para otra cosa.

// Variable para saber si estamos en modo edición (modificación) o agregando uno nuevo
let editingInstrumentCode = null;

// Constructor de Instrumentos (sin cambios)
function Instrumentos() {
    this.codigo = null;
    this.tipo = null;
    this.marca = null;
    this.modelo = null;
    this.estado = null;
    this.nro_serie = null;
    this.patrimonio = null;
    this.descripcion = null;
    this.observaciones = null;
    this.img = null;
    this.manual = null;
    this.eindice = null;
    this.ecolimacion = null;
    this.disponibilidad = true;
    this.diai = null;
    this.diaf = null;
    this.horai = null;
    this.horaf = null;
}

// Función auxiliar (sin cambios)
function formatoCodigoInstrumento(codigo) {
    if (codigo >= 100) {
        return String(codigo);
    } else if (codigo >= 10 && codigo < 99) {
        return "0" + String(codigo);
    } else {
        return "00" + String(codigo);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const mainContentContainer = document.createElement("main");
    mainContentContainer.className = "container my-5";
    document.body.appendChild(mainContentContainer);

    // Título
    const title = document.createElement("h2");
    title.className = "mb-4 text-center";
    title.textContent = "Gestión de Instrumentos";
    mainContentContainer.appendChild(title);

    const form = document.createElement("form");
    form.id = "formInstrumento";
    form.className = "p-4 border rounded shadow-sm";
    mainContentContainer.appendChild(form); // Adjuntar el formulario al contenedor principal

    // Crear campos de formulario
    function crearFormControl(elementType, id, labelText, options = null, type = "text") {
        const div = document.createElement("div");
        div.className = "mb-3";

        const label = document.createElement("label");
        label.textContent = labelText;
        label.htmlFor = id;
        label.className = "form-label";

        let element;
        if (elementType === "select") {
            element = document.createElement("select");
            element.className = "form-select";
            if (options) {
                options.forEach(([value, text]) => {
                    const option = document.createElement("option");
                    option.value = value;
                    option.textContent = text;
                    element.appendChild(option);
                });
            }
        } else {
            element = document.createElement("input");
            element.type = type;
            element.className = "form-control";
            element.id = id;
        }
        element.id = id;
        div.appendChild(label);
        div.appendChild(element);
        form.appendChild(div);
        return element; // Devolvemos el elemento para poder manipularlo si es necesario
    }

    // Definimos los campos del formulario y los almacenamos en variables para facilitar el acceso
    const tipoInput = crearFormControl("select", "tipo", "Tipo de Instrumento:", [
        ["Estación Total", "Estación Total"],
        ["Equialtimetro automatico", "Equialtimetro automático"],
        ["Distanciometro laser", "Distanciómetro láser"],
        ["GNSS", "GNSS"],
    ]);

    const marcaInput = crearFormControl("select", "marca", "Marca:", [
        ["Leica", "Leica"],
        ["South", "South"],
        ["CHC", "CHC"],
        ["Topcon", "Topcon"],
        ["Kolida", "Kolida"],
        ["DJI", "DJI"],
        ["Trimble", "Trimble"],
        ["Pentax", "Pentax"],
        ["Nikon", "Nikon"],
        ["Sokkia", "Sokkia"],
        ["Zeiss", "Zeiss"],
        ["Magellan", "Magellan"],
        ["Stanley", "Stanley"]
    ]);

    const modeloInput = crearFormControl("input", "modelo", "Modelo:");
    const estadoInput = crearFormControl("select", "estado", "Estado:", [
        ["B", "Bueno"],
        ["R", "Regular"],
        ["M", "Malo"],
    ]);
    const nroSerieInput = crearFormControl("input", "nro_serie", "Nro. de Serie:");
    const patrimonioInput = crearFormControl("input", "patrimonio", "Nro. Patrimonio:", null, "number");
    const observacionesInput = crearFormControl("input", "observaciones", "Observaciones:");
    const imgInput = crearFormControl("input", "img", "Ruta Imagen:");
    const manualInput = crearFormControl("input", "manual", "Ruta Manual:");
    const eindiceInput = crearFormControl("input", "eindice", "Error de índice:", null, "number");
    const ecolimacionInput = crearFormControl("input", "ecolimacion", "Error de colimación:", null, "number");

    const descripcionInput = crearFormControl("select", "descripcion", "Descripción:", [
        ["Instrumento de medición electrónica de distancias", "Instrumento de medición electrónica de distancias"],
        ["Instrumento de posicionamiento satelital", "Instrumento de posicionamiento satelital"],
        ["Instrumento de medición óptica de ángulos y distancias para determinar diferencias de alturas", "Instrumento óptico de ángulos y alturas"],
        ["Instrumento de medición electrónica de ángulos y distancias", "Instrumento electrónico de ángulos y distancias"],
    ]);

    // Botones
    const saveButton = document.createElement("button");
    saveButton.textContent = "Guardar Instrumento";
    saveButton.type = "submit";
    saveButton.className = "btn btn-primary mt-3 me-2";
    form.appendChild(saveButton);

    const modifyButton = document.createElement("button");
    modifyButton.textContent = "Modificar Instrumento Existente";
    modifyButton.type = "button";
    modifyButton.className = "btn btn-info mt-3";
    form.appendChild(modifyButton);

    const clearButton = document.createElement("button");
    clearButton.textContent = "Limpiar Formulario";
    clearButton.type = "button";
    clearButton.className = "btn btn-secondary mt-3 ms-2";
    form.appendChild(clearButton);

    // --- Lógica de Manejo del Formulario (Agregar/Actualizar) ---
    function handleFormSubmit(event) {
        event.preventDefault();

        if (editingInstrumentCode) { // Modo Actualizar
            const indice = lista_instrumento.findIndex(instr => instr.codigo === editingInstrumentCode);
            if (indice !== -1) {
                lista_instrumento[indice].tipo = tipoInput.value;
                lista_instrumento[indice].marca = marcaInput.value;
                lista_instrumento[indice].modelo = modeloInput.value;
                lista_instrumento[indice].estado = estadoInput.value;
                lista_instrumento[indice].nro_serie = nroSerieInput.value;
                lista_instrumento[indice].patrimonio = parseInt(patrimonioInput.value) || null;
                lista_instrumento[indice].observaciones = observacionesInput.value;
                lista_instrumento[indice].img = imgInput.value;
                lista_instrumento[indice].manual = manualInput.value;
                lista_instrumento[indice].eindice = parseInt(eindiceInput.value) || null;
                lista_instrumento[indice].ecolimacion = parseInt(ecolimacionInput.value) || null;
                lista_instrumento[indice].descripcion = descripcionInput.value;

                localStorage.setItem("lista_instrumento", JSON.stringify(lista_instrumento));
                alert(`Instrumento ${editingInstrumentCode} actualizado correctamente.`);
                console.table(lista_instrumento[indice]);
            } else {
                alert("Error: El instrumento a actualizar no se encontró.");
            }
        } else { // Modo Agregar Nuevo
            const nuevoInstrumento = new Instrumentos();
            // Aseguramos que el código sea único y consecutivo basado en la longitud actual
            const nextCode = lista_instrumento.length > 0
                ? Math.max(...lista_instrumento.map(i => parseInt(i.codigo))) + 1
                : 1;
            nuevoInstrumento.codigo = formatoCodigoInstrumento(nextCode);

            nuevoInstrumento.tipo = tipoInput.value;
            nuevoInstrumento.marca = marcaInput.value;
            nuevoInstrumento.modelo = modeloInput.value;
            nuevoInstrumento.estado = estadoInput.value;
            nuevoInstrumento.nro_serie = nroSerieInput.value;
            nuevoInstrumento.patrimonio = parseInt(patrimonioInput.value) || null;
            nuevoInstrumento.observaciones = observacionesInput.value;
            nuevoInstrumento.img = imgInput.value;
            nuevoInstrumento.manual = manualInput.value;
            nuevoInstrumento.eindice = parseInt(eindiceInput.value) || null;
            nuevoInstrumento.ecolimacion = parseInt(ecolimacionInput.value) || null;
            nuevoInstrumento.descripcion = descripcionInput.value;

            lista_instrumento.push(nuevoInstrumento);
            localStorage.setItem("lista_instrumento", JSON.stringify(lista_instrumento));
            alert("Instrumento cargado correctamente.");
            console.table(nuevoInstrumento);
        }

        // Limpiar el formulario y resetear el modo
        form.reset();
        saveButton.textContent = "Guardar Instrumento";
        editingInstrumentCode = null;
    }

    form.addEventListener("submit", handleFormSubmit);

    // --- Lógica del botón "Limpiar Formulario" ---
    clearButton.addEventListener("click", () => {
        form.reset();
        saveButton.textContent = "Guardar Instrumento";
        editingInstrumentCode = null;
    });


    // --- Creación del Modal de Modificación ---
    const modalHtml = `
        <div class="modal fade" id="modificacionModal" tabindex="-1" aria-labelledby="modificacionModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modificacionModalLabel">Buscar Instrumento a Modificar</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="searchInstrumentForm">
                            <div class="mb-3">
                                <label for="modalTipo" class="form-label">Tipo de Instrumento:</label>
                                <select class="form-select" id="modalTipo">
                                    <option value="">Seleccionar Tipo</option>
                                    <option value="Estación Total">Estación Total</option>
                                    <option value="Equialtimetro automatico">Equialtimetro automático</option>
                                    <option value="Distanciometro laser">Distanciómetro láser</option>
                                    <option value="GNSS">GNSS</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="modalMarca" class="form-label">Marca:</label>
                                <select class="form-select" id="modalMarca">
                                    <option value="">Seleccionar Marca</option>
                                    <option value="Leica">Leica</option>
                                    <option value="South">South</option>
                                    <option value="CHC">CHC</option>
                                    <option value="Topcon">Topcon</option>
                                    <option value="Kolida">Kolida</option>
                                    <option value="DJI">DJI</option>
                                    <option value="Trimble">Trimble</option>
                                    <option value="Pentax">Pentax</option>
                                    <option value="Nikon">Nikon</option>
                                    <option value="Sokkia">Sokkia</option>
                                    <option value="Zeiss">Zeiss</option>
                                    <option value="Magellan">Magellan</option>
                                    <option value="Stanley">Stanley</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="modalCodigo" class="form-label">Código (opcional para filtro):</label>
                                <input type="text" class="form-control" id="modalCodigo" placeholder="Ej: 001">
                            </div>
                            <button type="button" class="btn btn-primary" id="searchInstrumentBtn">Buscar Instrumentos</button>
                        </form>
                        <hr>
                        <div id="searchResults" class="mt-4">
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const modificacionModal = new bootstrap.Modal(document.getElementById('modificacionModal'));
    const searchInstrumentBtn = document.getElementById('searchInstrumentBtn');
    const searchResultsDiv = document.getElementById('searchResults');
    const modalTipo = document.getElementById('modalTipo');
    const modalMarca = document.getElementById('modalMarca');
    const modalCodigo = document.getElementById('modalCodigo');

    // Evento para abrir el modal
    modifyButton.addEventListener("click", () => {
        modificacionModal.show();
        searchResultsDiv.innerHTML = ""; // Limpiar resultados anteriores
        modalTipo.value = ""; // Limpiar filtros del modal
        modalMarca.value = "";
        modalCodigo.value = "";
    });

    // Evento para buscar instrumentos en el modal
    searchInstrumentBtn.addEventListener("click", () => {
        const tipoFiltro = modalTipo.value;
        const marcaFiltro = modalMarca.value;
        const codigoFiltro = modalCodigo.value ? formatoCodigoInstrumento(modalCodigo.value) : ""; // Formatear el código si se ingresó, si no, cadena vacía.

        const resultados = lista_instrumento.filter(instr => {
            const tipoMatch = tipoFiltro === "" || instr.tipo === tipoFiltro;
            const marcaMatch = marcaFiltro === "" || instr.marca === marcaFiltro;
            const codigoMatch = codigoFiltro === "" || instr.codigo === codigoFiltro;

            return tipoMatch && marcaMatch && codigoMatch;
        });

        mostrarResultadosEnModal(resultados);
    });

    function mostrarResultadosEnModal(instrumentos) {
        searchResultsDiv.innerHTML = ""; // Limpiar resultados anteriores

        if (instrumentos.length === 0) {
            searchResultsDiv.innerHTML = `<p class="alert alert-info">No se encontraron instrumentos con los filtros seleccionados.</p>`;
            return;
        }

        const table = document.createElement("table");
        table.className = "table table-striped table-hover";
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Tipo</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Estado</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;
        const tbody = table.querySelector("tbody");

        instrumentos.forEach(instr => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${instr.codigo}</td>
                <td>${instr.tipo}</td>
                <td>${instr.marca}</td>
                <td>${instr.modelo || 'N/A'}</td>
                <td>${instr.estado === 'B' ? 'Bueno' : instr.estado === 'R' ? 'Regular' : 'Malo'}</td>
                <td>
                    <button type="button" class="btn btn-sm btn-success select-instrument-btn" data-codigo="${instr.codigo}">Seleccionar</button>
                </td>
            `;
            tbody.appendChild(row);
        });

        searchResultsDiv.appendChild(table);

        // Añadir event listeners a los botones de "Seleccionar"
        searchResultsDiv.querySelectorAll(".select-instrument-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const codigoSeleccionado = e.target.dataset.codigo;
                const instrumentoSeleccionado = lista_instrumento.find(instr => instr.codigo === codigoSeleccionado);

                if (instrumentoSeleccionado) {
                    // Rellenar el formulario principal
                    tipoInput.value = instrumentoSeleccionado.tipo;
                    marcaInput.value = instrumentoSeleccionado.marca;
                    modeloInput.value = instrumentoSeleccionado.modelo || "";
                    estadoInput.value = instrumentoSeleccionado.estado;
                    nroSerieInput.value = instrumentoSeleccionado.nro_serie || "";
                    patrimonioInput.value = instrumentoSeleccionado.patrimonio || "";
                    observacionesInput.value = instrumentoSeleccionado.observaciones || "";
                    imgInput.value = instrumentoSeleccionado.img || "";
                    manualInput.value = instrumentoSeleccionado.manual || "";
                    eindiceInput.value = instrumentoSeleccionado.eindice || "";
                    ecolimacionInput.value = instrumentoSeleccionado.ecolimacion || "";
                    descripcionInput.value = instrumentoSeleccionado.descripcion;

                    // Cambiar el texto del botón y establecer el modo de edición
                    saveButton.textContent = `Actualizar Instrumento (${instrumentoSeleccionado.codigo})`;
                    editingInstrumentCode = instrumentoSeleccionado.codigo;

                    modificacionModal.hide(); // Ocultar el modal
                    // alert(`Instrumento ${instrumentoSeleccionado.codigo} cargado para modificación.`); // Opcional: puedes eliminar este alert si prefieres una experiencia más fluida.
                }
            });
        });
    }
});