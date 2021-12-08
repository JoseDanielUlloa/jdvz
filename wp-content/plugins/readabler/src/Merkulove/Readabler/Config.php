<?php
/**
 * Readabler
 * Web accessibility for Your WordPress site.
 * Exclusively on https://1.envato.market/readabler
 *
 * @encoding        UTF-8
 * @version         1.2.10
 * @copyright       (C) 2018 - 2021 Merkulove ( https://merkulov.design/ ). All rights reserved.
 * @license         Envato License https://1.envato.market/KYbje
 * @contributors    Nemirovskiy Vitaliy (nemirovskiyvitaliy@gmail.com), Dmitry Merkulov (dmitry@merkulov.design)
 * @support         help@merkulov.design
 * @license         Envato License https://1.envato.market/KYbje
 **/

namespace Merkulove\Readabler;

use Merkulove\Readabler\Unity\Plugin;
use Merkulove\Readabler\Unity\Settings;
use Merkulove\Readabler\Unity\TabGeneral;

/** Exit if accessed directly. */
if ( ! defined( 'ABSPATH' ) ) {
	header( 'Status: 403 Forbidden' );
	header( 'HTTP/1.1 403 Forbidden' );
	exit;
}

/**
 * SINGLETON: Settings class used to modify default plugin settings.
 * @since 1.0.0
 **/
final class Config {

	/**
	 * The one true Settings.
	 *
     * @since 1.0.0
     * @access private
	 * @var Config
	 **/
	private static $instance;

    /**
     * Prepare plugin settings by modifying the default one.
     *
     * @since 1.0.0
     * @access public
     *
     * @return void
     **/
    public function prepare_settings() {

	    /** Reset API Key on fatal error. */
	    if ( isset( $_GET['reset-api-key'] ) && '1' === $_GET['reset-api-key'] ) {

		    $this->reset_api_key();

	    }

        /** Get default plugin settings. */
        $tabs = Plugin::get_tabs();

        /** Remove 'Delete plugin, settings and data' option from Uninstall tab. */
        unset( $tabs['uninstall']['fields']['delete_plugin']['options']['plugin+settings+data'] );

	    /** Set System Requirements. */
	    $tabs['status']['reports']['server']['allow_url_fopen'] = false;
	    $tabs['status']['reports']['server']['dom_installed'] = true;
	    $tabs['status']['reports']['server']['xml_installed'] = true;
	    $tabs['status']['reports']['server']['bcmath_installed'] = true;
	    $tabs['status']['reports']['server']['mbstring_installed'] = true;
	    $tabs['status']['reports']['server']['server_time'] = true;

	    /** Create General tab. */
	    $tabs = $this->create_tab_general( $tabs );

	    /** Create Open Button tab. */
	    $tabs = $this->create_tab_open_button( $tabs );
	    $tabs = $this->refresh_settings( $tabs );
	    $tabs = $this->create_tab_open_button( $tabs );

	    /** Create Modal Popup tab. */
	    $tabs = $this->create_tab_modal_popup( $tabs );
	    $tabs = $this->refresh_settings( $tabs );
	    $tabs = $this->create_tab_modal_popup( $tabs );

	    /** Create Design tab. */
	    $tabs = $this->create_tab_design( $tabs );
	    $tabs = $this->refresh_settings( $tabs );
	    $tabs = $this->create_tab_design( $tabs );

	    /** Create Accessibility Statement tab. */
	    $tabs = $this->create_tab_accessibility_statement( $tabs );

	    /** Create Hot Keys tab. */
	    $tabs = $this->create_tab_hot_keys( $tabs );

	    /** Create Text to Speech tab. */
	    if ( Settings::get_instance()->options[ 'text_to_speech' ] === 'on' ) {

		    $tabs = $this->create_tab_text_to_speech( $tabs );
		    $tabs = $this->refresh_settings( $tabs );
		    $tabs = $this->create_tab_text_to_speech( $tabs );

	    }

        /** Set updated tabs. */
        Plugin::set_tabs( $tabs );

        /** Refresh settings. */
        Settings::get_instance()->get_options();

    }

	private function refresh_settings( $tabs ) {

		/** Set updated tabs. */
		Plugin::set_tabs( $tabs );

		/** Refresh settings. */
		Settings::get_instance()->get_options();

		/** Get default plugin settings. */
		return Plugin::get_tabs();

	}

