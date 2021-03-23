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