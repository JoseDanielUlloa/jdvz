<?php
/**
 * Readabler
 * Web accessibility for Your WordPress site.
 * Exclusively on https://1.envato.market/readabler
 *
 * @encoding        UTF-8
 * @version         1.2.13
 * @copyright       (C) 2018 - 2022 Merkulove ( https://merkulov.design/ ). All rights reserved.
 * @license         Envato License https://1.envato.market/KYbje
 * @contributors    Nemirovskiy Vitaliy (nemirovskiyvitaliy@gmail.com), Dmitry Merkulov (dmitry@merkulov.design)
 * @support         help@merkulov.design
 * @license         Envato License https://1.envato.market/KYbje
 **/

namespace Merkulove\Readabler;

use Google\Cloud\TextToSpeech\V1\TextToSpeechClient;
use Merkulove\Readabler\Unity\Plugin;
use Merkulove\Readabler\Unity\Settings;
use Merkulove\Readabler\Unity\Tab;
use Merkulove\Readabler\Unity\TabGeneral;
use Merkulove\Readabler\Unity\UI;

/** Exit if accessed directly. */
if ( ! defined( 'ABSPATH' ) ) {
    header( 'Status: 403 Forbidden' );
    header( 'HTTP/1.1 403 Forbidden' );
    exit;
}

/**
 * SINGLETON: Class used to implement Text To Speech tab with settings.
 * @since 1.0.0
 **/
final class TabTextToSpeech extends Tab {

	/**
	 * The one true TabTextToSpeech.
	 *
     * @since 1.0.0
     * @access private
	 * @var TabTextToSpeech
	 **/
	private static $instance;

