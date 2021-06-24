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
			// $('.edd_activecampaign_lists').text(lists_array);
			for ( let i = 0; i < lists_array.length; i++ ) {
				text.push('<p>lists_array[i]<p><br>')
			}
			console.log(text);
			$('.edd_activecampaign_lists').text(text);
		})
	});
});