	/**
	 * Create Design tab.
	 *
	 * @param array $tabs - List of tabs with all settings and fields.
	 *
	 * @since  1.0.0
	 * @access public
	 *
	 * @return array - List of tabs with all settings and fields.
	 **/
	private function create_tab_design( $tabs ) {

		/** Short hand access to plugin settings. */
	    $options = Settings::get_instance()->options;

		/** Add Design tab after General. */
		$offset = 3; // Position for new tab.
		$tabs = array_slice( $tabs, 0, $offset, true ) +
		        ['design' => [
			        'enabled'       => true,
			        'class'         => TabGeneral::class,
			        'label'         => esc_html__( 'Design', 'readabler' ),
			        'title'         => esc_html__( 'Design Settings', 'readabler' ),
			        'show_title'    => true,
			        'icon'          => 'brush',
			        'fields'        => []
		        ] ] +
		        array_slice( $tabs, $offset, NULL, true );

		/** Highlight Titles. */
		if (
			'on' === $options['highlight_titles'] ||
			'on' === $options['profile_cognitive_disability']
		) {

			# Highlight Titles header
			$tabs['design']['fields']['highlight_titles_header'] = [
				'type'              => 'header',
				'label'             => esc_html__( 'Highlight Titles', 'readabler' ),
				'default'           => ''
			];

			# Highlight Titles Style
			$tabs['design']['fields']['highlight_titles_style'] = [
				'type'              => 'select',
				'label'             => esc_html__( 'Style:', 'readabler' ),
				'placeholder'       => esc_html__( 'Style', 'readabler' ),
				'description'       => esc_html__( 'Select highlight titles style.', 'readabler' ),
				'default'           => 'solid',
				'options'           => [
					'none'   => esc_html__( 'None', 'readabler' ),
					'dotted' => esc_html__( 'Dotted', 'readabler' ),
					'dashed' => esc_html__( 'Dashed', 'readabler' ),
					'solid'  => esc_html__( 'Solid', 'readabler' ),
					'double' => esc_html__( 'Double', 'readabler' ),
					'groove' => esc_html__( '3D Grooved', 'readabler' ),
					'ridge'  => esc_html__( '3D Ridged', 'readabler' ),
					'inset'  => esc_html__( '3D Inset', 'readabler' ),
					'outset' => esc_html__( '3D Outset', 'readabler' ),
				]
			];

			# Highlight Titles Color
			$tabs['design']['fields']['highlight_titles_color'] = [
				'type'              => 'colorpicker',
				'label'             => esc_html__( 'Color:', 'readabler' ),
				'placeholder'       => esc_html__( 'Color', 'readabler' ),
				'description'       => esc_html__( 'Select highlight titles color.', 'readabler' ),
				'default'           => '#639af9',
				'attr'              => [
					'readonly'      => 'readonly',
				]
			];

			# Highlight Titles Width
			$key = 'highlight_titles_width';
			$tabs['design']['fields'][$key] = [
				'type'              => 'slider',
				'label'             => esc_html__( 'Width:', 'readabler' ),
				'description'       => esc_html__( 'Width:', 'readabler' ) .
				                       ' <strong>' .
				                       esc_html( ( ! empty( $options[$key] ) ) ? $options[$key] : '2' ) .
				                       '</strong>' .
				                       esc_html__( ' px', 'readabler' ),
				'min'               => 0,
				'max'               => 50,
				'step'              => 1,
				'default'           => 2,
				'discrete'          => true,
			];

			# Highlight Titles Offset
			$key = 'highlight_titles_offset';
			$default = 2;
			$tabs['design']['fields'][$key] = [
				'type'              => 'slider',
				'label'             => esc_html__( 'Offset:', 'readabler' ),
				'description'       => esc_html__( 'Offset:', 'readabler' ) .
				                       ' <strong>' .
				                       esc_html( ( ! empty( $options[$key] ) ) ? $options[$key] : $default ) .
				                       '</strong>' .
				                       esc_html__( ' px', 'readabler' ),
				'min'               => 0,
				'max'               => 50,
				'step'              => 1,
				'default'           => $default,
				'discrete'          => true,
			];

			# Divider
			$key = 'divider_highlight_titles_offset';
			$tabs['design']['fields'][$key] = ['type' => 'divider', 'default' => ''];

		}

		/** Highlight Links. */
		if (
			'on' === $options['highlight_links'] ||
			'on' === $options['profile_cognitive_disability']
		) {

			# Highlight Links header
			$tabs[ 'design' ][ 'fields' ][ 'highlight_links_header' ] = [
				'type'             => 'header',
				'label'            => esc_html__( 'Highlight Links', 'readabler' ),
				'default'          => ''
			];

			# Highlight Links Style
			$tabs[ 'design' ][ 'fields' ][ 'highlight_links_style' ] = [
				'type'             => 'select',
				'label'            => esc_html__( 'Style:', 'readabler' ),
				'placeholder'      => esc_html__( 'Style', 'readabler' ),
				'description'      => esc_html__( 'Select highlight links style.', 'readabler' ),
				'default'          => 'solid',
				'options'          => [
					'none'   => esc_html__( 'None', 'readabler' ),
					'dotted' => esc_html__( 'Dotted', 'readabler' ),
					'dashed' => esc_html__( 'Dashed', 'readabler' ),
					'solid'  => esc_html__( 'Solid', 'readabler' ),
					'double' => esc_html__( 'Double', 'readabler' ),
					'groove' => esc_html__( '3D Grooved', 'readabler' ),
					'ridge'  => esc_html__( '3D Ridged', 'readabler' ),
					'inset'  => esc_html__( '3D Inset', 'readabler' ),
					'outset' => esc_html__( '3D Outset', 'readabler' ),
				]
			];

			# Highlight Links Color
			$tabs[ 'design' ][ 'fields' ][ 'highlight_links_color' ] = [
				'type'             => 'colorpicker',
				'label'            => esc_html__( 'Color:', 'readabler' ),
				'placeholder'      => esc_html__( 'Color', 'readabler' ),
				'description'      => esc_html__( 'Select highlight links color.', 'readabler' ),
				'default'          => '#639af9',
				'attr'             => [
					'readonly' => 'readonly',
				]
			];

			# Highlight Links Width
			$key = 'highlight_links_width';
			$tabs[ 'design' ][ 'fields' ][ $key ] = [
				'type'             => 'slider',
				'label'            => esc_html__( 'Width:', 'readabler' ),
				'description'      => esc_html__( 'Width:', 'readabler' ) .
				                      ' <strong>' .
				                      esc_html( ( ! empty( $options[ $key ] ) ) ? $options[ $key ] : '2' ) .
				                      '</strong>' .
				                      esc_html__( ' px', 'readabler' ),
				'min'              => 0,
				'max'              => 50,
				'step'             => 1,
				'default'          => 2,
				'discrete'         => true,
			];

			# Highlight Links Offset
			$key = 'highlight_links_offset';
			$default = 2;
			$tabs[ 'design' ][ 'fields' ][ $key ] = [
				'type'             => 'slider',
				'label'            => esc_html__( 'Offset:', 'readabler' ),
				'description'      => esc_html__( 'Offset:', 'readabler' ) .
				                      ' <strong>' .
				                      esc_html( ( ! empty( $options[ $key ] ) ) ? $options[ $key ] : $default ) .
				                      '</strong>' .
				                      esc_html__( ' px', 'readabler' ),
				'min'              => 0,
				'max'              => 50,
				'step'             => 1,
				'default'          => $default,
				'discrete'         => true,
			];

			# Divider
			$key = 'divider_highlight_links_offset';
			$tabs['design']['fields'][$key] = ['type' => 'divider', 'default' => ''];

		}

		/** Text Magnifier. */
		if ( 'on' === $options['text_magnifier'] ) {

			# Text Magnifier header
			$tabs[ 'design' ][ 'fields' ][ 'text_magnifier_header' ] = [
				'type'             => 'header',
				'label'            => esc_html__( 'Text Magnifier', 'readabler' ),
				'default'          => ''
			];

			# Background Color
			$tabs['design']['fields']['text_magnifier_bg_color'] = [
				'type'              => 'colorpicker',
				'label'             => esc_html__( 'Background Color:', 'readabler' ),
				'placeholder'       => esc_html__( 'Background Color', 'readabler' ),
				'description'       => esc_html__( 'Select background color.', 'readabler' ),
				'default'           => '#333333',
				'attr'              => [
					'readonly'      => 'readonly',
				]
			];

			# Text Color
			$tabs['design']['fields']['text_magnifier_color'] = [
				'type'              => 'colorpicker',
				'label'             => esc_html__( 'Text Color:', 'readabler' ),
				'placeholder'       => esc_html__( 'Text Color', 'readabler' ),
				'description'       => esc_html__( 'Select text color.', 'readabler' ),
				'default'           => '#ffffff',
				'attr'              => [
					'readonly'      => 'readonly',
				]
			];

			# Font Size
			$key = 'text_magnifier_font_size';
			$default = 36;
			$tabs['design']['fields'][$key] = [
				'type'              => 'slider',
				'label'             => esc_html__( 'Font Size:', 'readabler' ),
				'description'       => esc_html__( 'Font size:', 'readabler' ) .
				                       ' <strong>' .
				                       esc_html( ( ! empty( $options[$key] ) ) ? $options[$key] : $default ) .
				                       '</strong>' .
				                       esc_html__( ' px', 'readabler' ),
				'min'               => 16,
				'max'               => 100,
				'step'              => 1,
				'default'           => $default,
				'discrete'          => true,
			];

			# Divider
			$key = 'divider_text_magnifier';
			$tabs['design']['fields'][$key] = ['type' => 'divider', 'default' => ''];

		}

		/** Reading Guide. */
		if ( 'on' === $options['reading_guide'] ) {

			# Reading Guide header
			$tabs['design']['fields']['reading_guide_header'] = [
				'type'              => 'header',
				'label'             => esc_html__( 'Reading Guide', 'readabler' ),
				'default'           => ''
			];

			# Width
			$key = 'reading_guide_width';
			$default = 500;
			$tabs['design']['fields'][$key] = [
				'type'              => 'slider',
				'label'             => esc_html__( 'Width:', 'readabler' ),
				'description'       => esc_html__( 'Width:', 'readabler' ) .
				                       ' <strong>' .
				                       esc_html( ( ! empty( $options[$key] ) ) ? $options[$key] : $default ) .
				                       '</strong>' .
				                       esc_html__( ' px', 'readabler' ),
				'min'               => 50,
				'max'               => 2000,
				'step'              => 50,
				'default'           => $default,
				'discrete'          => true,
			];

			# Height
			$key = 'reading_guide_height';
			$default = 12;
			$tabs['design']['fields'][$key] = [
				'type'              => 'slider',
				'label'             => esc_html__( 'Height:', 'readabler' ),
				'description'       => esc_html__( 'Height:', 'readabler' ) .
				                       ' <strong>' .
				                       esc_html( ( ! empty( $options[$key] ) ) ? $options[$key] : $default ) .
				                       '</strong>' .
				                       esc_html__( ' px', 'readabler' ),
				'min'               => 1,
				'max'               => 100,
				'step'              => 1,
				'default'           => $default,
				'discrete'          => true,
			];

			# Background Color
			$tabs['design']['fields']['reading_guide_background_color'] = [
				'type'              => 'colorpicker',
				'label'             => esc_html__( 'Background Color:', 'readabler' ),
				'placeholder'       => esc_html__( 'Background Color', 'readabler' ),
				'description'       => esc_html__( 'Select background color for reading guide.', 'readabler' ),
				'default'           => '#0274e6',
				'attr'              => [
					'readonly'      => 'readonly',
				]
			];

			# Border Color
			$tabs['design']['fields']['reading_guide_border_color'] = [
				'type'              => 'colorpicker',
				'label'             => esc_html__( 'Border Color:', 'readabler' ),
				'placeholder'       => esc_html__( 'Border Color', 'readabler' ),
				'description'       => esc_html__( 'Select border color for reading guide.', 'readabler' ),
				'default'           => '#000000',
				'attr'              => [
					'readonly'      => 'readonly',
				]
			];

			# Border Width
			$key = 'reading_guide_border_width';
			$default = 2;
			$tabs['design']['fields'][$key] = [
				'type'              => 'slider',
				'label'             => esc_html__( 'Border Width:', 'readabler' ),
				'description'       => esc_html__( 'Border Width:', 'readabler' ) .
				                       ' <strong>' .
				                       esc_html( ( ! empty( $options[$key] ) ) ? $options[$key] : $default ) .
				                       '</strong>' .
				                       esc_html__( ' px', 'readabler' ),
				'min'               => 0,
				'max'               => 50,
				'step'              => 1,
				'default'           => $default,
				'discrete'          => true,
			];

			# Border Radius
			$key = 'reading_guide_border_radius';
			$default = 10;
			$tabs['design']['fields'][$key] = [
				'type'              => 'slider',
				'label'             => esc_html__( 'Border Radius:', 'readabler' ),
				'description'       => esc_html__( 'Border Radius:', 'readabler' ) .
				                       ' <strong>' .
				                       esc_html( ( ! empty( $options[$key] ) ) ? $options[$key] : $default ) .
				                       '</strong>' .
				                       esc_html__( ' px', 'readabler' ),
				'min'               => 0,
				'max'               => 100,
				'step'              => 1,
				'default'           => $default,
				'discrete'          => true,
			];

			# Border Radius
			$key = 'reading_guide_arrow';
			$default = 10;
			$tabs['design']['fields'][$key] = [
				'type'              => 'slider',
				'label'             => esc_html__( 'Arrow size:', 'readabler' ),
				'description'       => esc_html__( 'Arrow size:', 'readabler' ) .
				                       ' <strong>' .
				                       esc_html( ( ! empty( $options[$key] ) ) ? $options[$key] : $default ) .
				                       '</strong>' .
				                       esc_html__( ' px', 'readabler' ),
				'min'               => 0,
				'max'               => 100,
				'step'              => 1,
				'default'           => $default,
				'discrete'          => true,
			];

			# Divider
			$key = 'divider_reading_guide_border_radius';
			$tabs['design']['fields'][$key] = ['type' => 'divider', 'default' => ''];

		}

		/** Reading Mask. */
		if (
			'on' === $options['reading_mask'] ||
			'on' === $options['profile_adhd_friendly']
		) {

			# Reading Mask header
			$tabs['design']['fields']['reading_mask_header'] = [
				'type'              => 'header',
				'label'             => esc_html__( 'Reading Mask', 'readabler' ),
				'default'           => ''
			];

			# Height
			$key = 'reading_mask_height';
			$default = 100;
			$tabs['design']['fields'][$key] = [
				'type'              => 'slider',
				'label'             => esc_html__( 'Height:', 'readabler' ),
				'description'       => esc_html__( 'Height:', 'readabler' ) .
				                       ' <strong>' .
				                       esc_html( ( ! empty( $options[$key] ) ) ? $options[$key] : $default ) .
				                       '</strong>' .
				                       esc_html__( ' px', 'readabler' ),
				'min'               => 50,
				'max'               => 500,
				'step'              => 10,
				'default'           => $default,
				'discrete'          => true,
			];

			# Overlay Color
			$tabs['design']['fields']['reading_mask_color'] = [
				'type'              => 'colorpicker',
				'label'             => esc_html__( 'Overlay Color:', 'readabler' ),
				'placeholder'       => esc_html__( 'Overlay Color', 'readabler' ),
				'description'       => esc_html__( 'Select overlay color for reading mask.', 'readabler' ),
				'default'           => 'rgba(0, 0, 0, 0.7)',
				'attr'              => [
					'readonly'      => 'readonly',
				]
			];

			# Divider
			$key = 'divider_reading_mask_color';
			$tabs['design']['fields'][$key] = ['type' => 'divider', 'default' => ''];

		}

		/** Highlight Hover. */
		if ( 'on' === $options['highlight_hover'] ) {

			# Highlight Hover header
			$tabs['design']['fields']['highlight_hover_header'] = [
				'type'              => 'header',
				'label'             => esc_html__( 'Highlight Hover', 'readabler' ),
				'default'           => ''
			];

			# Highlight Hover Style
			$tabs['design']['fields']['highlight_hover_style'] = [
				'type'              => 'select',
				'label'             => esc_html__( 'Style:', 'readabler' ),
				'placeholder'       => esc_html__( 'Style', 'readabler' ),
				'description'       => esc_html__( 'Select highlight hover style.', 'readabler' ),
				'default'           => 'solid',
				'options'           => [
					'none'   => esc_html__( 'None', 'readabler' ),
					'dotted' => esc_html__( 'Dotted', 'readabler' ),
					'dashed' => esc_html__( 'Dashed', 'readabler' ),
					'solid'  => esc_html__( 'Solid', 'readabler' ),
					'double' => esc_html__( 'Double', 'readabler' ),
					'groove' => esc_html__( '3D Grooved', 'readabler' ),
					'ridge'  => esc_html__( '3D Ridged', 'readabler' ),
					'inset'  => esc_html__( '3D Inset', 'readabler' ),
					'outset' => esc_html__( '3D Outset', 'readabler' ),
				]
			];

			# Highlight Hover Color
			$tabs['design']['fields']['highlight_hover_color'] = [
				'type'              => 'colorpicker',
				'label'             => esc_html__( 'Color:', 'readabler' ),
				'placeholder'       => esc_html__( 'Color', 'readabler' ),
				'description'       => esc_html__( 'Select highlight hover color.', 'readabler' ),
				'default'           => '#639af9',
				'attr'              => [
					'readonly'      => 'readonly',
				]
			];

			# Highlight Hover Width
			$key = 'highlight_hover_width';
			$tabs['design']['fields'][$key] = [
				'type'              => 'slider',
				'label'             => esc_html__( 'Width:', 'readabler' ),
				'description'       => esc_html__( 'Width:', 'readabler' ) .
				                       ' <strong>' .
				                       esc_html( ( ! empty( $options[$key] ) ) ? $options[$key] : '2' ) .
				                       '</strong>' .
				                       esc_html__( ' px', 'readabler' ),
				'min'               => 0,
				'max'               => 50,
				'step'              => 1,
				'default'           => 2,
				'discrete'          => true,
			];

			# Highlight Hover Offset
			$key = 'highlight_hover_offset';
			$default = 2;
			$tabs['design']['fields'][$key] = [
				'type'              => 'slider',
				'label'             => esc_html__( 'Offset:', 'readabler' ),
				'description'       => esc_html__( 'Offset:', 'readabler' ) .
				                       ' <strong>' .
				                       esc_html( ( ! empty( $options[$key] ) ) ? $options[$key] : $default ) .
				                       '</strong>' .
				                       esc_html__( ' px', 'readabler' ),
				'min'               => 0,
				'max'               => 50,
				'step'              => 1,
				'default'           => $default,
				'discrete'          => true,
			];

			# Divider
			$key = 'divider_highlight_hover_offset';
			$tabs['design']['fields'][$key] = ['type' => 'divider', 'default' => ''];

		}

		/** Highlight Focus. */
		if ( 'on' === $options['highlight_focus'] ) {

			# Highlight Focus header
			$tabs['design']['fields']['highlight_focus_header'] = [
				'type'              => 'header',
				'label'             => esc_html__( 'Highlight Focus', 'readabler' ),
				'default'           => ''
			];

			# Highlight Focus Style
			$tabs['design']['fields']['highlight_focus_style'] = [
				'type'              => 'select',
				'label'             => esc_html__( 'Style:', 'readabler' ),
				'placeholder'       => esc_html__( 'Style', 'readabler' ),
				'description'       => esc_html__( 'Select highlight focus style.', 'readabler' ),
				'default'           => 'solid',
				'options'           => [
					'none'   => esc_html__( 'None', 'readabler' ),
					'dotted' => esc_html__( 'Dotted', 'readabler' ),
					'dashed' => esc_html__( 'Dashed', 'readabler' ),
					'solid'  => esc_html__( 'Solid', 'readabler' ),
					'double' => esc_html__( 'Double', 'readabler' ),
					'groove' => esc_html__( '3D Grooved', 'readabler' ),
					'ridge'  => esc_html__( '3D Ridged', 'readabler' ),
					'inset'  => esc_html__( '3D Inset', 'readabler' ),
					'outset' => esc_html__( '3D Outset', 'readabler' ),
				]
			];

			# Highlight Focus Color
			$tabs['design']['fields']['highlight_focus_color'] = [
				'type'              => 'colorpicker',
				'label'             => esc_html__( 'Color:', 'readabler' ),
				'placeholder'       => esc_html__( 'Color', 'readabler' ),
				'description'       => esc_html__( 'Select highlight focus color.', 'readabler' ),
				'default'           => '#639af9',
				'attr'              => [
					'readonly'      => 'readonly',
				]
			];

			# Highlight Focus Width
			$key = 'highlight_focus_width';
			$tabs['design']['fields'][$key] = [
				'type'              => 'slider',
				'label'             => esc_html__( 'Width:', 'readabler' ),
				'description'       => esc_html__( 'Width:', 'readabler' ) .
				                       ' <strong>' .
				                       esc_html( ( ! empty( $options[$key] ) ) ? $options[$key] : '2' ) .
				                       '</strong>' .
				                       esc_html__( ' px', 'readabler' ),
				'min'               => 0,
				'max'               => 50,
				'step'              => 1,
				'default'           => 2,
				'discrete'          => true,
			];

			# Highlight Hover Offset
			$key = 'highlight_focus_offset';
			$default = 2;
			$tabs['design']['fields'][$key] = [
				'type'              => 'slider',
				'label'             => esc_html__( 'Offset:', 'readabler' ),
				'description'       => esc_html__( 'Offset:', 'readabler' ) .
				                       ' <strong>' .
				                       esc_html( ( ! empty( $options[$key] ) ) ? $options[$key] : $default ) .
				                       '</strong>' .
				                       esc_html__( ' px', 'readabler' ),
				'min'               => 0,
				'max'               => 50,
				'step'              => 1,
				'default'           => $default,
				'discrete'          => true,
			];

			# Divider
			$key = 'divider_highlight_focus';
			$tabs['design']['fields'][$key] = ['type' => 'divider', 'default' => ''];

		}

		/** Virtual Keyboard. */
		if (
			'on' === $options['virtual_keyboard'] ||
			'on' === $options['profile_blind_users']
		) {

			# Virtual Keyboard header
			$tabs['design']['fields']['virtual_keyboard_header'] = [
				'type'              => 'header',
				'label'             => esc_html__( 'Virtual Keyboard', 'readabler' ),
				'default'           => ''
			];

			# Keyboard Layout
			$tabs['design']['fields']['virtual_keyboard_layout'] = [
				'type'              => 'select',
				'label'             => esc_html__( 'Layout:', 'readabler' ),
				'placeholder'       => esc_html__( 'Layout', 'readabler' ),
				'description'       => esc_html__( 'Select language layout for virtual keyboard.', 'readabler' ),
				'default'           => 'english',
				'options'           => [
					'arabic'    => esc_html__( 'Arabic', 'readabler' ),
					'assamese'  => esc_html__( 'Assamese', 'readabler' ),
					'belarusian' => esc_html__( 'Belarusian', 'readabler' ),
					'bengali'   => esc_html__( 'Bengali', 'readabler' ),
					'burmese'   => esc_html__( 'Burmese', 'readabler' ),
					'chinese'   => esc_html__( 'Chinese', 'readabler' ),
					'czech'     => esc_html__( 'Czech', 'readabler' ),
					'english'   => esc_html__( 'English', 'readabler' ),
					'farsi'     => esc_html__( 'Farsi', 'readabler' ),
					'french'    => esc_html__( 'French', 'readabler' ),
					'georgian'  => esc_html__( 'Georgian', 'readabler' ),
					'german'    => esc_html__( 'German', 'readabler' ),
					'gilaki'    => esc_html__( 'Gilaki', 'readabler' ),
					'greek'     => esc_html__( 'Greek', 'readabler' ),
					'hebrew'    => esc_html__( 'Hebrew', 'readabler' ),
					'hindi'     => esc_html__( 'Hindi', 'readabler' ),
					'italian'   => esc_html__( 'Italian', 'readabler' ),
					'japanese'  => esc_html__( 'Japanese', 'readabler' ),
					'kannada'   => esc_html__( 'Kannada', 'readabler' ),
					'korean'    => esc_html__( 'Korean', 'readabler' ),
					'nigerian'  => esc_html__( 'Nigerian', 'readabler' ),
					'norwegian' => esc_html__( 'Norwegian', 'readabler' ),
					'polish'    => esc_html__( 'Polish', 'readabler' ),
					'russian'   => esc_html__( 'Russian', 'readabler' ),
					'sindhi'    => esc_html__( 'Sindhi', 'readabler' ),
					'spanish'   => esc_html__( 'Spanish', 'readabler' ),
					'swedish'   => esc_html__( 'Swedish', 'readabler' ),
					'thai'      => esc_html__( 'Thai', 'readabler' ),
					'turkish'   => esc_html__( 'Turkish', 'readabler' ),
					'ukrainian' => esc_html__( 'Ukrainian', 'readabler' ),
					'urdu'      => esc_html__( 'Urdu', 'readabler' ),
					'uyghur'    => esc_html__( 'Uyghur', 'readabler' )
				]
			];

			$tabs['design']['fields']['virtual_keyboard_header_light'] = [
				'type'              => 'header',
				'label'             => esc_html__( 'Day(Light) Theme', 'readabler' ),
				'default'           => ''
			];

			$tabs['design']['fields']['virtual_keyboard_bg_color'] = [
				'type'              => 'colorpicker',
				'label'             => esc_html__( 'Keyboard Background Color:', 'readabler' ),
				'placeholder'       => esc_html__( 'Background Color', 'readabler' ),
				'description'       => esc_html__( 'Select background color for virtual keyboard.', 'readabler' ),
				'default'           => '#ececec',
				'attr'              => [
					'readonly'      => 'readonly',
				]
			];

			# Keyboard Button Background Color
			$tabs['design']['fields']['virtual_keyboard_button_bg_color'] = [
				'type'              => 'colorpicker',
				'label'             => esc_html__( 'Button Background Color:', 'readabler' ),
				'placeholder'       => esc_html__( 'Button Background', 'readabler' ),
				'description'       => esc_html__( 'Select background color for buttons on virtual keyboard.', 'readabler' ),
				'default'           => '#ffffff',
				'attr'              => [
					'readonly'      => 'readonly',
				]
			];

			# Keyboard Button Color
			$tabs['design']['fields']['virtual_keyboard_button_color'] = [
				'type'              => 'colorpicker',
				'label'             => esc_html__( 'Button Color:', 'readabler' ),
				'placeholder'       => esc_html__( 'Button Color', 'readabler' ),
				'description'       => esc_html__( 'Select text color for buttons on virtual keyboard.', 'readabler' ),
				'default'           => '#111111',
				'attr'              => [
					'readonly'      => 'readonly',
				]
			];

			$tabs['design']['fields']['virtual_keyboard_header_dark'] = [
				'type'              => 'header',
				'label'             => esc_html__( 'Night(Dark) Theme', 'readabler' ),
				'default'           => ''
			];


			# Keyboard Background Color
			$tabs['design']['fields']['virtual_keyboard_bg_color_dark'] = [
				'type'              => 'colorpicker',
				'label'             => esc_html__( 'Keyboard Background Color:', 'readabler' ),
				'placeholder'       => esc_html__( 'Background Color', 'readabler' ),
				'description'       => esc_html__( 'Select background color for virtual keyboard.', 'readabler' ),
				'default'           => '#000000CC',
				'attr'              => [
					'readonly'      => 'readonly',
				]
			];

			# Keyboard Button Background Color
			$tabs['design']['fields']['virtual_keyboard_button_bg_color_dark'] = [
				'type'              => 'colorpicker',
				'label'             => esc_html__( 'Button Background Color:', 'readabler' ),
				'placeholder'       => esc_html__( 'Button Background', 'readabler' ),
				'description'       => esc_html__( 'Select background color for buttons on virtual keyboard.', 'readabler' ),
				'default'           => 'rgba( 0, 0, 0, .5 )',
				'attr'              => [
					'readonly'      => 'readonly',
				]
			];

			# Keyboard Button Color
			$tabs['design']['fields']['virtual_keyboard_button_color_dark'] = [
				'type'              => 'colorpicker',
				'label'             => esc_html__( 'Button Color:', 'readabler' ),
				'placeholder'       => esc_html__( 'Button Color', 'readabler' ),
				'description'       => esc_html__( 'Select text color for buttons on virtual keyboard.', 'readabler' ),
				'default'           => '#ffffff',
				'attr'              => [
					'readonly'      => 'readonly',
				]
			];

			# Divider
			$key = 'divider_virtual_keyboard';
			$tabs['design']['fields'][$key] = ['type' => 'divider', 'default' => ''];

		}

		/** If no options on this tab - disable it. */
		if ( ! count( $tabs['design']['fields'] ) ) {
			$tabs['design']['enabled'] = false;
		}

		return $tabs;

	}

