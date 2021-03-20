import {Juego} from './administradorClases.js'

let listadoJuegos = [];

/** Bandera **/
// FALSE --> Agrega ----  TRUE --> modifica
let modificarJuego = false

/** Abrir modal **/
const modalJuegos = new bootstrap.Modal(document.getElementById('modal-juegos'));
let btnAgregar = document.getElementById('btn-agregar');
btnAgregar.addEventListener('click',()=>{
    document.getElementById('btn-form').innerHTML ='Guardar'
    document.getElementById('titulo-modal').innerHTML = 'Agregar juego'
    document.getElementById('id').disabled = false;
    limpiarForm();
    modalJuegos.show()
})

const limpiarForm = () =>{
    document.getElementById("form-juegos").reset();
    let id = document.getElementById('id')
    let nombre = document.getElementById('nombre')
    let descripcion = document.getElementById('descripcion')
    let categoria = document.getElementById('categoria')
    let imagen = document.getElementById('imagen')
    let descuento = document.getElementById('descuento')
    let precio = document.getElementById('precio')
    let link = document.getElementById('link')
    let publicado = document.getElementById('publicado')
    let destacado = document.getElementById('destacado')

    id.className ='form-control'
    nombre.className ='form-control'
    descripcion.className ='form-control'
    categoria.className ='form-control'
    imagen.className ='form-control'
    descuento.className ='form-control'
    precio.className ='form-control'
    link.className ='form-control'
    publicado.className ='form-control'
    destacado.className ='form-control'
    /** Resetear bandera **/
    modificarJuego = false;
}

leerDatosLocalStorage();
const almacenarDatos = ()=>{
    let id = document.getElementById('id').value;
    let nombre = document.getElementById('nombre').value;
    let descripcion = document.getElementById('descripcion').value;
    let categoria = document.getElementById('categoria').value;
    let imagen = document.getElementById('imagen').value;
    let descuento = document.getElementById('descuento').value;
    let precio = document.getElementById('precio').value;
    let link = document.getElementById('link').value;
    let publicado = document.getElementById('publicado').value;
    let destacado = 'No';

    let nuevoJuego = new Juego(id, nombre, descripcion, categoria, imagen, descuento, precio, link, publicado, destacado)
    
    /**Agregar al Array **/
    listadoJuegos.push(nuevoJuego);
    localStorage.setItem('juegosKEY', JSON.stringify(listadoJuegos))
    
    /** Limpiar form **/
    limpiarForm();
    /** Msj del sistema **/
    Swal.fire(
        'Juego agregado correctamente',
        'El juego se acargo correctamente',
        'success'
    )
    /** Leemos LS **/
    leerDatosLocalStorage();
    /**Cerrar Model**/
    modalJuegos.hide();
}

function leerDatosLocalStorage (){
    if(localStorage.length > 0){
        let listadoLocalStorage = JSON.parse(localStorage.getItem('juegosKEY'));
        if(listadoJuegos.length === 0){
            listadoJuegos = listadoLocalStorage
        }
        tabla(listadoLocalStorage)
    }
}

function tabla(juegosCargados) {
    
    let cuerpo = document.getElementById('tablaJuegos')
    let fila ='';
    cuerpo.innerHTML = '';
    for(let i in juegosCargados) {
        fila =`<tr class="text-white">
            <th scope="row">${juegosCargados[i].id}</th>
            <td>${juegosCargados[i].nombre}</td>
            <td>${juegosCargados[i].descripcion}</td>
            <td>${juegosCargados[i].categoria}</td>
            <td>${juegosCargados[i].imagen}</td>
            <td>${juegosCargados[i].descuento}</td>
            <td>${juegosCargados[i].precio}</td>
            <td>${juegosCargados[i].link}</td>
            <td>${juegosCargados[i].publicado}</td>
            <td>${juegosCargados[i].destacado}</td>
            
            <td class="td-acciones">
                <button class="btn btn-secondary td-btn btn-sm" onclick="buscarJuego(this)" id="${juegosCargados[i].id}"><i class="far fa-edit"></i></button>
                <button class="btn btn-secondary td-btn btn-sm" onclick="eliminarJuego(this)" id="${juegosCargados[i].id}"><i class="far fa-trash-alt"></i></button>
                <button class="btn btn-secondary td-btn btn-sm" onclick="destacarJuego(this)" id="${juegosCargados[i].id}"><i class="far fa-star"></i></button>            
            </td>
        </tr>`;
        cuerpo.innerHTML += fila;
    };
    
}

/** Funcion para editar datos de un juego **/
window.buscarJuego = function(botonEditar){
    let juegoEncontrado = listadoJuegos.find( j => j.id === botonEditar.id)
    console.log(juegoEncontrado)
    document.getElementById('id').value = juegoEncontrado.id;
    document.getElementById('nombre').value = juegoEncontrado.nombre;
    document.getElementById('descripcion').value = juegoEncontrado.descripcion;
    document.getElementById('categoria').value = juegoEncontrado.categoria;
    document.getElementById('imagen').value = juegoEncontrado.imagen;
    document.getElementById('descuento').value = juegoEncontrado.descuento;
    document.getElementById('precio').value = juegoEncontrado.precio;
    document.getElementById('link').value = juegoEncontrado.link;
    document.getElementById('publicado').value = juegoEncontrado.publicado;
    document.getElementById('destacado').value = juegoEncontrado.destacado;
    document.getElementById('btn-form').innerHTML ='Actualizar'
    document.getElementById('titulo-modal').innerHTML = 'Actualizar juego'
    document.getElementById('id').disabled = true;

    /** Cambiar Bandera **/
    modificarJuego = true;
    /** Mostrar Modal **/
    modalJuegos.show();
}

