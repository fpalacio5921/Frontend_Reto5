function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://144.22.229.104:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}

function traerInformacionBoat(){
    console.log("test");
        $.ajax({
        url:"http://144.22.229.104:8080/api/Boat/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaBoat(respuesta);
        }
    });
}

function pintarRespuestaBoat(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>" + respuesta[i].name + "</td>";
        myTable+="<td>" + respuesta[i].brand + "</td>";
        myTable+="<td>" + respuesta[i].year + "</td>";
        myTable+="<td>" + respuesta[i].description + "</td>";
        myTable+="<td>" + respuesta[i].category.name + "</td>";
        myTable+='<td><button class = "botonBoat2" onclick="borrarBoat(' + respuesta[i].id + ')">Borrar Barco</button></td>';
        myTable+='<td><button class = "botonBoat2" onclick="actualizarBoat(' + respuesta[i].id + ')">Actualizar Barco</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado10").html(myTable);
}


function agregarBoat(){
   
    if($("#name2").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0 || $("#description2").val().length == 0){
        alert("Todos los campos son obligatorios")
     }else{
   
    let var2 = {
        name: $("#name2").val(),
        brand: $("#brand").val(),
        year: $("#year").val(),
        description: $("#description2").val(),
        category:{id: +$("#select-category").val()}
        }
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://144.22.229.104:8080/api/Boat/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });}

}

function actualizarBoat(idElemento){
    
    if($("#name2").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0 || $("#description2").val().length == 0){

        alert("Todos los campos son obligatorios");
    }else{
    
    
    let myData={
        id:idElemento,
        name: $("#name2").val(),
            brand: $("#brand").val(),
            year: $("#year").val(),
            description: $("#description2").val(),
            category:{id: +$("#select-category").val()}

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.229.104:8080/api/boat/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#name2").val("");
            $("#brand").val("");
            $("#year").val("");
            $("#description2").val("");
            traerInformacionBoat();
            alert("se ha Actualizado el Barco correctamente")
        }
    });}

}

function borrarBoat(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://144.22.229.104:8080/api/Boat/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionBoat();
            alert("se ha Eliminado el Barco Correctamente.")
        }
    });

}
