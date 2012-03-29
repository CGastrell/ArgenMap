<?php

class GeoDiccionarioDeTablas
{
	private $d = array();

	function __construct()
	{
		$this->d['acc_terreno'] = 'Accidentes del Terreno (líneas) ';
		$this->d['acc_terreno_pol'] = 'Accidentes del Terreno (polígonos)';
		$this->d['actividades_agropecuarias'] = 'Actividades Agropecuarias';
		$this->d['actividades_economicas'] = 'Actividades Económicas';
		$this->d['area_de_energia_ene'] = '';
		$this->d['area_de_salud_ips'] = '';
		$this->d['area_militar_ips'] = '';
		$this->d['area_pública_ips'] = '';
		$this->d['areas_actividades_agropecuarias'] = '';
		$this->d['areas_actividades_economicas'] = '';
		$this->d['areas_de_educacion'] = '';
		$this->d['areas_deportivas_y_esparcimiento'] = '';
		$this->d['area_seguridad_ips'] = '';
		$this->d['areas_religiosas'] = '';
		$this->d['areas_reservorio_agua'] = '';
		$this->d['banco_de_arena'] = '';
		$this->d['caida_de_agua'] = '';
		$this->d['calle'] = '';
		$this->d['complejo_de_energia_ene'] = 'Complejos de Energía';
		$this->d['curso_de_agua_hid'] = 'Cursos de Agua';
		$this->d['curvas_de_nivel'] = 'Curvas de Nivel';
		$this->d['edif_construcciones_turisticas'] = 'Edificios de Construcciones Turísticas';
		$this->d['edif_depor_y_esparcimiento'] = 'Edificios Deportivos y de Esparcimiento';
		$this->d['edif_educacion'] = 'Edificios de Educación';
		$this->d['edificio_de_salud_ips'] = 'Edificios de Salud';
		$this->d['edificio_de_seguridad_ips'] = 'Edificios de Seguridad';
		$this->d['edificio_publico_ips'] = 'Edificios Públicos';
		$this->d['edificios_ferroviarios'] = 'Edificios Ferroviarios';
		$this->d['edif_religiosos'] = 'Edificios Religiosos';
		$this->d['ejido'] = 'Ejidos';
		$this->d['espejos_de_agua_hid'] = 'Espejos de Agua';
		$this->d['estructura_de_transporte_poligono'] = '';
		$this->d['estructura_de_transporte_puntos'] = '';
		$this->d['estructuras_portuarias'] = 'Estructuras Portuarias';
		$this->d['estructuras_portuarias_linea'] = '';
		$this->d['estructuras_portuarias_poligono'] = '';
		$this->d['estructuras_reservorio_de_agua'] = '';
		$this->d['fuente_de_agua_hid'] = '';
		$this->d['hoja100k'] = 'Cartas IGN a escala 1:100.000';
		$this->d['hojas250k'] = 'Cartas IGN a escala 1:250.000';
		$this->d['hojas25k'] = 'Cartas IGN a escala 1:25.000';
		$this->d['hojas500k'] = 'Cartas IGN a escala 1:500.000';
		$this->d['hojas50k'] = 'Cartas IGN a escala 1:50.000';
		$this->d['infraest_aeroportuaria_linea'] = 'Infraestructura Aeroportuaria (Líneas)';
		$this->d['infraest_aeroportuaria_poly'] = 'Infraestructura Aeroportuaria (Polígono)';
		$this->d['infraest_aeroportuaria_punto'] = 'Infraestructura Aeroportuaria (Puntos)';
		$this->d['infraestructura_ferroviaria'] = '';
		$this->d['infraestuctura_hidro'] = 'Infraestructura Hidrográfica';
		$this->d['isla_hid'] = 'Islas';
		$this->d['limite_de_parcela_rural'] = '';
		$this->d['limite_político_administrativo_lim'] = 'Límites Político Administrativos';
		$this->d['líneas_de_conduccion_ene'] = 'Líneas de Conducción';
		$this->d['lineas_de_transmision_com'] = '';
		$this->d['localidad'] = 'Localidades';
		$this->d['marcas_y_señales'] = 'Marcas y Señales';
		$this->d['municipio_departamento_comunas_lim'] = '';
		$this->d['muro_embalse'] = 'Muros de Embalse';
		$this->d['nodo_red_ferroviaria'] = '';
		$this->d['nodo_red_vial'] = '';
		$this->d['nodos_red_hid'] = '';
		$this->d['obra_portuaria_hid'] = 'Obras Portuarias';
		$this->d['obras_de_comunicacion_com'] = 'Obras de Comunicación';
		$this->d['otras_edificaciones'] = 'Otras Edificaciones';
		$this->d['pais_lim'] = 'Límite de País';
		$this->d['provincias'] = 'Límite de Provincias';
		$this->d['puente_red_vial_linea'] = 'Puentes de la Red Vial (líneas)';
		$this->d['puente_red_vial_punto'] = 'Puentes de la Red Vial (puntos)';
		$this->d['puntos_de_alturas_topograficas'] = 'Puntos de Alturas Topográficas';
		$this->d['puntos_del_terreno'] = 'Puntos del Terreno';
		$this->d['rapido_hid'] = '';
		$this->d['red_ferroviaria'] = 'Red Ferroviaria';
		$this->d['red_vial'] = 'Red Vial';
		$this->d['rg'] = '';
		$this->d['rr'] = '';
		$this->d['salvado_de_obstaculo'] = 'Salvados de Obstáculos';
		$this->d['señalizaciones'] = 'Señalizaciones';
		$this->d['sue_congelado'] = 'Suelos Congelados';
		$this->d['sue_consolidado'] = 'Suelos Consolidados';
		$this->d['sue_costero'] = 'Suelos Costeros';
		$this->d['sue_hidromorfologico'] = 'Suelos Hidromorfológicos';
		$this->d['sue_no_consolidado'] = 'Suelos No Consolidados';
		$this->d['unidades_conservacion_lim'] = '';
		$this->d['veg_arborea'] = 'Vegetación Arbórea';
		$this->d['veg_arbustiva'] = 'Vegetación Arbustiva';
		$this->d['veg_culltivos'] = 'Vegetación de Cultivos';
		$this->d['veg_herbacea'] = '';
		$this->d['veg_hidrofila'] = 'Vegetación Hidrófila';
		$this->d['veg_suelo_desnudo'] = 'Vegetación Suelo Desnudo';
		$this->d['vias_secundarias'] = 'Vías Secundarias';
	}

	function nombreReal( $nombreDeTabla )
	{
		if (isset( $this->d[$nombreDeTabla] ) && $this->d[$nombreDeTabla] ) {
			return $this->d[$nombreDeTabla];
		}
		return $nombreDeTabla;
	}
}

?>