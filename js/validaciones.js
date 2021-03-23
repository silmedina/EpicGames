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

  function validarLink(elemento){
    if(elemento.value != ''){
        elemento.className = 'form-control is-valid';
        return true;
    }else{
        elemento.className = "form-control is-invalid";
        return false;
    }
  }