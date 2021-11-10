function autoInicioCliente(){
    console.log("test");
    $.ajax({
        url:"http://144.22.229.104:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta2(respuesta);
        }
    
    });

}
function pintarRespuesta2(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button onclick='actualizarInformacionCliente("+respuesta[i].id+")'>Actualizar Cliente</button>";
        myTable+="<td> <button onclick='borrarCliente("+respuesta[i].id+")'>Borrar Cliente</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);
}

function guardarInformacionCliente(){

    if ($("#email").val().length==0 || $("#password").val().length==0
        || $("#name").val().length==0 || $("#age").val().length==0){

       alert("Todos los campos son obligatorios");
    }else{

    let var2 = {
        
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val()
     
        };
       
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://144.22.229.104:8080/api/Client/save",
               
        
        success:function(respuesta) {
                console.log(respuesta);
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

function actualizarInformacionCliente(idElemento){
    if ($("#email").val().length==0 || $("#password").val().length==0
        || $("#name").val().length==0 || $("#age").val().length==0){

       alert("Todos los campos son obligatorios");
    }else{

    let myData={
        id:idElemento,
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val(),


    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.229.104:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#email").val("");
            $("#password").val("");
            $("#name").val("");
            $("#age").val("");
            autoInicioCliente();
            alert("se ha Actualizado correctamente el Cliente")
        }
    });}

}

function borrarCliente(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://144.22.229.104:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            autoInicioCliente();
            alert("Se ha Eliminado el Cliente.")
        }
    });

}


