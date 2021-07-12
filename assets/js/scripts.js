jQuery( document ).ready( function( $ ) {
	$( '.edd_activecampaign_refresh_lists' ).click( function( e ) {
		e.preventDefault();
		var button = $( this ),
		data = {
			action: 'edd_activecampaign_refresh_lists',
			nonce: button.data( 'nonce' ),
			format: button.data( 'format' ),
		}
		button.toggleClass( 'button-disabled' );
		$.post( ajaxurl, data, function( response, status ) {
			button.toggleClass( 'button-disabled' );
			if( 'success' === status ) {
				let lists = response.data;
				var lists_array = Object.values( lists );
				let text;
				let select_lists;
				if ( "checkbox" === data.format ){
					text = '';
					select_lists= document.getElementById( 'edd_activecampaign_checkbox_lists' );
					for (let i = 0; i < lists_array.length; i++) {
						text += '<input type="checkbox" name="_edd_activecampaign[]" value='+ i + '>' + lists_array[i] + '<br>';
					}
				} else if ( "dropdown" === data.format ) {
					text = ['<select>'];
					select_lists = document.getElementById('edd_settings[eddactivecampaign_list]');
					for (let i = 0; i < lists_array.length; i++) {
						text.push( '<option name="_edd_activecampaign[]" value='+ i + '>' + lists_array[i] + '</option>' );
					}
					text.push( '</select>' );
				}
				$( select_lists ).html( text );
			}
		})
	});
});