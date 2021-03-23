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
 
function login(event){
    event.preventDefault(); 
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    if (
        validarCamposRequeridos() && 
        validarEmail(email) && 
        validarPassword(password)
        ) {
            if(esAdministrador(email.value,password.value)){
                guardarUsuarioLocalStorage(email,'administrador');
                window.location.href = "/UserAdmin.html";
               
            }else{
                let usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados'));
                let usuarioPorEmail = buscarUsuarioPorEmail(usuariosRegistrados,email.value);
                if(typeof usuarioPorEmail === 'undefined'){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'El correo ingresado no existe!',
                        footer: '<a href="registro.html">Ir a la pagina de registro?</a>'
                    })
                } else{
                    if(password.value === usuarioPorEmail.password){
                        guardarUsuarioLocalStorage(email,'usuario');
                        window.location.href = "/index.html";
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Password incorrecto!'
                        })
                    }
                }
            }
    }
}

function guardarUsuarioLocalStorage(email,tipousuario){
    const objetoUsuario = {'email': email.value, 'tipoUsuario': tipousuario };
    if(localStorage.getItem('usuarioLogueado') != null){
        localStorage.removeItem('usuarioLogueado');
    }

    localStorage.setItem('usuarioLogueado', JSON.stringify(objetoUsuario));
}

function esAdministrador(email,password){
    let usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados'));
    let usuarioAdmin = buscarUsuarioPorEmail(usuariosRegistrados,'admin@epicgames.com');

    if (email === usuarioAdmin.email && password === usuarioAdmin.password) {
        return true;
    }else{
        return false;
    }
}

function  buscarUsuarioPorEmail(usuariosRegistrados, email){
    let usuario = usuariosRegistrados.find(usuario=> {
        return usuario.email === email
      });
    return usuario;
}


function validarCamposRequeridos(event) {
    let flagValidarFormulario = false;
    let inputEmail = document.getElementById('email');
    let inputPassword = document.getElementById('password');

    if (inputEmail.value.trim() === '') {
        inputEmail.className = 'form-control is-invalid';
        flagValidarFormulario = true;
    } else{
        inputEmail.className = 'form-control is-valid';
    }

    if (inputPassword.value.trim() === '') {
        inputPassword.className = 'form-control is-invalid';
        flagValidarFormulario = true;
    } else{
        inputPassword.className = 'form-control is-valid';
    }

    if (flagValidarFormulario) {
        return false;
    } else {
        return true;
    }
}

function validarEmail(email){
    let expresion = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if(email.value.trim() != '' && expresion.test(email.value)){
        email.className = 'form-control is-valid';
        return true;
    }else{
        email.className = 'form-control is-invalid';
        return false;
    }
}

function validarPassword(password){
    if(password.value.trim() != '' && password.value.length >= 4){
        password.className = 'form-control is-valid';
        return true;
    }else{
        password.className = 'form-control is-invalid';
        return false;
    }
}

function campoRequerido(input){
    if (input.value.trim() === ''){
        input.className = 'form-control is-invalid';
        return false;
    } else{
        input.className = 'form-control is-valid';
        return true;
    }
}

function resetearFormulario() {
    document.getElementById('formLogin').reset();
    let inputEmail = document.getElementById('email');
    let inputPassword = document.getElementById('password');

    inputEmail.className = 'form-control';
    inputPassword.className = 'form-control';
}

const modalOlvidoPassword = new bootstrap.Modal(document.getElementById('modalOlvidoPassword'));
function abrirModal(){
    let campoEmailRecuperar = document.getElementById('emailRecuperar');
    campoEmailRecuperar.value = '';
    campoEmailRecuperar.className = 'form-control';
    modalOlvidoPassword.show()
}

window.recuperarPassword = function(event){
    event.preventDefault();
    if (validarEmail(document.getElementById('emailRecuperar'))){
            modalOlvidoPassword.hide();
            Swal.fire({
                icon: 'success',
                title: 'Exito',
                text: 'Se envio satisfactoriamente el correo!'
            })
        }
}