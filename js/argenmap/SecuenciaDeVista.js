goog.provide('argenmap.SecuenciaDeVista');

goog.require('goog.asserts');
goog.require('goog.Timer' );
goog.require('argenmap.LatLng');
goog.require('argenmap.Vista');
goog.require('argenmap.Mapa');

/**
 * @class Representa una serie de vistas para poder reproducirlas
 * como si fuera una presentación
 */
argenmap.SecuenciaDeVista = function()
{
	/**
	 * Las vistas a reproducir
	 * @private
	 * @type {array} 
	 */
	this.vistas_ = [];
	/**
	 * La posición actual del cursor de reproducción
	 * @private
	 * @type {Integer}
	 */
	this.cursor_ = 0;
	/**
	 * El mapa sobre el cual reproducir la vista
	 * @private
	 * type {argenmap.Mapa}
	 */
	this.mapa_ = null;
	/**
	 * El objeto timer para la reproducción
	 * @private
	 * @type {goog.Timer}
	 */
	this.timer_ = null;
	/**
	 * El timeOut por default
	 * @private
	 * @type {Integer}
	 */
	this.timeOut_ = 5000;
};

/**
 * Genera una secuencia de vistas a partir de una array de argenmap.LatLng.
 * @param {array} latlngs la array de argenmap.LatLng q se desean ver como secuencia.
 */
argenmap.SecuenciaDeVista.prototype.desdeLatLngArray = function( latlngs )
{
	goog.asserts.assertArray( latlngs);

	for (var i=0; i< latlngs.length; i++ ) {
		goog.asserts.assertInstanceof( latlngs[i], argenmap.LatLng );
			var v = new argenmap.Vista({centro_: latlngs[i]	});
			this.vistas_.push( v );
	}
};

/**
 * Conecta esta secuencia a un mapa para poder reproducir las vistas.
 * @private
 * @param {argenmap.Mapa} mapa el mapa al cual conectar la secuencia de vistas.
 */
argenmap.SecuenciaDeVista.prototype.conectarAMapa_ = function( mapa )
{
		goog.asserts.assertInstanceof( mapa, argenmap.Mapa );
		this.mapa_ = mapa;
	 
};

/**
 * Desconecta esta secuencia del mapa actualmente conectado
 * @private
 */
argenmap.SecuenciaDeVista.prototype.desconectarDeMapa_ = function()
{
		goog.asserts.assertInstanceof( this.mapa_, argenmap.Mapa );
		this.mapa_ = null;
	 
};

/**
 * Comienza la reproducción de la secuencia.
 * @param [argenmap.Mapa] mapa, el mapa sobre el cual reproducir la secuencia.
 * @param [integer] retraso el retraso entre vista y vista, en milisegundos.
 */
argenmap.SecuenciaDeVista.prototype.reproducir = function( mapa, retraso )
{

	if (goog.isDef ( mapa ) ) {
		goog.asserts.assertInstanceof( mapa, argenmap.Mapa );
		this.conectarAMapa_( mapa );
	}

	goog.asserts.assertInstanceof ( this.mapa_, argenmap.Mapa, 'Esta vista no está asociada a ningún mapa');

	if (goog.isDef (retraso ) ) {
		goog.asserts.assertNumber( retraso );
		this.timeOut_ = retraso;
	}

	this.mostrarActual();

	if ( !this.timer ) {
		this.timer_ = new goog.Timer( this.timeOut_ );
	}
	
	this.timer_.start();
	
	goog.events.listen(this.timer_, goog.Timer.TICK, goog.bind(this.siguiente, this) );
};




/**
 * Detiene la reproducción de las vistas y desconecta la vista del mapa.
 * Setea el cursor a cero.
 */
argenmap.SecuenciaDeVista.prototype.detener = function(  )
{
	if ( this.timer_ ) {
		this.timer_.stop();
	}

	this.cursor_ = 0;
	this.desconectarDeMapa_();
};


/**
 * Detiene la reproducción de las vistas sin setear el cursor a cero.
 */
argenmap.SecuenciaDeVista.prototype.pausar = function(  )
{
	if ( this.timer_ ) {
		this.timer_.stop();
	}

};

/**
 * reproduce la siguiente vista en la lista de vistas
 */
argenmap.SecuenciaDeVista.prototype.siguiente = function(  )
{
	this.cursor_ = ++this.cursor_ % this.vistas_.length;
	this.mostrarActual();
};

/**
 * Muestra la vista correspondiente al cursor actual
 */
argenmap.SecuenciaDeVista.prototype.mostrarActual = function(  )
{
	/**
	 * Este chequeo es por si queda un timer colgado después de que se llama
	 * a detener.
	 */
	if (this.mapa_ instanceof argenmap.Mapa) {
		this.mapa_.centro ( this.vistas_[ this.cursor_].centro() ); 
	}

};