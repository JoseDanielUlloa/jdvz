<?php

// Add dynamic title tag and custom logo support
function jdvz_theme_support() {
    add_theme_support('title-tag');
    add_theme_support('custom-logo');
}
add_action('after_setup_theme', 'jdvz_theme_support');

// Enqueue styles
function jdvz_register_styles() {
    $version = wp_get_theme()->get( 'Version' );
    wp_enqueue_style('jdvz-stlye', get_template_directory_uri() . "/style.css", array('jdvz-normalize'), $version, 'all');
    wp_enqueue_style('jdvz-normalize', get_template_directory_uri() . "/assets/css/normalize.css", array(), '8.0.1', 'all');
    wp_enqueue_style('jdvz-fontawesome', "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css", array(), '6.0.0', 'all');
}
add_action( 'wp_enqueue_scripts', 'jdvz_register_styles');

// Enqueue scripts
function jdvz_register_scripts() {
    $version = wp_get_theme()->get( 'Version' );
    wp_enqueue_script('jdvz-main', get_template_directory_uri() . "/assets/js/main.js", array(), $version, true);

}
add_action( 'wp_enqueue_scripts', 'jdvz_register_scripts');

// Add menus
function jdvz_menus() {
    $locations = array(
        'left' => "Left Side Menu Items",
        'social' => "Social Menu Items"
    );
    register_nav_menus($locations);
}
add_action('init', 'jdvz_menus');