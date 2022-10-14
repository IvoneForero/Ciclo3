//Funciones para la tabla cloud
function crearClient() {

    $("#id").attr("readonly", true);
    var name = $("#nameClient").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var age = $("#age").val();


    let datos={
        name:name,
        email:email,
        password:password,
        age:age
    }

    let datosEnvio=JSON.stringify(datos);
    $.ajax({
        url: "http://localhost:8080/api/Client/save",
        type:"POST",
        data:datosEnvio,
        contentType:"application/JSON",
        dataType:"JSON",
        statusCode: {
        201: function(){
            consultarClient();
            limpiarClient()
        }
    }
    });
}

function consultarClient(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#contenidoTablaClient").empty();
            response.forEach(element => {
                var row = $("<tr>");
                row.append($("<td>").text(element.idClient));
                row.append($("<td>").text(element.email));
                row.append($("<td>").text(element.password));
                row.append($("<td>").text(element.name));
                row.append($("<td>").text(element.age));
                row.append($("<td>").append('<button type="button" class="btn btn-outline-light" onclick="seleccionarClient('+element.idClient+')" >Seleccionar</button>'));
                row.append($("<td>").append('<button type="button" class="btn btn-outline-light" onclick="eliminarClient('+element.idClient+')" >Eliminar</button>'));
                $("#contenidoTablaClient").append(row);
            });
        }
    });
}

function seleccionarClient(idClient) {
    $.ajax({
        url: "http://localhost:8080/api/Client/"+idClient,
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#idClient").val(response.idClient);
            $("#email").val(response.email);
            $("#password").val(response.password);
            $("#nameClient").val(response.name);
            $("#age").val(response.age);
        },
        error: function(xhr, status){
            alert("Ocurrió un error en el consumo.");
        }
    });
}

function actualizarClient(){
    var idClient = $("#idClient").val();
    $("#idClient").attr("readonly", true);

    if(idClient.length == 0) {
        alert("No se ha seleccionado un registro.");
    }else{
        var idClient = $("#idClient").val();
        var name = $("#nameClient").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var age = $("#age").val();

        let datos={
            idClient:idClient,
            name:name,
            email:email,
            password:password,
            age:age
        }
        let datosEnvio=JSON.stringify(datos);
        $.ajax({
            url:"http://localhost:8080/api/Client/update",
            type:"PUT",
            data:datosEnvio,
            contentType:"application/JSON",
            dataType:"JSON",
            statusCode: {
            201: function(){
                consultarClient();
                limpiarClient();
            },
            505: function(){
                alert("Ocurrio un error en el consumo");
            }
        }
        });
    }
}

function eliminarClient(idClient){
    let myData={
        id:idClient
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Client/"+idClient,
        type:"DELETE",
        data:dataToSend,
        datatype:"json",
        contentType:"application/json",
        success:function(respuesta){
            consultarClient();
            limpiarClient();
        }
    });
}

function limpiarClient(){
    $("#idClient").val("");
    $("#nameClient").val("");
    $("#description").val("");
    $("#password").val("");
    $("#age").val("");
    $("#email").val("");
}


//Cargar página y todas las tablas
$(document).ready(function(){
    consultarClient();
})