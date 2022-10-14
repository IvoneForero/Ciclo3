//Informes

//Conteo reservas
function reporteReservasFecha(){
    $("#conteo").attr("readonly", true);
    var d1 = $("#d1").val();
    var d2 = $("#d2").val();

    alert(d1+"  "+d2);

    $.ajax({
        url:"http://localhost:8080/api/Reservation/report-dates/"+d1+"/"+d2+"",
        type:"GET",
        datatype:"json",
        success: function (response) {
            //console.log(response);
            //$("#completed").val(response.completed);
            $("#conteo").val(response);
        },
        error: function(xhr,status) {
            alert("11. Ocurrio un error en el consumo.");
        }
    });
}

//Conteo reservas canceladas y completadas 
function reservasCancellCompleted(){
    $("#completed").attr("readonly", true);
    $("#cancelled").attr("readonly", true);
    $.ajax({
        url:"http://localhost:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#completed").val(response.completed);
            $("#cancelled").val(response.cancelled);
        },
        error: function(xhr,status) {
            alert("12. Ocurrio un error en el consumo.");
        }
    });
}

//Top mejores clientes
function topClientes(){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/report-clients",
        type:"GET",
        datatype:"json",
        success: function (response) {
            //console.log(response);
            $("#contenidoTop_client").empty();
            response.forEach(element => {
                var row = $("<tr>");
                row.append($("<td>").text(element.client.name));
                row.append($("<td>").text(element.total));
                $("#contenidoTop_client").append(row);
            });
        },
        error: function(xhr,status) {
            alert("13. Ocurrio un error en el consumo.");
        }
    });
}

//Cargar página y todas las tablas
$(document).ready(function(){
    reservasCancellCompleted();
    topClientes();
})