	/**
	 * Create Modal Popup tab.
	 *
	 * @param array $tabs - List of tabs with all settings and fields.
	 *
	 * @since  1.0.0
	 * @access public
	 *
	 * @return array - List of tabs with all settings and fields.
	 **/
	private function create_tab_modal_popup( $tabs ) {

		/** Short hand access to plugin settings. */
		$options = Settings::get_instance()->options;

		/** Add Modal Popup tab after Open Button. */
		$offset = 2; // Position for new tab.
		$tabs = array_slice( $tabs, 0, $offset, true ) +
		        ['modal_popup' => [
			        'enabled'       => true,
			        'class'         => TabGeneral::class,
			        'label'         => esc_html__( 'Modal Popup', 'readabler' ),
			        'title'         => esc_html__( 'Modal Popup Settings', 'readabler' ),
			        'show_title'    => true,
			        'icon'          => 'web_asset',
			        'fields'        => []
		        ] ] +
		        array_slice( $tabs, $offset, NULL, true );

		# Position
		$tabs['modal_popup']['fields']['popup_position'] = [
			'type'              => 'select',
			'label'             => esc_html__( 'Popup position:', 'readabler' ),
			'placeholder'       => esc_html__( 'Popup position', 'readabler' ),
			'description'       => esc_html__( 'Select the initial position of the popup display', 'readabler' ),
			'default'           => 'right',
			'options'           => [
				'right' => esc_html__( 'Right', 'readabler' ),
				'center' => esc_html__( 'Center', 'readabler' ),
				'left' => esc_html__( 'Left', 'readabler' ),
			]
		];

		$tabs['modal_popup']['fields']['popup_draggable'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Draggable', 'readabler' ),
			'placeholder'       => esc_html__( 'Draggable', 'readabler' ),
			'description'       => esc_html__( 'Controls dragging popup', 'readabler' ),
			'default'           => 'on',
		];

		# Light Colors Theme
		$key = 'light_theme';
		$tabs[ 'modal_popup' ][ 'fields' ][ $key ] = [ 'type' => 'divider', 'default' => '' ];
		$tabs[ 'modal_popup' ][ 'fields' ][ $key . '_header' ] = [
			'type'              => 'header',
			'label'             => esc_html__( 'Day(Light) Theme', 'readabler' ),
			'description'       => esc_html__( 'Select colors for the Day(Light) theme', 'readabler' ),
			'default'           => ''
		];

		# Background Color
		$tabs['modal_popup']['fields']['popup_background_color'] = [
			'type'              => 'colorpicker',
			'label'             => esc_html__( 'Background Color:', 'readabler' ),
			'placeholder'       => esc_html__( 'Background Color', 'readabler' ),
			'description'       => esc_html__( 'Select modal background-color.', 'readabler' ),
			'default'           => '#ffffff',
			'attr'              => [
				'readonly'      => 'readonly',
			]
		];

        # Key Color
        $tabs['modal_popup']['fields']['popup_key_color'] = [
            'type'              => 'colorpicker',
            'label'             => esc_html__( 'Key Color:', 'readabler' ),
            'placeholder'       => esc_html__( 'Key Color', 'readabler' ),
            'description'       => esc_html__( 'Select modal key color.', 'readabler' ),
            'default'           => 'rgba(33, 150, 243, 1)',
            'attr'              => [
                'readonly'      => 'readonly',
            ]
        ];

		# Text
		$tabs['modal_popup']['fields']['popup_text_color'] = [
			'type'              => 'colorpicker',
			'label'             => esc_html__( 'Text Color:', 'readabler' ),
			'placeholder'       => esc_html__( 'Text Color', 'readabler' ),
			'description'       => esc_html__( 'Select modal text color.', 'readabler' ),
			'default'           => '#333',
			'attr'              => [
				'readonly'      => 'readonly',
			]
		];

		# Dark Colors Theme
		$key = 'dark_theme';
		$tabs[ 'modal_popup' ][ 'fields' ][ $key ] = [ 'type' => 'divider', 'default' => '' ];
		$tabs[ 'modal_popup' ][ 'fields' ][ $key . '_header' ] = [
			'type'              => 'header',
			'label'             => esc_html__( 'Night(Dark) Theme', 'readabler' ),
			'description'       => esc_html__( 'Select colors for the Night(Dark) theme', 'readabler' ),
			'default'           => ''
		];

		# Background Color
		$tabs['modal_popup']['fields']['popup_background_color_dark'] = [
			'type'              => 'colorpicker',
			'label'             => esc_html__( 'Background Color:', 'readabler' ),
			'placeholder'       => esc_html__( 'Background Color', 'readabler' ),
			'description'       => esc_html__( 'Select modal background-color.', 'readabler' ),
			'default'           => '#16191b',
			'attr'              => [
				'readonly'      => 'readonly',
			]
		];

		# Key Color
		$tabs['modal_popup']['fields']['popup_key_color_dark'] = [
			'type'              => 'colorpicker',
			'label'             => esc_html__( 'Key Color:', 'readabler' ),
			'placeholder'       => esc_html__( 'Key Color', 'readabler' ),
			'description'       => esc_html__( 'Select modal key color.', 'readabler' ),
			'default'           => 'rgba(33, 150, 243, 1)',
			'attr'              => [
				'readonly'      => 'readonly',
			]
		];

		# Text
		$tabs['modal_popup']['fields']['popup_text_color_dark'] = [
			'type'              => 'colorpicker',
			'label'             => esc_html__( 'Text Color:', 'readabler' ),
			'placeholder'       => esc_html__( 'Text Color', 'readabler' ),
			'description'       => esc_html__( 'Select modal text color.', 'readabler' ),
			'default'           => '#deeffd',
			'attr'              => [
				'readonly'      => 'readonly',
			]
		];

		# Dark Colors Theme
		$key = 'appearance';
		$tabs[ 'modal_popup' ][ 'fields' ][ $key ] = [ 'type' => 'divider', 'default' => '' ];
		$tabs[ 'modal_popup' ][ 'fields' ][ $key . '_header' ] = [
			'type'              => 'header',
			'label'             => esc_html__( 'Appearance and Behavior', 'readabler' ),
			'description'       => esc_html__( 'Set the modal popup appearance and behavior', 'readabler' ),
			'default'           => ''
		];

		# Border Radius
		$key = 'popup_border_radius';
		$tabs['modal_popup']['fields'][$key] = [
			'type'              => 'slider',
			'label'             => esc_html__( 'Border radius:', 'readabler' ),
			'description'       => esc_html__( 'Border radius:', 'readabler' ) .
			                       ' <strong>' .
			                       esc_html( ( ! empty( $options[$key] ) ) ? $options[$key] : '50' ) .
			                       '</strong>' .
			                       esc_html__( ' px', 'readabler' ),
			'min'               => 0,
			'max'               => 100,
			'step'              => 1,
			'default'           => 20,
			'discrete'          => true,
		];

		# Animation
		$tabs['modal_popup']['fields']['popup_animation'] = [
			'type'              => 'select',
			'label'             => esc_html__( 'Animation:', 'readabler' ),
			'placeholder'       => esc_html__( 'Animation', 'readabler' ),
			'description'       => esc_html__( 'Modal entrance animation.', 'readabler' ),
			'default'           => 'fade',
			'options'           => [
				'none'                  => esc_html__( 'None', 'readabler' ),
				'bounce'                => esc_html__( 'Bounce', 'readabler' ),
				'fade'                  => esc_html__( 'Fade', 'readabler' ),
				'flip-x'                => esc_html__( 'Flip X', 'readabler' ),
				'flip-y'                => esc_html__( 'Flip Y', 'readabler' ),
				'scale'                 => esc_html__( 'Scale', 'readabler' ),
				'slide-tr'              => esc_html__( 'Slide to right', 'readabler' ),
				'slide-tl'              => esc_html__( 'Slide to left', 'readabler' ),
				'slide-tt'              => esc_html__( 'Slide to top', 'readabler' ),
				'slide-tb'              => esc_html__( 'Slide to bottom', 'readabler' ),
				'rotate'                => esc_html__( 'Rotate', 'readabler' ),
				'wobble'                => esc_html__( 'Wobble', 'readabler' )
			]
		];

		# Animation Duration
		$key = 'popup_animation_duration';
		$default = 600;
		$tabs['modal_popup']['fields'][$key] = [
			'type'              => 'slider',
			'label'             => esc_html__( 'Animation Duration:', 'readabler' ),
			'description'       => esc_html__( 'Animation duration:', 'readabler' ) .
			                       ' <strong>' .
			                       esc_html( ( ! empty( $options[$key] ) ) ? $options[$key] : $default ) .
			                       '</strong>' .
			                       esc_html__( ' ms', 'readabler' ),
			'min'               => 100,
			'max'               => 5000,
			'step'              => 50,
			'default'           => $default,
			'discrete'          => true,
		];

		# Popup shadow
		$tabs['modal_popup']['fields']['popup_shadow'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Popup Shadow:', 'readabler' ),
			'placeholder'       => esc_html__( 'Shadow', 'readabler' ),
			'description'       => esc_html__( 'Show popup shadow', 'readabler' ),
			'default'           => 'on',
		];

		# Overlay
		$tabs['modal_popup']['fields']['popup_overlay'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Overlay:', 'readabler' ),
			'placeholder'       => esc_html__( 'Overlay', 'readabler' ),
			'description'       => esc_html__( 'Show overlay layer', 'readabler' ),
			'default'           => 'off',
		];

		# Overlay Color
		$tabs['modal_popup']['fields']['popup_overlay_color'] = [
			'type'              => 'colorpicker',
			'label'             => esc_html__( 'Overlay Color:', 'readabler' ),
			'placeholder'       => esc_html__( 'Overlay Color', 'readabler' ),
			'description'       => esc_html__( 'Select modal overlay background-color.', 'readabler' ),
			'default'           => '#0253ee',
			'attr'              => [
				'readonly'      => 'readonly',
			]
		];

		# Float
		$tabs['modal_popup']['fields']['popup_float'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Floating popup:', 'readabler' ),
			'placeholder'       => esc_html__( 'Enable floating', 'readabler' ),
			'description'       => esc_html__( 'Leave a popup on the screen while scrolling', 'readabler' ),
			'default'           => 'on',
		];

		# Scroll
		$tabs['modal_popup']['fields']['popup_scroll'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Scroll:', 'readabler' ),
			'placeholder'       => esc_html__( 'Scroll', 'readabler' ),
			'description'       => esc_html__( 'Scrolling on the page while the popup is open.', 'readabler' ),
			'default'           => 'off',
		];

		# Close by clicking outside the popup
		$tabs['modal_popup']['fields']['popup_close_anywhere'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Close anywhere:', 'readabler' ),
			'placeholder'       => esc_html__( 'Close anywhere', 'readabler' ),
			'description'       => esc_html__( 'Close by clicking outside the popup', 'readabler' ),
			'default'           => 'off',
		];

		$tabs['modal_popup']['fields']['reset_button'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Reset Button', 'readabler' ),
			'placeholder'       => esc_html__( 'Reset Button', 'readabler' ),
			'description'       => esc_html__( 'Shows and hides the Reset button', 'readabler' ),
			'default'           => 'on',
		];

		$tabs['modal_popup']['fields']['hide_button'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Hide Button', 'readabler' ),
			'placeholder'       => esc_html__( 'Hide Button', 'readabler' ),
			'description'       => esc_html__( 'Shows and hides the Hide Forever button', 'readabler' ),
			'default'           => 'on',
		];

		return $tabs;

	}

