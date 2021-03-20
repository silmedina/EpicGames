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

