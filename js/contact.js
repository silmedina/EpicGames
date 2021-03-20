(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
  
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

window.messageContact = function (event){
    event.preventDefault();

}

let contactList = [];

function enviarMail (){
    console.log('desde la funcion agregar producto')

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;

    let newContact = new Mail( name, email, message );
    contactList.push(newContact);
    console.log(contactList)

    localStorage.setItem('contactListKey', JSON.stringify(contactList));

    limpiarFormulario()

    Swal.fire(
        'contacto agregado',
        'El Mail se ha enviado correctamente',
        'success'
      )
        leerDatos();
}

function limpiarFormulario(){
    document.getElementById('contactForm').reset();
}