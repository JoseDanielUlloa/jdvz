<?php
/**
 * Readabler
 * Web accessibility for Your WordPress site.
 * Exclusively on https://1.envato.market/readabler
 *
 * @encoding        UTF-8
 * @version         1.3.0
 * @copyright       (C) 2018 - 2022 Merkulove ( https://merkulov.design/ ). All rights reserved.
 * @license         Envato License https://1.envato.market/KYbje
 * @contributors    Nemirovskiy Vitaliy (nemirovskiyvitaliy@gmail.com), Dmitry Merkulov (dmitry@merkulov.design)
 * @support         help@merkulov.design
 * @license         Envato License https://1.envato.market/KYbje
 **/

namespace Merkulove\Readabler;

use Merkulove\Readabler\Unity\Plugin;
use Merkulove\Readabler\Unity\Settings;
use Merkulove\Readabler\Unity\TabAssignments;

/** Exit if accessed directly. */
if ( ! defined( 'ABSPATH' ) ) {
	header( 'Status: 403 Forbidden' );
	header( 'HTTP/1.1 403 Forbidden' );
	exit;
}

/**
 * SINGLETON: Class adds admin styles.
 * @since 1.0.0
 **/
final class FrontScripts {

	/**
	 * The one true FrontScripts.
	 *
	 * @var FrontScripts
	 * @since 1.0.0
	 **/
	private static $instance;

	/**
	 * @var array
	 */
	private static $options;

