const fila = document.querySelector(".contenedor-carousel");
const juegos =document.querySelectorAll(".juego");

const flechaIzquierda = document.getElementById("flecha-izquierda");
const flechaDerecha = document.getElementById("flecha-derecha");

//agregar event listener 
//flecha derecha
flechaDerecha.addEventListener("click", () =>{
    fila.scrollLeft += fila.offsetWidth;

    const indicadorActivo = document.querySelector(".indicadores .activo");
    if(indicadorActivo.nextSibling){
        indicadorActivo.nextSibling.classList.add("activo")
        indicadorActivo.classList.remove("activo")
    }
});

//flecha izquierda
flechaIzquierda.addEventListener("click", () =>{
    fila.scrollLeft -= fila.offsetWidth;
    const indicadorActivo = document.querySelector(".indicadores .activo");
    if(indicadorActivo.previouSibling){
        indicadorActivo.previousSibling.classList.add("activo")
        indicadorActivo.classList.remove("activo")
    }
});

/*paginacion*/
const numeroPaginas = Math.ceil(juegos.length / 5);
for(let i=0 ;i< numeroPaginas ;i++){
const indicador = document.createElement("button");

if(i === 0){
    indicador.classList.add("activo");
}
document.querySelector(".indicadores").appendChild(indicador);
indicador.addEventListener("click", (e) =>{
    fila.scrollLeft = i * fila.offsetWidth;
    document.querySelector(".indicadores .activo").classList.remove("activo")
    e.target.classList.add("activo");
});
}

//hover imagen
juegos.forEach((juego) => {
    juego.addEventListener("mouseenter", (e) =>{
        const elemento = e.currentTarget;
        setTimeout(() => {
            juegos.forEach(juego => juego.classList.remove("hover"))
            elemento.classList.add("hover");
        }, 300);
    })
})

fila.addEventListener("mouseleave", () =>{
    juegos.forEach(juego => juego.classList.remove("hover"));
})

/**** Buscar el juego para ver detalles ****/
/** Padres **/
let padreJuegoBuscado = document.getElementById('juego');
let padreCarousel = document.getElementById('img-carousel');
let padreRecomendados = document.getElementById('carousel-recomendados')

/** Traer listado de juegos **/
let listadoJuegos = [];
function leerDatoLocalStorage(){
    let idJuegoDetalle = JSON.parse(localStorage.getItem('detallesKEY'))
    if(localStorage.length >0){
        let listadolocalStorage = JSON.parse(localStorage.getItem('juegosKEY'));
        if(listadoJuegos.length === 0){
            listadoJuegos = listadolocalStorage
        }
    }
    /** Busca coincidencia **/
    for(let i in listadoJuegos){
        if(listadoJuegos[i].id == idJuegoDetalle){

            /** Carousel del juego **/
            let imagen =''
            if(listadoJuegos[i].imagen === ''){
                imagen = 'imgPorDefecto.png'
            } else{
                imagen = listadoJuegos[i].imagen
            }
            let imgCarousel = `
                    <div class="carousel-item active">
                        <img src="img/${imagen}" class="d-block w-100" id="" alt="${listadoJuegos[i].nombre}">
                    </div>
                    <div class="carousel-item">
                        <img src="img/${imagen}" class="d-block w-100" alt="${listadoJuegos[i].nombre}">
                    </div>
            `
            padreCarousel = imgCarousel
        }
    }
    /** Detalle juego **/
    for(let i in listadoJuegos){
        if(listadoJuegos[i].id == idJuegoDetalle){
            let  p =(listadoJuegos[i].precio * listadoJuegos[i].descuento)/100;
            let precioAntes =parseInt(listadoJuegos[i].precio) + p
            let juego =`
            <h4 class="fw-bold text-light" id="">${listadoJuegos[i].nombre}.</h4>
            <article class="d-flex">
                    <p class="text-success fw-bold text-light ">98% recomendado para ti</p>
                    <p class="mx-2 text-light">2020</p>
                    <p class="border border-light mx-2 px-2 text-light d-flex flex-direction-column align-items-center">
                        13+</p>
                    <p class="mx-2 text-warning celular"><strong>Nuevos juegos</strong></p>
                </article>
                <article>
                    <p class="fw-bold text-light" id="descripcion">${listadoJuegos[i].descripcion}.</p>
                </article>
                <article>
                    <p class="text-secondary">Género: <span class="text-white" id="categoria">${listadoJuegos[i].categoria}</span> 
                    </p>
                    <p class="text-secondary">Demo: <a href="${listadoJuegos[i].link}" class="text-white text-decoration-none" id="categoria">Ver demo</a> 
                    </p>
                    <p class="text-secondary">Ediciones: <span class="text-white">18 juegos para Android, iPhone, NDS, PC, PS2.</span> </p>
                    <p class="text-secondary">Precio: <span class="text-white">$</span><span class="text-white" id="precioDesc">${listadoJuegos[i].precio}</span> <del><span id="precio">${precioAntes}</span></del></p>
                    
                    <button class="btn btn-primary">Comprar <a href="error404.html"></a></button>
                </article>
            `
            padreJuegoBuscado.innerHTML = juego
        }
    }   

    /** Juegos recomendados **/ 
    for(let i in listadoJuegos){
        if(listadoJuegos[i].publicado === 'Si'){
            let imagen =''
            if(listadoJuegos[i].imagen === ''){
                imagen = 'imgPorDefecto.png'
            } else{
                imagen = listadoJuegos[i].imagen
            }
            let recomendados =`
            <div class="juego">
            <a href="#"><img src="img/${imagen}" class="img-recomendados" alt="${listadoJuegos[i].nombre}"></a>
             </div>
            `
            padreRecomendados.innerHTML += recomendados
        }
    }
        
    }
leerDatoLocalStorage()