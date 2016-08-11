
var app = angular.module('ABMangularPHP', ['ngAnimate','ui.router', 'angularFileUpload','satellizer']); 


//declaro la configuracion del app - RUTEO (ROUTE) - defino lo que quiero ver y llamo a los diferentes templates
app.config(function($stateProvider, $urlRouterProvider,$authProvider){


    $authProvider.loginUrl='tp/PHP/clases/autentificador.php';
    $authProvider.signupUrl='tp/PHP/clases/autentificador.php';
    $authProvider.tokenName='tokentest2016'
    $authProvider.tokenPrefix= 'ABM_Persona';
    $authProvider.authHeader= 'Data';

$stateProvider
    .state('menu', {
    views: {
      'principal': { templateUrl: 'menu.html',controller: 'controlMenu' },
      'menuSuperior': {templateUrl: 'menuSuperior.html',controller:'controlLogout'}
    }
    ,url:'/menu'
  })

  .state('error', {
    views: {
      'principal': { templateUrl: 'templateError.html',controller: 'controlError' },
      'menuSuperior': {templateUrl: 'menuSuperior.html',controller:'controlLogout'}
    }
    ,url:'/error'
     })

    .state('grilla', {
    url: '/grilla',
    views: {
      'principal': { templateUrl: 'templateGrilla.html',controller: 'controlGrilla' },
      'menuSuperior': {templateUrl: 'menuSuperior.html',controller:'controlLogout'}
    }
  })
   

  .state('grillaProductos', {
    url: '/grillaProductos',
    views: {
      'principal': { templateUrl: 'templateGrillaProducto.html',controller: 'controlGrillaProducto' },
      'menuSuperior': {templateUrl: 'menuSuperior.html',controller:'controlLogout'}
    }
    })

  .state('grillaPedidos', {
    url: '/grillaPedidos',
    views: {
      'principal': { templateUrl: 'templateGrillaPedidos.html',controller: 'controlGrillaPedidos' },
      'menuSuperior': {templateUrl: 'menuSuperior.html',controller:'controlLogout'}
    }
    })

    .state('alta', {
    url: '/alta',
    views: {
      'principal': { templateUrl: 'templateUsuario.html',controller: 'controlAlta' },
      'menuSuperior': {templateUrl: 'menuSuperior.html',controller:'controlLogout'}
    }

  
  })

    .state('altaProducto', {
    url: '/altaProducto',
    views: {
      'principal': { templateUrl: 'templateProducto.html',controller: 'controlAltaProducto' },
      'menuSuperior': {templateUrl: 'menuSuperior.html',controller:'controlLogout'}
    }
    })

      .state('modificar', {
    url: '/modificar/{id}?:nombre:apellido:dni:rol:foto:clave',
     views: {
      'principal': { templateUrl: 'templateUsuario.html',controller: 'controlModificacion' },
      'menuSuperior': {templateUrl: 'menuSuperior.html',controller:'controlLogout'}
    }

  })

   .state('modificarProducto', {
    url: '/modificarProducto/{id}?:modelo:potencia:tension:succion:elevacion:caudal:precio:stock',
     views: {
      'principal': { templateUrl: 'templateProducto.html',controller: 'controlModificacionProducto' },
      'menuSuperior': {templateUrl: 'menuSuperior.html',controller:'controlLogout'}
    }

   })

    .state('login', {
    url: '/login',
     views: {
      'principal': { templateUrl: 'templateLogin.html',controller: 'controlLogin' },
      'menuSuperior': {templateUrl: 'menuSuperior.html',controller:'controlLogout'}
    }
  })

    .state('pedido', {
    url: '/pedido/{id}?:modelo:potencia:tension:succion:elevacion:caudal:precio:stock',
     views: {
      'principal': { templateUrl: 'templatePedido.html',controller: 'controlPedido' },
      'menuSuperior': {templateUrl: 'menuSuperior.html',controller:'controlLogout'}
    }
  })

    .state('grafica', {
    url: '/grafica',
     views: {
      'principal': { templateUrl: 'templateGrafica.html',controller: 'controlGrafica' },
      'menuSuperior': {templateUrl: 'menuSuperior.html',controller:'controlLogout'}
    }
  })
    .state('mapa', 
    {            
        url:'/mapa/{id}?:direccion',
        views: {
      'principal': { templateUrl: 'templateMapa.html',controller:'controlMapa'},
      'menuSuperior': {templateUrl: 'menuSuperior.html',controller:'controlLogout'}
    }
          
    })


  $urlRouterProvider
    .otherwise('/menu');  

}); // fin config


