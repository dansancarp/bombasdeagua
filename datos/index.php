<?php

/**
 * Step 1: Require the Slim Framework using Composer's autoloader
 *
 * If you are not using Composer, you need to load Slim Framework with your own
 * PSR-4 autoloader.
 */
require '../PHP/clases/AccesoDatos.php';
require '../PHP/clases/Personas.php';
require '../PHP/clases/Bombas.php';
require '../PHP/clases/Pedido.php';
include_once 'BeforeValidException.php';
include_once 'ExpiredException.php';
include_once 'SignatureInvalidException.php';
require '../vendor/autoload.php';

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new Slim\App();

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */
$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});

$app->get('/hello[/{name}]', function ($request, $response, $args) {
    $response->write("Hello, " . $args['name']);
    return $response;
})->setArgument('name', 'World!');

/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */


$app->get('/persona[/]', function ($request, $response, $args) {
	$listado=persona::TraerTodasLasPersonas();
    $response->write(json_encode($listado) );
    return $response;
});
$app->get('/persona/{id}', function ($request, $response, $args) {
	
	$listado=persona::TraerUnaPersona($args['id']);
    $response->write(json_encode($listado) );
    return $response;
});
$app->post('/persona[/]', function ($request, $response, $args) {
	
	$datospost=$request->getParsedBody();//objeto pasado por parametro	
	Persona::InsertarPersona(json_encode($datospost['persona']));
    $response->write(var_dump($datospost));    
    return $response;
});
$app->post('/Borrar[/{persona}]', function ($request, $response, $args) {
     

        $datosPost=$request->getParsedBody();
             
        Persona::BorrarPersona($datosPost["persona"]["id"]);
        
        $response->write(var_dump($datosPost));
        });

$app->post('/modificar[/{persona}]', function ($request, $response, $args) {
          $datosPost=$request->getParsedBody();

          if($datosPost["persona"]["foto"]!="pordefecto.png")
          {
          $rutaVieja="../fotos/".$datosPost["persona"]["foto"];
          $rutaNueva=$datosPost["persona"]["id"].".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
          copy($rutaVieja, "../fotos/".$rutaNueva);
          unlink($rutaVieja);
          $datosPost["persona"]["foto"]=$rutaNueva;
          }
          Persona::ModificarPersona(json_encode($datosPost["persona"]));
          $response->write(var_dump($datosPost['persona']));
          return $response;
   
          });
$app->post('/insertar[/{persona}]', function ($request, $response, $args) {
   
      $datosPost=$request->getParsedBody();
         
         if($datosPost["persona"]["foto"]!="pordefecto.png")
        {
         $rutaVieja="../fotos/".$datosPost["persona"]["foto"];
          $rutaNueva=$datosPost["persona"]["id"].".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
          copy($rutaVieja, "../fotos/".$rutaNueva);
          unlink($rutaVieja);
          $datosPost["persona"]["foto"]=$rutaNueva;
        }
     Persona::InsertarPersona(json_encode($datosPost['persona']));
        
       $response->write(var_dump($datosPost));
});
$app->post('/imagen[/]', function ($request, $response, $args) {
    
     $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
     // $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'img' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
      $uploadPath = "../fotos/". $_FILES[ 'file' ][ 'name' ];
      move_uploaded_file( $tempPath, $uploadPath );
      $answer = array( 'respuesta' => 'Archivo Cargado!' );
      $json = json_encode( $answer );
      $response->write(var_dump($json));
      echo $json;
      });
/*Productos*/

$app->get('/TraerTodasLasBombas[/]', function ($request, $response, $args) {
    // $response->write("hola roko ");
    $listado=Bomba::TraerTodasLasBombas();
    $response->write( json_encode($listado));
    return $response;
   });

$app->post('/insertarBomba[/{producto}]', function ($request, $response, $args) {
   
    $datosPost=$request->getParsedBody();          
    Bomba::InsertarBomba(json_encode($datosPost['producto']));        
    $response->write(var_dump($datosPost));
});

$app->post('/BorrarBomba[/{productos}]', function ($request, $response, $args) {
     

        $datosPost=$request->getParsedBody();
             
        Bomba::BorrarBomba($datosPost["productos"]["id"]);
        
        $response->write(var_dump($datosPost));
        });

$app->post('/modificarBomba[/{producto}]', function ($request, $response, $args) {
          $datosPost=$request->getParsedBody();          
          Bomba::ModificarBomba(json_encode($datosPost["producto"]));
          $response->write(var_dump($datosPost['producto']));
          return $response;   
          });

$app->post('/venderBomba[/{pedido}]', function ($request, $response, $args) {
          $datosPost=$request->getParsedBody();          
          Pedido::InsertarPedido(json_encode($datosPost["pedido"]));
          Bomba::VenderBomba($datosPost["pedido"]["idbomba"]);
          $response->write(var_dump($datosPost['pedido']));
          return $response;   
          });
//Pedido
$app->get('/TraerTodosLosPedidos[/]', function ($request, $response, $args) {    
    $listado=Pedido::TraerTodosLosPedidos();
    $response->write( json_encode($listado));
    return $response;
   });
$app->post('/modificarPedido[/{pedido}]', function ($request, $response, $args) {
          $datosPost=$request->getParsedBody();          
          Pedido::ModificarPedido(json_encode($datosPost["pedido"]));
          $response->write(var_dump($datosPost['pedido']));
          return $response;   
          });
$app->run();
