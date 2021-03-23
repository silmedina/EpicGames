(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
  
    function sendMail(params){
      let tempParams = {
          to_name: document.getElementById("name").value,
          to_email: document.getElementById("email").value,
          message: document.getElementById("message").value,
      };
  
      emailjs.send('service_o66kxx7','template_05mom3j',tempParams)
      .then(function(res){
          console.log("success",res.status);
      })
    }

    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            Swal.fire({
                title:"Verifique los campos nuevamente",
                icon:"error",
                timer:"5000",
                timerProgressBar:"true"
              })
          }
          else{
            Swal.fire({
              title: "Seguro que quieres mandar el mensaje?",
              icon: "question",
              showDenyButton: true,
              confirmButtonText: "OK!",
              denyButtonText: "Cancelar",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire('El mensaje fue mandado exitosamente!', '', 'success');
                form.classList.add('was-validated');
                sendMail();
                document.getElementById("contactForm").reset();
              } else if (result.isDenied) {
                Swal.fire('El mensaje no se envió', '', 'info');
                document.getElementById("contactForm").reset();
              }
            })
            event.preventDefault();
          }
        }, false)
      })
  })()