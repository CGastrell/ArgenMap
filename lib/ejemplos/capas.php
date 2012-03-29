<?php
 ini_set('display_errors', 1);

 require('../WMSRemoto.php');
 require('../GestorDeServiciosWMS.php');

// $wms = new WMSRemoto( 'http://mapa.ign.gob.ar/geoserver/wms');

print_r( GestorDeServiciosWMS::todasLasURL() );


?>