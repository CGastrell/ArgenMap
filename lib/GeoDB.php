<?php
require_once("GeoDiccionarioDeTablas.php");
require_once("GeoDomainResolver.php");
require_once("geodb-config.php");
class GeoDB
{

	const DEFAULT_LIMIT = 50;

	private $dbname;

	private $layers = array();
	public $diccionarioDeTablas;

	private $pdo = null;
	private $pdoUsername = $configuracion['dbUser'];// asi era antes del config'ignuser';
	private $pdoPassword = $configuracion['dbPass'];// 'pipa';
	private $pdoHost = $configuracion['dbHost'];//'localhost';

	function __construct($dbname)
	{	
		$this->dbname = $dbname;	
		$this->pdo = new PDO("pgsql:host=$this->pdoHost;dbname=$this->dbname", $this->pdoUsername, $this->pdoPassword);
		$this->diccionarioDeTablas = new GeoDiccionarioDeTablas();
		$this->getTablas();
	}

	function getTablas()
	{
		if ( ! count($this->layers)  ) {

			foreach($this->getNombresDeTablas() as $layerName ) {
				$this->layers[$layerName] = $this->getTablaInstance($layerName);
			}
		}
		return $this->layers;
	}

	function getTabla($layerName)
	{
		if ( array_key_exists($layerName, $this->layers ) ) {
			return $this->layers[$layerName];

		}
		return false;
	}

	function getTablaInstance($layerName)
	{
		if ( array_key_exists($layerName, $this->layers ) ) {
			return $this->layers[$layerName];

		}
		return new GeoTabla($this->dbname, $layerName, $this->pdo);
	}

	function getCantObjetos($geoTabla=false, $region=false, $operador=false)
	{

		if ( $geoTabla ) {
			return $this->getTabla($geoTabla)->getCantObjetos($region, $operador);

		}
		$c = array();

		foreach($this->getTablas() as $geoTabla ) {
			$c[$geoTabla->name()] = $geoTabla->getCantObjetos($region, $operador);
		}
		return $c;
	}

	function getObjetos($geoTabla=false, $region=false, $operador=false, $offset=0, $limit = self::DEFAULT_LIMIT)
	{

		if ( $geoTabla ) {
			return $this->getTabla($geoTabla)->getObjetos($region, $operador, $offset, $limit);

		}
		$c = array();

		foreach($this->getTablas() as $geoTabla ) {
			$c[$geoTabla->name()] = $geoTabla->getObjetos($region, $operador, $offset, $limit);
		}
		return $c;
	}

	function getNombresDeProvincias()
	{
		print_r($this->getTabla('provincias')->getObjetos());
	}

	function getAreaDeProvincia( $nombreProvincia )
	{

	}

	function dumpTablasAsZipFiles($outputDir)
	{
		if (! is_dir ($outputDir) ) {
			mkdir($outputDir);
		}
		foreach($this->getTablas() as $tabla) {
			echo "dumping $tabla->tblname\n"; 
			$outputFileName = $outputDir . DIRECTORY_SEPARATOR . $tabla->tblname;
			$tabla->dumpAsZipFile($outputFileName);
		}
	}

	function getNombresDeTablas()
	{
		$allTabla = $this->pdo->query('SELECT f_table_name from geometry_columns', PDO::FETCH_ASSOC); 
		$names = array()	;
		foreach($allTabla->fetchAll() as $e) { 
			$names[] = $e['f_table_name']; 
		}
		return $names;
	} 

	static function resolverDominio( $key ) 
	{
		return GeoDomainResolver::resolver( $key );
	}
}


?>