	/**
	 * Create Open Button tab.
	 *
	 * @param array $tabs - List of tabs with all settings and fields.
	 *
	 * @since  1.0.0
	 * @access public
	 *
	 * @return array - List of tabs with all settings and fields.
	 **/
	private function create_tab_open_button( $tabs ) {

		/** Short hand access to plugin settings. */
		$options = Settings::get_instance()->options;

		/** Add Open button tab after General. */
		$offset = 1; // Position for new tab.
		$tabs = array_slice( $tabs, 0, $offset, true ) +
		        ['open_button' => [
			        'enabled'       => true,
			        'class'         => TabGeneral::class,
			        'label'         => esc_html__( 'Open Button', 'readabler' ),
			        'title'         => esc_html__( 'Open Button Settings', 'readabler' ),
			        'show_title'    => true,
			        'icon'          => 'edit_attributes',
			        'fields'        => []
		        ] ] +
		        array_slice( $tabs, $offset, NULL, true );

		# Show Open Button
		$tabs['open_button']['fields']['show_open_button'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Show Open Button:', 'readabler' ),
			'placeholder'       => esc_html__( 'Show Open Button', 'readabler' ),
			'default'           => 'on',
		];

		$key = 'button_tabindex';
		$tabs['open_button']['fields'][$key] = [
			'type'              => 'slider',
			'label'             => esc_html__( 'Tabulation index:', 'readabler' ),
			'description'       => esc_html__( 'Tabulation index:', 'readabler' ) .
			                       ' <strong>' .
			                       esc_html( ( ! empty( $options[$key] ) ) ? $options[$key] : '0' ) .
			                       '</strong>',
			'min'               => -1,
			'max'               => 3,
			'step'              => 1,
			'default'           => 0,
			'discrete'          => true,
		];

		# Divider
		$key = 'divider_show_open_button';
		$tabs['open_button']['fields'][$key] = ['type' => 'divider', 'default' => ''];

		# Button Position
        $tabs['open_button']['fields']['button_position'] = [
            'type'              => 'select',
            'label'             => esc_html__( 'Position:', 'readabler' ),
            'placeholder'       => esc_html__( 'Position', 'readabler' ),
            'description'       => esc_html__( 'Select a place on the page to display Floating Button.', 'readabler' ),
            'default'           => 'bottom-right',
            'options'           => [
	            'top-left'      => esc_html__( 'Top Left', 'readabler' ),
	            'top-right'     => esc_html__( 'Top Right', 'readabler' ),
	            'left-center'   => esc_html__( 'Left Center', 'readabler' ),
	            'right-center'  => esc_html__( 'Right Center', 'readabler' ),
	            'bottom-left'   => esc_html__( 'Bottom Left', 'readabler' ),
	            'bottom-center' => esc_html__( 'Bottom Center', 'readabler' ),
	            'bottom-right'  => esc_html__( 'Bottom Right', 'readabler' ),
            ]
        ];

		# Button Caption
        $tabs['open_button']['fields']['button_caption'] = [
            'type'              => 'text',
            'label'             => esc_html__( 'Caption:', 'readabler' ),
            'placeholder'       => esc_html__( 'Button caption', 'readabler' ),
            'default'           => '',
            'attr'              => [
                'maxlength' => '4500'
            ]
        ];
		
        # Button Icon
		// Add to package.json to dependencies "mdc-icon-library": "git+https://bitbucket.org/wpelements/mdc-icon-library.git",
		// and place 'mdc-icons' folder to /images
		$tabs['open_button']['fields']['button_icon'] = [
			'type'              => 'icon',
			'label'             => esc_html__( 'Icon:', 'readabler' ),
			'placeholder'       => '',
			'description'       => esc_html__( 'Select icon for button.', 'readabler' ),
			'default'           => '_readabler/readabler.svg',
			'meta'              => [
				'_readabler.json',
				'font-awesome.json',
				'material.json'
			]
		];

		# Icon Position
		$tabs['open_button']['fields']['button_icon_position'] = [
			'type'              => 'select',
			'label'             => esc_html__( 'Icon Position:', 'readabler' ),
			'placeholder'       => esc_html__( 'Icon Position', 'readabler' ),
			'default'           => 'before',
			'options'           => [
				'none'      => esc_html__( 'Hide', 'readabler' ),
				'before'    => esc_html__( 'Before', 'readabler' ),
				'after'     => esc_html__( 'After', 'readabler' ),
				'above'     => esc_html__( 'Above', 'readabler' ),
				'bellow'    => esc_html__( 'Bellow', 'readabler' ),
			],
		];

		# Icon/Caption size
		$key = 'button_size';
		$tabs['open_button']['fields'][$key] = [
			'type'              => 'slider',
			'label'             => esc_html__( 'Icon/Caption size:', 'readabler' ),
			'description'       => esc_html__( 'Icon/Caption size:', 'readabler' ) .
			                       ' <strong>' .
			                       esc_html( ( ! empty( $options[$key] ) ) ? $options[$key] : '24' ) .
			                       '</strong>' .
			                       esc_html__( ' px', 'readabler' ),
			'min'               => 10,
			'max'               => 100,
			'step'              => 1,
			'default'           => 24,
			'discrete'          => true,
		];

		# Divider
		$key = 'divider_button_size';
		$tabs['open_button']['fields'][$key] = ['type' => 'divider', 'default' => ''];

		# Margin
		$key = 'button_margin';
		$tabs['open_button']['fields'][$key] = [
			'type'              => 'slider',
			'label'             => esc_html__( 'Margin:', 'readabler' ),
			'description'       => esc_html__( 'Button margin:', 'readabler' ) .
			                       ' <strong>' .
			                       esc_html( ( ! empty( $options[$key] ) ) ? $options[$key] : '10' ) .
			                       '</strong>' .
			                       esc_html__( ' px', 'readabler' ),
			'min'               => 0,
			'max'               => 100,
			'step'              => 1,
			'default'           => 10,
			'discrete'          => true,
		];

		# Padding
		$key = 'button_padding';
		$tabs['open_button']['fields'][$key] = [
			'type'              => 'slider',
			'label'             => esc_html__( 'Padding:', 'readabler' ),
			'description'       => esc_html__( 'Button padding:', 'readabler' ) .
			                       ' <strong>' .
			                       esc_html( ( ! empty( $options[$key] ) ) ? $options[$key] : '20' ) .
			                       '</strong>' .
			                       esc_html__( ' px', 'readabler' ),
			'min'               => 0,
			'max'               => 100,
			'step'              => 1,
			'default'           => 20,
			'discrete'          => true,
		];

		# Border Radius
		$key = 'button_border_radius';
		$tabs['open_button']['fields'][$key] = [
			'type'              => 'slider',
			'label'             => esc_html__( 'Border radius:', 'readabler' ),
			'description'       => esc_html__( 'Border radius:', 'readabler' ) .
			                       ' <strong>' .
			                       esc_html( ( ! empty( $options[$key] ) ) ? $options[$key] : '50' ) .
			                       '</strong>' .
			                       esc_html__( ' px', 'readabler' ),
			'min'               => 0,
			'max'               => 100,
			'step'              => 1,
			'default'           => 50,
			'discrete'          => true,
		];

		# Icon/Caption Color
		$tabs['open_button']['fields']['button_color'] = [
			'type'              => 'colorpicker',
			'label'             => esc_html__( 'Icon/Caption Color:', 'readabler' ),
			'placeholder'       => esc_html__( 'Text Color', 'readabler' ),
			'description'       => esc_html__( 'Select icon and text color.', 'readabler' ),
			'default'           => '#ffffff',
			'attr'              => [
				'readonly'      => 'readonly',
			]
		];

		# Icon/Caption Hover Color
		$tabs['open_button']['fields']['button_color_hover'] = [
			'type'              => 'colorpicker',
			'label'             => esc_html__( 'Icon/Caption Hover Color:', 'readabler' ),
			'placeholder'       => esc_html__( 'Text Hover Color', 'readabler' ),
			'description'       => esc_html__( 'Select icon and text hover color.', 'readabler' ),
			'default'           => 'rgba(33, 150, 243, 1)',
			'attr'              => [
				'readonly'      => 'readonly',
			]
		];

		# Background Color
		$tabs['open_button']['fields']['button_bgcolor'] = [
			'type'              => 'colorpicker',
			'label'             => esc_html__( 'Background Color:', 'readabler' ),
			'placeholder'       => esc_html__( 'Background Color', 'readabler' ),
			'description'       => esc_html__( 'Select button background color.', 'readabler' ),
			'default'           => 'rgba(33, 150, 243, 1)',
			'attr'              => [
				'readonly'      => 'readonly',
			]
		];

		# Background Hover Color
		$tabs['open_button']['fields']['button_bgcolor_hover'] = [
			'type'              => 'colorpicker',
			'label'             => esc_html__( 'Background Hover Color:', 'readabler' ),
			'placeholder'       => esc_html__( 'Background Hover Color', 'readabler' ),
			'description'       => esc_html__( 'Select button hover background color.', 'readabler' ),
			'default'           => '#ffffff',
			'attr'              => [
				'readonly'      => 'readonly',
			]
		];

		# Divider
		$key = 'divider_button_bgcolor_hover';
		$tabs['open_button']['fields'][$key] = ['type' => 'divider', 'default' => ''];

        # Entrance Timeout
		$key = 'button_entrance_timeout';
		$tabs['open_button']['fields'][$key] = [
			'type'              => 'slider',
			'label'             => esc_html__( 'Entrance Timeout:', 'readabler' ),
			'description'       => esc_html__( 'Entrance Timeout:', 'readabler' ) .
			                       ' <strong>' .
			                       esc_html( ( ! empty( $options[$key] ) ) ? $options[$key] : '0' ) .
			                       '</strong>' .
			                       esc_html__( ' seconds.', 'readabler' ),
			'min'               => 0,
			'max'               => 30,
			'step'              => 1,
			'default'           => 0,
			'discrete'          => true,
		];

		# Entrance Animation
		$tabs['open_button']['fields']['button_entrance_animation'] = [
			'type'              => 'select',
			'label'             => esc_html__( 'Entrance Animation:', 'readabler' ),
			'placeholder'       => esc_html__( 'Entrance Animation', 'readabler' ),
			'description'       => esc_html__( 'Button Entrance animation.', 'readabler' ),
			'default'           => 'fade',
			'options'           => [
				'none'   => esc_html__( 'None', 'readabler' ),
				'bounce' => esc_html__( 'Bounce', 'readabler' ),
				'fade'   => esc_html__( 'Fade', 'readabler' ),
				'flip-x' => esc_html__( 'Flip X', 'readabler' ),
				'flip-y' => esc_html__( 'Flip Y', 'readabler' ),
				'scale'  => esc_html__( 'Scale', 'readabler' ),
				'wobble' => esc_html__( 'Wobble', 'readabler' ),
				'rotate' => esc_html__( 'Rotate', 'readabler' )
			]
		];

		# Hover Animation
		$tabs['open_button']['fields']['button_hover_animation'] = [
			'type'              => 'select',
			'label'             => esc_html__( 'Hover Animation:', 'readabler' ),
			'placeholder'       => esc_html__( 'Hover Animation', 'readabler' ),
			'description'       => esc_html__( 'Button hover animation.', 'readabler' ),
			'default'           => 'none',
			'options'           => [
				'none'   => esc_html__( 'None', 'readabler' ),
				'bounce' => esc_html__( 'Bounce', 'readabler' ),
				'fade'   => esc_html__( 'Fade', 'readabler' ),
				'flip-x' => esc_html__( 'Flip X', 'readabler' ),
				'flip-y' => esc_html__( 'Flip Y', 'readabler' ),
				'scale'  => esc_html__( 'Scale', 'readabler' ),
				'wobble' => esc_html__( 'Wobble', 'readabler' ),
				'rotate' => esc_html__( 'Rotate', 'readabler' )
			]
		];

		return $tabs;

	}

