
import { Usuario } from './usuario.js'

(function(){
    mostrarOcultarBotones();
 })();

 function mostrarOcultarBotones(){
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado != null){
     document.getElementById('botonLogin').style.display = 'none';
     document.getElementById('botonRegistro').style.display = 'none';
     const usuario = JSON.parse(usuarioLogueado);
     document.getElementById('infoUsuario').innerHTML = '<i class="far fa-user"></i> ' + usuario.email;
     if(usuario.tipoUsuario == 'administrador'){
         document.getElementById('botonAdministrador').style.display = 'block';
     }
     document.getElementById('botonCerrarSesion').style.display = 'block';  
     document.getElementById('infoUsuario').style.display = 'block';
    }else{
     document.getElementById('botonCerrarSesion').style.display = 'none';  
     document.getElementById('infoUsuario').style.display = 'none';
     document.getElementById('botonAdministrador').style.display = 'none';
     document.getElementById('botonLogin').style.display = 'block';
     document.getElementById('botonRegistro').style.display = 'block';
    }
    document.getElementById('botonInicio').style.display = 'block';
 }
 window.registrarUsuario = function(event){
    event.preventDefault();

    // validar formulario

    let usuario = document.getElementById('usuario').value;
    let nombre = document.getElementById('nombre').value;
    let password = document.getElementById('password').value;
    let correo = document.getElementById('correo').value;
    let telefono = document.getElementById('telefono').value;

    let nuevoUsuario = new Usuario(usuario,nombre,password,correo,telefono);

    if(localStorage.getItem('usuariosRegistrados') != null){
        let usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados'));
        let usuarioPorEmail = buscarUsuarioPorEmail(usuariosRegistrados,correo);
        if(typeof usuarioPorEmail === 'undefined'){
            usuariosRegistrados.push(nuevoUsuario);
            localStorage.removeItem('usuariosRegistrados');
            localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosRegistrados));
            Swal.fire({
                icon: 'success',
                title: 'Genial',
                text: 'Usuario registrado exitosamente!',
                footer: '<a href="login.html">Ir al inicio de sesion?</a>'
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El email ingresado ya existe!',
                footer: '<a href="login.html">Ir al inicio de sesion?</a>'
            })
        }
      
    }
}

function  buscarUsuarioPorEmail(usuariosRegistrados, email){
    let usuario = usuariosRegistrados.find(usuario=> {
        return usuario.email === email
      });
    return usuario;
}


// formulario

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
    usuario: false,
    nombre: false,
    password: false,
    correo: false,
    telefono: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "usuario":
            validarCampo(expresiones.usuario, e.target, 'usuario');
            break;
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "password":
            validarCampo(expresiones.password, e.target, 'password');
            validarPassword2();
            break;
        case "password2":
            validarPassword2();
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
            break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo-${campo}`).classList.remove('formulario-grupo-incorrecto');
        document.getElementById(`grupo-${campo}`).classList.add('formulario-grupo-correcto');
        document.querySelector(`#grupo-${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo-${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo-${campo} .formulario-input-error`).classList.remove('formulario-input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo-${campo}`).classList.add('formulario-grupo-incorrecto');
        document.getElementById(`grupo-${campo}`).classList.remove('formulario-grupo-correcto');
        document.querySelector(`#grupo-${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo-${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo-${campo} .formulario-input-error`).classList.add('formulario-input-error-activo');
        campos[campo] = false;
    }
}

const validarPassword2 = () => {
    const inputPassword1 = document.getElementById('password');
    const inputPassword2 = document.getElementById('password2');

    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`grupo-password2`).classList.add('formulario-grupo-incorrecto');
        document.getElementById(`grupo-password2`).classList.remove('formulario-grupo-correcto');
        document.querySelector(`#grupo-password2 i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo-password2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo-password2 .formulario-input-error`).classList.add('formulario-input-error-activo');
        campos['password'] = false;
    } else {
        document.getElementById(`grupo-password2`).classList.remove('formulario-grupo-incorrecto');
        document.getElementById(`grupo-password2`).classList.add('formulario-grupo-correcto');
        document.querySelector(`#grupo-password2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo-password2 i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo-password2 .formulario-input-error`).classList.remove('formulario-input-error-activo');
        campos['password'] = true;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const terminos = document.getElementById('terminos');
    if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked) {
        formulario.reset();

        document.getElementById('formulario-mensaje-exito').classList.add('formulario-mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario-mensaje-exito').classList.remove('formulario-mensaje-exito-activo');
        }, 5000);

        document.querySelectorAll('.formulario-grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario-grupo-correcto');
        });
    } else {
        document.getElementById('formulario-mensaje').classList.add('formulario-mensaje-activo');
    }
});

/** Validaciones form admin **/
function validarId(elemento) {
    console.log("en la funcion campo requerido");
    if (elemento.value === "") {
      elemento.className = "form-control is-invalid";
      return false;
    } else {
      elemento.className = "form-control is-valid";
      return true;
    }
  }

function validarNombre(elemento) {
    console.log("en la funcion campo requerido");
    if (elemento.value === "") {
      elemento.className = "form-control is-invalid";
      return false;
    } else {
      elemento.className = "form-control is-valid";
      return true;
    }
  }

function validarDescripcion(elemento){
    if(elemento.value != '' && elemento.value.length >= 10){
        elemento.className = 'form-control is-valid';
        return true;
    }else{
        elemento.className = "form-control is-invalid";
        return false;
    }
  }

function validarNumeros(elemento) {
    if (elemento.value != "" && !isNaN(elemento.value)) {
      elemento.className = "form-control is-valid";
      return true;
    } else {
      elemento.className = "form-control is-invalid";
      return false;
    }
  }

  function validarSelect(elemento) {
      console.log(elemento)
    if (elemento.value != 0) {
      elemento.className = "form-control is-valid";
      return true;
    } else {
      elemento.className = "form-control is-invalid";
      return false;
    }
  }