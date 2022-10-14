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
            $("#idCategory").val("");
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
            response.forEach(element => {
                var row = $("<tr>");
                row.append($("<td>").text(element.id));
                row.append($("<td>").text(element.name));
                row.append($("<td>").text(element.description));
                row.append($("<td>").append('<button type="button" class="btn btn-outline-light" onclick="seleccionarCategory('+element.id+')" >Seleccionar</button>'));
                row.append($("<td>").append('<button type="button" class="btn btn-outline-light" onclick="eliminarCategory('+element.id+')" >Eliminar</button>'));
                $("#contenidoTablaCategory").append(row);
            });
        }
    });
}

function seleccionarCategory(idCategory) {
    $.ajax({
        url: "http://localhost:8080/api/Category/"+idCategory,
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#idCategory").val(response.id);
            $("#name").val(response.name);
            $("#description").val(response.description);
        },
        error: function(xhr, status){
            alert("Ocurrió un error en el consumo.");
        }
    });
}

function actualizarCategory(){
    var idCategory = $("#idCategory").val();
    $("#idCategory").attr("readonly", true);

    if(idCategory.length == 0) {
        alert("No se ha seleccionado un registro.");
    }else{
        var idCategory = $("#idCategory").val();
        var name = $("#name").val();
        var description = $("#description").val();

        let datos={
            id:idCategory,
            name:name,
            description:description
        }
        let datosEnvio=JSON.stringify(datos);
        $.ajax({
            url:"http://localhost:8080/api/Category/update",
            type:"PUT",
            data:datosEnvio,
            contentType:"application/JSON",
            dataType:"JSON",
            statusCode: {
            201: function(){
                consultarCategory();
                $("#idCategory").val("");
                $("#name").val("");
                $("#description").val("");
            },
            505: function(){
                alert("Ocurrio un error en el consumo");
            }
        }
        });
    }
}

function eliminarCategory(idClient){
    let myData={
        id:idClient
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Category/"+idClient,
        type:"DELETE",
        data:dataToSend,
        datatype:"json",
        contentType:"application/json",
        success:function(respuesta){
            consultarCategory();
            $("#idCategory").val("");
            $("#name").val("");
            $("#description").val("");
        }
    });
}

function limpiarCategory(){
    $("#idCategory").val("");
    $("#name").val("");
    $("#description").val("");
}


//Cargar página y todas las tablas
$(document).ready(function(){
    consultarCategory();
})