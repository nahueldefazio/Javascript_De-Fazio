$('body').append(`<main id="pagarContacto">
                            <form id ="contacto">
                              <div class="form-group">
                                <label for="exampleInputEmail1">Nombre completo</label>
                                <input type="text" class="form-control nombreCompleto" name="nombre" aria-describedby="emailHelp" placeholder="Carlos Perez" >
                              </div>
                              <div class="form-group">
                                <label for="exampleInputEmail1">Numero de Tarjeta</label>
                                <input type="number" class="form-control nroTarjeta" name="nroTajeta" aria-describedby="emailHelp" oninput="maxlengthNumber(this)" placeholder="1111-1111-1111" maxlength="16">
                                <small id="tarjetaAyuda" class="form-text text-muted">No aceptamos American Express, disculpe las molestias</small>
                              </div>
                              <div class="form-group">
                                <label for="exampleInputPassword1">Codigo de seguridad (CVV)</label>
                                <input type="password" class="form-control codigoTarjeta" name="codigoTarjeta" placeholder="***" maxlength= "3" >
                              </div>
                              <div class="form-group">
                                <label for="exampleInputPassword1">Fecha de expiracion</label>
                                <input type="date" class="form-control fechaTarjeta"  name="fecha" placeholder="">
                              </div>
                              <div class="form-group">
                                <label for="exampleInputPassword1">D.N.I</label>
                                <input type="number" class="form-control dni" name="dni" placeholder="29185800" maxlength= "8" oninput="maxlengthNumber(this)" >
                                <small id="emailHelp" class="form-text text-muted">Sin puntos ni espacios</small>
                              </div>
                              <div class="d-flex justify-content-center" >
                                <button id="botonPagar" type="submit" class="btn btn-primary" >
                                   Pagar
                                </button>
                              </div>
                            </form>
                       </main>`)

function maxlengthNumber (obj) {
    if (obj.value.length > obj.maxLength) {
        obj.value = obj.value.slice(0, obj.maxLength);
    }
}


$(document).ready(function () {
    $("#contacto").validate({
        rules: {
            nombre: {required: true, minlength: 2},
            codigoTarjeta: {required: true, maxlength: 3, minlength: 3},
            nroTajeta: {required: true, maxlength: 16, minlength: 16},
            dni: {required: true, maxlength:8 , minlength: 8},
            fecha: {required: true}
        },
        messages: {
            nombre: "El campo es obligatorio.",
            codigoTarjeta: "Su codigo de seguridad es incorrecto.",
            nroTajeta: "El numero de la tarjeta no es correcto.",
            fecha: "Fecha invalida",
            dni: "Ingrese un DNI correcto."
        },
    });
});

$(".nombreCompleto").keypress(function (key) {
    if ((key.charCode < 97 || key.charCode > 122)//letras mayusculas
        && (key.charCode < 65 || key.charCode > 90) //letras minusculas
        && (key.charCode != 45) //retroceso
        && (key.charCode != 241) //ñ
        && (key.charCode != 209) //Ñ
        && (key.charCode != 32) //espacio
        && (key.charCode != 225) //á
        && (key.charCode != 233) //é
        && (key.charCode != 237) //í
        && (key.charCode != 243) //ó
        && (key.charCode != 250) //ú
        && (key.charCode != 193) //Á
        && (key.charCode != 201) //É
        && (key.charCode != 205) //Í
        && (key.charCode != 211) //Ó
        && (key.charCode != 218) //Ú

    ) return false;
});

function timerIndex(){
    setTimeout(()=>{
        window.location.href = "../index.html"
    }, 2000 )

}

$('#contacto').submit(function (e) {
    e.preventDefault();
    const inputs = $("#contacto :input");
    const data = { nombre: inputs[0].value,
                    nroTajeta: inputs[1].value,
                    cvv: inputs[2].value,
                    fecha_caducidad: inputs[3].value,
                    dni: inputs[4].value}

    $.post("https://jsonplaceholder.typicode.com/posts", data, function (data, estado){

        if (data.nombre !== '' && data['nroTajeta'] !== '' && data['cvv'] !== '' && data['fecha_caducidad'] !== '' && data['dni'] !== ''){
            if (estado === "success"){
                timerIndex();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Tu formulario fue enviado con exito !',
                    showConfirmButton: false,
                    timer: 1500
                })

            }
        }


    })

    
})