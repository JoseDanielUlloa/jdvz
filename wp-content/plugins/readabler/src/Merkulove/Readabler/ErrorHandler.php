<?php
/**
 * Readabler
 * Web accessibility for Your WordPress site.
 * Exclusively on https://1.envato.market/readabler
 *
 * @encoding        UTF-8
 * @version         1.3.1
 * @copyright       (C) 2018 - 2022 Merkulove ( https://merkulov.design/ ). All rights reserved.
 * @license         Envato License https://1.envato.market/KYbje
 * @contributors    Nemirovskiy Vitaliy (nemirovskiyvitaliy@gmail.com), Dmitry Merkulov (dmitry@merkulov.design)
 * @support         help@merkulov.design
 * @license         Envato License https://1.envato.market/KYbje
 **/

namespace Merkulove\Readabler;

use Exception;
use Merkulove\Readabler\Unity\UI;

/** Exit if accessed directly. */
if ( ! defined( 'ABSPATH' ) ) {
	header( 'Status: 403 Forbidden' );
	header( 'HTTP/1.1 403 Forbidden' );
	exit;
}

/**
 * SINGLETON: Class for handler errors with extra features.
 * @since 1.0.0
 **/
final class ErrorHandler {

	/**
	 * Custom error handler function.
	 *
	 * @param  int          $err_no   Error number. (can be a PHP Error level constant)
	 * @param  string       $err_str  Error description.
	 * @param  string|false $err_file File in which the error occurs.
	 * @param  int|false    $err_line Line number where the error is situated.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @example:
	 * <code>
	 * // Set custom error handler.
	 * set_error_handler( [ErrorHandler::class, 'error_handler'] );
	 *
	 * ...
	 *
	 * // Trigger custom error.
	 * trigger_error("A custom error has been triggered" );
	 *
	 * ...
	 *
	 * // Restores previous error handler.
	 * restore_error_handler();
	 * </code>
	 **/
	public static function error_handler( $err_no, $err_str, $err_file = false, $err_line = false ) {

		/** Render "Error" message. */
		UI::get_instance()->render_snackbar(
			esc_html__( 'Error number: ', 'readabler' ) . $err_no . '. ' .
			$err_str . esc_html__( ' in ', 'readabler' ) . $err_file .
			esc_html__( ' on line ', 'readabler' ) . $err_line,
			'error', // Type
			-1, // Timeout
			true // Is Closable
		);

	}

	/**
	 * Custom error handler function.
	 *
	 * @param  Exception $exception
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @example:
	 * <code>
	 * // Set custom exception handler.
	 * set_exception_handler( [ErrorHandler::class, 'exception_handler'] );
	 *
	 * ...
	 *
	 * // Restores previous exception handler.
	 * restore_exception_handler();
	 * </code>
	 **/
	public static function exception_handler( $exception ) {

		$msg = $exception->getMessage();
		$file = $exception->getFile();
		$line = $exception->getLine();

		?>
        <div class="mdp-key-error">
            <?php
                esc_html_e( 'Error: ', 'readabler' );
                esc_html_e( $msg );
                echo "<br>";
                esc_html_e( 'In: ', 'readabler' );
                esc_html_e( $file );
                esc_html_e( ' on line ', 'readabler' );
                esc_html_e( $line );
		    ?>
        </div>
        <p>
            <?php esc_html_e( 'If you think the error is caused by an invalid key file then ', 'readabler' ); ?>
            <a href="/wp-admin/admin.php?page=mdp_readabler_settings&tab=general&reset-api-key=1"><?php esc_attr_e( 'Reset API Key', 'readabler' ); ?></a>
        </p>
        <?php

	}


} // End Class ErrorHandler.
