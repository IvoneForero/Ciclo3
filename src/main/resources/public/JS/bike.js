//Funciones para la tabla cloud
function crearBike() {
    $("#idBike").attr("readonly", true);
    var name = $("#name").val();
    var brand = $("#brand").val();
    var year = $("#year").val();
    var description = $("#description").val();

    var category_id;

    if($("#categoryAdd").val() == 0) {
        alert("Por favor seleccione una categoria");
    }else{
        category_id = $("#categoryAdd").val();

        if($("#name").val() == "" || $("#brand").val() == "" || $("#year").val() == "" || $("#description") == ""){
            alert("Faltan campos por llenar");
        }else{
            var data = {
                name:name,
                brand:brand,
                year:year,
                description:description,
                category:{
                    id:category_id
                }
            };

            $.ajax({
                url: "http://localhost:8080/api/Bike/save",
                type: "POST",
                datatype: "json",
                data:JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                },
                statusCode: {
                    201: function(){
                        consultarBike();
                        limpiarBike();
                    }
                }
            });
        }
    }
}

function consultarBike(){
    $.ajax({
        url:"http://localhost:8080/api/Bike/all",
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#contenidoTablaBike").empty();
            response.forEach(element => {
                var row = $("<tr>");
                row.append($("<td>").text(element.id));
                row.append($("<td>").text(element.name));
                row.append($("<td>").text(element.brand));
                row.append($("<td>").text(element.year));
                row.append($("<td>").text(element.description));
                if(element.category == null) {
                    row.append($("<td>").text("Ninguna"));
                }else{
                    row.append($("<td>").text(element.category.name));
                }
                row.append($("<td>").append('<button type="button" class="btn btn-outline-light" onclick="seleccionarBike('+element.id+')" >Seleccionar</button>'));
                row.append($("<td>").append('<button type="button" class="btn btn-outline-light" onclick="eliminarBike('+element.id+')" >Eliminar</button>'));
                $("#contenidoTablaBike").append(row);
            });
        }
    });
}

function seleccionarBike(idBike){
    //console.log(idCloud);
    $.ajax({
        url:"http://localhost:8080/api/Bike/"+idBike,
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#idBike").val(response.id);
            $("#idBike").attr("readonly", true);
            $("#name").val(response.name);
            $("#brand").val(response.brand);
            $("#year").val(response.year);
            $("#description").val(response.description);
            if(response.category == null) {
                $("#categoryAdd").val("");
            }else{
                $("#categoryAdd").val(response.category.id);
            }
        },
        error: function(xhr, status){
            alert("Ocurrió un error en el consumo.");
        }
    });
}

function actualizarBike(){
    var idBike = $("#idBike").val();
    $("#idBike").attr("readonly", true);
    var name = $("#name").val();
    var brand = $("#brand").val();
    var year = $("#year").val();
    var description = $("#description").val();
    var idCategory = $("#categoryAdd").val();

    let datos={
        id:idBike,
        name:name,
        brand:brand,
        year:year,
        description:description,
        category: {
            id: idCategory
        }
    }
    let datosEnvio=JSON.stringify(datos);

    $.ajax({
        url:"http://localhost:8080/api/Bike/update",
        type:"PUT",
        data:datosEnvio,
        contentType:"application/JSON",
        dataType:"JSON",
        statusCode: {
        201: function(){

            consultarBike();
            limpiarBike()
        },
        505: function(){
            alert("Ocurrio un error en el consumo");
        }
        }
    });
}

function eliminarBike(idBike){
    let myData={
        id:idBike
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Bike/"+idBike,
        type:"DELETE",
        data:dataToSend,
        datatype:"json",
        contentType:"application/json",
        success:function(respuesta){
            consultarBike();
            limpiarBike();
        }
    });
}

function limpiarBike(){
    $("#idBike").val("");
    $("#name").val("");
    $("#brand").val("");
    $("#year").val("");
    $("#description").val("");
    $("#categoryAdd").val("");
}

function cargarCategory(){
    $.ajax({
        url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"json",
        success: function (response) {
            $("#categoryAdd").empty();
            $("#categoryAdd").append($("<option>").val(0).text("Seleccione una categoría"));
            response.forEach(element => {
                var option = $("<option>");
                option.attr("value", element.id);
                option.text(element.name);
                $("#categoryAdd").append(option);
            });
        },
        error: function(xhr,status) {
            alert("6. Ocurrio un error en el consumo.");
        }
    });
}

//Cargar página y todas las tablas
$(document).ready(function(){
    consultarBike();
    cargarCategory();
})