<?php
/*
Plugin Name: Easy Digital Downloads - ActiveCampaign
Plugin URL: http://easydigitaldownloads.com/extension/activecampaign
Description: Include a ActiveCampaign signup option with your Easy Digital Downloads checkout
Version: 1.0
Author: Lorenzo Orlando Caum, Enzo12 LLC
Author URI: http://enzo12.com
Contributors: lorenzocaum
*/

// adds the settings to the Misc section
function eddactivecampaign_add_settings($settings) {
  
  $eddactivecampaign_settings = array(
		array(
			'id' => 'eddactivecampaign_settings',
			'name' => '<strong>' . __('ActiveCampaign Settings', 'eddactivecampaign') . '</strong>',
			'desc' => __('Configure ActiveCampaign Integration Settings', 'eddactivecampaign'),
			'type' => 'header'
		),
        array(
			'id' => 'eddactivecampaign_apiurl',
			'name' => __('API URL', 'eddactivecampaign'),
			'desc' => __('Enter your ActiveCampaign API URL. It is located in the Settings --> API area of your ActiveCampaign account.', 'eddactivecampaign'),
			'type' => 'text',
			'size' => 'regular'
		),
        array(
			'id' => 'eddactivecampaign_api',
			'name' => __('API Key', 'eddactivecampaign'),
			'desc' => __('Enter your ActiveCampaign API Key. It is located in the Settings --> API area of your ActiveCampaign account.', 'eddactivecampaign'),
			'type' => 'text',
			'size' => 'regular'
		),
		array(
			'id' => 'eddactivecampaign_list',
			'name' => __('List ID', 'eddactivecampaign'),
			'desc' => __('Enter your List ID. It will be in the form of a number.', 'eddactivecampaign'),
			'type' => 'text',
			'size' => 'regular'
		),
		array(
			'id' => 'eddactivecampaign_label',
			'name' => __('Checkout Label', 'eddactivecampaign'),
			'desc' => __('This is the text shown next to the signup option', 'eddactivecampaign'),
			'type' => 'text',
			'size' => 'regular'
		)
	);
	
	return array_merge($settings, $eddactivecampaign_settings);
}
add_filter('edd_settings_misc', 'eddactivecampaign_add_settings');

// adds an email to the activecampaign subscription list
function eddactivecampaign_subscribe_email($email, $first_name = '', $last_name = '' ) {
	global $edd_options;
	
	if( isset( $edd_options['eddactivecampaign_api'] ) && strlen( trim( $edd_options['eddactivecampaign_api'] ) ) > 0 ) {

		if( ! isset( $edd_options['eddactivecampaign_list'] ) || strlen( trim( $edd_options['eddactivecampaign_list'] ) ) <= 0 )
			return false;
        
        require_once('inc/includes/ActiveCampaign.class.php');
        
        $ac = new ActiveCampaign($edd_options['eddactivecampaign_apiurl'], $edd_options['eddactivecampaign_api']);
        
		$subscriber = array(
                            "email" => "$email",
                            "first_name" => "$first_name",
                            "last_name" => "$last_name",
                            "p[{$list_id}]" => $edd_options['eddactivecampaign_list'],
                            "status[{$list_id}]" => 1,
                            );
        
		$subscriber_add = $ac->api("subscriber/add", $subscriber);
        
	}

	return false;
}

// displays the activecampaign checkbox
function eddactivecampaign_activecampaign_fields() {
	global $edd_options;
	ob_start(); 
		if( isset( $edd_options['eddactivecampaign_api'] ) && strlen( trim( $edd_options['eddactivecampaign_api'] ) ) > 0 ) { ?>
		<p>
			<input name="eddactivecampaign_activecampaign_signup" id="eddactivecampaign_activecampaign_signup" type="checkbox" checked="checked"/>
			<label for="eddactivecampaign_activecampaign_signup"><?php echo isset($edd_options['eddactivecampaign_label']) ? $edd_options['eddactivecampaign_label'] : __('Sign up for our mailing list', 'eddactivecampaign'); ?></label>
		</p>
		<?php
	}
	echo ob_get_clean();
}
add_action('edd_purchase_form_before_submit', 'eddactivecampaign_activecampaign_fields', 100);

// checks whether a user should be signed up for the activecampaign list
function eddactivecampaign_check_for_email_signup($posted, $user_info) {
	if($posted['eddactivecampaign_activecampaign_signup']) {

		$email = $user_info['email'];
		eddactivecampaign_subscribe_email($email, $user_info['first_name'], $user_info['last_name'] );
	}
}
add_action('edd_checkout_before_gateway', 'eddactivecampaign_check_for_email_signup', 10, 2);
