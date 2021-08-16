class Comida {
    constructor(nombre, detalle, cantidad, precio) {
        this.nombre = nombre;
        this.detalle = detalle;
        this.cantidad = cantidad;
        this.precio = precio;

    }

}

let usuario = localStorage.getItem("nombre")
let contenedor2 = document.createElement("div");
contenedor2.classList.add("alert");
contenedor2.classList.add("alert-secondary");

contenedor2.innerHTML = `<h2 class="usuario"> Que disfrute de su compra Señor/a : ${usuario ? usuario : 'Visitante'} </h2>`
document.getElementById("usuarioBienvenida").appendChild(contenedor2);


let bebidas = [
    {
        "id": 1,
        "nombre": "Cafe",
        "detalle": "Cafe",
        "cantidad": 10,
        "precio": 70,
        "imagen": "../imagenes/cafe.jpg"
    },
    {
        "id": 2,
        "nombre": "Cafe Irlandes",
        "detalle": "Cafe con whisky y crema",
        "cantidad": 6,
        "precio": 370,
        "imagen": "../imagenes/cafe_irlandes.jpg"
    },
    {
        "id": 3,
        "nombre": "Te",
        "detalle": "Sabor original",
        "cantidad": 10,
        "precio": 120,
        "imagen": "../imagenes/te.jpg"
    },
    {
        "id": 4,
        "nombre": "Capuchino",
        "detalle": "Cafe",
        "cantidad": 4,
        "precio": 200,
        "imagen": "../imagenes/capuchino.jpg"
    },
    {
        "id": 5,
        "nombre": "Submarino",
        "detalle": "Cafe con chocolate",
        "cantidad": 6,
        "precio": 300,
        "imagen": "../imagenes/submarino.jpeg"
    },
]

let comidas = [
    {
        "id": 6,
        "nombre": "Medialunas",
        "detalle": "Panaderia",
        "cantidad": 10,
        "precio": 60,
        "imagen": "../imagenes/medialunas.jfif"
    },
    {
        "id": 7,
        "nombre": "Tostado de jamon y queso",
        "detalle": "Tostado",
        "cantidad": 7,
        "precio": 240,
        "imagen": "../imagenes/tostado_jyq.jpg"
    },
    {
        "id": 8,
        "nombre": "Tostadas con mermelada",
        "detalle": "Mermelada de frambuesa o durazno",
        "cantidad": 6,
        "precio": 70,
        "imagen": "../imagenes/tostadas_mermelada.jpg"
    },
    {
        "id": 9,
        "nombre": "Huevos revueltos",
        "detalle": "A la plancha",
        "cantidad": 4,
        "precio": 130,
        "imagen": "../imagenes/huevos_revueltos.jpg"
    },
]

function listarProductos(json, nombreDiv, tipo) {
    json.forEach((producto, index) => {
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
                                                    <a href="#" class="btn btn-primary" onclick="agregarCarrito('${producto.nombre}',${producto.id},${producto.precio},${index},${tipo})">Ordenar</a>
                                               </div>
                                          </div>`
        //Agrego
        document.getElementById(nombreDiv).appendChild(contenedor);
    })

}

listarProductos(comidas, "cardList", "comidas");
listarProductos(bebidas, "cardList2", "bebidas");


function borrarProductos(nombreDiv) {
    document.getElementById(nombreDiv).innerHTML = '';
}

function consultarStock(productoId, productoIdx, tipo) {

    let value = document.getElementById(`producto${productoId}`).value
    console.log(tipo[productoIdx])
    if (tipo[productoIdx].cantidad <= value) {
        alert('El stock no es suficiente para realizar el pedido');
        return true;
    } else {
        alert('Pedido procesado');
        return false;
    }
}


let ordenarComidas = "ordenamientoComidas"
let cardList_string = "cardList"

let ordenarBebidas = "ordenamientoBebidas"
let cardList2_string = "cardList2"


//Ordenar por precio
function ordenarPorPrecio(productos, string, string_2) {
    let ordenamiento = document.getElementById(string).value
    if (ordenamiento === "ascendente") {
        productos = productos.sort(function (a, b) {
            return a.precio - b.precio;
        });
    } else if (ordenamiento === "descendente") {
        productos = productos.sort(function (a, b) {
            return b.precio - a.precio;
        });
    }
    borrarProductos(string_2);
    listarProductos(productos, string_2);
}

let carro = [];


function agregarCarrito(nombre, id, precio, index, tipo) {
    if (consultarStock(id, index, tipo)) {
        return;
    } else {
        let producto = {
            id,
            nombre,
            cantidad: document.getElementById(`producto${id}`).value,
            precio
        }
        carro.push(producto);
        actualizarCarrito()
        mostrarBotonBorrar(id)

    }

}

function calcularTotal() {
    let total = 0;
    carro.forEach(producto => {
        total += producto.cantidad * producto.precio;
    })
    return total;
}

function listaProductos() {
    let listado = '';
    carro.forEach(producto => {
        listado += producto.cantidad + 'x ' + producto.nombre + "\n";
    })
    return listado;
}


function mostrarCantidadCarro() {
    let total = 0;
    carro.forEach(producto => {
        total += parseInt(producto.cantidad);
    })
    return total;
}

function actualizarCarrito() {
    $('#cantidad').text(mostrarCantidadCarro());
}

$('.botonCarrito').append(`<span id = "cantidad"> ${mostrarCantidadCarro()} </span>`)


function mostrarBotonBorrar(idproducto) {
    if (!$("#botonBorrar" + idproducto).length)
        $("#accionesProducto" + idproducto).append(`<button id="botonBorrar${idproducto}" class="btn claseBorrar" onclick="borrarProductoCarrito(${idproducto})"> BORRAR </button>`)
}

function borrarProductoCarrito(id) {

    carro = carro.filter(producto => parseInt(producto.id) !== id)
    actualizarCarrito();
    $("#botonBorrar" + id).remove();

}


function mostrarCarrito() {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: "Has ordenado " + "\n" + listaProductos(),
        text: "Total : " + calcularTotal() + " $",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
                title: 'Gracias',
                text: 'Tu pedido será procesado en brevedad.',
                icon: 'success',
                confirmButtonText: 'Confirmar',
            }).then((result => {
                console.log(result);
                if (result.isConfirmed) {
                    window.location.href = '../ventanas/contacto.html'
                }
            }))
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            carrito = [];
        }
    })
}