	/**
	 * Sets up a new FrontScripts instance.
	 *
	 * @since 1.0.0
	 * @access public
	 **/
	private function __construct() {

		self::$options = Settings::get_instance()->options;

		/** Add plugin scripts. */
		if ( self::$options[ 'late_load' ] === 'on' ) {

			add_action( 'wp_footer', [ $this, 'enqueue_scripts' ] );

		} else {

			add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );

		}

	}

	/**
	 * Add plugin scripts.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 **/
	public function enqueue_scripts() {

		/** Checks if plugin should work on this page. */
		if ( ! TabAssignments::get_instance()->display() ) { return; }

		/** Shorthand for plugin settings. */
		$options = Settings::get_instance()->options;

		/**
		 * Micromodal.js is a lightweight, configurable and a11y-enabled modal library.
		 * @see https://micromodal.now.sh/
		 **/
		wp_enqueue_script( 'micromodal', Plugin::get_url() . 'js/micromodal' . Plugin::get_suffix() . '.js', [], Plugin::get_version(), true );

		/**
		 * A robust Javascript library for capturing keyboard input and key combinations entered.
		 * @see https://wangchujiang.com/hotkeys/
		 **/
		wp_enqueue_script( 'hotkeys', Plugin::get_url() . 'js/hotkeys' . Plugin::get_suffix() . '.js', [], Plugin::get_version(), true );

		/**
		 * The slick virtual keyboard for Javascript.
		 * @see https://github.com/hodgef/simple-keyboard
		 **/
		if (
			'on' === $options['virtual_keyboard'] ||
			'on' === $options['profile_blind_users']
		) {
			wp_enqueue_script( 'simple-keyboard', Plugin::get_url() . 'js/simple-keyboard' . Plugin::get_suffix() . '.js', [], Plugin::get_version(), true );
			wp_enqueue_script( 'simple-keyboard-layout', Plugin::get_url() . 'js/simple-keyboard-layouts/index'  . Plugin::get_suffix() . '.js', [], Plugin::get_version(), true );
		}

		/** Readabler logic. */
		wp_enqueue_script( 'mdp-readabler', Plugin::get_url() . 'js/readabler' . Plugin::get_suffix() . '.js', [], Plugin::get_version(), true );

		/** Pass plugin settings to frontend. */
		$js_object = [
			'ajaxurl'                       => admin_url( 'admin-ajax.php' ),
			'nonce'                         => wp_create_nonce( 'readabler' ),
			'pluginURL'                     => Plugin::get_url(),

			'onlineDictionary'              => 'on' === $options['online_dictionary'],
			'language'                      => $options['dictionary_language'],

			'profileEpilepsy'               => 'on' === $options['profile_epilepsy'],
			'profileVisuallyImpaired'       => 'on' === $options['profile_visually_impaired'],
			'profileCognitiveDisability'    => 'on' === $options['profile_cognitive_disability'],
			'profileAdhdFriendly'           => 'on' === $options['profile_adhd_friendly'],
			'profileBlindUsers'             => 'on' === $options['profile_blind_users'],

			'contentScaling'                => 'on' === $options['content_scaling'],
			'readableFont'                  => 'on' === $options['readable_font'],
			'dyslexiaFont'                  => 'on' === $options['dyslexia_font'],
			'highlightTitles'               => 'on' === $options['highlight_titles'],
			'highlightLinks'                => 'on' === $options['highlight_links'],
			'textMagnifier'                 => 'on' === $options['text_magnifier'],
			'fontSizing'                    => 'on' === $options['font_sizing'],
			'lineHeight'                    => 'on' === $options['line_height'],
			'letterSpacing'                 => 'on' === $options['letter_spacing'],
			'alignCenter'                   => 'on' === $options['align_center'],
			'alignLeft'                     => 'on' === $options['align_left'],
			'alignRight'                    => 'on' === $options['align_right'],

			'darkContrast'                  => 'on' === $options['dark_contrast'],
			'lightContrast'                 => 'on' === $options['light_contrast'],
			'monochrome'                    => 'on' === $options['monochrome'],
			'highSaturation'                => 'on' === $options['high_saturation'],
			'highContrast'                  => 'on' === $options['high_contrast'],
			'lowSaturation'                 => 'on' === $options['low_saturation'],
			'textColors'                    => 'on' === $options['text_colors'],
			'titleColors'                   => 'on' === $options['title_colors'],
			'backgroundColors'              => 'on' === $options['background_colors'],

			'muteSounds'                    => 'on' === $options['mute_sounds'],
			'hideImages'                    => 'on' === $options['hide_images'],
			'virtualKeyboard'               => 'on' === $options['virtual_keyboard'],
			'readingGuide'                  => 'on' === $options['reading_guide'],
			'usefulLinks'                   => 'on' === $options['useful_links'],
			'stopAnimations'                => 'on' === $options['stop_animations'],
			'readingMask'                   => 'on' === $options['reading_mask'],
			'highlightHover'                => 'on' === $options['highlight_hover'],
			'highlightFocus'                => 'on' === $options['highlight_focus'],
			'bigBlackCursor'                => 'on' === $options['big_black_cursor'],
			'bigWhiteCursor'                => 'on' === $options['big_white_cursor'],
			'textToSpeech'                  => 'on' === $options['text_to_speech'],
			'keyboardNavigation'            => 'on' === $options['keyboard_navigation'],

			'showOpenButton'                => 'on' === $options['show_open_button'],
			'buttonPosition'                => $options['button_position'],
			'buttonCaption'                 => $options['button_caption'],
			'buttonIcon'                    => $options['button_icon'],
			'buttonIconPosition'            => $options['button_icon_position'],
			'buttonSize'                    => $options['button_size'],

			'buttonMargin'                  => $options['button_margin'],
			'buttonPadding'                 => $options['button_padding'],
			'buttonBorderRadius'            => $options['button_border_radius'],
			'buttonColor'                   => $options['button_color'],
			'buttonColorHover'              => $options['button_color_hover'],
			'buttonBgcolor'                 => $options['button_bgcolor'],
			'buttonBgcolorHover'            => $options['button_bgcolor_hover'],

			'buttonEntranceTimeout'         => $options['button_entrance_timeout'],
			'buttonEntranceAnimation'       => $options['button_entrance_animation'],
			'buttonHoverAnimation'          => $options['button_hover_animation'],
			'popupOverlayColor'             => $options['popup_overlay_color'],
			'popupBackgroundColor'          => $options['popup_background_color'],
			'popupKeyColor'                 => $options['popup_key_color'],
			'popupBorderRadius'             => $options['popup_border_radius'],
			'popupAnimation'                => $options['popup_animation'],
			'popupScroll'                   => 'on' === $options['popup_scroll'],
			'closeAnywhere'                 => 'on' === $options['popup_close_anywhere'],
			'popupDraggable'                => 'on' === $options['popup_draggable'],

			'hotKeyOpenInterface'           => $options['hot_key_open_interface'],

			# Translations
			'LEARN_MORE_IN_WIKIPEDIA'       => esc_html__( 'Learn more in Wikipedia', 'readabler' ),
			'DEFAULT'                       => esc_html__( 'Default', 'readabler' ),
			'HOME'                          => esc_html__( 'Home', 'readabler' ),
			'HIDE_ACCESSIBILITY_INTERFACE'  => esc_html__( 'Hide Accessibility Interface? 

Please note: If you choose to hide the accessibility interface, you won\'t be able to see it anymore, unless you clear clear cookies for this site. Are you sure that you wish to hide the interface?', 'readabler' ),
		];

		/** Highlight Titles. */
		if (
			'on' === $options['highlight_titles'] ||
			'on' === $options['profile_cognitive_disability']
		) {
			$js_object['highlightTitlesStyle']  = $options['highlight_titles_style'];
			$js_object['highlightTitlesColor']  = $options['highlight_titles_color'];
			$js_object['highlightTitlesWidth']  = $options['highlight_titles_width'];
			$js_object['highlightTitlesOffset'] = $options['highlight_titles_offset'];
		}

		/** Highlight Links. */
		if (
			'on' === $options['highlight_links'] ||
			'on' === $options['profile_cognitive_disability']
		) {
			$js_object['highlightLinksStyle']   = $options['highlight_links_style'];
			$js_object['highlightLinksColor']   = $options['highlight_links_color'];
			$js_object['highlightLinksWidth']   = $options['highlight_links_width'];
			$js_object['highlightLinksOffset']  = $options['highlight_links_offset'];
		}

		/** Text Magnifier. */
		if ( 'on' === $options['text_magnifier'] ) {
			$js_object['textMagnifierBgColor']  = $options['text_magnifier_bg_color'];
			$js_object['textMagnifierColor']    = $options['text_magnifier_color'];
			$js_object['textMagnifierFontSize'] = $options['text_magnifier_font_size'];
		}

		/** Reading Guide. */
		if ( 'on' === $options['reading_guide'] ) {
			$js_object['readingGuideWidth']             = $options['reading_guide_width'];
			$js_object['readingGuideHeight']            = $options['reading_guide_height'];
			$js_object['readingGuideBackgroundColor']   = $options['reading_guide_background_color'];
			$js_object['readingGuideBorderColor']       = $options['reading_guide_border_color'];
			$js_object['readingGuideBorderWidth']       = $options['reading_guide_border_width'];
			$js_object['readingGuideBorderRadius']      = $options['reading_guide_border_radius'];
			$js_object['readingGuideArrow']      = $options['reading_guide_arrow'];
		}

		/** Reading Mask. */
		if (
			'on' === $options['reading_mask'] ||
			'on' === $options['profile_adhd_friendly']
		) {
			$js_object['readingMaskHeight'] = $options['reading_mask_height'];
			$js_object['readingMaskColor'] = $options['reading_mask_color'];
		}

		/** Highlight Hover. */
		if ( 'on' === $options['highlight_hover'] ) {
			$js_object['highlightHoverStyle'] = $options['highlight_hover_style'];
			$js_object['highlightHoverColor'] = $options['highlight_hover_color'];
			$js_object['highlightHoverWidth'] = $options['highlight_hover_width'];
			$js_object['highlightHoverOffset'] = $options['highlight_hover_offset'];
		}

		/** Highlight Focus. */
		if ( 'on' === $options['highlight_focus'] ) {
			$js_object['highlightFocusStyle'] = $options['highlight_focus_style'];
			$js_object['highlightFocusColor'] = $options['highlight_focus_color'];
			$js_object['highlightFocusWidth'] = $options['highlight_focus_width'];
			$js_object['highlightFocusOffset'] = $options['highlight_focus_offset'];
		}

		/** Used for keyboard navigation. */
		if (
			'on' === $options['keyboard_navigation'] ||
			'on' === $options['profile_blind_users']
		) {
			$js_object['highlightFocusColor'] = $options['highlight_focus_color'];
		}


		/** Virtual Keyboard. */
		if (
			'on' === $options['virtual_keyboard'] ||
			'on' === $options['profile_blind_users']
		) {
			$js_object['virtualKeyboardLayout'] = $options['virtual_keyboard_layout'];
		}

		/** Text To Speech. */
		if (
			'on' === $options['text_to_speech'] ||
			'on' === $options['profile_blind_users']
		) {
			/** No api key -> no button. */
			if ( ! empty( $options[ 'api_key' ] ) )
			{
				if ( strlen( $options[ 'api_key' ] ) > 100 )
				{
					$js_object[ 'textToSpeechAjaxUrl' ] = admin_url( 'admin-ajax.php' );
					$js_object[ 'textToSpeechNonce' ]   = wp_create_nonce( 'readabler-nonce' );
				}
			}

		}

		/** Keyboard Navigation. */
		if (
			'on' === $options['keyboard_navigation'] ||
			'on' === $options['profile_blind_users']
		) {
			$js_object['hotKeyMenu']     = $options['hot_key_menu'];
			$js_object['hotKeyHeadings'] = $options['hot_key_headings'];
			$js_object['hotKeyForms']    = $options['hot_key_forms'];
			$js_object['hotKeyButtons']  = $options['hot_key_buttons'];
			$js_object['hotKeyGraphics'] = $options['hot_key_graphics'];
		}

		wp_localize_script( 'mdp-readabler', 'mdpReadablerOptions', $js_object );

	}

	/**
	 * Main FrontScripts Instance.
	 *
	 * Insures that only one instance of FrontScripts exists in memory at any one time.
	 *
	 * @static
	 * @return FrontScripts
	 * @since 1.0.0
	 **/
	public static function get_instance() {

		if ( ! isset( self::$instance ) && ! ( self::$instance instanceof self ) ) {

			self::$instance = new self;

		}

		return self::$instance;

	}

} // End Class FrontScripts.