// CONTROLLER LOGIN

app.controller('controlLogin', function($scope, $http, $auth, $state) {

  $scope.llenarAdmin=function()
  {
    $scope.nombre="admin";
    $scope.pass="123456";
  }

  $scope.llenarVendedor=function()
  {
    $scope.nombre="vend";
    $scope.pass="123456";
  }

    $scope.logear = function(){
            
            $auth.login({nombre:$scope.nombre,clave:$scope.pass})
              .then(function(respuestaAuth){                                                                                 

                        console.info("Respuesta", respuestaAuth.data); 
                              if ($auth.isAuthenticated()) {                                      
                                      
                                      $state.go('menu');
                              }    
                              else{
                                  $state.go('login');//ejemplo
                                  $scope.DatoUsuario="Ningun usuario conectado";
                                  }                 
                    
                            $scope.DatoTest="**Menu**";

              })
              .catch(function(parametro){

                //console.info("error",parametro);

              }); // fin catch


    }; //fin función logear 

}); // fin control login


app.controller('controlLogout', function($scope,$http,$auth,$state) { 

   $scope.deslogear=function() {
   
        $auth.logout()
        .then(function(respuestaAuth){
     
          // console.info("Respuesta", respuestaAuth.data); 

            if($auth.isAuthenticated())
            {
               $state.go('menu');//Ejemplo
               $scope.DatoUsuario=$auth.getPayload().nombre+" | "+$auth.getPayload().perfil;
             }else{
               $state.go('login');//ejemplo
               $scope.DatoUsuario="Ningun usuario conectado";
           }
    
        })
        .catch(function(parametro){
             console.info("Error Catch", parametro.error);
        });
   };
});

app.controller('controlMapa', function($scope, $http, $auth, $state,$stateParams) {     
    $scope.punto =  $stateParams.direccion;        
    if($auth.isAuthenticated() && $auth.getPayload().perfil == "admin")
            {
               $state.go('mapa');//Ejemplo               
             }else{
               $state.go('login');//ejemplo               
           }   
});

app.controller('controlGrafica', function($scope,$http,$auth,$state) { 

      if($auth.isAuthenticated() && $auth.getPayload().perfil == "admin")
            {
               $state.go('grafica');//Ejemplo
               $scope.DatoUsuario=$auth.getPayload().nombre+" | "+$auth.getPayload().perfil;
             }else{
               $state.go('login');//ejemplo
               $scope.DatoUsuario="Ningun usuario conectado";
           }      

});


// CONTROLLER MENÚ

app.controller('controlMenu', function($scope, $http, $auth, $state) {
                  if ($auth.isAuthenticated()) {
                        console.log("entre a menu!!");
                            $state.go('menu');

                    }else{
                        //alert("no autentico pero estoy en el menu");
                            $state.go('login');
                          }
}); // fin control menú


//CONTROL ALTA

