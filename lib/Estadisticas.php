<?php
	
class Estadisticas {
	public $tables = array();
	public $geodb = false;

	function __construct()
	{
		$this->geodb = new GeoDB('ignimportfromgeodb');
		$this->tables = $this->geodb->getTablas();
	}

	function cantObjetosPorOperador($operadores, $table=false, $region=false, $ommitZeros=false)
	{
		if ($table ) {
			return $this->geodb->getTabla($table)->getObjectCountByOperador($operadores, $region);
		}

		foreach($this->tables as $table ) {
			$c = $table->getObjectCountByOperador($operadores, $region);
			if ($ommitZeros && 0 == $c ) {
				continue;
			}
			$f = new Fila(array($table->name(), $c  ));
			echo $f->render();
			
		}
	}

	function cantObjetosEnMalvinasPorOperador($operadores, $table, $ommitZeros=false)
	{
		$region = 'POLYGON((-62.764625 -49.74425, -56.670875 -49.74425, -56.670875 -53.90425, -62.764625 -53.90425, -62.764625 -49.74425 ))';
		return $this->cantObjetosPorOperador($operadores, $table, $region, $ommitZeros);

	}

	function cantObjetos($table=false, $region=false, $ommitZeros=false)
	{

		if ( $table ) {
			return $this->geodb->getTabla($table)->getCantObjetos($region);

		}
		$c = array();

		foreach($this->tables as $table ) {

			$count = $table->getCantObjetos($region);
			if ($ommitZeros && (0 == $count) ) {
				continue;
			}
			$c[$table->name()]['cant'] = $c;
		}
		return $c;
	}

	function cantObjetosEnMalvinas($table=false, $ommitZeros=false)
	{
		$region = 'POLYGON((-62.764625 -49.74425, -56.670875 -49.74425, -56.670875 -53.90425, -62.764625 -53.90425, -62.764625 -49.74425 ))';
		return $this->cantObjetos($table, $region, $ommitZeros);
	}

	function nombresDeCapas()
	{
		return $this->geodb->getTablaNames();
	}
}

class EstadisticasUI extends Estadisticas {

}

?>