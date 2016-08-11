<?php 
require_once("dompdf/dompdf_config.inc.php");

// Conectando, seleccionando la base de datos
    $link = mysql_connect('localhost', 'root', '')
        or die('No se pudo conectar: ' . mysql_error());    
    mysql_select_db('tp') or die('No se pudo seleccionar la base de datos');
    
    $query = 'SELECT * from pedidos';
    $result = mysql_query($query) or die('Consulta fallida: ' . mysql_error());   

$html = "
<table class='table table-hover table-bordered text-center'>
	<thead>
		<tr>
			<th>Numero</th>
			<th>Fecha</th>
			<th>Legajo Vendedor</th>
			<th>Estado</th>
			<th>IdBomba</th>
			<th>Cantidad</th>
			<th>Direccion</th>
		</tr>
	</thead>
	<tbody>";
    
    while($row = mysql_fetch_array($result))
    {
     $html.="<tr><td>".$row[0]."</td><td>".$row[1]."</td><td>".$row[2]."</td><td>".$row[3]."</td><td>".$row[4]."</td><td>".$row[5]."</td><td>".$row[6]."</td></tr>";
    } 

$html.="</tbody></table>";

//Creamos la instancia
$dompdf = new DOMPDF();
//Cargamos nuestro código HTML
$dompdf->load_html($html);
 
//Hacemos la conversion de HTML a PDF
$dompdf->render();

//El nombre con el que deseamos guardar el archivo generado
$dompdf->stream("pedidos.pdf");

header('location:templateGrillaPedidos.html');
?>