	/**
	 * Create Accessibility Statement tab.
	 *
	 * @param array $tabs - List of tabs with all settings and fields.
	 *
	 * @since  1.0.0
	 * @access public
	 *
	 * @return array - List of tabs with all settings and fields.
	 **/
	private function create_tab_accessibility_statement( $tabs ) {

		/** Add Open button tab after Design. */
		$offset = 4; // Position for new tab.
		$tabs = array_slice( $tabs, 0, $offset, true ) +
		        ['accessibility_statement' => [
			        'enabled'       => true,
			        'class'         => TabGeneral::class,
			        'label'         => esc_html__( 'Accessibility Statement', 'readabler' ),
			        'title'         => esc_html__( 'Accessibility Statement Settings', 'readabler' ),
			        'show_title'    => true,
			        'icon'          => 'accessibility_new',
			        'fields'        => []
		        ] ] +
		        array_slice( $tabs, $offset, NULL, true );

		# Website Owner's Contact Info header
		$tabs['accessibility_statement']['fields']['owner_contact_info_header'] = [
			'type'              => 'header',
			'label'             => esc_html__( 'Website Owner\'s Contact Info', 'readabler' ),
			'description'       => esc_html__( 'This contact info will be used in the Accessibility Statement, to comply with the WCAG 2.1, and therefore with the ADA and Section 508. We do not use personal information and abides by data privacy laws.', 'readabler' ),
			'default'           => ''
		];

		# Accessibility statement type
		$tabs['accessibility_statement']['fields']['statement_type'] = [
			'type'              => 'select',
			'label'             => esc_html__( 'Statement source:', 'readabler' ),
			'placeholder'       => esc_html__( 'Accessibility Statement', 'readabler' ),
			'description'       => esc_html__( 'Select the accessibility statement source', 'readabler' ),
			'default'           => 'inline',
			'options'           => [
				'inline' => esc_html__( 'Generated by plugin', 'readabler' ),
				'link'   => esc_html__( 'Custom link', 'readabler' ),
				'hide'   => esc_html__( 'None', 'readabler' )
			]
		];

		# Statement URL
		$tabs['accessibility_statement']['fields']['statement_link'] = [
			'type'              => 'text',
			'label'             => esc_html__( 'Statement URL:', 'readabler' ),
			'placeholder'       => esc_html__( 'URL', 'readabler' ),
			'description'       => esc_html__( 'Insert the accessibility statement link', 'readabler' ),
			'default'           => '',
			'attr'              => [
				'maxlength' => '4500'
			]
		];

		# Header generated
		$tabs['accessibility_statement']['fields']['owner_contact_info_header_generated'] = [
			'type'              => 'header',
			'description'       => '<strong>' . esc_html__( 'Note: ', 'readabler' ) . '</strong>' . esc_html__( 'If you are an agency purchasing for a client, you should enter your client\'s contact information.', 'readabler' ),
			'default'           => ''
		];

		# Website's Owner Name
		$tabs['accessibility_statement']['fields']['owner_name'] = [
			'type'              => 'text',
			'label'             => esc_html__( 'Website\'s Owner Name:', 'readabler' ),
			'placeholder'       => esc_html__( 'Full Name', 'readabler' ),
			'default'           => '',
			'attr'              => [
				'maxlength' => '4500'
			]
		];

		# Website's Owner Email
		$tabs['accessibility_statement']['fields']['owner_email'] = [
			'type'              => 'text',
			'label'             => esc_html__( 'Website\'s Owner Email:', 'readabler' ),
			'placeholder'       => esc_html__( 'E-mail', 'readabler' ),
			'default'           => '',
			'attr'              => [
				'maxlength' => '4500'
			]
		];

		# Website's Owner Phone
		$tabs['accessibility_statement']['fields']['owner_phone'] = [
			'type'              => 'text',
			'label'             => esc_html__( 'Website\'s Owner Phone:', 'readabler' ),
			'placeholder'       => esc_html__( 'phone', 'readabler' ),
			'default'           => '',
			'attr'              => [
				'maxlength' => '4500'
			]
		];

		# Accessibility Statement
        $tabs['accessibility_statement']['fields']['statement_text'] = [
            'type'              => 'editor',
            'label'             => esc_html__( 'Accessibility Statement:', 'readabler' ),
            'description'       => esc_html__( 'You can use special placeholders: {siteDomain}, {currentDate}, {contactEmail}, {contactName}, {contactPhone}. They will be replaced with their values accordingly.', 'readabler' ),
            'default'           => $this->get_default_statement(),
            'attr'              => [
                'textarea_rows' => '20',
            ]
        ];

		return $tabs;

	}

	/**
	 * Create Hot Keys tab.
	 *
	 * @param array $tabs - List of tabs with all settings and fields.
	 *
	 * @since  1.0.0
	 * @access public
	 *
	 * @return array - List of tabs with all settings and fields.
	 **/
	private function create_tab_hot_keys( $tabs ) {

		/** Shorthand for plugin settings. */
		$options = Settings::get_instance()->options;

		/** Add Hot keys tab after Accessibility Statement. */
		$offset = 5; // Position for new tab.
		$tabs = array_slice( $tabs, 0, $offset, true ) +
		        ['hot_keys' => [
			        'enabled'       => true,
			        'class'         => TabGeneral::class,
			        'label'         => esc_html__( 'Hot Keys', 'readabler' ),
			        'title'         => esc_html__( 'Hot Keys Settings', 'readabler' ),
			        'show_title'    => true,
			        'icon'          => 'keyboard',
			        'fields'        => []
		        ] ] +
		        array_slice( $tabs, $offset, NULL, true );

		# Supported Keys header
		$tabs['hot_keys']['fields']['supported_keys_header'] = [
			'type'              => 'header',
			'label'             => esc_html__( 'Supported Keys', 'readabler' ),
			'description'       => $this->get_keys_description(),
			'default'           => ''
		];

		# Divider
		$key = 'divider_popup_scroll';
		$tabs['hot_keys']['fields'][$key] = ['type' => 'divider', 'default' => ''];

		# Open the Accessibility Interface
		$tabs['hot_keys']['fields']['hot_key_open_interface'] = [
			'type'              => 'text',
			'label'             => esc_html__( 'Open Hot Key:', 'readabler' ),
			'placeholder'       => esc_html__( 'Open Hot Key', 'readabler' ),
			'description'       => esc_html__( 'Open the Accessibility Interface.', 'readabler' ),
			'default'           => 'Alt+9',
			'attr'              => [
				'maxlength' => '50'
			]
		];

		/** If Keyboard Navigation is enabled. */
		if (
			'on' === $options['keyboard_navigation'] ||
			'on' === $options['profile_blind_users']
		) {

			# Keyboard Menus Navigation
			$tabs['hot_keys']['fields']['hot_key_menu'] = [
				'type'              => 'text',
				'label'             => esc_html__( 'Keyboard Menus Navigation:', 'readabler' ),
				'placeholder'       => esc_html__( 'Menus Navigation Hot Key', 'readabler' ),
				'default'           => 'M',
				'attr'              => [
					'maxlength' => '10'
				]
			];

			# Keyboard Headings Navigation
			$tabs['hot_keys']['fields']['hot_key_headings'] = [
				'type'              => 'text',
				'label'             => esc_html__( 'Keyboard Headings Navigation:', 'readabler' ),
				'placeholder'       => esc_html__( 'Headings Navigation Hot Key', 'readabler' ),
				'default'           => 'H',
				'attr'              => [
					'maxlength' => '10'
				]
			];

			# Keyboard Forms Navigation
			$tabs['hot_keys']['fields']['hot_key_forms'] = [
				'type'              => 'text',
				'label'             => esc_html__( 'Keyboard Forms Navigation:', 'readabler' ),
				'placeholder'       => esc_html__( 'Forms Navigation Hot Key', 'readabler' ),
				'default'           => 'F',
				'attr'              => [
					'maxlength' => '10'
				]
			];

			# Keyboard Buttons Navigation
			$tabs['hot_keys']['fields']['hot_key_buttons'] = [
				'type'              => 'text',
				'label'             => esc_html__( 'Keyboard Buttons Navigation:', 'readabler' ),
				'placeholder'       => esc_html__( 'Buttons Navigation Hot Key', 'readabler' ),
				'default'           => 'B',
				'attr'              => [
					'maxlength' => '10'
				]
			];

			# Keyboard Graphics Navigation
			$tabs['hot_keys']['fields']['hot_key_graphics'] = [
				'type'              => 'text',
				'label'             => esc_html__( 'Keyboard Graphics Navigation:', 'readabler' ),
				'placeholder'       => esc_html__( 'Graphics Navigation Hot Key', 'readabler' ),
				'default'           => 'G',
				'attr'              => [
					'maxlength' => '10'
				]
			];
		}

		return $tabs;

	}

