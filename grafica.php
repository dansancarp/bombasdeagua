<?php    
    require("src/jpgraph.php");
    require("src/jpgraph_pie.php");
    require("src/jpgraph_pie3d.php");
   require("PHP/clases/AccesoDatos.php");
  
    
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();      
    $consulta =$objetoAccesoDato->RetornarConsulta('SELECT count(*) as cantidad,nombre FROM pedidos,persona where pedidos.legajovendedor=persona.id group by nombre');    
    $consulta->execute();
    $resultado = $consulta->fetchAll();

     foreach ($resultado as $row) {
         $data[] = $row[0];
         $can[] = $row[1];     
    }

    $graph = new PieGraph(550,300,"auto");
    $graph->img->SetAntiAliasing();
    $graph->SetMarginColor('gray');
//$graph->SetShadow();
 
// Setup margin and titles
    $graph->title->Set("Ventas realizadas por vendedor");
 
    $p1 = new PiePlot3D($data);
    $p1->SetSize(0.45);
    $p1->SetCenter(0.4);
 
// Setup slice labels and move them into the plot
    $p1->value->SetFont(FF_FONT1,FS_BOLD);
    $p1->value->SetColor("black");
    $p1->SetLabelPos(0.5);
 
    $p1->SetLegends($can);
    $p1->ExplodeAll();
 
    $graph->Add($p1);
    $graph->Stroke();
    
?>
  