app.controller('controlAlta', function($scope,$auth, $http ,$state,FileUploader,cargadoDeFoto) {  
     if($auth.isAuthenticated() && $auth.getPayload().perfil == "admin")
            {
               $state.go('alta');//Ejemplo
               $scope.DatoUsuario=$auth.getPayload().nombre+" | "+$auth.getPayload().perfil;
             }else{
               $state.go('error');//ejemplo
               $scope.DatoUsuario="Ningun usuario conectado";
           }
  $scope.uploader = new FileUploader({url: 'Datos/imagen'});
  $scope.uploader.queueLimit = 1;

  //inicio las variables
  $scope.persona={};
  $scope.persona.nombre= "natalia" ;  
  $scope.persona.apellido= "natalia" ;
  $scope.persona.rol= "admin" ;
  $scope.persona.dni= "32151421" ;
  $scope.persona.foto="porDefecto.png";
  $scope.persona.clave="123456";
  
 cargadoDeFoto.CargarFoto($scope.persona.foto,$scope.uploader); 

  $scope.Guardar=function(){
  console.log($scope.uploader.queue);
  if($scope.uploader.queue[0].file.name!='porDefecto.png')
  {
    var nombreFoto = $scope.uploader.queue[0]._file.name;
    $scope.persona.foto=nombreFoto;
  }
  $scope.uploader.uploadAll();
    console.log("persona a guardar:");
    console.log($scope.persona);
  }
     $scope.uploader.onSuccessItem=function(item, response, status, headers)
    {
    //alert($scope.persona.foto);
      $http.post('datos/insertar', { persona:$scope.persona})
        .then(function(respuesta) {       
           //aca se ejetuca si retorno sin errores        
         console.log(respuesta.data);
         $state.go("grilla");

      },function errorCallback(response) {        
          //aca se ejecuta cuando hay errores
          console.log( response);           
        });
     console.info("Ya guardé el archivo.", item, response, status, headers);
    };
});


// CONTROLLER GRILLA

app.controller('controlGrilla', function($scope, $http, $state, $auth) {
  	$scope.DatoTest="**grilla**";
 	

console.log($auth.isAuthenticated());
                  if ($auth.isAuthenticated() && $auth.getPayload().perfil=="admin") {
                            $state.go('grilla');

                    }else{
                            $state.go('error');
                          }

  $http.get('datos/persona')
 	.then(function(respuesta) {     	

      	 $scope.ListadoPersonas = respuesta.data;// recordar que los datos estan dentro de data

      	 console.log(respuesta.data);

    },function errorCallback(response) {
     		 $scope.ListadoPersonas= [];
     		console.log( response);    			

 	 });


// --------- FUNCION BORRAR
 	$scope.Borrar=function(persona){	
    $http.post("datos/Borrar",{persona:persona})
     .then(function(respuesta) {                          
             console.log(respuesta.data);
            $http.get('Datos/persona')
              .then(function(respuesta) {     

                   $scope.ListadoPersonas = respuesta.data;
                   console.log(respuesta.data);

              },function errorCallback(response) {
                   $scope.ListadoPersonas= [];
                  console.log( response);

      });

        },function errorCallback(response) {        
            //aca se ejecuta cuando hay errores
            console.log( response);           
        });


 	}

});

// CONTROLLER MODIFICAR

app.controller('controlModificacion', function($scope, $http, $state, $stateParams, FileUploader, serviceCargadorDeFoto) {
  $scope.DatoTest="**Modificar**";
    


  $scope.persona={};
  $scope.persona.id = $stateParams.id;
  $scope.persona.nombre= $stateParams.nombre ;  
  $scope.persona.apellido= $stateParams.apellido ;
  $scope.persona.rol= $stateParams.rol ;
  $scope.persona.dni= $stateParams.dni ;
  $scope.persona.foto='porDefecto.png';
  $scope.persona.clave=$stateParams.clave;  

$scope.uploader = new FileUploader({url: 'Datos/imagen'});
$scope.uploader.queueLimit = 1; 
cargadoDeFoto.CargarFoto($scope.persona.foto,$scope.uploader);    

 

//FUNCION GUARDAR DEL MODIFICAR
                $scope.Guardar = function(){


                        if ($scope.uploader.queue[0].file.name != 'porDefecto.png') {
                          var nombreFoto = $scope.uploader.queue[0].file.name;
                          $scope.persona.foto = nombreFoto;
                        }


                        //cuando la subida de la imagen es success carga la persona
                        $scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
                             //console.info('onSuccessItem', fileItem, response, status, headers);

                             //$http.post('PHP/nexo.php', { datos: {accion:"modificar", persona:$scope.persona} })
                             $http.get('datos/persona')
                              .then(function(respuesta) {       

                                     console.log("Persona a Modificada con éxito! -->");
                                    // console.log($scope.persona);
                                     //$scope.unaPersona = respuesta.data.persona;
                                     console.log(respuesta.data);
                                     $state.go("grilla");

                                },function errorCallback(response) {
                                     $scope.unaPersona= [];
                                    console.log(response);

                               });


                        };
                        $scope.uploader.uploadAll();


                }


});