	/**
	 * Create Text to Speech tab.
	 *
	 * @param array $tabs - List of tabs with all settings and fields.
	 *
	 * @since  1.0.0
	 * @access public
	 *
	 * @return array - List of tabs with all settings and fields.
	 **/
	private function create_tab_text_to_speech( $tabs ) {

		/** Short hand access to plugin settings. */
		$options = Settings::get_instance()->options;

		/** Text To Speech. */
		if (
		    'on' !== $options['text_to_speech'] &&
			'on' !== $options['profile_blind_users']
		) { return $tabs; }

		/** Add Text to Speech tab after Hotkeys. */
		$offset = 6; // Position for new tab.
		$tabs = array_slice( $tabs, 0, $offset, true ) +
		        ['text_to_speech' => [
			        'enabled'       => true,
			        'class'         => TabGeneral::class,
			        'label'         => esc_html__( 'Text to Speech', 'readabler' ),
			        'title'         => esc_html__( 'Text to Speech Settings', 'readabler' ),
			        'show_title'    => true,
			        'icon'          => 'settings_voice',
			        'fields'        => []
		        ] ] +
	            array_slice( $tabs, $offset, NULL, true );

		/** Show this fields only if we have api key. */
		if ( isset( $options['api_key'] ) && $options['api_key'] ) {

			# Now used:
			$tabs['text_to_speech']['fields']['current_language'] = [
				'type'              => 'player',
				'render'            => [ TabTextToSpeech::get_instance(), 'render_current_language' ],
				'label'             => esc_html__( 'Now used:', 'readabler' ),
				'default'           => '',
			];

			# Select Language:
			$tabs['text_to_speech']['fields']['language'] = [
				'type'              => 'player',
				'render'            => [ TabTextToSpeech::get_instance(), 'render_language' ],
				'label'             => esc_html__( 'Select Language:', 'readabler' ),
				'default'           => 'en-US-Standard-D',
			];

			# Language Code.
			$tabs['text_to_speech']['fields']['language-code'] = [
				'type'              => 'text',
				'label'             => esc_html__( 'Language Code', 'readabler' ),
				'placeholder'       => esc_html__( 'Language Code', 'readabler' ),
				'default'           => 'en-US',
				'attr'              => [
					'class'     => 'mdp-hidden',
					'id'        => 'mdp-readabler-settings-language-code',
				]
			];

			# Audio Profile.
			$tabs['text_to_speech']['fields']['audio-profile'] = [
				'type'              => 'select',
				'label'             => esc_html__( 'Audio Profile:', 'readabler' ),
				'placeholder'       => esc_html__( 'Audio Profile', 'readabler' ),
				'description'       => esc_html__( 'Optimize the synthetic speech for playback on different types of hardware.', 'readabler' ),
				'default'           => 'handset-class-device',
				'options'           => [
					'wearable-class-device'                 => esc_html__( 'Smart watches and other wearables', 'readabler' ),
					'handset-class-device'                  => esc_html__( 'Smartphones', 'readabler' ),
					'headphone-class-device'                => esc_html__( 'Earbuds or headphones', 'readabler' ),
					'small-bluetooth-speaker-class-device'  => esc_html__( 'Small home speakers', 'readabler' ),
					'medium-bluetooth-speaker-class-device' => esc_html__( 'Smart home speakers', 'readabler' ),
					'large-home-entertainment-class-device' => esc_html__( 'Home entertainment systems', 'readabler' ),
					'large-automotive-class-device'         => esc_html__( 'Car speakers', 'readabler' ),
					'telephony-class-application'           => esc_html__( 'Interactive Voice Response', 'readabler' ),
				]
			];

			# Speaking Speed
			$key = 'speaking-rate';
			$tabs['text_to_speech']['fields'][$key] = [
				'type'              => 'slider',
				'label'             => esc_html__( 'Speaking Speed:', 'readabler' ),
				'description'       => esc_html__( 'Speaking rate:', 'readabler' ) .
				                       ' <strong>' .
				                       esc_html( ( ! empty( $options[$key] ) ) ? $options[$key] : 1 ) .
				                       '</strong>',
				'min'               => 0.25,
				'max'               => 4.0,
				'step'              => 0.25,
				'default'           => 1,
				'discrete'          => false,
			];

			# Pitch:
			$key = 'pitch';
			$tabs['text_to_speech']['fields'][$key] = [
				'type'              => 'slider',
				'label'             => esc_html__( 'Pitch:', 'readabler' ),
				'description'       => esc_html__( 'Current pitch:', 'readabler' ) .
				                       ' <strong>' .
				                       esc_html( ( ! empty( $options[$key] ) ) ? $options[$key] : 0 ) .
				                       '</strong>',
				'min'               => -20,
				'max'               => 20,
				'step'              => 0.1,
				'default'           => 0,
				'discrete'          => false,
			];

			# Divider
			$key = 'divider_pitch';
			$tabs['text_to_speech']['fields'][$key] = ['type' => 'divider', 'default' => ''];

			# Background Color:
			$tabs['text_to_speech']['fields']['text_to_speech_bg_color'] = [
				'type'              => 'colorpicker',
				'label'             => esc_html__( 'Background Color:', 'readabler' ),
				'placeholder'       => esc_html__( 'Background Color', 'readabler' ),
				'description'       => esc_html__( 'Select background color for text to speech tooltip.', 'readabler' ),
				'default'           => 'rgba(33, 150, 243, 1)',
				'attr'              => [
					'readonly'      => 'readonly',
				]
			];

			# Icon Color:
			$tabs['text_to_speech']['fields']['text_to_speech_icon_color'] = [
				'type'              => 'colorpicker',
				'label'             => esc_html__( 'Icon Color:', 'readabler' ),
				'placeholder'       => esc_html__( 'Icon Color', 'readabler' ),
				'description'       => esc_html__( 'Select icon color for text to speech tooltip.', 'readabler' ),
				'default'           => '#ffffff',
				'attr'              => [
					'readonly'      => 'readonly',
				]
			];

			# Divider
			$key = 'divider_guide';
			$tabs['text_to_speech']['fields'][$key] = ['type' => 'divider', 'default' => ''];

			# Voice Guide
			$tabs[ 'text_to_speech' ][ 'fields' ][ 'voice_guide' ] = [
				'type'              => 'text',
				'label'             => esc_html__( 'Voice guide', 'readabler' ),
				'placeholder'       => esc_html__( 'Voice guide', 'readabler' ),
				'default'           => esc_html__( 'Highlight a piece of text and click Play to listen', 'readabler' ),
				'description'       => esc_html__( 'This piece of text will be read and played immediately after activating Text to Speech function', 'readabler' ),
			];

			# Divider
			$key = 'divider_key';
			$tabs['text_to_speech']['fields'][$key] = ['type' => 'divider', 'default' => ''];

		}

		# API Key File:
		$tabs['text_to_speech']['fields']['api_key'] = [
			'type'              => 'dragdrop',
			'render'            => [ TabTextToSpeech::get_instance(), 'render_api_key' ],
			'label'             => esc_html__( 'API Key File:', 'readabler' ),
			'default'           => '',
		];

		return $tabs;

	}

	/**
	 * Return notes for hot keys tab.
	 *
	 * @since  1.0.0
	 * @access public
	 *
	 * @return string
	 **/
	private function get_keys_description() {

		return
			esc_html__( 'Hot Keys understands the following modifiers: ', 'readabler' ) .
			'<b>⇧</b> <b>shift</b> <b>option</b> <b>⌥</b> <b>alt</b> <b>ctrl</b> <b>⌃</b> <b>control</b> <b>command</b> <b>⌘</b>' .
			'<br><br>' .
			esc_html__( 'The following special keys can be used for shortcuts: ', 'readabler' ) .
			'<b>backspace</b> <b>tab</b> <b>clear</b> <b>enter</b> <b>return</b> <b>esc</b> <b>escape</b> <b>space</b> <b>up</b> <b>down</b> <b>left</b> <b>right</b> <b>home</b> <b>end</b> <b>pageup</b> <b>pagedown</b> <b>del</b> <b>delete</b> <b>f1..f12</b>' .
			'<br><br>' .
			esc_html__( 'Use the ', 'readabler' ) .
			'<b>+</b>' .
			esc_html__( ' to create key combination and use ', 'readabler' ) .
			'<b>,</b>' .
			esc_html__( ' to join multiple combinations: ', 'readabler' ) .
			'<b>ctrl+b, ⇧+r, ⌘+f</b>';
	}

	/**
	 * Create General tab.
	 *
	 * @param array $tabs - List of tabs with all settings and fields.
	 *
	 * @since  1.0.0
	 * @access public
	 *
	 * @return array - List of tabs with all settings and fields.
	 **/
	private function create_tab_general( $tabs ) {

		# Accessibility profiles header
        $tabs['general']['fields']['accessibility_profiles_header'] = [
            'type'              => 'header',
            'label'             => esc_html__( 'Accessibility modes', 'readabler' ),
            'description'       => esc_html__( 'Select pre-built disability modes.', 'readabler' ),
            'default'           => ''
        ];

		$tabs['general']['fields']['accessibility_profiles_heading'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Section title', 'readabler' ),
			'placeholder'       => esc_html__( 'Show section title', 'readabler' ),
			'description'       => esc_html__( 'Enable/disable the display of the current section  title.', 'readabler' ),
			'default'           => 'on',
		];

		# Epilepsy Safe Mode
		$tabs['general']['fields']['profile_epilepsy'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Epilepsy Safe Mode:', 'readabler' ),
			'placeholder'       => esc_html__( 'Epilepsy Safe Mode', 'readabler' ),
			'description'       => esc_html__( 'This profile enables people with epilepsy to use the website safely by eliminating the risk of seizures that result from flashing or blinking animations and risky color combinations.', 'readabler' ),
			'default'           => 'on',
		];

		# Visually Impaired Mode
		$tabs['general']['fields']['profile_visually_impaired'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Visually Impaired Mode:', 'readabler' ),
			'placeholder'       => esc_html__( 'Visually Impaired Mode', 'readabler' ),
			'description'       => esc_html__( 'This mode adjusts the website for the convenience of users with visual impairments such as Degrading Eyesight, Tunnel Vision, Cataract, Glaucoma, and others.', 'readabler' ),
			'default'           => 'on',
		];

		# Cognitive Disability Mode
		$tabs['general']['fields']['profile_cognitive_disability'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Cognitive Disability Mode:', 'readabler' ),
			'placeholder'       => esc_html__( 'Cognitive Disability Mode', 'readabler' ),
			'description'       => esc_html__( 'This mode provides different assistive options to help users with cognitive impairments such as Dyslexia, Autism, CVA, and others, to focus on the essential elements of the website more easily.', 'readabler' ),
			'default'           => 'on',
		];

		# ADHD Friendly Mode
		$tabs['general']['fields']['profile_adhd_friendly'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'ADHD Friendly Mode:', 'readabler' ),
			'placeholder'       => esc_html__( 'ADHD Friendly Mode', 'readabler' ),
			'description'       => esc_html__( 'This mode helps users with ADHD and Neurodevelopmental disorders to read, browse, and focus on the main website elements more easily while significantly reducing distractions.', 'readabler' ),
			'default'           => 'on',
		];

		# Blind Users Profile
		$tabs['general']['fields']['profile_blind_users'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Blindness Mode:', 'readabler' ),
			'placeholder'       => esc_html__( 'Blindness Mode', 'readabler' ),
			'description'       => esc_html__( 'This mode configures the website to be compatible with screen-readers such as JAWS, NVDA, VoiceOver, and TalkBack. A screen-reader is software for blind users that is installed on a  computer and smartphone, and websites must be compatible with it.', 'readabler' ),
			'default'           => 'on',
		];

        # Divider
        $key = 'divider_online_dictionary';
        $tabs['general']['fields'][$key] = ['type' => 'divider', 'default' => ''];


        # Accessibility profiles header
        $tabs['general']['fields']['online_dictionary_header'] = [
            'type'              => 'header',
            'label'             => esc_html__( 'Online Dictionary', 'readabler' ),
            'description'       => esc_html__( 'Select Wikipedia Online Dictionary.', 'readabler' ),
            'default'           => ''
        ];

        $tabs['general']['fields']['online_dictionary_heading'] = [
            'type'              => 'switcher',
            'label'             => esc_html__( 'Section heading:', 'readabler' ),
            'placeholder'       => esc_html__( 'Section heading', 'readabler' ),
            'description'       => esc_html__( 'Enable/disable the display of the current section heading.', 'readabler' ),
            'default'           => 'on',
        ];

        # Online Dictionary
        $tabs['general']['fields']['online_dictionary'] = [
            'type'              => 'switcher',
            'label'             => esc_html__( 'Online Dictionary:', 'readabler' ),
            'placeholder'       => esc_html__( 'Online Dictionary', 'readabler' ),
            'description'       => esc_html__( 'Allows searching for phrases, abbreviations and concepts for Cognitive Disorders.', 'readabler' ),
            'default'           => 'on',
        ];

