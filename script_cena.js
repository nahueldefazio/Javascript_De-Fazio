class Comida {
    constructor(nombre, detalle, cantidad, precio) {
        this.nombre = nombre;
        this.detalle = detalle;
        this.cantidad = cantidad;
        this.precio = precio;

    }

}

let usuario =  localStorage.getItem("nombre")
let contenedor2 = document.createElement("div");
contenedor2.classList.add("alert");
contenedor2.classList.add("alert-secondary");
contenedor2.innerHTML = `<h2 class="usuario"> Que disfrute de su compra Señor/a : ${usuario ? usuario : 'Visitante'} </h2>`
document.getElementById("usuarioBienvenida").appendChild(contenedor2);


$("#menuIndex").prepend(`<button class="btn neon botonesIndex" id="comidasIndex">Comidas </button>
                                <button class="btn neon botonesIndex" id="bebidasIndex">Bebidas </button>
                                <button class="btn neon botonesIndex" id="postresIndex">Postres </button>`);

// Asociamos la animación al click en un elemento <a>
$('#comidasIndex').on('click', function(e) {
    e.preventDefault();
    //Animamos sus propiedades CSS con animate
    $('html, body').animate({
        scrollTop: $("#comidasMenu").offset().top
    }, 300);
} );
$('#bebidasIndex').on('click', function(e) {
    e.preventDefault();
    //Animamos sus propiedades CSS con animate
    $('html, body').animate({
        scrollTop: $("#bebidasMenu").offset().top
    }, 300);
} );

$('#postresIndex').on('click', function(e) {
    e.preventDefault();
    //Animamos sus propiedades CSS con animate
    $('html, body').animate({
        scrollTop: $("#postresMenu").offset().top
    }, 300);
} );



let comidas = []
let bebidas = []
let postres = []

//Peticiones con jQuery
const URLGET_bebidas = "../data/bebidas_cena.json";
const URLGET_postres = "../data/postres.json";
const URLGET_comidas = "../data/comidas_cena.json";

function agregarProductos(URL, array_productos){
    $.get(URL, function (datos, estado){
        if(estado === "success"){
            for (const producto of datos){
                array_productos.push(producto)
            }
        }
        if (array_productos === comidas)
            listarProductos(comidas, "cardList","comidas");
        else if (array_productos === bebidas)
            listarProductos(bebidas, "cardList2","bebidas");
        else if (array_productos === postres)
            listarProductos(postres, "cardList3","postres");
    })

}
agregarProductos(URLGET_comidas, comidas);
agregarProductos(URLGET_bebidas, bebidas);
agregarProductos(URLGET_postres, postres);

function listarProductos(json,nombreDiv, tipo){
        json.forEach((producto,index) => {
            //Creo
            let contenedor = document.createElement("div");
            //Modifico
            contenedor.classList.add("card");
            contenedor.classList.add("col-4");
            contenedor.classList.add("m-3");
            contenedor.style.width = "18rem";
            contenedor.innerHTML = `<img src="${producto.imagen}" class="card-img-top" alt="...">
                                          <div class="card-body">
                                            <h5 class="card-title">${producto.nombre}</h5>
                                              <p class="card-text">${producto.detalle}</p>
                                              <select id="producto${producto.id}">
                                              <option value="1"> 1 </option>
                                              <option value="2"> 2 </option>
                                              <option value="3"> 3 </option>
                                              <option value="4"> 4 </option>
                                              <option value="5"> 5 </option>
                                              </select>
                                              <p class="card-text">${producto.precio} $</p>
                                              <div id = "accionesProducto${producto.id}">
                                                <a class="btn neon" onclick="agregarCarrito('${producto.nombre}',${producto.id},${producto.precio},${index}, ${tipo})">Ordenar</a>
                                              </div>
                                               
                                          </div>`
            //Agrego
            document.getElementById(nombreDiv).appendChild(contenedor);
            carro.forEach(p =>{
                if (producto.id === p.id){
                    mostrarBotonBorrar(producto.id)
                }
            })
        })
}

function borrarProductos(nombreDiv){
    document.getElementById(nombreDiv).innerHTML = '';
}

