function validarGeneral(event){
    event.preventDefault();
    if (
        validarCamposRequeridos() && 
        validarEmail(document.getElementById('email')) && 
        validarPassword(document.getElementById('password'))
        ) {
        console.log('datos correctos');
        resetearFormulario();
    } else {
        console.log('datos incorrectos');
    }
}



function validarCamposRequeridos() {
    let flag = false;
    let inputEmail = document.getElementById('email');
    let inputPassword = document.getElementById('password');

    if (inputEmail.value.trim() === '') {
        inputEmail.className = 'form-control is-invalid';
        flag = true;
    } else{
        inputEmail.className = 'form-control is-valid';
    }

    if (inputPassword.value.trim() === '') {
        inputPassword.className = 'form-control is-invalid';
        flag = true;
    } else{
        inputPassword.className = 'form-control is-valid';
    }

    if (flag) {
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
    if(password.value.trim() != '' && password.value.length >= 8){
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