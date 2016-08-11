<?php
require_once"AccesoDatos.php";
class Pedido
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $fecha;
	public $legajovendedor;
 	public $estado;
  	public $idbomba;
  	public $cantidad;
  	public $direccion;  	

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}
	public function GetFecha()
	{
		return $this->fecha;
	}
	public function GetLegajovendedor()
	{
		return $this->legajovendedor;
	}
	public function GetEstado()
	{
		return $this->estado;
	}
	public function GetIdbomba()
	{
		return $this->idbomba;
	}
	public function GetCantidad()
	{
		return $this->cantidad;
	}
	public function GetDireccion()
	{
		return $this->direccion;
	}
	

	public function SetId($valor)
	{
		$this->id = $valor;
	}
	public function SetFecha($valor)
	{
		$this->fecha = $valor;
	}
	public function SetLegajovendedor($valor)
	{
		$this->legajovendedor = $valor;
	}
	public function SetEstado($valor)
	{
		$this->estado = $valor;
	}
	public function SetIdbomba($valor)
	{
		$this->idbomba = $valor;
	}
	public function SetCantidad($valor)
	{
		$this->cantidad = $valor;
	}
	public function SetDireccion($valor)
	{
		$this->direccion = $valor;
	}
	
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = Bomba::TraerUnPedido($id);
			
			$this->id = $obj->id;
			$this->fecha = $obj->fecha;
			$this->legajovendedor = $legajovendedor;
			$this->estado = $estado;
			$this->idbomba = $idbomba;
			$this->cantidad = $cantidad;
			$this->direccion = $direccion;
		}
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnPedido($id) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from pedidos where id =:id");		
		$consulta->bindValue(':id', $id, PDO::PARAM_INT);
		$consulta->execute();
		$pedidoBuscada = $consulta->fetchObject('Pedido');
		return $pedidoBuscada;	
					
	}
	
	public static function TraerTodosLosPedidos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from pedidos");
		$consulta->execute();			
		$arrPedidos= $consulta->fetchAll(PDO::FETCH_CLASS, "Pedido");	
		return $arrPedidos;
	}
	
	public static function BorrarPedido($id)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from pedidos WHERE id=:id");			
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarPedido($pedido)
	{
		$pedido=json_decode($pedido);
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				update pedidos 
				set fecha=:fecha,
				legajovendedor=:legajovendedor,
				estado=:estado,
				idbomba=:idbomba,
				cantidad=:cantidad,
				direccion=:direccion 
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();			
			$consulta->bindValue(':id',$pedido->id, PDO::PARAM_INT);
			$consulta->bindValue(':fecha',$pedido->fecha, PDO::PARAM_STR);
			$consulta->bindValue(':legajovendedor', $pedido->legajovendedor, PDO::PARAM_INT);
			$consulta->bindValue(':idbomba', $pedido->idbomba, PDO::PARAM_INT);
			$consulta->bindValue(':cantidad', $pedido->cantidad, PDO::PARAM_INT);
			$consulta->bindValue(':direccion', $pedido->direccion, PDO::PARAM_STR);
			$consulta->bindValue(':estado', $pedido->estado, PDO::PARAM_STR);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarPedido($pedido)
	{		
		$pedido=json_decode($pedido);		
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("insert into pedidos (fecha,legajovendedor,idbomba,cantidad,direccion,estado) values (now(),:legajovendedor,:idbomba,:cantidad,:direccion,:estado)");										
		$consulta->bindValue(':legajovendedor', $pedido->legajovendedor, PDO::PARAM_INT);
		$consulta->bindValue(':idbomba', $pedido->idbomba, PDO::PARAM_INT);
		$consulta->bindValue(':cantidad', $pedido->cantidad, PDO::PARAM_INT);
		$consulta->bindValue(':direccion', $pedido->direccion, PDO::PARAM_STR);		
		$consulta->bindValue(':estado', $pedido->estado, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	

}