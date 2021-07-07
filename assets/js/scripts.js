jQuery( document ).ready( function( $ ) {
	$( '.edd_activecampaign_refresh_lists' ).click( function( e ) {
		e.preventDefault();
		var button = $( this ),
		data = {
			action: 'edd_activecampaign_refresh_lists',
			nonce: button.data( 'nonce' ),
			format: button.data( 'format' ),
			args: button.data('args')
		}
		button.toggleClass( 'button-disabled' );
		$.post( ajaxurl, data, function( response, status ) {
			button.toggleClass( 'button-disabled' );
			if( 'success' === status ) {
				let lists = response.data;
				var lists_array = Object.values( lists );
				let text;
				if ( "checkbox" === data.format ){
					text = '';
					for (let i = 0; i < lists_array.length; i++) {
						text += '<input type="checkbox" name="_edd_activecampaign[]" value='+ i + '>' + lists_array[i] + '<br>';
					}
				} else if ( "dropdown" === data.format ) {
					text = ['<tr class="edd_activecampaign_lists">', '<th scope="row">', '<label for="edd_settings[eddactivecampaign_list]">Chose a list</label>', '</th>', '<td>', '<select id="edd_settings[eddactivecampaign_list]" name=edd_settings[eddactivecampaign_list]">'];
					for (let i = 0; i < lists_array.length; i++) {
						text.push( '<option name="_edd_activecampaign[]" value='+ i + '>' + lists_array[i] + '</option>' );
					}
					text.push('</select>');
					//add button (document.getElementById?)
					//add p text
					text = text.join('');
					console.log('THIS', text);
				}
				$( '.edd_activecampaign_lists' ).html( text );
			}
		})
	});
});