//JSON.parse(localStorage.getItem("lista_usuario")) ||
let lista_usuario =  [
    {
        id: "123",
        contrasenia: "123",
        correo: "cfreixas@gmail.com",
        telefono: "1111111111",
        administrador: true,
        tipo: "docente",
    },
    {
        id: "1234",
        contrasenia: "321",
        correo: "cfreixas@gmail.com",
        telefono: "1111111111",
        administrador: false,
        tipo: "estudiante",
    }
];
//Constructor de usuarios
function GestorUsuarios(){
    //propiedades del objeto usuario
    this.id = null;
    this.contrasenia = null;
    this.correo = null;
    this.telefono= null;
    this.tipo = null;
    this.administrador = false;

    //metodo ingreso identificacion
    this.ingresoIdentificacion = function() {
        const usuario_ingresado = prompt("Ingrese su ID de usuario:");
        const contrasenia_ingresada = prompt("Ingrese su contraseña:");
        return { usuario_ingresado, contrasenia_ingresada };
    }
    //metodos del objeto usuario nuevo usuario, valida usuario, momdifica datos
    this.nuevoUsuario = function(usuario_ingresado, contrasenia_ingresada){
        if (lista_usuario.some(u => u.id === usuario_ingresado)) {
            alert("eL USUARIO: " + usuario_ingresado +" ya está registrado. Intente con otro.");
            return null;
        }
        const nuevo_usuario = {
        id: usuario_ingresado,
        contrasenia: contrasenia_ingresada,
        correo: prompt("Ingrese un correo electronico valido: "),
        telefono: prompt("Ingrese un nro de telefono: "),
        tipo: prompt("Ingrese si es docente o estudiante: "),
        administrador: false,
        }
        lista_usuario.push(nuevo_usuario);
        localStorage.setItem("lista_usuario", JSON.stringify(lista_usuario));
        localStorage.setItem("usuario", JSON.stringify(nuevo_usuario));
        alert("Usuario registrado");
        return nuevo_usuario;
    }

    //metodo que  Busca un usuario
    this.buscarUsuario = function (usuario_ingresado) {
        
        let usuario_buscado = lista_usuario.find(u => u.id === usuario_ingresado);

    
        if (usuario_buscado) {
            localStorage.setItem("usuario", JSON.stringify(usuario_buscado));
            return usuario_buscado;
        } else {
            usuario_buscado = null;
        }
    }
    
    this.buscarValidaContraseña = function (usuario_ingresado, contrasenia_ingresada) {
        
        let usuario_buscado = lista_usuario.find(u => u.id === usuario_ingresado && u.contrasenia === contrasenia_ingresada);

    
        if (usuario_buscado) {
            //alert("Usuario encontrado:" + "Hola " +  usuario_buscado.id );
            return usuario_buscado;
        } else {
            usuario_buscado = null;
        }
    }
}


// HTML

// Crear el contenedor principal
const main = document.createElement('main');

// Crear y agregar los títulos
const h1 = document.createElement('h1');
h1.textContent = 'Inicio al Gestor del Salon de Instrumental';
const h2 = document.createElement('h2');
h2.textContent = 'Presione en el botón que considere conveniente';

main.appendChild(h1);
main.appendChild(h2);

// Datos para las cards
const cardsData = [
    { id: 'btnVisitante', texto: 'Visitante' },
    { id: 'btnIngreso', texto: 'Ingresar' },
    { id: 'btnRegistro', texto: 'Registrarse' }
];

// Crear las cards
cardsData.forEach(card => {
    const div = document.createElement('div');
    div.className = 'card-Index';
    div.id = card.id;

    const p = document.createElement('p');
    p.textContent = card.texto;

    div.appendChild(p);
    main.appendChild(div);
});

// Agregar el <main> al body
document.body.appendChild(main);


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnVisitante").addEventListener("click", modoVisitante);
    document.getElementById("btnIngreso").addEventListener("click", modoIngreso);
    document.getElementById("btnRegistro").addEventListener("click", modoRegistro);
});

// Funciones que se ejecutan al hacer clic
function modoVisitante() {
    alert("Entrando como visitante...");
    window.location.href = "/pages/inventario.html";
}
function modoIngreso() {
    const gestor = new GestorUsuarios();
    const { usuario_ingresado, contrasenia_ingresada } = gestor.ingresoIdentificacion();
    const usuario = gestor.buscarValidaContraseña(usuario_ingresado, contrasenia_ingresada);

    if (usuario) {
        alert("Bienvenido/a " + usuario.id);
        localStorage.setItem("usuario", JSON.stringify(usuario));
        window.location.href = "/pages/inventario.html";
    } else {
        alert("Credenciales inválidas");
    }
}
function modoRegistro() {
    const gestor = new GestorUsuarios();
    const { usuario_ingresado, contrasenia_ingresada } = gestor.ingresoIdentificacion();
    const usuario = gestor.nuevoUsuario(usuario_ingresado, contrasenia_ingresada);

    if (usuario) {
        alert("Usuario registrado correctamente. Bienvenido/a " + usuario.id);
        localStorage.setItem("usuario", JSON.stringify(usuario));
        window.location.href = "/pages/inventario.html";
    } else {
        alert("No se pudo registrar.");
    }
}
