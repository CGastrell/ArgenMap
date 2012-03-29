<?

class Argentina {
	const DEFAULT_LIMIT = 50;

	private $dbname;


	private $gdb = null;


	function __construct($gdb)
	{	
		if ($gdb ) {
			$this->gdb = $gdb;
		}
	}

	function nombresDeProvincias()
	{
		$res = $this->gdb->getTabla('provincias')->valoresUnicosDeAtributo('NP');

		$nombres = $res->fetchAll( PDO::FETCH_COLUMN, 0 );
		sort( $nombres);
		return $nombres;
	}

	function nombreDeProvinciaValido( $nombre )
	{
		if ( in_array($nombre, $this->nombresDeProvincias() ) ) {
			return true;
		}

		return false;
	}

	function getAreasDeProvincia($nombreDeProvincia)
	{

	}
}

?>