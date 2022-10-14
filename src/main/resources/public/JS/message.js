//Funciones para la tabla cloud
function crearMessage() {
    $("#id").attr("readonly", true);
    var messageText = $("#messagetext").val();
    var bike = $("#bike").val();
    var client = $("#client").val();

    let datos={
        messageText:messageText,
        bike:{
            id:bike
        },
        client:{
            idClient:client
        }
    }

    let datosEnvio=JSON.stringify(datos);
    $.ajax({
        url: "http://localhost:8080/api/Message/save",
        type:"POST",
        data:datosEnvio,
        contentType:"application/JSON",
        dataType:"JSON",
        statusCode: {
        201: function(){
            consultarMessage();
            limpiarMessage()
        }
    }
    });
}

function consultarMessage(){
    $.ajax({
        url:"http://localhost:8080/api/Message/all",
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#contenidoTablaMessage").empty();
            response.forEach(element => {
                var row = $("<tr>");
                row.append($("<td>").text(element.idMessage));
                row.append($("<td>").text(element.messageText));
                if(element.bike == null) {
                    row.append($("<td>").text("Ninguna"));
                }else{
                    row.append($("<td>").text(element.bike.name));
                }
                if(element.client == null) {
                    row.append($("<td>").text("Ninguno"));
                }else{
                    row.append($("<td>").text(element.client.name));
                }
                row.append($("<td>").append('<button type="button" class="btn btn-outline-light" onclick="seleccionarMessage('+element.idMessage+')" >Seleccionar</button>'));
                row.append($("<td>").append('<button type="button" class="btn btn-outline-light" onclick="eliminarMessage('+element.idMessage+')" >Eliminar</button>'));
                $("#contenidoTablaMessage").append(row);
            });
        }
    });
}

function seleccionarMessage(idMessage) {
    alert(idMessage)
    $.ajax({
        url: "http://localhost:8080/api/Message/"+idMessage,
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#idMessage").val(response.idMessage);
            $("#messagetext").val(response.messageText);
            $("#bike").val(response.bike.id);
            $("#client").val(response.client.idClient);
        },
        error: function(xhr, status){
            alert("Ocurrió un error en el consumo : " + status.name);
        }
    });
}

function actualizarMessage(){
    var idMessage = $("#idMessage").val();
    var messageText = $("#messagetext").val();
    var bike = $("#bike").val();
    var client = $("#client").val();

    let datos={
        idMessage:idMessage,
        messageText:messageText,
        bike:{
            id:bike
        },
        client:{
            idClient:client
        }
    }
    let datosEnvio=JSON.stringify(datos);
    $.ajax({
        url:"http://localhost:8080/api/Message/update",
        type:"PUT",
        data:datosEnvio,
        contentType:"application/JSON",
        dataType:"JSON",
        statusCode: {
        201: function(){
            consultarMessage();
            limpiarMessage();
        },
        505: function(){
            alert("Ocurrio un error en el consumo");
        }
    }
    });
}

function eliminarMessage(idMessage){
    let myData={
        id:idClient
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Message/"+idMessage,
        type:"DELETE",
        data:dataToSend,
        datatype:"json",
        contentType:"application/json",
        success:function(respuesta){
            consultarMessage();
            limpiarMessage();
        }
    });
}

function limpiarMessage(){
    $("#idMessage").val("");
    $("#messagetext").val("");
    cargarClient();
    cargarBike();
}

function cargarClient(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#client").empty();
            $("#client").append($("<option>").val(0).text("Seleccione un cliente"));
            response.forEach(element => {
                var option = $("<option>");
                option.attr("value", element.idClient);
                option.text(element.name);
                $("#client").append(option);
            });
        },
        error: function(xhr,status) {
            alert("Ocurrio un error en el consumo.");
        }
    });
}

function cargarBike(){
    $.ajax({
        url:"http://localhost:8080/api/Bike/all",
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#bike").empty();
            $("#bike").append($("<option>").val(0).text("Seleccione una bicicleta"));
            response.forEach(element => {
                var option = $("<option>");
                option.attr("value", element.id);
                option.text(element.name);
                $("#bike").append(option);
            });
        },
        error: function(xhr,status) {
            alert("Ocurrio un error en el consumo.");
        }
    });
}

//Cargar página y todas las tablas
$(document).ready(function(){
    consultarMessage();
    cargarClient();
    cargarBike();
})