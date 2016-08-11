// esta variable hara de namespace
var Geolocalizacion = Geolocalizacion || {};
Geolocalizacion.Marcador = Geolocalizacion.Marcador || {};

//Lo asignado a self sera es publico, es decir se puede acceder utilizando geolocalizacion.
//lo definido solo como var sera privado

//Envolvemos el módulo dentro de una función auto-ejecutable
(function (self){
    
    var map; 
    var infoWindow;
    var puntos = [];
    var geocoder = null;
     
    self.iniciar = function iniciar() {
        //el array lo borro si solo quiero mostrar un marcador
        puntos = [];
        //Geolocalizacion del navegador
//         if(navigator.geolocation) {
//            navigator.geolocation.getCurrentPosition(function (position) {
//                    //alert('Tu lat-long es: ' + position.coords.latitude + ' / ' + position.coords.longitude);
//                    mostrarGoogleMaps(position.coords.latitude, position.coords.longitude);
//            },
//            function(objPositionError){
//                //Usuario bloqueo la ubicacion o ha tardado demasiado en responder
//                mostrarGoogleMaps(0, 0);
//                }
//            );
//        }
//        // navegador no soporta geolocalizacion
//        else {
//            mostrarGoogleMaps(0, 0);
//        }
            mostrarGoogleMaps(0, 0);
     }
    
    var mostrarGoogleMaps = function mostrarGoogleMaps(lat, lng) {
         
        // Nueva infowindow, el tooltip que aparece al hacer click
         infoWindow = new google.maps.InfoWindow();
         
         geocoder = new google.maps.Geocoder();
         
        //Creamos el punto del centro del mapa a partir de las coordenadas:
        if (lat == 0 && lng == 0)
            var punto = new google.maps.LatLng(-34.603657,-58.381794);
        else {
             var punto = new google.maps.LatLng(lat,lng);
              var p = {
                "lat" : lat,
                "lng": lng,
                "nombre": "Estoy en este lugar! (Eso dice mi navegador)",
                "direccion" : "",
                "codPostal" : ""
                }
             puntos.push(p);
        }

        //Configuramos las opciones indicando Zoom, punto(el que hemos creado) y tipo de mapa
        var myOptions = {
        zoom: 14, 
        center: punto, 
        mapTypeId: google.maps.MapTypeId.ROADMAP //G_MAP_TYPE o ROADMAP
        };

        map = new google.maps.Map(document.getElementById("mostrarMapa"), myOptions);

        bounds = new google.maps.LatLngBounds();

        //countMarker = 0;
        if (puntos.length > 0)
            Geolocalizacion.displayMarkers(map, puntos, infoWindow);
        self.verMarcador();
       
      };
    
     //google.maps.event.addDomListener(window, 'load', iniciar);
    

    self.verMarcador = function verMarcador(){

        var nombre = "voto: " + $("#id").val();
        var dire = $("#punto").val();
        
       
        if(dire != "") {

          Geolocalizacion.encontrarDireccion(map, dire, nombre, geocoder, puntos, infoWindow);
        }
    }


    self.guardar = function guardar(){

        var promise = $.ajax
                        ({
                        type: "POST",
                        url: "nexo.php",
                        data: ({
                                "marcadores" : puntos, 
                                "queHacer":"guardarMarcadores"
                            }),
                        cache: false,
                        dataType: "text"
                      });// fin del ajax

        promise.done(function (dato){
             var strIndex = dato.indexOf('No ingreso');
             if(strIndex == -1) 
             {
              //string no encontrado
               //$("#btnDescarga").attr("disabled", false);
                location.href='partes/descarga.php';
             }
             else 
                alert(dato);
        });
    }
    
    
})(Geolocalizacion.Marcador);
// De este closure solo sera visible Geolocalizacion.Marcador.verMarcador y Geolocalizacion.Marcador.guardar
// Al estar modularizado y utilizar namespace especifico de los modulos en vez de un namespace comun se evita al màximo la colision de nombres 
// de variables. Todos los scripts que incluya en el html podrìan tener ua funcion llamada verMarcador que pertenezca a su modulo