		# Wikipedia Language
		$tabs['general']['fields']['dictionary_language'] = [
			'type'              => 'select',
			'label'             => esc_html__( 'Dictionary language:', 'readabler' ),
			'placeholder'       => esc_html__( 'Dictionary language', 'readabler' ),
			'description'       => esc_html__( 'Select the Wikipedia language to search', 'readabler' ),
			'default'           => 'auto',
			'options'           => [
				'auto' => esc_html__( 'Auto', 'readabler' ),
				'ar' => esc_html__( 'العربية', 'readabler' ), // Al-ʿArabīyah
				'ast' => esc_html__( 'Asturianu', 'readabler' ),
				'az' => esc_html__( 'Azərbaycanca', 'readabler' ),
				'bg' => esc_html__( 'Български', 'readabler' ), // Bǎlgarski
				'nan' => esc_html__( 'Bân-lâm-gú / Hō-ló-oē', 'readabler' ),
				'bn' => esc_html__( 'বাংলা', 'readabler' ), // Bangla
				'be' => esc_html__( 'Беларуская', 'readabler' ), // Belaruskaya
				'ca' => esc_html__( 'Català', 'readabler' ),
				'cs' => esc_html__( 'Čeština', 'readabler' ), // čeština
				'cy' => esc_html__( 'Cymraeg', 'readabler' ), // Cymraeg
				'da' => esc_html__( 'Dansk', 'readabler' ),
				'de' => esc_html__( 'Deutsch', 'readabler' ),
				'et' => esc_html__( 'Eesti', 'readabler' ),
				'el' => esc_html__( 'Ελληνικά', 'readabler' ), // Ellīniká
				'en' => esc_html__( 'English', 'readabler' ), // English
				'es' => esc_html__( 'Español', 'readabler' ),
				'eo' => esc_html__( 'Esperanto', 'readabler' ),
				'eu' => esc_html__( 'Euskara', 'readabler' ),
				'fa' => esc_html__( 'فارسی', 'readabler' ), // Fārsi
				'fr' => esc_html__( 'Français', 'readabler' ),
				'gl' => esc_html__( 'Galego', 'readabler' ),
				'hy' => esc_html__( 'Հայերեն', 'readabler' ), // Hayeren
				'hi' => esc_html__( 'हिन्दी', 'readabler' ), // Hindī
				'hr' => esc_html__( 'Hrvatski', 'readabler' ),
				'id' => esc_html__( 'Bahasa Indonesia', 'readabler' ),
				'it' => esc_html__( 'Italiano', 'readabler' ),
				'he' => esc_html__( 'עברית', 'readabler' ), // Ivrit
				'ka' => esc_html__( 'ქართული', 'readabler' ), // Kartuli
				'la' => esc_html__( 'Latina', 'readabler' ),
				'lv' => esc_html__( 'Latviešu', 'readabler' ),
				'lt' => esc_html__( 'Lietuvių', 'readabler' ),
				'hu' => esc_html__( 'Magyar', 'readabler' ),
				'mk' => esc_html__( 'Македонски', 'readabler' ), // Makedonski
				'arz' => esc_html__( 'مصرى', 'readabler' ), // Maṣrī
				'ms' => esc_html__( 'Bahasa Melayu', 'readabler' ),
				'min' => esc_html__( 'Bahaso Minangkabau', 'readabler' ),
				'my' => esc_html__( 'မြန်မာဘာသာ', 'readabler' ), // Myanmarsar
				'nl' => esc_html__( 'Nederlands', 'readabler' ),
				'ja' => esc_html__( '日本語', 'readabler' ), // Nihongo
				'nb' => esc_html__( 'Norsk (bokmål)', 'readabler' ),
				'nn' => esc_html__( 'Norsk (nynorsk)', 'readabler' ),
				'ce' => esc_html__( 'Нохчийн', 'readabler' ), // Noxçiyn
				'uz' => esc_html__( 'Oʻzbekcha / Ўзбекча', 'readabler' ),
				'pl' => esc_html__( 'Polski', 'readabler' ),
				'pt' => esc_html__( 'Português', 'readabler' ),
				'kk' => esc_html__( 'Қазақша / Qazaqşa / قازاقشا', 'readabler' ),
				'ro' => esc_html__( 'Română', 'readabler' ), // Română
				'ru' => esc_html__( 'Русский', 'readabler' ), // Russkiy
				'ceb' => esc_html__( 'Sinugboanong Binisaya', 'readabler' ),
				'sk' => esc_html__( 'Slovenčina', 'readabler' ),
				'sl' => esc_html__( 'Slovenščina', 'readabler' ),
				'sr' => esc_html__( 'Српски / Srpski', 'readabler' ),
				'sh' => esc_html__( 'Srpskohrvatski / Српскохрватски', 'readabler' ),
				'fi' => esc_html__( 'Suomi', 'readabler' ), // suomi
				'sv' => esc_html__( 'Svenska', 'readabler' ),
				'ta' => esc_html__( 'தமிழ்', 'readabler' ), // Tamiḻ
				'tt' => esc_html__( 'Татарча / Tatarça', 'readabler' ),
				'th' => esc_html__( 'ภาษาไทย', 'readabler' ), // Phasa Thai
				'tg' => esc_html__( 'Тоҷикӣ', 'readabler' ), // Tojikī
				'azb' => esc_html__( 'تۆرکجه', 'readabler' ), // Türkce
				'tr' => esc_html__( 'Türkçe', 'readabler' ), // Türkçe
				'uk' => esc_html__( 'Українська', 'readabler' ), // Ukrayins’ka
				'ur' => esc_html__( 'اردو', 'readabler' ), // Urdu
				'vi' => esc_html__( 'Tiếng Việt', 'readabler' ),
				'vo' => esc_html__( 'Volapük', 'readabler' ),
				'war' => esc_html__( 'Winaray', 'readabler' ),
				'yue' => esc_html__( '粵語', 'readabler' ), // Yuht Yúh / Jyut6 jyu5
				'zh' => esc_html__( '中文', 'readabler' ), // Zhōngwén
				'ko' => esc_html__( '한국어', 'readabler' ), // Hangugeo

			]
		];

        # Divider
		$key = 'divider_profile_blind_users';
		$tabs['general']['fields'][$key] = ['type' => 'divider', 'default' => ''];

		# Readable Experience header
		$tabs['general']['fields']['readable_experience_header'] = [
			'type'              => 'header',
			'label'             => esc_html__( 'Readable Experience', 'readabler' ),
			'description'       => esc_html__( 'Tools enable users to adjust how the content of your site is displayed, so it is as readable as possible to their particular disability.', 'readabler' ),
			'default'           => ''
		];

        $tabs['general']['fields']['readable_experience_heading'] = [
            'type'              => 'switcher',
            'label'             => esc_html__( 'Section title', 'readabler' ),
            'placeholder'       => esc_html__( 'Show section title', 'readabler' ),
            'description'       => esc_html__( 'Enable/disable the display of the current section  title.', 'readabler' ),
            'default'           => 'on',
        ];

		# Content Scaling
		$tabs['general']['fields']['content_scaling'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Content Scaling:', 'readabler' ),
			'placeholder'       => esc_html__( 'Content Scaling', 'readabler' ),
			'description'       => esc_html__( 'The option allows scaling the website content. ', 'readabler' ),
			'default'           => 'on',
		];

		# Readable Font
		$tabs['general']['fields']['readable_font'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Readable Font:', 'readabler' ),
			'placeholder'       => esc_html__( 'Readable Font', 'readabler' ),
			'description'       => esc_html__( 'The option converts the content font to a more readable one.', 'readabler' ),
			'default'           => 'on',
		];

		# Dyslexia Friendly
		$tabs['general']['fields']['dyslexia_font'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Dyslexia Friendly:', 'readabler' ),
			'placeholder'       => esc_html__( 'Dyslexia Friendly', 'readabler' ),
			'description'       => esc_html__( 'The option adapts the font to be more convenient for Dyslexic users.', 'readabler' ),
			'default'           => 'on',
		];

		# Highlight Titles
		$tabs['general']['fields']['highlight_titles'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Highlight Titles:', 'readabler' ),
			'placeholder'       => esc_html__( 'Highlight Titles', 'readabler' ),
			'description'       => esc_html__( 'The option highlights the titles with borders for all site content.', 'readabler' ),
			'default'           => 'on',
		];

		# Highlight Links
		$tabs['general']['fields']['highlight_links'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Highlight Links:', 'readabler' ),
			'placeholder'       => esc_html__( 'Highlight Links', 'readabler' ),
			'description'       => esc_html__( 'The option highlights the links with borders for all site content.', 'readabler' ),
			'default'           => 'on',
		];

		# Text Magnifier
		$tabs['general']['fields']['text_magnifier'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Text Magnifier:', 'readabler' ),
			'placeholder'       => esc_html__( 'Text Magnifier', 'readabler' ),
			'description'       => esc_html__( 'The option allows you to display specific text in the magnifier on hover.', 'readabler' ),
			'default'           => 'on',
		];

		# Font Sizing
		$tabs['general']['fields']['font_sizing'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Font Sizing:', 'readabler' ),
			'placeholder'       => esc_html__( 'Font Sizing', 'readabler' ),
			'description'       => esc_html__( 'The option allows you to change the text font size as a percentage.', 'readabler' ),
			'default'           => 'on',
		];

		# Line Height
		$tabs['general']['fields']['line_height'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Line Height:', 'readabler' ),
			'placeholder'       => esc_html__( 'Line Height', 'readabler' ),
			'description'       => esc_html__( 'The option allows you to change the font line-height as a percentage', 'readabler' ),
			'default'           => 'on',
		];

		# Letter Spacing
		$tabs['general']['fields']['letter_spacing'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Letter Spacing:', 'readabler' ),
			'placeholder'       => esc_html__( 'Letter Spacing', 'readabler' ),
			'description'       => esc_html__( 'The option allows you to change the text letter spacing as a percentage.', 'readabler' ),
			'default'           => 'on',
		];

		# Align Center
		$tabs['general']['fields']['align_center'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Align Center:', 'readabler' ),
			'placeholder'       => esc_html__( 'Align Center', 'readabler' ),
			'description'       => esc_html__( 'The option aligns the website content to the center.', 'readabler' ),
			'default'           => 'on',
		];

		# Align Left
		$tabs['general']['fields']['align_left'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Align Left:', 'readabler' ),
			'placeholder'       => esc_html__( 'Align Left', 'readabler' ),
			'description'       => esc_html__( 'The option aligns the website content to the left.', 'readabler' ),
			'default'           => 'on',
		];

		# Align Right
		$tabs['general']['fields']['align_right'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Align Right:', 'readabler' ),
			'placeholder'       => esc_html__( 'Align Right', 'readabler' ),
			'description'       => esc_html__( 'The option aligns the website content to the right.', 'readabler' ),
			'default'           => 'on',
		];

		# Divider
		$key = 'divider_align_right';
		$tabs['general']['fields'][$key] = ['type' => 'divider', 'default' => ''];

		# Visually Pleasing Experience Header
		$tabs['general']['fields']['visually_pleasing_experience_header'] = [
			'type'              => 'header',
			'label'             => esc_html__( 'Visually Pleasing Experience', 'readabler' ),
			'description'       => esc_html__( 'Tools relating to the colorization of your website.', 'readabler' ),
			'default'           => ''
		];

        $tabs['general']['fields']['visually_pleasing_heading'] = [
            'type'              => 'switcher',
            'label'             => esc_html__( 'Section title:', 'readabler' ),
            'placeholder'       => esc_html__( 'Show section title', 'readabler' ),
            'description'       => esc_html__( 'Enable/disable the display of the current section  title.', 'readabler' ),
            'default'           => 'on',
        ];

		# Dark Contrast
		$tabs['general']['fields']['dark_contrast'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Dark Contrast:', 'readabler' ),
			'placeholder'       => esc_html__( 'Dark Contrast', 'readabler' ),
			'description'       => esc_html__( 'The option sets a dark contrast for the content of the entire site.', 'readabler' ),
			'default'           => 'on',
		];

		# Light Contrast
		$tabs['general']['fields']['light_contrast'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Light Contrast:', 'readabler' ),
			'placeholder'       => esc_html__( 'Light Contrast', 'readabler' ),
			'description'       => esc_html__( 'The option sets a light contrast for the content of the entire site.', 'readabler' ),
			'default'           => 'on',
		];

		# Monochrome
		$tabs['general']['fields']['monochrome'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Monochrome:', 'readabler' ),
			'placeholder'       => esc_html__( 'Monochrome', 'readabler' ),
			'description'       => esc_html__( 'The option applies a monochrome color scheme for the entire site.', 'readabler' ),
			'default'           => 'on',
		];

