jQuery(document).ready(function($) {
	$('.edd_active_campaign_refresh_lists').click(function(e) {
		e.preventDefault();
		var button = $( this ),
			// direction = button.data( 'action' ),
			data = {
				action: 'edd_activecampaign_refresh_lists',
				nonce: wp_create_nonce('edd_activecampaign_refresh_lists'),
			}
		button.toggleClass( 'button-disabled' );
		$.post( ajaxurl, data, function( response, status ) {
			button.toggleClass( 'button-disabled' );

		})
	});
});