	/**
	 * Render Select Language field.
	 *
	 * @param string $key - Field key.
	 * @param string $tab_slug - Tab slug to which the field belongs.
	 *
	 * @since  1.0.0
	 * @access public
	 *
	 * @return void
	 *
	 * @noinspection PhpUnused
	 **/
	public function render_language( $key, $tab_slug ) {

		/** Setting custom exception handler. */
		set_exception_handler( [ ErrorHandler::class, 'exception_handler' ] );

		/** Includes the autoloader for libraries installed with Composer. */
		require Plugin::get_path() . 'vendor/autoload.php';

		/** Create client object. */
		$client = new TextToSpeechClient();

		/** Perform list voices request. */
		$response = $client->listVoices();
		$voices   = $response->getVoices();

		if ( count( $voices ) === 0 ) {
			?>
            <div class="mdp-key-error"><?php esc_html_e( 'Failed to get the list of languages. The request failed. It looks like a problem with your API Key File. Make sure that you are using the correct key file, and that the quotas have not been exceeded. If you set security restrictions on a key, make sure that the current domain is added to the exceptions.', 'readabler' ); ?></div><?php
			return;
		}

		/** Prepare Languages Options. */
		$languages = [];
		$languages[] = esc_html__( 'Select Language', 'readabler' );
		foreach ( $voices as $voice ) {
			$lang = $this->get_lang_by_code( $voice->getLanguageCodes() );
			$languages[$lang] = $lang;
		}

		/** Render Language select. */
		UI::get_instance()->render_select(
			$languages,
			'',
			esc_html__('Language', 'readabler' ),
			'',
			[
				'name' => 'mdp_readabler_language_filter',
				'id' => 'mdp-readabler-language-filter'
			]
		);

		/** Shorthand for plugin settings. */
		$options = Settings::get_instance()->options;

		?>

        <div class="mdc-text-field-helper-line mdp-readabler-helper-padding">
            <div class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent"><?php esc_html_e( 'The list includes both standard and', 'readabler' ); ?>
                <a href="https://cloud.google.com/text-to-speech/docs/wavenet"
                   target="_blank"><?php esc_html_e( 'WaveNet voices', 'readabler' ); ?></a>.
				<?php esc_html_e( 'WaveNet voices are higher quality voices with different', 'readabler' ); ?>
                <a href="https://cloud.google.com/text-to-speech/pricing"
                   target="_blank"><?php esc_html_e( 'pricing', 'readabler' ); ?></a>;
				<?php esc_html_e( 'in the list, they have the voice type "WaveNet".', 'readabler' ); ?>
            </div>
        </div>

        <table id="mdp-readabler-settings-language-tbl" class="display stripe hidden">
            <thead>
            <tr>
                <th><?php esc_html_e( 'Language', 'readabler' ); ?></th>
                <th><?php esc_html_e( 'Voice', 'readabler' ); ?></th>
                <th><?php esc_html_e( 'Gender', 'readabler' ); ?></th>
            </tr>
            </thead>
            <tbody>
			<?php foreach ( $voices as $voice ) : ?>
                <tr <?php if ( $voice->getName() === $options['language'] ) { echo 'class="selected"'; } ?>>
                    <td class="mdp-lang-name">
						<?php echo esc_html( $this->get_lang_by_code( $voice->getLanguageCodes() ) ); // Language. ?>
                    </td>
                    <td>
                        <span class="mdp-lang-code" title="<?php echo esc_html( $voice->getLanguageCodes()[0] ); // Language Code ?>"><?php echo esc_html( $voice->getLanguageCodes()[0] ); // Language Code  ?></span>
                        -
                        <span><?php echo $this->get_voice_type( $voice->getName() ); //Voice Type ?></span>
                        -
                        <span class="mdp-voice-name" title="<?php echo esc_html( $voice->getName() ); // Voice name ?>"><?php echo esc_html( substr( $voice->getName(), -1 ) ); // Voice Variant ?></span>
                    </td>
                    <td>
						<?php
						/** SSML voice gender values from TextToSpeech\V1\SsmlVoiceGender. */
						$ssmlVoiceGender = [ 'SSML_VOICE_GENDER_UNSPECIFIED', 'Male', 'Female', 'Neutral' ];

						echo '<span title="' . esc_attr( $ssmlVoiceGender[ $voice->getSsmlGender() ], 'readabler' ) . '"><img src="' . Plugin::get_url() . 'images/' . strtolower( $ssmlVoiceGender[ $voice->getSsmlGender() ] ) . '.svg" alt="' . esc_attr( $ssmlVoiceGender[ $voice->getSsmlGender() ], 'readabler' ) . '">' . esc_html( $ssmlVoiceGender[ $voice->getSsmlGender() ] ) . '</span>'; ?>
                    </td>
                </tr>
			<?php endforeach;

			$client->close();

			?>
            </tbody>

        </table>

        <input id="mdp-readabler-settings-language" type='hidden' name='mdp_readabler_text_to_speech_settings[language]'
               value='<?php echo esc_attr( $options['language'] ); ?>'>
<!--        <input id="mdp-readabler-settings-language-code" type='hidden' name='mdp_readabler_text_to_speech_settings[language-code]'-->
<!--               value='--><?php //echo esc_attr( $options['language-code'] ); ?><!--'>-->
		<?php

		/** Restore previous exception handler. */
		restore_exception_handler();

    }

	/**
	 * Return Voice Type.
	 *
	 * @param $lang_name - Google voice name.
	 *
	 * @return string
	 * @since 1.0.0
	 * @access public
	 **/
	public function get_voice_type( $lang_name ) {

		$pos = strpos( $lang_name, 'Wavenet' );

		if ( false === $pos ) {
			return '<img src="' . Plugin::get_url() . 'images/standard.svg" alt="Standard">' . esc_html( 'Standard' );
		}

		return '<img src="' . Plugin::get_url() . 'images/wavenet.svg" alt="WaveNet">' . esc_html( 'WaveNet' );

	}

