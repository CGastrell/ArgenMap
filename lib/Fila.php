
<?php

class Fila {

	var $celdas = array();

	function __construct($celdas)
	{
		$this->celdas = $celdas;	
	}
	function render()
	{
		$a = array();

		foreach($this->celdas as $c) {
			$a[] = sprintf("<td>%s</td>", $c);
		}
		$s = implode("\t", $a );
		echo "$s<br/>\n";
	}
}

?>