app.service('cargadoDeFoto',function($http,FileUploader){
    this.CargarFoto=function(nombrefoto,objetoUploader){//el this devuelve un puntero
        var direccion="fotos/"+nombrefoto;  
      $http.get(direccion,{responseType:"blob"})
        .then(function (respuesta){
            console.info("datos del cargar foto",respuesta);
            var mimetype=respuesta.data.type;
            var archivo=new File([respuesta.data],direccion,{type:mimetype});
            var dummy= new FileUploader.FileItem(objetoUploader,{});
            dummy._file=archivo;
            dummy.file={};
            dummy.file= new File([respuesta.data],nombrefoto,{type:mimetype});

              objetoUploader.queue.push(dummy);
         });
    }
});
app.factory('factoryPersona',function(servicioUsuario){
  
  var persona={//creamos un json
    nombre:"paquillo",
    apellido:"paquillo",
    mostrarNombre:function(dato){
     this.nombre=dato;
      return servicioUsuario.retornarPersonas().then(function(respuesta){
         return respuesta;
      });
    }
  };
  return persona;
});
app.service('servicioUsuario',function($http){
    var listado;
    this.retornarPersonas=function(){
        return $http.get('Datos/TraerUsuarios')
               .then(function(respuesta) {       
                      return respuesta.data;
              });
    };
});