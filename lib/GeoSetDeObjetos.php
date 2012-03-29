<?php
	
class GeoSetDeObjetos implements Iterator {
	
	private $position = 0;

	private $pdoResult = false;

	private $rows = array();

	function __construct( $pdoResult )
	{
		$this->position = 0;
		$this->pdoResult = $pdoResult;
		if ( $this->pdoResult->rowCount() ) {
			$this->rows = $this->pdoResult->fetchAll();
		}
		
	}

	function key()
	{
		return $this->position;
	}

	function valid()
	{
		return isset( $this->rows[$this->position] ) ;
	}

	function rewind()
	{
		$this->position = 0 ;
	}

	function next()
	{
		++$this->position;
	}

	function current()
	{
		$o = new GeoObjeto();
		$o->desdeArray ( $this->rows[$this->position] );

		return $o;
	}

	function cantidad()
	{
		return count($this->rows);
	}

}

?>