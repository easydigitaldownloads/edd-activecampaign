jQuery( document ).ready( function( $ ) {
	$( '.edd_activecampaign_refresh_lists' ).click( function( e ) {
		e.preventDefault();
		var button = $( this ),
		data = {
			action: 'edd_activecampaign_refresh_lists',
			nonce: button.data( 'nonce' )
		}
		button.toggleClass( 'button-disabled' );
		$.post( ajaxurl, data, function( response, status ) {
			button.toggleClass( 'button-disabled' );
			let lists = response.data;
			var lists_array = Object.values(lists);
			let text = []
			for ( let i = 0; i < lists_array.length; i++ ) {
				text.push('<input type="checkbox">' + lists_array[i]);
			}
			$('.edd_activecampaign_lists').html(text);
		})
	});
});