/*Productos*/

app.controller('controlGrillaProducto', function($scope, $auth,$http,$location,$state) {
    
  if($auth.isAuthenticated())
            {
               $state.go('grillaProductos');
               $scope.DatoUsuario=$auth.getPayload().nombre+" | "+$auth.getPayload().perfil;               
             }else{               
                 $state.go('login');
               $scope.DatoUsuario=$auth.getPayload().nombre+" | "+$auth.getPayload().perfil;
           }
     
  
  $http.get('datos/TraerTodasLasBombas')  
  .then(function(respuesta) {       
         $scope.ListadoProductos = respuesta.data;
         console.log(respuesta.data);
    },function errorCallback(response) {
         $scope.ListadoProductos= [];
        console.log( response);     
   });

  
    if($auth.isAuthenticated() && $auth.getPayload().perfil=="admin")
            {          
                
          
                  $scope.BorrarProducto=function(producto){ 
                  $http.post("datos/BorrarBomba",{productos:producto})
                       .then(function(respuesta) {       
                               //aca se ejetuca si retorno sin errores      
                               console.log(respuesta.data);
                                  $http.get('datos/TraerTodasLasBombas')
                                  .then(function(respuesta) {       

                                         $scope.ListadoProductos = respuesta.data;
                                         console.log(respuesta.data);

                                    },function errorCallback(response) {
                                         $scope.ListadoProductos= [];
                                        console.log( response);
                                        
                                   });

                        },function errorCallback(response) {        
                            //aca se ejecuta cuando hay errores
                            console.log( response);           
                    });
                }// $scope.Borrar
              

              $scope.DatoUsuario=$auth.getPayload().nombre+" | "+$auth.getPayload().perfil;               
             }else{
               $scope.DatoUsuario=$auth.getPayload().nombre+" | "+$auth.getPayload().perfil;               
           }
});//app.controller('controlGrilla',


app.controller('controlAltaProducto', function($scope,$auth, $http ,$state) {  
      if($auth.isAuthenticated() && $auth.getPayload().perfil=="admin")
            {
               $state.go('altaProducto');//Ejemplo
             }else{
               $state.go('error');//ejemplo
           }  

  //inicio las variables
  $scope.producto={};
  $scope.producto.modelo= "Motomel 1/2 Hp Mbp42" ;  
  $scope.producto.potencia= "370 W" ;  
  $scope.producto.tension= "220 V - 50Hz" ;  
  $scope.producto.succion= 8 ;  //metros
  $scope.producto.elevacion= 31 ;   //metros
  $scope.producto.caudal= "31 L/minuto" ;  //L/minuto
  $scope.producto.precio= 1000 ;  
  $scope.producto.stock= 20 ;  
 

  $scope.GuardarProducto=function(){  
      $http.post('datos/insertarBomba', { producto:$scope.producto})
        .then(function(respuesta) {       
           //aca se ejetuca si retorno sin errores        
         console.log(respuesta.data);
         $state.go("grillaProductos");

      },function errorCallback(response) {        
          //aca se ejecuta cuando hay errores
          console.log( response);           
        });     
    };
});

