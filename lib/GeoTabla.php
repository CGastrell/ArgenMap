<?php

require_once("GeoObjeto.php");
require_once("GeoSetDeObjetos.php");

class GeoTabla
{
	private $dbname;
	public $tblname;
 	#pgsql2shp -f tota -h localhost -u ignuser ignimportfromgeodb veg_cultivos

	function __construct($dbname, $tblname, $pdo=false)
	{
		$this->dbname = $dbname;
		$this->tblname = $tblname;

		$this->pdo = $pdo;
	}

	function name()
	{
		return $this->tblname;
	}

	function getObjectCountByOperador($operadores, $region=false )
	{
		return $this->getObjectCountByMatch('operador', $operadores, $region);
	}

	

	function getObjectCountByMatch($field, $stringToMatch, $region = false)
	{
		$q = "SELECT * from $this->tblname WHERE 1=1";
		if ( ! is_array($stringToMatch ) ){
			 $q = " where $field='$stringToMatch'";
		} else {
			$wheres = array();
			foreach($stringToMatch as $string) {
				$wheres[] = "$field = '$string'";


			}
			$wheres = implode(' OR ', $wheres);
			$q = sprintf("%s AND ( %s )", $q, $wheres);
		}
	 
		if ( $region ) {
			$q = sprintf("%s and ST_Within(the_geom, GeomFromText('%s', 4326) )", $q, $region);
		}


		$allTable = $this->pdo->query($q, PDO::FETCH_ASSOC); 
		if ($allTable ) 
			return $allTable->rowCount();
		return 0;
	}

	function getCantObjetos($region=false, $operador = false )
	{
		$q = "SELECT * from $this->tblname WHERE 1=1";
		if ( $region ) {
			$q = sprintf("%s and ST_Within(the_geom, GeomFromText('%s', 4326) )", $q, $region);
		}

		if ( is_string($operador ) ){
			 $q = sprintf("%s AND operador='%s'", $q, $operador);
		} elseif ( is_array($operador) ) {
			$wheres = array();
			foreach($operador as $string) {
				$wheres[] = "operador = '$operador'";


			}
			$wheres = implode(' OR ', $wheres);
			$q = sprintf("%s AND ( %s )", $q, $wheres);
		}

		$allTable = $this->pdo->query($q, PDO::FETCH_ASSOC); 
		if ($allTable ) 
			return $allTable->rowCount();
		return 0;
	}

	function getObjetos($region = false, $operador = false, $offset=0, $limit = GeoDB::DEFAULT_LIMIT)
	{
		$q = "SELECT *, AsText(the_geom) geometria FROM $this->tblname WHERE 1=1";
		if ( $region ) {
			$q = sprintf("%s AND ST_Within(the_geom, GeomFromText('%s', 4326) )", $q, $region);
		}

		if ( is_string($operador ) ){
			 $q = sprintf("%s AND operador='%s'", $q, $operador);
		} elseif ( is_array($operador) ) {
			$wheres = array();
			foreach($operador as $op) {
				$wheres[] = "operador = '$op'";


			}
			$wheres = implode(' OR ', $wheres);
			$q = sprintf("%s AND ( %s )", $q, $wheres);
		}		

		if ($this->tieneElAtributo( 'nombre' ) ) {
			$q = sprintf("%s ORDER by nombre", $q);
		}

		$q = sprintf("%s LIMIT %s OFFSET %s", $q, $limit, $offset);

		$res = $this->pdo->query($q, PDO::FETCH_ASSOC);
		return new GeoSetDeObjetos( $res );
		
	}

	function getObjectCountGroupingBy($field)
	{
		$q = "SELECT count(1) cant FROM $this->tblname GROUP BY $field";

		$res = $this->pdo->query($q, PDO::FETCH_ASSOC); 
		return $res;
	}

	function valoresUnicosDeAtributo($nombreDeAtributo)
	{
		$q = "SELECT DISTINCT $nombreDeAtributo FROM $this->tblname	";
		$res = $this->pdo->query($q, PDO::FETCH_ASSOC);

		return $res;
	}


	function dumpAsZipFile($outputFile)
	{
		$tmpDirName = sys_get_temp_dir() . DIRECTORY_SEPARATOR .  $this->tblname;	
		$tmpDirName = "./tmp/tmpdirs" . DIRECTORY_SEPARATOR .  $this->tblname;	
		mkdir($tmpDirName);

		$tmpBaseName = $tmpDirName . DIRECTORY_SEPARATOR . $this->tblname;
		//kludge para que el nombre de la tabla 
		//llegue al cliente en latin 1.
		// El nombre del archivo queda en UTF 8
		// y por lo tanto es descargable desde una página
		// que lo linkee y esté en UTF 8
		$this->tblname = utf8_decode($this->tblname);
		$output = shell_exec("PGCLIENTENCODING=WIN1252 pgsql2shp -f $tmpBaseName -h localhost -u ignuser $this->dbname $this->tblname");
		
		echo $output;	
		// Kludge para poder usar el nombre absoluto
		// del archivo en la llamada a zip usándolo en el mismo directorio
		// en donde se encuentra los archivos de la capa (prj, shp, dbf, etc)
		// Porque sino el comando zip le agrega directorios a la estructura del archivo zip
		touch($outputFile);
		
		$realpath = realpath($outputFile);
		
		unlink($outputFile);
		
		echo shell_exec("pushd . ; cd $tmpDirName; zip -m $realpath *; popd");
	
		rmdir($tmpDirName);

	}

	function tieneElAtributo( $nombreDeAtributo ) 
	{
		$q = "SELECT *  from $this->tblname LIMIT 1";

		$res = $this->pdo->query($q, PDO::FETCH_ASSOC);
		$r = $res->fetch();

		if ( isset( $r[$nombreDeAtributo] ) ) {
			return true;
		}
		return false;
	}

}

?>
