<?php

class GestorDeServiciosWMS
{
	static private $urls = array();


	static private $directorioBase = 'data/cacheDeURLWMS';
	static private $nombreArchivoCache = 'cache.xml';
	static private $parser_ = false;

	static function todasLasURL()
	{
	}

	static function parsearCache()
	{
		$cache = file_get_contents( self::pathArchivoCache() );
		self::$parser_ = simplexml_load_string($cache, "SimpleXMLElement");

	}

	static function pathArchivoCache( $url )
	{
		$basedir = 	dirname(__FILE__) . DIRECTORY_SEPARATOR . self::$directorioBase_;
		$filename = $basedir . DIRECTORY_SEPARATOR . self::$nombreArchivoCache;

		return $filename;
	}
}

?>r