//Funciones para la tabla cloud
function crearReservation(){
    $("#idReservation").attr("readonly", true);
    var startDate = $("#startDate").val();
    var devolutionDate = $("#devolutionDate").val();
    var status = $("#status").val();;

    if($("#status").val() == 1) {
        status = "created";
    }else if($("#status").val() == 2){
        status = "completed";
    }else if($("#status").val() == 3){
        status = "cancelled";
    }else{
        status = $("#status").val();
    }

    var bike = $("#bike2").val();
    var client = $("#client2").val();

    if($("#startDate").val() == "" || $("#devolutionDate").val() == "" || $("#status").val() == 0 || $("#bike2").val() == 0|| $("#client2").val() == 0) {
        alert("Faltan campos por llenar");
    }else{
        var data = {
            startDate:startDate,
            devolutionDate:devolutionDate,
            status:status,
            bike:{
                id:bike
            },
            client:{
                idClient:client
            }
        };

        $.ajax({
            url: "http://localhost:8080/api/Reservation/save",
            type: "POST",
            datatype: "json",
            data:JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                201: function(){
                    consultarReservation();
                    $("#idReservation").val("");
                    $("#startDate").val("");
                    $("#devolutionDate").val("");
                    $("#status").val("");
                    $("#bike2").val(0);
                    $("#client2").val(0);
                },
                505: function(){
                    alert("Ocurrio un error en el consumo");
                }
            }
        });
    }
}

function consultarReservation(){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/all",
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#contenidoTablaReservation").empty();
            response.forEach(element => {
                var row = $("<tr>");
                row.append($("<td>").text(element.idReservation));
                row.append($("<td>").text(element.startDate));
                row.append($("<td>").text(element.devolutionDate));
                row.append($("<td>").text(element.status));
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
                row.append($("<td>").append('<button type="button" class="btn btn-outline-light" onclick="seleccionarReservation('+element.idReservation+')" >Seleccionar</button>'));
                row.append($("<td>").append('<button type="button" class="btn btn-outline-light" onclick="eliminarReservation('+element.idReservation+')" >Eliminar</button>'));
                $("#contenidoTablaReservation").append(row);
            });
        }
    });
}

function seleccionarReservation(idMessage) {
    $.ajax({
        url: "http://localhost:8080/api/Reservation/"+idMessage,
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#idReservation").val(response.idReservation);
            $("#startDate").val(response.startDate.substring(0,10));
            $("#devolutionDate").val(response.devolutionDate.substring(0,10));
            if (response.status == "created") {
                $("#status").val(1);
            } else if(response.status == "completed"){
                $("#status").val(2);
            }else if(response.status == "cancelled"){
                $("#status").val(3);
            }else{
                $("#status").val("");
            }
            $("#bike2").val(response.bike.id);
            $("#client2").val(response.client.idClient);
        },
        error: function(xhr, status){
            alert("Ocurrió un error en el consumo : " + status.name);
        }
    });
}

function actualizarReservation(){
    var idReservation = $("#idReservation").val();
    $("#idReservation").attr("readonly", true);

    if(idReservation.length == 0) {
        alert("No se ha seleccionado un registro.");
    }else{
        var idReservation = $("#idReservation").val();
        var startDate = $("#startDate").val();
        var devolutionDate = $("#devolutionDate").val();
        var status = $("#status").val();
        var bike = $("#bike2").val();
        var client = $("#client2").val();
        alert($("#status").val());
        if($("#status").val() == 1) {
            status = "created";
        }else if($("#status").val() == 2){
            status = "completed";
        }else if($("#status").val() == 3){
            status = "cancelled";
        }else{
            status = $("#status").val();
        }

        var data={
            idReservation:idReservation,
            startDate:startDate,
            devolutionDate:devolutionDate,
            status:status,
            cloud:{
                id:bike
            },
            client:{
                idClient:client
            }
        };

        $.ajax({
            url:"http://localhost:8080/api/Reservation/update",
            type:"PUT",
            datatype:"json",
            data:JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                201: function(){
                    consultarReservation();
                    limpiarReservation();                },
                505: function(){
                    alert("Ocurrio un error en el consumo");
                }
            }
        });
    }
}

function eliminarReservation(idReservation){
    let myData={
        id:idReservation
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Reservation/"+idReservation,
        type:"DELETE",
        data:dataToSend,
        datatype:"json",
        contentType:"application/json",
        success:function(respuesta){
            consultarReservation();
            limpiarReservation();
        }
    });
}

function limpiarReservation(){
    $("#idReservation").val("");
    $("#startDate").val("");
    $("#devolutionDate").val("");
    $("#status").val("");
    cargarClient();
    cargarBike();
}

function cargarClient(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#client2").empty();
            $("#client2").append($("<option>").val(0).text("Seleccione un cliente"));
            response.forEach(element => {
                var option = $("<option>");
                option.attr("value", element.idClient);
                option.text(element.name);
                $("#client2").append(option);
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
            $("#bike2").empty();
            $("#bike2").append($("<option>").val(0).text("Seleccione una bicicleta"));
            response.forEach(element => {
                var option = $("<option>");
                option.attr("value", element.id);
                option.text(element.name);
                $("#bike2").append(option);
            });
        },
        error: function(xhr,status) {
            alert("Ocurrio un error en el consumo.");
        }
    });
}

//Cargar página y todas las tablas
$(document).ready(function(){
    consultarReservation();
    cargarClient();
    cargarBike();
})