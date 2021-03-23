import {Juego} from './administradorClases.js'
import { Usuario } from './usuario.js'

(function(){
    mostrarOcultarBotones();
    cargarUsuariosRegistrados();
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

function cargarUsuariosRegistrados(){
    if(localStorage.getItem('usuariosRegistrados') == null){
        const objetoAdmin = new Usuario('admin', 'admin', 'admin','admin@epicgames.com','','Si');
        let arrayUsuarios = [objetoAdmin];
        localStorage.setItem('usuariosRegistrados', JSON.stringify(arrayUsuarios));
    }
}

let botonCerrarSesion = document.getElementById('botonCerrarSesion');
botonCerrarSesion.addEventListener('click', cerrarSesion);


function cerrarSesion(){
    localStorage.removeItem('usuarioLogueado');
    document.getElementById('botonLogin').style.display = '';
    document.getElementById('botonRegistro').style.display = '';
    document.getElementById('botonCerrarSesion').style.display = 'none';
    document.getElementById('infoUsuario').style.display = 'none';
    window.location.href = "/index.html";
}

window.addEventListener('load', function(){
	new Glider(document.querySelector('.carousel__lista'), {
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: '.carousel__indicadores',
		arrows: {
			prev: '.carousel__anterior',
			next: '.carousel__siguiente'
		},
		responsive: [
			{
			  // screens greater than >= 775px
			  breakpoint: 450,
			  settings: {
				// Set to `auto` and provide item width to adjust to viewport
				slidesToShow: 2,
				slidesToScroll: 2
			  }
			},{
			  // screens greater than >= 1024px
			  breakpoint: 800,
			  settings: {
				slidesToShow: 4,
				slidesToScroll: 4
			  }
			}
		]
	});
});

/** Arreglo que almacene los juegos **/
let listaJuegos= [];

traerDatos();
function traerDatos(){
    if(localStorage.length >0){
        listaJuegos = JSON.parse(localStorage.getItem('juegosKEY'));

        /** Padres de cada categoria **/
        let padreDestacado = document.getElementById('juegoDestacado');
        let padreRecomendados = document.getElementById('juegosRecomendados');
        let padreDeportes = document.getElementById('juegosDeportes');
        let padreAccion = document.getElementById('juegosAccion');
        let padreClasicos = document.getElementById('juegosClasicos');
        let padreOfertas = document.getElementById('ofertas');
        let padreNuevos = document.getElementById('nuevos');
   
        padreRecomendados.innerHTML ='';
        padreDeportes.innerHTML ='';
        padreAccion.innerHTML ='';
        padreClasicos.innerHTML = '';
        padreOfertas.innerHTML ='';
        padreNuevos.innerHTML ='';
        
        /** Busqueda destacado **/
        for(let i in listaJuegos){
            if(listaJuegos[i].destacado == 'Si'){
                padreDestacado.innerHTML ='';
                let  p =(listaJuegos[i].precio * listaJuegos[i].descuento)/100;
                let precioAntes =parseInt(listaJuegos[i].precio) + p
                
                let imagen='';
                if(listaJuegos[i].imagen === ''){
                    /** Agregamos img por defecto **/
                    imagen= 'imgPorDefecto.png'
                } else{
                    /** Img que se cargo **/
                    imagen = listaJuegos[i].imagen
                }
                let columna =`
                    <div class="col-sm-7 col-md-8 p-0">
                    <img src="./img/${imagen}" class="d-block w-100 img-destacado" alt="${listaJuegos[i].nombre}">
                    </div>
                    <div class="col-sm-5 col-md-4 text-white p-4">
                    <h2 class="fw-bolder">${listaJuegos[i].nombre}</h2>
                    <h4 class=" my-3 lead">${listaJuegos[i].descripcion}</h4>
                    
                    <div class="d-flex justify-content-start container-fila-precios">
                        <div class="">
                            <span class="badge bg-secondary fw-bolder">-%${listaJuegos[i].descuento}</span>
                        </div>
                        <div class="px-2 ">
                            <p class=""><del>$${precioAntes}</del></p>
                        </div>
                        <div class="px-0 ">
                            <p class="fw-bolder">$${listaJuegos[i].precio}</p>    
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary" onclick="detalle(${listaJuegos[i].id})" id="${listaJuegos[i].id}">Leer mas</button>
                    </div>
                    </div>
                `
               padreDestacado.innerHTML += columna;
            }
        }
        /** Busqueda recomendados **/
        for(let i in listaJuegos){
            if(listaJuegos[i].publicado === 'Si'){
                let imagen='';
                if(listaJuegos[i].imagen === ''){
                    /** Agregamos img por defecto **/
                    imagen= 'imgPorDefecto.png'
                } else{
                    /** Img que se cargo **/
                    imagen = listaJuegos[i].imagen
                }
                let columna =`
                    <a onclick="detalle(${listaJuegos[i].id})" id="${listaJuegos[i].id}" class="text-decoration-none text-white card-recomendados">
                    <div class="carousel__elemento m-0">
                    <img src="img/${imagen}" class="d-block w-100 img-destacados" alt="Rock and Roll Hall of Fame">
                    <p>${listaJuegos[i].nombre}</p>
                    </div>
                    </a>
                `
                padreRecomendados.innerHTML += columna;
            }
        }
        /** Busqueda en ofertas **/
        for(let i in listaJuegos){
            if(listaJuegos[i].descuento != 0){
                let imagen='';
                if(listaJuegos[i].imagen === ''){
                    /** Agregamos img por defecto **/
                    imagen= 'imgPorDefecto.png'
                } else{
                    /** Img que se cargo **/
                    imagen = listaJuegos[i].imagen
                }
                let columna =`
                <a onclick="detalle(${listaJuegos[i].id})" id="${listaJuegos[i].id}" class="card-novedades text-white fw-bolder text-decoration-none p-0 py-1">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex justify-content-start">
                        <div class="">
                            <img src="./img/${imagen}" class="img-novedades" alt="${listaJuegos[i].nombre}">              
                        </div>
                        <div>
                            <div class="px-2">
                                <p class="m-0">${listaJuegos[i].nombre}</p>
                            </div>
                            <div class="px-2">
                                <p><span class="badge bg-secondary mx-2">-%${listaJuegos[i].descuento}</span>$${listaJuegos[i].precio}</p>
                            </div>
                        </div>
                    </div>
                
                    <div class="">
                        <i class="fas fa-plus-circle align-middle"></i>
                    </div>
                </div>
            </a>
                `
               padreOfertas.innerHTML += columna;
            }
        }

        /** Busqueda en nuevos **/
        for(let i in listaJuegos){
            if(listaJuegos[i].descuento != 0){
                let imagen='';
                if(listaJuegos[i].imagen === ''){
                    /** Agregamos img por defecto **/
                    imagen= 'imgPorDefecto.png'
                } else{
                    /** Img que se cargo **/
                    imagen = listaJuegos[i].imagen
                }
                let columna =`
                <a onclick="detalle(${listaJuegos[i].id})" id="${listaJuegos[i].id}" class="card-novedades text-white fw-bolder text-decoration-none p-0 py-1">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex justify-content-start">
                        <div class="">
                            <img src="./img/${imagen}" class="img-novedades" alt="${listaJuegos[i].nombre}">              
                        </div>
                        <div>
                            <div class="px-2">
                                <p class="m-0">${listaJuegos[i].nombre}</p>
                            </div>
                            <div class="px-2">
                                <p>$${listaJuegos[i].precio}</p>
                            </div>
                        </div>
                    </div>
                
                    <div class="">
                        <i class="fas fa-plus-circle align-middle"></i>
                    </div>
                </div>
            </a>
                `
               padreNuevos.innerHTML += columna;
            }
        }

        /** Busqueda categoria deportes **/
        for(let i in listaJuegos){
            if(listaJuegos[i].categoria === 'Deportes'){   
                let imagen='';
                console.log(listaJuegos[i])
                if(listaJuegos[i].imagen === ''){
                    /** Agregamos img por defecto **/
                    imagen= 'imgPorDefecto.png'
                } else{
                    /** Img que se cargo **/
                    imagen = listaJuegos[i].imagen
                }
                let columna =`
                    <div class="card col-sm-12 col-md-6 bg-dark p-3 border border-0 shadow p-2 mb-2 rounded card-deportes">
                    <img class=" w-100 img-deportes" src="img/${imagen}" alt="${listaJuegos[i].nombre}">
                    <div class="card-body">
                    <h5 class="card-title">${listaJuegos[i].nombre}<span class="m-1 badge bg-secondary">Nuevo</span></h5>
                    <p class="">${listaJuegos[i].descripcion}</p>
                    <p class="fw-bolder">$${listaJuegos[i].precio}</p>
                    <div class="d-flex justify-content-between">
                    <div>
                      <button class="btn btn-primary" onclick="agregarCarrito(this)" id="${listaJuegos[i].id}">Agregar al carrito</button>
                    </div>
                    <div>
                      <button type="button" class="btn btn-primary" onclick="detalle(${listaJuegos[i].id})" id="${listaJuegos[i].id}" >Leer mas</button>
                    </div>
                    </div>
                    </div>
                    </div>
                `
                padreDeportes.innerHTML += columna;
            }
        }

        /** Busuqeda de categoria accion **/
        for(let i in listaJuegos){
            if(listaJuegos[i].categoria === 'Accion'){
                let imagen='';
                if(listaJuegos[i].imagen === ''){
                    /** Agregamos img por defecto **/
                    imagen= 'imgPorDefecto.png'
                } else{
                    /** Img que se cargo **/
                    imagen = listaJuegos[i].imagen
                }
                let columna =`
                    <div class="card col-sm-12 col-md-6 bg-dark p-3 border border-0 shadow p-2 mb-2 rounded card-deportes">
                    <img class=" w-100 img-deportes" src="img/${imagen}" alt="${listaJuegos[i].nombre}">
                    <div class="card-body">
                    <h5 class="card-title">${listaJuegos[i].nombre}<span class="m-1 badge bg-secondary">Nuevo</span></h5>
                    <p class="">${listaJuegos[i].descripcion}</p>
                    <p class="fw-bolder">$${listaJuegos[i].precio}</p>
                    <div class="d-flex justify-content-between">
                    <div>
                      <button class="btn btn-primary" onclick="agregarCarrito(this)" id="${listaJuegos[i].id}">Agregar al carrito</button>
                    </div>
                    <div>
                      <button type="button" class="btn btn-primary" onclick="detalle(${listaJuegos[i].id})" id="${listaJuegos[i].id}" >Leer mas</button>
                    </div>
                    </div>
                    </div>
                    </div>
                `
                padreAccion.innerHTML += columna;
            }
        }

        /** Busuqeda de categoria clasicos **/
        for(let i in listaJuegos){
            if(listaJuegos[i].categoria === 'Clasicos'){
                let imagen='';
                if(listaJuegos[i].imagen === ''){
                    /** Agregamos img por defecto **/
                    imagen= 'imgPorDefecto.png'
                } else{
                    /** Img que se cargo **/
                    imagen = listaJuegos[i].imagen
                }
                let columna =`
                    <div class="card col-sm-12 col-md-6 bg-dark p-3 border border-0 shadow p-2 mb-2 rounded card-deportes">
                    <img class=" w-100 img-deportes" src="img/${imagen}" alt="${listaJuegos[i].nombre}">
                    <div class="card-body">
                    <h5 class="card-title">${listaJuegos[i].nombre}<span class="m-1 badge bg-secondary">Nuevo</span></h5>
                    <p class="">${listaJuegos[i].descripcion}</p>
                    <p class="fw-bolder">$${listaJuegos[i].precio}</p>
                    <div class="d-flex justify-content-between">
                    <div>
                      <button class="btn btn-primary" onclick="agregarCarrito(this)" id="${listaJuegos[i].id}">Agregar al carrito</button>
                    </div>
                    <div>
                      <button type="button" class="btn btn-primary" onclick="detalle(${listaJuegos[i].id})" id="${listaJuegos[i].id}" >Leer mas</button>
                    </div>
                    </div>
                    </div>
                    </div>
                `
                padreClasicos.innerHTML += columna;
            }
        }
    }
}

window.detalle =function(id){
    localStorage.setItem('detallesKEY',JSON.stringify(id))
    window.location.href = '/detalles.html'
}

/** Carrito **/
let carritoArray =[];

/** Agregar al carrito **/
window.agregarCarrito= function(elemento){
    let carrito = document.getElementById('contador-carrito')
    let carritoAcumulado = parseInt(carrito.textContent) + 1
    carrito.innerHTML = carritoAcumulado;

    for(let i in listaJuegos){
        if(listaJuegos[i].id === elemento.id){
            let id = listaJuegos[i].id;
            let nombre = listaJuegos[i].nombre;
            let descripcion = listaJuegos[i].descripcion;
            let categoria = listaJuegos[i].categoria;
            let imagen = listaJuegos[i].imagen;
            let descuento = listaJuegos[i].descuento;
            let precio = listaJuegos[i].precio;
            let publicado = listaJuegos[i].publicado;
            let destacado =listaJuegos[i].destacado;
            
            let juego = new Juego(id, nombre, descripcion, categoria, imagen, descuento, precio, publicado, destacado);
            carritoArray.push(juego)
        }
    }
    console.log(carritoArray)
}

window.verMas = function(){
    window.location.href = ('/error404.html')
}
