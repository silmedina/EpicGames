function login(event){
    event.preventDefault();
    
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    if (
        validarCamposRequeridos() && 
        // validarEmail(email) && 
        validarPassword(password)
        ) {
            if(esAdministrador(email.value,password.value)){
                resetearFormulario();
                window.location.href = "/admin.html";
               
            }else{
                if(usuarioExiste(email.value,password.value)){
                    window.location.href = "/index.html";
                    resetearFormulario();
                   
                }else{
                    alert("usuario no existe");
                }
            }
    }
}

function esAdministrador(email,password){
    if (email ==='admin' && password ==='admin') {
        return true;
    }else{
        return false;
    }
}

function usuarioExiste(email,password){
    if (email ==='silpato@gmail.com' && password ==='12345678') {
        return true;
    }else{
        return false;
    }
}


function validarCamposRequeridos() {
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