	/**
	 * Return language name by code.
	 *
	 * @param $lang_code - Google language code.
	 *
	 * @return mixed
	 * @since 2.0.0
	 * @access public
	 */
	public function get_lang_by_code( $lang_code ) {

		if ( is_object( $lang_code ) ) {
			$lang_code = $lang_code[0];
		}

		/** @noinspection SpellCheckingInspection */
		$languages = [
			'da-DK'  => 'Danish (Dansk)',
			'nl-NL'  => 'Dutch (Nederlands)',
			'en-AU'  => 'English (Australian)',
			'en-GB'  => 'English (UK)',
			'en-US'  => 'English (US)',
			'fr-CA'  => 'French Canada (Français)',
			'fr-FR'  => 'French France (Français)',
			'de-DE'  => 'German (Deutsch)',
			'it-IT'  => 'Italian (Italiano)',
			'ja-JP'  => 'Japanese (日本語)',
			'ko-KR'  => 'Korean (한국어)',
			'nb-NO'  => 'Norwegian (Norsk)',
			'pl-PL'  => 'Polish (Polski)',
			'pt-BR'  => 'Portuguese Brazil (Português)',
			'pt-PT'  => 'Portuguese Portugal (Portugal)',
			'ru-RU'  => 'Russian (Русский)',
			'sk-SK'  => 'Slovak (Slovenčina)',
			'es-ES'  => 'Spanish (Español)',
			'sv-SE'  => 'Swedish (Svenska)',
			'tr-TR'  => 'Turkish (Türkçe)',
			'uk-UA'  => 'Ukrainian (Українська)',
			'ar-XA'  => 'Arabic (العربية)',
			'cs-CZ'  => 'Czech (Čeština)',
			'el-GR'  => 'Greek (Ελληνικά)',
			'en-IN'  => 'Indian English',
			'fi-FI'  => 'Finnish (Suomi)',
			'vi-VN'  => 'Vietnamese (Tiếng Việt)',
			'id-ID'  => 'Indonesian (Bahasa Indonesia)',
			'fil-PH' => 'Philippines (Filipino)',
			'hi-IN'  => 'Hindi (हिन्दी)',
			'hu-HU'  => 'Hungarian (Magyar)',
			'cmn-CN' => 'Chinese (官话)',
			'cmn-TW' => 'Taiwanese Mandarin (中文(台灣))',
			'bn-IN'  => 'Bengali (বাংলা)',
			'gu-IN'  => 'Gujarati (ગુજરાતી)',
			'kn-IN'  => 'Kannada (ಕನ್ನಡ)',
			'ml-IN'  => 'Malayalam (മലയാളം)',
			'ta-IN'  => 'Tamil (தமிழ்)',
			'te-IN'  => 'Telugu (తెలుగు)',
			'th-TH'  => 'Thai (ภาษาไทย)',
			'yue-HK' => 'Yue Chinese',
            'ro-RO' => 'Romanian(Română)',
			'ca-ES'  => 'Catalan (Català)',
			'af-ZA'  => 'Afrikaans (South Africa)',
			'bg-BG'  => 'Bulgarian (Български)',
			'lv-LV'  => 'Latvian (Latvietis)',
			'sr-RS'  => 'Serbian (Cрпски)',
			'is-IS'  => 'Icelandic (Íslensk)',
			'es-US'  => 'US Spanish (Hispanoamericano)',
			'ms-MY'  => 'Malay (Malaysia)',
			'nl-BE'  => 'Dutch (Belgium)',
			'pa-IN'  => 'Punjabi (India)'
		];

		/** If we inside, this means that a new language has added. */
		if ( ! array_key_exists( $lang_code, $languages ) ) {

			return false;

		}

		return $languages[ $lang_code ];
	}

	/**
	 * Render Now used field.
	 *
	 * @param string $key - Field key.
	 * @param string $tab_slug - Tab slug to which the field belongs.
	 *
	 * @since  1.0.0
	 * @access public
	 *
	 * @return void
	 *
	 * @noinspection PhpUnused
	 **/
	public function render_current_language( $key, $tab_slug ) {

	    /** Shorthand for options. */
	    $options = Settings::get_instance()->options;

		?>
        <div class="mdp-now-used">
            <div>
                <strong><?php echo esc_attr( $options['language'] ); ?></strong>
            </div>
            <div>
                <audio controls="">
                    <source src="https://cloud.google.com/text-to-speech/docs/audio/<?php esc_attr_e( $options['language'] ); ?>.mp3" type="audio/mp3">
                    <source src="https://cloud.google.com/text-to-speech/docs/audio/<?php esc_attr_e( $options['language'] ); ?>.wav" type="audio/wav">
					<?php esc_html_e( 'Your browser does not support the audio element.', 'readabler' ); ?>
                </audio>
            </div>
        </div>
		<?php

    }