function consultarStock(productoId,productoIdx,tipo){
    let value = document.getElementById(`producto${productoId}`).value
    console.log(productoIdx)
    if(tipo[productoIdx].cantidad <= value){
        alertify.set('notifier','position', 'top-right');
        alertify.error('El stock no es suficiente para realizar el pedido');
        return true;
    } else {
        alertify.set('notifier','position', 'top-right');
        alertify.success('Pedido procesado');
        return false;
    }
}


let ordenarComidas = "ordenamientoComidas"
let cardList_string = "cardList"

let ordenarBebidas = "ordenamientoBebidas"
let cardList2_string = "cardList2"

let ordenarPostres = "ordenamientoPostres"
let cardList3_string = "cardList3"

//Ordenar por precio
function ordenarPorPrecio(productos, string, string_2) {
    let ordenamiento = document.getElementById(string).value
    if(ordenamiento === "ascendente"){
        productos = productos.sort (function (a,b) {
            return a.precio - b.precio;
        });
    } else if(ordenamiento === "descendente") {
        productos = productos.sort (function (a,b) {
            return b.precio - a.precio;
        });
    }
    borrarProductos(string_2);
    if (productos === comidas)
        listarProductos(comidas, "cardList","comidas");
    else if (productos === bebidas)
        listarProductos(bebidas, "cardList2","bebidas");
    else if (productos === postres)
        listarProductos(postres, "cardList3","postres");

}

let carro = [];

function checkearLocalCarro() {
    if (localStorage.getItem('carro')){
        carro = JSON.parse(localStorage.getItem('carro'))
    }
}

checkearLocalCarro()

function agregarCarrito(nombre,id,precio,index,tipo) {
    if(consultarStock(id,index,tipo)){
        return;
    }
    else {
        let producto = {
            id,
            nombre,
            cantidad: document.getElementById(`producto${id}`).value,
            precio
        }
        carro.push(producto);
        actualizarCarrito()
        mostrarBotonBorrar(id)
        guardarCarro();
    }
}

function calcularTotal() {
    let total = 0;
    carro.forEach(producto => {
       total += producto.cantidad * producto.precio;
    })
    return total;
}

function listaProductos(){
    let listado = '';
    carro.forEach(producto => {
        listado += producto.cantidad + 'x ' + producto.nombre + "\n";
    })
    mostrarBotonBorrar();
    return listado ;
}


function mostrarCantidadCarro() {
    let total = 0;
    carro.forEach(producto => {
        total += parseInt(producto.cantidad) ;
    })
    return total;
}

function actualizarCarrito() {
    $('#cantidad').text(mostrarCantidadCarro());
}
//Agrego el circulo de cantidad en el carrito
$('.botonCarrito').append(`<span id = "cantidad"> ${mostrarCantidadCarro()} </span>`)

//Agrego boton "Borrar"
function mostrarBotonBorrar(idproducto) {
    if (!$("#botonBorrar"+idproducto).length)
        $("#accionesProducto" + idproducto).append(`<button id="botonBorrar${idproducto}"  class="btn claseBorrar neon"  onclick="borrarProductoCarrito(${idproducto})"> Borrar </button>`)
}

function borrarProductoCarrito(id) {
    carro = carro.filter(producto => parseInt(producto.id) !== id)
    actualizarCarrito();
    guardarCarro();
    $("#botonBorrar" + id).remove();
}

const guardarCarro = () => {
    localStorage.setItem('carro', JSON.stringify(carro))
}

const borrarLocalCarro = () => {
    carro = [];
    localStorage.removeItem('carro')
}

function mostrarCarrito() {

    Swal.fire({
        title: "Has ordenado " + "\n"  + listaProductos(),
        text: "Total : " + calcularTotal() + " $",
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Confirmar`,
        denyButtonText: `Borrar carrito`,
        cancelButtonText: `Seguir comprando`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            window.location.href = '../ventanas/contacto.html'
            borrarLocalCarro()
        } else if (result.isDenied) {
            carro = [];
            actualizarCarrito()
            borrarLocalCarro()
            window.location.reload()

        }
    })
}
