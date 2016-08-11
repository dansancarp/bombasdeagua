<?php
require_once"AccesoDatos.php";
class Bomba
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $modelo;
	public $potencia;
 	public $tension;
  	public $succion;
  	public $elevacion;
  	public $caudal;
  	public $precio;
  	public $stock;

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}
	public function GetModelo()
	{
		return $this->modelo;
	}
	public function GetPotencia()
	{
		return $this->potencia;
	}
	public function GetTension()
	{
		return $this->tension;
	}
	public function GetSuccion()
	{
		return $this->succion;
	}
	public function GetElevacion()
	{
		return $this->elevacion;
	}
	public function GetCaudal()
	{
		return $this->caudal;
	}
	public function GetPrecio()
	{
		return $this->precio;
	}
	public function GetStock()
	{
		return $this->stock;
	}

	public function SetId($valor)
	{
		$this->id = $valor;
	}
	public function SetModelo($valor)
	{
		$this->modelo = $valor;
	}
	public function SetPotencia($valor)
	{
		$this->potencia = $valor;
	}
	public function SetTension($valor)
	{
		$this->tension = $valor;
	}
	public function SetSuccion($valor)
	{
		$this->succion = $valor;
	}
	public function SetElevacion($valor)
	{
		$this->elevacion = $valor;
	}
	public function SetCaudal($valor)
	{
		$this->caudal = $valor;
	}
	public function SetPrecio($valor)
	{
		$this->precio = $valor;
	}
	public function SetStock($valor)
	{
		$this->stock = $valor;
	}
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = Bomba::TraerUnaBomba($id);
			
			$this->id = $obj->id;
			$this->modelo = $obj->modelo;
			$this->potencia = $potencia;
			$this->tension = $tension;
			$this->succion = $succion;
			$this->elevacion = $elevacion;
			$this->caudal = $caudal;
			$this->precio = $precio;
			$this->stock = $stock;
		}
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnaBomba($id) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from bombas where id =:id");		
		$consulta->bindValue(':id', $id, PDO::PARAM_INT);
		$consulta->execute();
		$bombaBuscada = $consulta->fetchObject('Bomba');
		return $bombaBuscada;	
					
	}
	
	public static function TraerTodasLasBombas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from bombas");
		$consulta->execute();			
		$arrBombas= $consulta->fetchAll(PDO::FETCH_CLASS, "Bomba");	
		return $arrBombas;
	}
	
	public static function BorrarBomba($id)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from bombas WHERE id=:id");			
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarBomba($bomba)
	{
			$bomba=json_decode($bomba);
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				update bombas 
				set modelo=:modelo,
				potencia=:potencia,
				tension=:tension,
				succion=:succion,
				elevacion=:elevacion,
				caudal=:caudal,
				precio=:precio,
				stock=:stock
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();			
			$consulta->bindValue(':id',$bomba->id, PDO::PARAM_INT);
			$consulta->bindValue(':modelo',$bomba->modelo, PDO::PARAM_STR);
			$consulta->bindValue(':potencia', $bomba->potencia, PDO::PARAM_STR);
			$consulta->bindValue(':tension', $bomba->tension, PDO::PARAM_STR);
			$consulta->bindValue(':succion', $bomba->succion, PDO::PARAM_INT);
			$consulta->bindValue(':elevacion', $bomba->elevacion, PDO::PARAM_INT);
			$consulta->bindValue(':caudal', $bomba->caudal, PDO::PARAM_STR);
			$consulta->bindValue(':precio', $bomba->precio, PDO::PARAM_INT);
			$consulta->bindValue(':stock', $bomba->stock, PDO::PARAM_INT);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarBomba($bomba)
	{
		$bomba=json_decode($bomba);
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("insert into bombas (modelo,potencia,tension,succion,elevacion,caudal,precio,stock) values (:modelo,:potencia,:tension,:succion,:elevacion,:caudal,:precio,:stock)");							
		$consulta->bindValue(':modelo',$bomba->modelo, PDO::PARAM_STR);
		$consulta->bindValue(':potencia', $bomba->potencia, PDO::PARAM_STR);
		$consulta->bindValue(':tension', $bomba->tension, PDO::PARAM_STR);
		$consulta->bindValue(':succion', $bomba->succion, PDO::PARAM_INT);
		$consulta->bindValue(':elevacion', $bomba->elevacion, PDO::PARAM_INT);
		$consulta->bindValue(':caudal', $bomba->caudal, PDO::PARAM_STR);
		$consulta->bindValue(':precio', $bomba->precio, PDO::PARAM_INT);
		$consulta->bindValue(':stock', $bomba->stock, PDO::PARAM_INT);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	

	public static function VenderBomba($id)
	{
			$bomba=Bomba::TraerUnaBomba($id);
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				update bombas set 
				stock=:stock - 1
				WHERE id=:id AND stock > 0");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();			
			$consulta->bindValue(':id',$bomba->id, PDO::PARAM_INT);
			$consulta->bindValue(':stock', $bomba->stock, PDO::PARAM_INT);
			return $consulta->execute();
	}
}