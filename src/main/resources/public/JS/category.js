//Funciones para la tabla cloud
function crearCategory() {

    $("#id").attr("readonly", true);
    var name = $("#name").val();
    var description = $("#description").val();

    let datos={
        name:name,
        description:description
    }

    let datosEnvio=JSON.stringify(datos);
    $.ajax({
        url: "http://localhost:8080/api/Category/save",
        type:"POST",
        data:datosEnvio,
        contentType:"application/JSON",
        dataType:"JSON",
        statusCode: {
        201: function(){
            consultarCategory();
            $("#name").val("");
            $("#description").val("");
        }
    }
    });
}

function consultarCategory(){
    $.ajax({
        url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#contenidoTablaCategory").empty();
            console.log(response);
            response.forEach(element => {
                var row = $("<tr>");
                row.append($("<td>").text(element.id));
                row.append($("<td>").text(element.name));
                row.append($("<td>").text(element.description));

                console.log(element);

                row.append($("<td>").append('<button type="button" class="btn btn-outline-light" onclick="seleccionarCloud('+element.id+')" >Seleccionar</button>'));
                row.append($("<td>").append('<button type="button" class="btn btn-outline-light" onclick="eliminarCloud('+element.id+')" >Eliminar</button>'));
                $("#contenidoTablaCategory").append(row);
            });
        }/*,
        error: function(xhr,status) {
            alert("2. Ocurrio un error en el consumo.");
        }*/
    });
}

//Cargar página y todas las tablas
$(document).ready(function(){
    consultarCategory();

})