jQuery( document ).ready( function( $ ) {
	$( '.edd_activecampaign_refresh_lists' ).click( function( e ) {
		e.preventDefault();
		var button = $( this ),
		data = {
			action: 'edd_activecampaign_refresh_lists',
			nonce: button.data( 'nonce' ),
			format: button.data( 'format' )
		}
		button.toggleClass( 'button-disabled' );
		$.post( ajaxurl, data, function( response, status ) {
			button.toggleClass( 'button-disabled' );
			if( 'success' === status ) {
				let lists = response.data;
				var lists_array = Object.values( lists );
				let text = []
				for ( let i = 0; i < lists_array.length; i++ ) {
					if ( "checkbox" === data.format) {
						text.push( '<input type="checkbox" name="_edd_activecampaign[]" value='+ i + '>' + lists_array[i] );
					} else if ( "dropdown" === data.format ) {
						// text.push( '<option name="_edd_activecampaign[]" value='+ i + '>' + lists_array[i] );
						console.log('dropdown');
					}
				}
				$( '.edd_activecampaign_lists' ).html( text );
			}
		})
	});
});