    /**
     * Render Drag and Drop field.
     *
     * @param string $key - Field key.
     * @param string $tab_slug - Tab slug to which the field belongs.
     *
     * @since  1.0.0
     * @access public
     *
     * @return void
     *
     * @noinspection PhpUnused
     **/
	public function render_api_key( $key, $tab_slug ) {

        /** Shorthand for plugin settings. */
        $options = Settings::get_instance()->options;
        
		$key_exist = false;
		if ( $options['api_key'] ) { $key_exist = true; }

		?>
		<div class="mdp-dnd">
			<!--suppress HtmlFormInputWithoutLabel -->
			<div class="mdc-text-field mdc-input-width mdc-text-field--outlined mdc-hidden">
				<!--suppress HtmlFormInputWithoutLabel -->
				<input  type="text"
				        class="mdc-text-field__input"
				        name="mdp_readabler_text_to_speech_settings[api_key]"
				        id="mdp-readabler-settings-dnd-api-key"
				        value="<?php esc_attr_e( $options['api_key'] ); ?>"
				>
				<div class="mdc-notched-outline mdc-notched-outline--upgraded mdc-notched-outline--notched">
					<div class="mdc-notched-outline__leading"></div>
					<div class="mdc-notched-outline__notch">
						<label for="mdp-readabler-settings-dnd-api-key" class="mdc-floating-label mdc-floating-label--float-above"><?php esc_html_e( 'API Key', 'readabler' ); ?></label>
					</div>
					<div class="mdc-notched-outline__trailing"></div>
				</div>
			</div>
			<div id="mdp-api-key-drop-zone" class="<?php if ( $key_exist ) : ?>mdp-key-uploaded<?php endif; ?>">
				<?php if ( $key_exist ) : ?>
					<span class="material-icons">check_circle_outline</span><?php esc_html_e( 'API Key file exist', 'readabler' ); ?>
					<span class="mdp-drop-zone-hover"><?php esc_html_e( 'Drop Key file here or click to upload', 'readabler' ); ?></span>
				<?php else : ?>
					<span class="material-icons">cloud</span><?php esc_html_e( 'Drop Key file here or click to upload.', 'readabler' ); ?>
				<?php endif; ?>
			</div>
			<?php if ( $key_exist ) : ?>
				<div class="mdp-messages mdc-text-field-helper-line mdc-text-field-helper-text mdc-text-field-helper-text--persistent">
					<?php esc_html_e( 'Drag and drop or click on the form to replace API key. |', 'readabler' ); ?>
					<a href="#" class="mdp-reset-key-btn"><?php esc_html_e( 'Reset API Key', 'readabler' ); ?></a>
				</div>
			<?php else : ?>
				<div class="mdp-messages mdc-text-field-helper-line mdc-text-field-helper-text mdc-text-field-helper-text--persistent">
					<?php esc_html_e( 'Drag and drop or click on the form to add ', 'readabler' ); ?><a href="https://console.cloud.google.com/cloud-resource-manager" target="_blank"><?php esc_html_e( 'API Key', 'readabler' ); ?>.</a>
				</div>
			<?php endif; ?>
			<input id="mdp-dnd-file-input" type="file" name="name" class="mdc-hidden" />
		</div>
		<?php

    }

	/**
	 * Main TabTextToSpeech Instance.
	 * Insures that only one instance of TabTextToSpeech exists in memory at any one time.
	 *
	 * @static
	 * @return TabTextToSpeech
	 **/
	public static function get_instance() {

		if ( ! isset( self::$instance ) && ! ( self::$instance instanceof self ) ) {

			self::$instance = new self;

		}

		return self::$instance;

	}

}
