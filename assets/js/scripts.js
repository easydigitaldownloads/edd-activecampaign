jQuery(document).ready(function($) {
	$('.edd_activecampaign_refresh_lists').click(function(e) {
		e.preventDefault();
		var button = $( this ),
		data = {
			action: 'edd_activecampaign_refresh_lists',
		}
		button.data( 'nonce' );
		button.toggleClass( 'button-disabled' );
		$.post( ajaxurl, data, function( response, status ) {
			button.toggleClass( 'button-disabled' );
		})
	});
});