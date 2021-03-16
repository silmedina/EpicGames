

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
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

    if(contactList == null){
        
    }
    else{
        enviarMail();
    }
    // Swal.fire({
    //     icon: 'success',
    //     title: 'Oops...',
    //     text: 'Something went wrong!',
    //     footer: '<a href>Tienes algun tipo de problema? Entra aqui!</a>'
    // })
}


let contactList = [];

function enviarMail (){
    console.log('desde la funcion agregar producto')
    // aqui preguntar si todos los campos estan correctamente validados (validar general)

    // traigo todos los valores del formulario
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;

    // crear el nuevo objeto
    let newContact = new Mail( name, email, message );
    // agregar el nuevo contacto en el arreglo
    contactList.push(newContact);
    console.log(contactList)

    // guardar el arreglo de contacto en localstorage
    localStorage.setItem('contactListKey', JSON.stringify(contactList));

    // limpiar el formulario
    limpiarFormulario()
    // mostrar un mensaje que su mail se envio correctamente
    Swal.fire(
        'contacto agregado',
        'El Mail se ha enviado correctamente',
        'success'
      )
    // buscar los datos del localstorage y dibujar
        leerDatos();
}

function limpiarFormulario(){
    // resetea los valores del formulario
    document.getElementById('contactForm').reset();
    // reseteo variable modificarFunkopop
    //modificarFunkopop=false;
}