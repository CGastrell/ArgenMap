<?
class WMSCapabilitiesCache
{
	/*
	 * Tiempo de vida en el cache
	 */
	static private $ttl_ = 5;
	static private $directorioBase_ = 'data/cacheDeCapabilities';

	static function traerCapabilities($url)
	{
		$caps = self::buscarEnCache( $url );
		if ( ! $caps ) {
			$url = $url . '?service=wms&version=1.1.1&request=GetCapabilities';
			$caps = self::cachearCapabilities( $url );
		}

		return $caps;
	}

	static function buscarEnCache( $url )
	{
		$filename = self::pathArchivoCache( $url );
		if ( file_exists( $filename ) ) {
			$contents = file_get_contents( $filename );
			return $contents;
		}
		return false;
	}

	static function cachearCapabilities( $url )
	{
		$caps = '';
		$filename = self::pathArchivoCache( $url );
		$caps = file_get_contents( $url );
		file_put_contents($filename, $caps );

		return $caps;
	}

	static function pathArchivoCache( $url )
	{
		$basedir = 	dirname(__FILE__) . DIRECTORY_SEPARATOR . self::$directorioBase_;
		$filename = $basedir . DIRECTORY_SEPARATOR . md5( $url ) .'.xml';

		return $filename;
	}
}

?>