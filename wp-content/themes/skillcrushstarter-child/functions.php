<?php
/**
* Skillcrush Starter Child functions and definitions
*
* @link http://codex.wordpress.org/Theme_Development
* @link http://codex.wordpress.org/Child_Themes
*
* @package WordPress
* @subpackage Skillcrush Starter
* @since Skillcrush Starter 2.0
*/

// Enqueue scripts and styles
function skillcrushstarter_child_scripts(){
wp_enqueue_style( 'skillcrushstarter-style', get_template_directory_uri() . '/style.css' );
wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/style.css', array( 'skillcrushstarter-style' ));
}
add_action( 'wp_enqueue_scripts', 'skillcrushstarter_child_scripts' );