app.controller('controlModificacionProducto', function($scope,$auth, $http, $state, $stateParams){//, $routeParams, $location)
  //inicio las variables
  $scope.producto={};
  $scope.producto.id=$stateParams.id;
  $scope.producto.modelo=$stateParams.modelo;  
  $scope.producto.potencia=$stateParams.potencia;  
  $scope.producto.tension=$stateParams.tension;  
  $scope.producto.succion= $stateParams.succion;  //metros
  $scope.producto.elevacion=$stateParams.elevacion;   //metros
  $scope.producto.caudal= $stateParams.caudal;  //L/minuto
  $scope.producto.precio=$stateParams.precio;  
  $scope.producto.stock=$stateParams.stock; 

      if($auth.isAuthenticated() && $auth.getPayload().perfil=="admin")
            {
               $state.go('modificarProducto');//Ejemplo
             }else{
               $state.go('error');//ejemplo
           }   
      
      $scope.GuardarProducto=function(producto){   
        
        $http.post('datos/modificarBomba', {producto:$scope.producto})
          .then(function(respuesta){
          //aca se ejetuca si retorno sin errores       
          console.log(respuesta.data);
          $state.go("grillaProductos");
          },
          function errorCallback(response)
          {
          //aca se ejecuta cuando hay errores
            console.log( response);           
          });
      }


});//app.controller('controlModificacion')

// CONTROLLER MENÚ

app.controller('controlPedido', function($scope, $http, $auth, $state,$stateParams) {              
      if ($auth.isAuthenticated() && $auth.getPayload().perfil=="vendedor") {      
              $state.go('pedido');
      }else{
              $state.go('error');
      }
     

      $scope.pedido = {};
      $scope.pedido.legajovendedor = $auth.getPayload().id;
      $scope.pedido.estado = "generado";
      $scope.pedido.idbomba = $stateParams.id;
      $scope.pedido.direccion = "Mitre 750";
      $scope.pedido.cantidad = 1;

      $scope.VenderProducto=function(pedido){  
                    $http.post('datos/venderBomba', {pedido:pedido})
                      .then(function(respuesta) {       
                      //aca se ejetuca si retorno sin errores        
                        console.log(respuesta.data);                           
                        $state.go('grillaProductos')
                      },function errorCallback(response) {        
                        //aca se ejecuta cuando hay errores
                      console.log( response);           
                    });     
              }; 
}); // fin control menú

/*Pedidos*/

app.controller('controlGrillaPedidos', function($scope, $auth,$http,$location,$state) {
    
  if($auth.isAuthenticated() && $auth.getPayload().perfil=="admin")
            {
               $state.go('grillaPedidos');
               $scope.DatoUsuario=$auth.getPayload().nombre+" | "+$auth.getPayload().perfil;               
             }else{               
                 $state.go('login');
               $scope.DatoUsuario=$auth.getPayload().nombre+" | "+$auth.getPayload().perfil;
           }
     
  
  $http.get('datos/TraerTodosLosPedidos')  
  .then(function(respuesta) {       
         $scope.ListadoPedidos = respuesta.data;
         console.log(respuesta.data);
    },function errorCallback(response) {
         $scope.ListadoPedidos= [];
        console.log( response);     
   });              

  $scope.GuardarEstado=function(pedido,estado2){
         console.log("estado: "+estado2);
        pedido.estado = estado2;
        $http.post('datos/modificarPedido', {pedido:pedido})
          .then(function(respuesta){
          //aca se ejetuca si retorno sin errores       
          console.log(respuesta.data);
          $state.go("grillaPedidos");
          },
          function errorCallback(response)
          {
          //aca se ejecuta cuando hay errores
            console.log( response);           
          });
      } 

    
    
});
//directiva
app.directive('myDraggable', ['$document', function($document) {
  return {
    link: function(scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0;

      element.css({
       position: 'relative',
       cursor: 'pointer'
      });

      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        startX = event.pageX - x;
        startY = event.pageY - y;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });

      function mousemove(event) {
        y = event.pageY - startY;
        x = event.pageX - startX;
        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
      }
    }
  };
}]);
//service
app.service('cargadoDeFoto',function($http,FileUploader){
    this.CargarFoto=function(nombrefoto,objetoUploader){
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

});//app.service('cargadoDeFoto',function($http,FileUploader){