		# High Saturation
		$tabs['general']['fields']['high_saturation'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'High Saturation:', 'readabler' ),
			'placeholder'       => esc_html__( 'High Saturation', 'readabler' ),
			'description'       => esc_html__( 'The option adds color saturation for the entire site content.', 'readabler' ),
			'default'           => 'on',
		];

		# High Contrast
		$tabs['general']['fields']['high_contrast'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'High Contrast:', 'readabler' ),
			'placeholder'       => esc_html__( 'High Contrast', 'readabler' ),
			'description'       => esc_html__( 'The option increases color contrast for the entire site content.', 'readabler' ),
			'default'           => 'on',
		];

		# Low Saturation
		$tabs['general']['fields']['low_saturation'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Low Saturation:', 'readabler' ),
			'placeholder'       => esc_html__( 'Low Saturation', 'readabler' ),
			'description'       => esc_html__( 'The option minimizes color saturation for the entire site content.', 'readabler' ),
			'default'           => 'on',
		];

		# Text Colors
		$tabs['general']['fields']['text_colors'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Text Colors:', 'readabler' ),
			'placeholder'       => esc_html__( 'Text Colors', 'readabler' ),
			'description'       => esc_html__( 'The option displays a color picker to adjust the text color of website content.', 'readabler' ),
			'default'           => 'on',
		];

		# Title Colors
		$tabs['general']['fields']['title_colors'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Title Colors:', 'readabler' ),
			'placeholder'       => esc_html__( 'Title Colors', 'readabler' ),
			'description'       => esc_html__( 'The option displays a color picker to adjust the title color of website content.', 'readabler' ),
			'default'           => 'on',
		];

		# Background Colors
		$tabs['general']['fields']['background_colors'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Background Colors:', 'readabler' ),
			'placeholder'       => esc_html__( 'Background Colors', 'readabler' ),
			'description'       => esc_html__( 'The option displays a color picker to adjust the background color of website content.', 'readabler' ),
			'default'           => 'on',
		];

		# Divider
		$key = 'divider_background_colors';
		$tabs['general']['fields'][$key] = ['type' => 'divider', 'default' => ''];

		# Easy Orientation
		$tabs['general']['fields']['easy_orientation_header'] = [
			'type'              => 'header',
			'label'             => esc_html__( 'Easy Orientation', 'readabler' ),
			'description'       => esc_html__( 'Tools for people with visual impairments, cognitive disabilities, or motor impairments to orient better at the site.', 'readabler' ),
			'default'           => ''
		];

        $tabs['general']['fields']['easy_orientation_heading'] = [
            'type'              => 'switcher',
            'label'             => esc_html__( 'Section title', 'readabler' ),
            'placeholder'       => esc_html__( 'Show section title', 'readabler' ),
            'description'       => esc_html__( 'Enable/disable the display of the current section  title.', 'readabler' ),
            'default'           => 'on',
        ];

		# Mute Sounds
		$tabs['general']['fields']['mute_sounds'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Mute Sounds:', 'readabler' ),
			'placeholder'       => esc_html__( 'Mute Sounds', 'readabler' ),
			'description'       => esc_html__( 'The option mutes all sounds on the site.', 'readabler' ),
			'default'           => 'on',
		];

		# Hide Images
		$tabs['general']['fields']['hide_images'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Hide Images:', 'readabler' ),
			'placeholder'       => esc_html__( 'Hide Images', 'readabler' ),
			'description'       => esc_html__( 'The option hides all images on the site.', 'readabler' ),
			'default'           => 'on',
		];

		# Virtual Keyboard
		$tabs['general']['fields']['virtual_keyboard'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Virtual Keyboard:', 'readabler' ),
			'placeholder'       => esc_html__( 'Virtual Keyboard', 'readabler' ),
			'description'       => esc_html__( 'The option enables the virtual keyboard when any one of the input fields is active.', 'readabler' ),
			'default'           => 'on',
		];

		# Reading Guide
		$tabs['general']['fields']['reading_guide'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Reading Guide:', 'readabler' ),
			'placeholder'       => esc_html__( 'Reading Guide', 'readabler' ),
			'description'       => esc_html__( 'The option displays a guideline that follows the cursor and helps to concentrate only on the specific text.', 'readabler' ),
			'default'           => 'on',
		];

		# Useful Links
		$tabs['general']['fields']['useful_links'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Useful Links:', 'readabler' ),
			'placeholder'       => esc_html__( 'Useful Links', 'readabler' ),
			'description'       => esc_html__( 'The option displays a select list of useful site links to get the necessary info without site research.', 'readabler' ),
			'default'           => 'on',
		];

		# Stop Animations
		$tabs['general']['fields']['stop_animations'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Stop Animations:', 'readabler' ),
			'placeholder'       => esc_html__( 'Stop Animations', 'readabler' ),
			'description'       => esc_html__( 'The option allows disabling animations on the site.', 'readabler' ),
			'default'           => 'on',
		];

		# Reading Mask
		$tabs['general']['fields']['reading_mask'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Reading Mask:', 'readabler' ),
			'placeholder'       => esc_html__( 'Reading Mask', 'readabler' ),
			'description'       => esc_html__( 'The option creates a horizontal mask of a certain height that follows the cursor and allows you to select and focus only on a certain part of the content.', 'readabler' ),
			'default'           => 'on',
		];

		# Highlight Hover
		$tabs['general']['fields']['highlight_hover'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Highlight Hover:', 'readabler' ),
			'placeholder'       => esc_html__( 'Highlight Hover', 'readabler' ),
			'description'       => esc_html__( 'The option highlights the hover area by borders.', 'readabler' ),
			'default'           => 'on',
		];

		# Highlight Focus
		$tabs['general']['fields']['highlight_focus'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Highlight Focus:', 'readabler' ),
			'placeholder'       => esc_html__( 'Highlight Focus', 'readabler' ),
			'description'       => esc_html__( 'The option highlights the focus area by borders.', 'readabler' ),
			'default'           => 'on',
		];

		# Big Black Cursor
		$tabs['general']['fields']['big_black_cursor'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Big Dark Cursor:', 'readabler' ),
			'placeholder'       => esc_html__( 'Big Dark Cursor', 'readabler' ),
			'description'       => esc_html__( 'The option enables a large black cursor instead of the regular one.', 'readabler' ),
			'default'           => 'on',
		];

		# Big White Cursor
		$tabs['general']['fields']['big_white_cursor'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Big Light Cursor:', 'readabler' ),
			'placeholder'       => esc_html__( 'Big Light Cursor', 'readabler' ),
			'description'       => esc_html__( 'The option enables a large white cursor instead of the regular one.', 'readabler' ),
			'default'           => 'on',
		];

		# Text to Speech
		$tabs['general']['fields']['text_to_speech'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Text to Speech:', 'readabler' ),
			'placeholder'       => esc_html__( 'Text to Speech', 'readabler' ),
			'description'       => esc_html__( 'The option enables the Text-to-Speech feature. Audio is generated when the user highlights text. Before activating this feature, please upload the API key file on the "Text to Speech" tab.', 'readabler' ),
			'default'           => 'off',
		];

		# Keyboard Navigation
		$tabs['general']['fields']['keyboard_navigation'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Keyboard Navigation:', 'readabler' ),
			'placeholder'       => esc_html__( 'Keyboard Navigation', 'readabler' ),
			'description'       => esc_html__( 'The option enables a keyboard navigation feature.', 'readabler' ),
			'default'           => 'on',
		];

		$key = 'divider_themes_settings';
		$tabs['general']['fields'][$key] = ['type' => 'divider', 'default' => ''];

		$tabs['general']['fields']['themes_settings_header'] = [
			'type'              => 'header',
			'label'             => esc_html__( 'WordPress Themes & Plugins compatibility', 'readabler' ),
			'description'       => esc_html__( 'A group of settings to improve the compatibility of the plugin with other plugins or themes.', 'readabler' ),
			'default'           => ''
		];

		$tabs['general']['fields']['late_load'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'Late CSS and JS loading', 'readabler' ),
			'description'       => esc_html__( 'Enables later loading of styles and scripts. Use this option if some of the pages are missing Readable styles or scripts.', 'readabler' ),
			'default'           => 'off',
		];

		$tabs['general']['fields']['copyscape_skip'] = [
			'type'              => 'switcher',
			'label'             => esc_html__( 'CopyScape Skip', 'readabler' ),
			'description'       => esc_html__( 'Ignore the markup of the plugin interface when parsing with the CopyScape', 'readabler' ),
			'default'           => 'off',
		];

		return $tabs;

	}

	/**
	 * Return default Accessibility Statement text.
	 *
	 * @since  1.0.0
	 * @access public
	 *
	 * @return string
	 **/
	private function get_default_statement() {

		// language=HTML
		return "<header>
	<h2>Accessibility Statement</h2>
	<ul>
	    <li>{siteDomain}</li>
	    <li>{currentDate}</li>
	</ul>
</header>

<h3>Compliance status</h3>
<p>We firmly believe that the internet should be available and accessible to anyone, and are committed to providing a website that is accessible to the widest possible audience,
regardless of circumstance and ability.</p>

<p>To fulfill this, we aim to adhere as strictly as possible to the World Wide Web Consortium’s (W3C) Web Content Accessibility Guidelines 2.1 (WCAG 2.1) at the AA level.
These guidelines explain how to make web content accessible to people with a wide array of disabilities. Complying with those guidelines helps us ensure that the website is accessible
to all people: blind people, people with motor impairments, visual impairment, cognitive disabilities, and more.</p>

<p>This website utilizes various technologies that are meant to make it as accessible as possible at all times. We utilize an accessibility interface that allows persons with specific
disabilities to adjust the website’s UI (user interface) and design it to their personal needs.</p>

<p>Additionally, the website utilizes an AI-based application that runs in the background and optimizes its accessibility level constantly. This application remediates the website’s HTML,
adapts Its functionality and behavior for screen-readers used by the blind users, and for keyboard functions used by individuals with motor impairments.</p>

<p>If you’ve found a malfunction or have ideas for improvement, we’ll be happy to hear from you. You can reach out to the website’s operators by using the following email {contactEmail}</p>

<h3>Screen-reader and keyboard navigation</h3>

<p>Our website implements the ARIA attributes (Accessible Rich Internet Applications) technique, alongside various different behavioral changes, to ensure blind users visiting with
screen-readers are able to read, comprehend, and enjoy the website’s functions. As soon as a user with a screen-reader enters your site, they immediately receive
a prompt to enter the Screen-Reader Profile so they can browse and operate your site effectively. Here’s how our website covers some of the most important screen-reader requirements,
alongside console screenshots of code examples:</p>

<ol>
 	<li>
 	
	    <p><strong>Screen-reader optimization: </strong>we run a background process that learns the website’s components from top to bottom, to ensure ongoing compliance even when updating the website.
	In this process, we provide screen-readers with meaningful data using the ARIA set of attributes. For example, we provide accurate form labels;
	descriptions for actionable icons (social media icons, search icons, cart icons, etc.); validation guidance for form inputs; element roles such as buttons, menus, modal dialogues (popups),
	and others. Additionally, the background process scans all of the website’s images and provides an accurate and meaningful image-object-recognition-based description as an ALT (alternate text) tag
	for images that are not described. It will also extract texts that are embedded within the image, using an OCR (optical character recognition) technology.
	To turn on screen-reader adjustments at any time, users need only to press the Alt+1 keyboard combination. Screen-reader users also get automatic announcements to turn the Screen-reader mode on
	as soon as they enter the website.</p>
	
		<p>These adjustments are compatible with all popular screen readers, including JAWS and NVDA.</p>
	</li>
 	<li>
 		<p><strong>Keyboard navigation optimization: </strong>The background process also adjusts the website’s HTML, and adds various behaviors using JavaScript code to make the website operable by the keyboard. This includes the ability to navigate the website using the Tab and Shift+Tab keys, operate dropdowns with the arrow keys, close them with Esc, trigger buttons and links using the Enter key, navigate between radio and checkbox elements using the arrow keys, and fill them in with the Spacebar or Enter key.Additionally, keyboard users will find quick-navigation and content-skip menus, available at any time by clicking Alt+1, or as the first elements of the site while navigating with the keyboard. The background process also handles triggered popups by moving the keyboard focus towards them as soon as they appear, and not allow the focus drift outside of it.</p> 
		<p>Users can also use shortcuts such as “M” (menus), “H” (headings), “F” (forms), “B” (buttons), and “G” (graphics) to jump to specific elements.</p>
	</li>
</ol>

<h3>Disability profiles supported in our website</h3>
<ul>
 	<li><strong>Epilepsy Safe Mode:</strong> this profile enables people with epilepsy to use the website safely by eliminating the risk of seizures that result from flashing or blinking animations and risky color combinations.</li>
 	<li><strong>Visually Impaired Mode:</strong> this mode adjusts the website for the convenience of users with visual impairments such as Degrading Eyesight, Tunnel Vision, Cataract, Glaucoma, and others.</li>
 	<li><strong>Cognitive Disability Mode:</strong> this mode provides different assistive options to help users with cognitive impairments such as Dyslexia, Autism, CVA, and others, to focus on the essential elements of the website more easily.</li>
 	<li><strong>ADHD Friendly Mode:</strong> this mode helps users with ADHD and Neurodevelopmental disorders to read, browse, and focus on the main website elements more easily while significantly reducing distractions.</li>
 	<li><strong>Blindness Mode:</strong> this mode configures the website to be compatible with screen-readers such as JAWS, NVDA, VoiceOver, and TalkBack. A screen-reader is software for blind users that is installed on a  computer and smartphone, and websites must be compatible with it.</li>
 	<li><strong>Keyboard Navigation Profile (Motor-Impaired):</strong> this profile enables motor-impaired persons to operate the website using the keyboard Tab, Shift+Tab, and the Enter keys. Users can also use shortcuts such as “M” (menus), “H” (headings), “F” (forms), “B” (buttons), and “G” (graphics) to jump to specific elements.</li>
</ul>

<h3>Additional UI, design, and readability adjustments</h3>
<ol>
 	<li><strong>Font adjustments –</strong> users, can increase and decrease its size, change its family (type), adjust the spacing, alignment, line height, and more.</li>
 	<li><strong>Color adjustments –</strong> users can select various color contrast profiles such as light, dark, inverted, and monochrome. Additionally, users can swap color schemes of titles, texts, and backgrounds, with over 7 different coloring options.</li>
 	<li><strong>Animations –</strong> epileptic users can stop all running animations with the click of a button. Animations controlled by the interface include videos, GIFs, and CSS flashing transitions.</li>
 	<li><strong>Content highlighting –</strong> users can choose to emphasize important elements such as links and titles. They can also choose to highlight focused or hovered elements only.</li>
 	<li><strong>Audio muting –</strong> users with hearing devices may experience headaches or other issues due to automatic audio playing. This option lets users mute the entire website instantly.</li>
 	<li><strong>Cognitive disorders –</strong> we utilize a search engine that is linked to Wikipedia and Wiktionary, allowing people with cognitive disorders to decipher meanings of phrases, initials, slang, and others.</li>
 	<li><strong>Additional functions –</strong> we provide users the option to change cursor color and size, use a printing mode, enable a virtual keyboard, and many other functions.</li>
</ol>

<h3>Browser and assistive technology compatibility</h3>

<p>We aim to support the widest array of browsers and assistive technologies as possible, so our users can choose the best fitting tools for them, with as few limitations as possible. Therefore, we have worked very hard to be able to support all major systems that comprise over 95% of the user market share including Google Chrome, Mozilla Firefox, Apple Safari, Opera and Microsoft Edge, JAWS and NVDA (screen readers), both for Windows and for MAC users.</p>

<h3>Notes, comments, and feedback</h3>
<p>Despite our very best efforts to allow anybody to adjust the website to their needs, there may still be pages or sections that are not fully accessible, are in the process of becoming accessible, or are lacking an adequate technological solution to make them accessible. Still, we are continually improving our accessibility, adding, updating and improving its options and features, and developing and adopting new technologies. All this is meant to reach the optimal level of accessibility, following technological advancements. For any assistance, please reach out to {contactEmail}</p>";

	}

	/**
	 * Reset API Key on fatal error.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 **/
	private function reset_api_key() {

		/** Remove API Key. */
		$options = get_option( 'mdp_readabler_text_to_speech_settings' );
		$options['api_key'] = '';

		/** Save new value. */
		update_option( 'mdp_readabler_text_to_speech_settings', $options );

		/** Go to Text to Speech tab. */
		wp_redirect( admin_url( '/admin.php?page=mdp_readabler_settings&tab=text_to_speech' ) );
		exit;

	}

	/**
	 * Main Settings Instance.
	 * Insures that only one instance of Settings exists in memory at any one time.
	 *
	 * @static
     * @since 1.0.0
     * @access public
     *
	 * @return Config
	 **/
	public static function get_instance() {

		if ( ! isset( self::$instance ) && ! ( self::$instance instanceof self ) ) {

			self::$instance = new self;

		}

		return self::$instance;

	}

}
