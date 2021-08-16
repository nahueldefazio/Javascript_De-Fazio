let usuario = ''


function solicitarNombre() {
    let div2 = document.createElement("div");
    div2.classList.add("mb-3")
    div2.classList.add("input-group")
    div2.innerHTML = `<div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Nombre: </span>
                      </div>
                      <input type="text" id = "nombre" class="form-control" placeholder="Ingrese su nombre, porfavor" aria-label="Username" aria-describedby="basic-addon1">
                      <button type="button" onclick="inputUsuario();verificarLogueo()" class="btn btn-primary mb-2">Guardar cliente</button>`
    document.getElementById("usuario").appendChild(div2);
}
// Animacion jQuery
$("#usuario").hide().fadeIn(2000);

function verificarLogueo() {
    if (localStorage.getItem('nombre')) {
        document.getElementById("usuario").innerHTML = ''
        let div = document.createElement("div");
        div.classList.add("usuario_index")
        div.innerHTML = `<h1>Bienvenido/a ${localStorage.getItem('nombre')}</h1>`
        document.getElementById("usuario").appendChild(div);
    } else {
        solicitarNombre();
    }
}

verificarLogueo();

const inputUsuario = () => {
    if (document.getElementById("nombre").value === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡No ingreso un nombre!',

        })
    } else {
        usuario = document.getElementById("nombre").value;
        localStorage.setItem("nombre", usuario);
    }
}