/** Funcion para eliminar un juego **/
window.eliminarJuego = function (botonEliminar) {
    console.log(botonEliminar.id)
    Swal.fire({
        title: 'Esta seguro de eliminar el juego seleccionado',
        text: "No puedes volver atras luego de este paso",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            
            let productosFiltrados = listadoJuegos.filter( function (p){
                return p.id != botonEliminar.id;
            })
            console.log(productosFiltrados);

            // guardar el arreglo en localstorage
            listadoJuegos= productosFiltrados
            localStorage.setItem("juegosKEY", JSON.stringify(listadoJuegos))

            // invocar a la funcion leerdatos
            leerDatosLocalStorage()
          Swal.fire(
            'Funkopop eliminado',
            'El juego seleccionado fue eliminado',
            'success'
          )
        }
      })
}

window.destacarJuego = function(botonDestacar){
    for(let i in listadoJuegos){
        if(listadoJuegos[i].id === botonDestacar.id){
            listadoJuegos[i].nombre = listadoJuegos[i].nombre;
            listadoJuegos[i].descripcion = listadoJuegos[i].descripcion;
            listadoJuegos[i].categoria = listadoJuegos[i].categoria;
            listadoJuegos[i].imagen = listadoJuegos[i].imagen;
            listadoJuegos[i].descuento = listadoJuegos[i].descuento;
            listadoJuegos[i].precio = listadoJuegos[i].precio;
            listadoJuegos[i].link = listadoJuegos[i].link;
            listadoJuegos[i].publicado = listadoJuegos[i].publicado;
            listadoJuegos[i].destacado = 'Si';
            
        } else{
            listadoJuegos[i].nombre = listadoJuegos[i].nombre;
            listadoJuegos[i].descripcion = listadoJuegos[i].descripcion;
            listadoJuegos[i].categoria = listadoJuegos[i].categoria;
            listadoJuegos[i].imagen = listadoJuegos[i].imagen;
            listadoJuegos[i].descuento = listadoJuegos[i].descuento;
            listadoJuegos[i].precio = listadoJuegos[i].precio;
            listadoJuegos[i].link = listadoJuegos[i].link;
            listadoJuegos[i].publicado = listadoJuegos[i].publicado;
            listadoJuegos[i].destacado = "No";
        }
    }
    localStorage.setItem('juegosKEY', JSON.stringify(listadoJuegos));
    leerDatosLocalStorage()
    
}

/** Funcion para guardar los datos editados **/
const editarDatos =() =>{
    let id = document.getElementById('id').value;
    let nombre = document.getElementById('nombre').value;
    let descripcion = document.getElementById('descripcion').value;
    let categoria = document.getElementById('categoria').value;
    let imagen = document.getElementById('imagen').value;
    let descuento = document.getElementById('descuento').value;
    let precio = document.getElementById('precio').value;
    let link = document.getElementById('link').value;
    let publicado = document.getElementById('publicado').value;
    let destacado = document.getElementById('destacado').value;

    for(let i in listadoJuegos){
        if(listadoJuegos[i].id === id){
            listadoJuegos[i].id = id;
            listadoJuegos[i].nombre = nombre;
            listadoJuegos[i].descripcion = descripcion;
            listadoJuegos[i].categoria = categoria;
            listadoJuegos[i].imagen = imagen;
            listadoJuegos[i].descuento = descuento;
            listadoJuegos[i].precio = precio;
            listadoJuegos[i].link = link;
            listadoJuegos[i].publicado = publicado;
            listadoJuegos[i].destacado = destacado;
        }
    }
    limpiarForm();
    localStorage.setItem('juegosKEY', JSON.stringify(listadoJuegos));
    leerDatosLocalStorage()

    Swal.fire(
        'Juego modificado correctamente',
        'El juego se ha modificado correctamente',
        'success'
    )
    /** Leemos LS **/
    leerDatosLocalStorage();
    /**Cerrar Model**/
    modalJuegos.hide();

}

window.guardarJuego = function(event){
    event.preventDefault();
    if(validarId(document.getElementById('id')) &&
    validarNombre(document.getElementById('nombre')) &&
    validarDescripcion(document.getElementById('descripcion')) &&
    validarNumeros(document.getElementById('descuento'))&&
    validarNumeros(document.getElementById('precio'))&&
    validarSelect(document.getElementById('publicado'))&&
    validarSelect(document.getElementById('categoria')) &&
    validarLink(document.getElementById('link'))
    ){
        if(modificarJuego){
            editarDatos();
        } else{
            almacenarDatos();
        }  
    }else{
      let alerta = document.getElementById('msj-envio');
      alerta.className ='alert alert-danger mx-3'
      alerta.innerHTML = 'Error. Verifique los datos ingresados' 
    }
}

/** ADMINISTRADOR DE USUARIOS **/
