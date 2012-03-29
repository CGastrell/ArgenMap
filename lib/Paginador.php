<?

class Paginador
{
	static function render($cant, $offset, $limit)
	{
		
		$links = array();

		if ( ! ( $cant || $offset || $limit ) ) {
			return '';
		}

		$n_links = $cant / $limit;
		$paginaActual = self::paginaActual($cant, $offset, $limit);
		for($i=0; $i<$n_links; $i++) {
			$url = 
			$baseURL = $_SERVER['SCRIPT_URI'];

			$offset = $i*$limit;
			$_GET['offset'] = $offset;

			$baseURL .= "?". http_build_query($_GET);
			if ( $i != $paginaActual ) {
				$link = sprintf('<a href="%s">Pág %s</a>', $baseURL, $i+1);
			} else {
				$link = sprintf('Pág %s',  $i+1);
			}
			$links[] = sprintf('<span class="ideaPaginadorNumeros">%s</span>', $link  );
		}

		if ( count($links) > 5 ) {
		}

		$links = implode(' | ', $links);
		$s = sprintf('%s', $links);
		return $s;
	}

	static function paginaActual($cant, $offset, $limit)
	{
		return ($offset / $limit);	
	}
}

?>