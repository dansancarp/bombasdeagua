<?php

include_once 'JWT.php';
include_once 'ExpiredException.php';
include_once 'BeforeValidException.php';
include_once 'SignatureInvalidException.php';
include_once "Personas.php";


$objDatos=json_decode(file_get_contents("php://input"));
//$idUsuario=Usuario::ChequearUsuario($objDatos->usuario,$objDatos->clave);

$respuesta=false;

$persona = Persona::Logear($objDatos->nombre,$objDatos->clave);
//1-tomo datos del http
//2-verifico con un metodo de la clase usuario si son datos validos
//3-de ser validos creo el token y lo retorno

if ($persona!=null) {
      $respuesta=true;
    }

if ($respuesta) {

		$token=array(
		   "id"=>$persona->GetId(),
		   "nombre"=>$objDatos->nombre,
		   "perfil"=>$persona->GetRol(),
		   "exp"=>time()+9600
			);

		$token=Firebase\JWT\JWT::encode($token,'22jackkeylo99');
		//token ya terminado
		$array['tokentest2016']=$token;
		$array['perfil']="user";

		echo json_encode($array);
		return true;
}
else{
    echo "no entro";

    if (file_get_contents("php://input") ){
   		echo "error de file";
	}
    return false;
  }

?>
