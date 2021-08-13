class Comida {
    constructor(nombre, detalle, cantidad, precio) {
        this.nombre = nombre;
        this.detalle = detalle;
        this.cantidad = cantidad;
        this.precio = precio;
    }

}

$('#comidasIndex').click(function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $('#comidasMenu').offset().top
    }, 200)
})

$('#bebidasIndex').click(function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $('#bebidasMenu').offset().top
    }, 400)
})

$('#postresIndex').click(function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $('#postresMenu').offset().top
    }, 300)
})






let usuario =  localStorage.getItem("nombre")
let contenedor2 = document.createElement("div");
contenedor2.classList.add("alert");
contenedor2.classList.add("alert-secondary");

contenedor2.innerHTML = `<h2 class="usuario"> Que disfrute de su compra Señor/a : ${usuario ? usuario : 'Visitante'} </h2>`
document.getElementById("usuarioBienvenida").appendChild(contenedor2);



let comidas = [
    {
        "id": 1,
        "nombre": "Vacio",
        "detalle": "Carne",
        "cantidad": 3,
        "precio": 990,
        "imagen" : "../imagenes/vacio.jpg"
    },
    {
        "id": 2,
        "nombre": "Milanesa",
        "detalle": "Carne",
        "cantidad": 2,
        "precio": 610,
        "imagen" : "../imagenes/milanesa.jpg"
    },
    {
        "id": 3,
        "nombre": "Suprema",
        "detalle": "Pollo",
        "cantidad": 10,
        "precio": 610,
        "imagen" : "../imagenes/suprema.png"
    },
    {
        "id": 4,
        "nombre": "Filet",
        "detalle": "Pescado",
        "cantidad": 4,
        "precio": 570,
        "imagen" : "../imagenes/filet.jpg"
    },
    {
        "id": 5,
        "nombre": "Ravioles",
        "detalle": "Verdura y pollo",
        "cantidad": 6,
        "precio": 700,
        "imagen" : "../imagenes/ravioles.jpg"
    }
]
let bebidas = [
    {
        "id": 6,
        "nombre": "Agua",
        "detalle": "Agua mineral Villavicencio",
        "cantidad": 10,
        "precio": 110,
        "imagen" : "../imagenes/agua.jpg"
    },
    {
        "id": 7,
        "nombre": "Coca-Cola",
        "detalle": "Gaseosa con sabor original de coca",
        "cantidad": 8,
        "precio": 160,
        "imagen" : "../imagenes/coca.jpg"
    },
    {
        "id": 8,
        "nombre": "Levite",
        "detalle": "Agua saborizada",
        "cantidad": 9,
        "precio": 170,
        "imagen" : "../imagenes/levite.jpg"
    },
    {
        "id": 9,
        "nombre": "Sprite",
        "detalle": "Gaseosa sabor limalimon",
        "cantidad": 7,
        "precio": 160,
        "imagen" : "../imagenes/sprite.jpg"
    },
    {
        "id": 10,
        "nombre": "Fanta",
        "detalle": "Gaseosa sabor naranja",
        "cantidad": 6,
        "precio": 160,
        "imagen" : "../imagenes/fanta.png"
    },
]
let postres = [
    {
        "id": 11,
        "nombre": "Flan",
        "detalle": "Casero con dulce de leche o crema",
        "cantidad": 10,
        "precio": 150,
        "imagen" : "../imagenes/flan.jpg"
    },
    {
        "id": 12,
        "nombre": "Budin de pan",
        "detalle": "Casero con dulce de leche o crema",
        "cantidad": 10,
        "precio": 200,
        "imagen" : "../imagenes/budin_pan.jpeg"
    },
    {
        "id": 13,
        "nombre": "Zapallo en almibar",
        "detalle": "Agua saborizada",
        "cantidad": 10,
        "precio": 170,
        "imagen" : "../imagenes/zapallo_almibar.jpg"
    },
    {
        "id": 14,
        "nombre": "Ensalada de frutas",
        "detalle": "Casera",
        "cantidad": 10,
        "precio": 250,
        "imagen" : "../imagenes/frutas.jpg"
    },
]


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
                                                <a href="#" class="btn btn-primary" onclick="agregarCarrito('${producto.nombre}',${producto.id},${producto.precio},${index}, ${tipo})">Ordenar</a>
                                              </div>
                                               
                                          </div>`
            //Agrego
            document.getElementById(nombreDiv).appendChild(contenedor);

        })
        //console.log(Object.values(json))
    }
listarProductos(comidas, "cardList","comidas");
listarProductos(bebidas, "cardList2","bebidas");
listarProductos(postres, "cardList3","postres");

function borrarProductos(nombreDiv){
    document.getElementById(nombreDiv).innerHTML = '';
}

function consultarStock(productoId,productoIdx,tipo){
    
    let value = document.getElementById(`producto${productoId}`).value

    if(tipo[productoIdx].cantidad <= value){
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
    listarProductos( productos, string_2);
}

let carro = [];

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

$('.botonCarrito').append(`<span id = "cantidad"> ${mostrarCantidadCarro()} </span>`)


function mostrarBotonBorrar(idproducto) {
    if (!$("#botonBorrar"+idproducto).length)
        $("#accionesProducto" + idproducto).append(`<button id="botonBorrar${idproducto}"  class="btn claseBorrar"  onclick="borrarProductoCarrito(${idproducto})"> BORRAR </button>`)
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
        title: "Has ordenado " + "\n"  + listaProductos(),
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
