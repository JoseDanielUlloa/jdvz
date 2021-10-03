<?php
// Enqueue styles
function jdvz_register_styles() {
    $version = wp_get_theme()->get( 'Version' );
    wp_enqueue_style('jdvz-stlye', get_template_directory_uri() . "/style.css", array('jdvz-bootstrap'), $version, 'all');
    wp_enqueue_style('jdvz-bootstrap', "https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.cs", array(), '5.1.1', 'all');
    wp_enqueue_style('jdvz-fontawesome', "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css", array(), '6.0.0', 'all');
}
add_action( 'wp_enqueue_scripts', 'jdvz_register_styles');

// Enqueue scripts
function jdvz_register_scripts() {
    $version = wp_get_theme()->get( 'Version' );
    wp_enqueue_script('jdvz-jquery', "https://code.jquery.com/jquery-3.6.0.slim.min.js", array(), '3.6.0', true);
    wp_enqueue_script('jdvz-popper', "https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js", array(), '2.9.3', true);
    wp_enqueue_script('jdvz-bootstrap', "https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.min.js", array(), '5.1.1', true);
    wp_enqueue_script('jdvz-main', get_template_directory_uri() . "/assets/js/main.js", array(), $version, true);

}
add_action( 'wp_enqueue_scripts', 'jdvz_register_scripts');

?>