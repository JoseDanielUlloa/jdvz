/**
 * Readabler
 * Web accessibility for Your WordPress site.
 * Exclusively on https://1.envato.market/readabler
 *
 * @encoding        UTF-8
 * @version         1.3.2
 * @copyright       (C) 2018 - 2022 Merkulove ( https://merkulov.design/ ). All rights reserved.
 * @license         Envato License https://1.envato.market/KYbje
 * @contributors    Nemirovskiy Vitaliy (nemirovskiyvitaliy@gmail.com), Dmitry Merkulov (dmitry@merkulov.design)
 * @support         help@merkulov.design
 * @license         Envato License https://1.envato.market/KYbje
 **/

( function ( $ ) {

    "use strict";

    $( document ).ready( function () {

        /** Tab: Open Button. */
        let openBtnTab = $( '.mdp-tab-name-open_button' ); // Open button
        if ( openBtnTab.length ) {

            /** Show/Hide fields on switcher check. */
            let $showOpenButtonSwitcher = $( '#mdp_readabler_open_button_settings-show_open_button' );
            $showOpenButtonSwitcher.on( 'change', showOpenButtonFields );
            function showOpenButtonFields() {

                if ( $showOpenButtonSwitcher.is(':checked') ) {
                    $showOpenButtonSwitcher.closest( 'tr' ).nextAll( 'tr' ).show( 300 );
                } else {
                    $showOpenButtonSwitcher.closest( 'tr' ).nextAll( 'tr' ).hide( 300 );
                }

            }
            showOpenButtonFields();

        }

        /** Tab: Text to Speech. */
        /** Drag & Drop JSON reader. */
        let $dropZone = $( '#mdp-api-key-drop-zone' );
        $dropZone.on( 'dragenter', function() {
            hideMessage();
            $( this ).addClass( 'mdp-hover' );
        } );

        $dropZone.on('dragleave', function() {
            $( this ).removeClass( 'mdp-hover' );
        } );

        /** Setup Drag & Drop. */
        $dropZone.on( 'dragover', handleDragOver );

        /** Text Input to store key file. */
        let $key_input = $( '#mdp-readabler-settings-dnd-api-key' );

        /**
         * Read dragged file by JS.
         **/
        $dropZone.on( 'drop', function ( e ) {

            e.stopPropagation();
            e.preventDefault();

            // Show busy spinner.
            $( this ).removeClass( 'mdp-hover' );
            $dropZone.addClass( 'mdp-busy' );

            let file = e.originalEvent.dataTransfer.files[0]; // FileList object.

            /** Check is one valid JSON file. */
            if ( ! checkKeyFile( file ) ) {
                $dropZone.removeClass( 'mdp-busy' );
                return;
            }

            /** Read key file to input. */
            readFile( file )

        } );

        /**
         * Read key file to input.
         **/
        function readFile( file ) {

            let reader = new FileReader();

            /** Closure to capture the file information. */
            reader.onload = ( function( theFile ) {

                return function( e ) {

                    let json_content = e.target.result;

                    /** Check if a string is a valid JSON string. */
                    if ( ! isJSON( json_content ) ) {

                        showErrorMessage( 'Error: Uploaded file is empty or not a valid JSON file.' );

                        $dropZone.removeClass( 'mdp-busy' );
                        return;

                    }

                    /** Check if the key has required field. */
                    let key = JSON.parse( json_content );
                    if ( typeof( key.private_key ) === 'undefined' ){

                        showErrorMessage( 'Error: Your API key file looks like not valid. Please make sure you use the correct key.' );

                        $dropZone.removeClass( 'mdp-busy' );
                        return;

                    }

                    /** Encode and Save to Input. */
                    $key_input.val( btoa( json_content ) );

                    /** Hide error messages. */
                    hideMessage();

                    /** If we have long valid key in input. */
                    if ( $key_input.val().length > 1000 ) {

                        $( '#submit' ).click(); // Save settings.

                    } else {

                        showErrorMessage( 'Error: Your API key file looks like not valid. Please make sure you use the correct key.' );
                        $dropZone.removeClass( 'mdp-busy' );

                    }

                };

            } )( file );

            /** Read file as text. */
            reader.readAsText( file );

        }

        /**
         * Show upload form on click.
         **/
        let $file_input = $( '#mdp-dnd-file-input' );
        $dropZone.on( 'click', function () {

            $file_input.click();

        } );

        $file_input.on( 'change', function ( e ) {

            $dropZone.addClass( 'mdp-busy' );

            let file = e.target.files[0];

            /** Check is one valid JSON file. */
            if ( ! checkKeyFile( file ) ) {
                $dropZone.removeClass( 'mdp-busy' );
                return;
            }

            /** Read key file to input. */
            readFile( file );

        } );

        /** Show Error message under drop zone. */
        function showErrorMessage( msg ) {

            let $msgBox = $dropZone.next();

            $msgBox.addClass( 'mdp-error' ).html( msg );

        }

        /** Hide message message under drop zone. */
        function hideMessage() {

            let $msgBox = $dropZone.next();

            $msgBox.removeClass( 'mdp-error' ).html( '' );

        }

        /**
         * Check if a string is a valid JSON string.
         *
         * @param str - JSON string to check.
         **/
        function isJSON( str ) {

            try {

                JSON.parse( str );

            } catch ( e ) {

                return false;

            }

            return true;

        }

        function handleDragOver( e ) {

            e.stopPropagation();
            e.preventDefault();

        }

        /**
         * Check file is a single valid JSON file.
         *
         * @param file - JSON file to check.
         **/
        function checkKeyFile( file ) {

            /** Select only one file. */
            if ( null == file ) {

                showErrorMessage( 'Error: Failed to read file. Please try again.' );

                return false;

            }

            /** Process json file only. */
            if ( ! file.type.match( 'application/json' ) ) {

                showErrorMessage( 'Error: API Key must be a valid JSON file.' );

                return false;

            }

            return true;
        }

        /** Reset Key File. */
        $( '.mdp-reset-key-btn' ).on( 'click', function () {

            $key_input.val( '' );
            $( '#submit' ).trigger( 'click' );

        } );


        /** Make table great again! */
        let $langTable = $( '#mdp-readabler-settings-language-tbl' );
        $langTable.removeClass('hidden');
        $langTable.DataTable( {

            /** Show entries. */
            lengthMenu: [ [-1], ["All"] ],

            /** Add filters to table footer. */
            initComplete: function () {
                this.api().columns().every(function () {
                    let column = this;
                    let select = $( '#mdp-readabler-language-filter' );

                    /** Create filter only for first column. */
                    if ( column[0][0] != 0 ) { return; }

                    select.on( 'change', function () {

                        $( '#mdp-readabler-settings-language-tbl tbody' ).show();
                        $( '#mdp-readabler-settings-language-tbl_info' ).show();
                        $( '#mdp-readabler-settings-language-tbl_paginate' ).hide();
                        $( '#mdp-readabler-settings-language-tbl_length' ).hide();
                        $( '#mdp-readabler-settings-language-tbl thead' ).show();

                        let val = $.fn.dataTable.util.escapeRegex( $(this).val() );
                        if ( '0' === val ) { val = ''; }
                        column.search( val ? '^' + val + '$' : '', true, false ).draw();
                    } );

                } );

                // Hide all lines on first load.
                $( '#mdp-readabler-settings-language-tbl tbody' ).hide();
                $( '#mdp-readabler-settings-language-tbl_info' ).hide();
                $( '#mdp-readabler-settings-language-tbl_paginate' ).hide();
                $( '#mdp-readabler-settings-language-tbl_length' ).hide();
                $( '#mdp-readabler-settings-language-tbl thead' ).hide();
            }
        } );

        /** Select language. */
        $( '#mdp-readabler-settings-language-tbl tbody' ).on( 'click', 'tr', function ( e ) {
            $( '#mdp-readabler-settings-language-tbl tr.selected' ).removeClass( 'selected' );
            $( this ).addClass( 'selected' );

            let voice_name = $( '#mdp-readabler-settings-language-tbl tr.selected .mdp-voice-name' ).attr("title");
            let lang_code = $( '#mdp-readabler-settings-language-tbl tr.selected .mdp-lang-code' ).text();
            $( '.mdp-now-used strong' ).html( voice_name );
            $( '#mdp-readabler-settings-language' ).val( voice_name );
            $( '#mdp-readabler-settings-language-code' ).val( lang_code );

            // Update Audio Sample.
            let audio = $( '.mdp-now-used audio' );
            $( '.mdp-now-used audio source:nth-child(1)' ).attr( 'src', 'https://cloud.google.com/text-to-speech/docs/audio/' + voice_name + '.mp3' );
            $( '.mdp-now-used audio source:nth-child(2)' ).attr( 'src', 'https://cloud.google.com/text-to-speech/docs/audio/' + voice_name + '.wav' );
            audio[0].pause();
            audio[0].load();
        } );

        /** Select Language on load. */
        let index = $( '#mdp-readabler-language-filter' ).parent().data( 'mdc-index' );
        $langTable.DataTable().rows().every( function ( rowIdx, tableLoop, rowLoop ) {

            let row = this.data();

            if ( row[1].includes( $( '#mdp-readabler-settings-language' ).val() ) ) {

                window.MerkulovMaterial[index].value = row[0];

                // noinspection UnnecessaryReturnStatementJS
                return;

            }

        } );


        /**
         * Show/hide Float Button fields.
         **/
        let OButtonSwitcher = $( '#mdp_readabler_open_button_settings_show_open_button' );
        function ShowOButtonSwitcherFields() {

            if ( OButtonSwitcher.prop( 'checked' ) === true ) {
                OButtonSwitcher.closest( 'tr' )
                    .next().show( 300 )
                    .next().show( 300 )
                    .next().show( 300 )
                    .next().show( 300 )
                    .next().show( 300 )
                    .next().show( 300 )
                    .next().show( 300 )
                    .next().show( 300 )
                    .next().show( 300 )
                    .next().show( 300 )
                    .next().show( 300 )
                    .next().show( 300 )
                    .next().show( 300 )
                    .next().show( 300 )
                    .next().show( 300 )
                    .next().show( 300 )
                    .next().show( 300 )
                    .next().show( 300 )
                    .next().show( 300 );
            } else {
                OButtonSwitcher.closest( 'tr' )
                    .next().hide( 300 )
                    .next().hide( 300 )
                    .next().hide( 300 )
                    .next().hide( 300 )
                    .next().hide( 300 )
                    .next().hide( 300 )
                    .next().hide( 300 )
                    .next().hide( 300 )
                    .next().hide( 300 )
                    .next().hide( 300 )
                    .next().hide( 300 )
                    .next().hide( 300 )
                    .next().hide( 300 )
                    .next().hide( 300 )
                    .next().hide( 300 )
                    .next().hide( 300 )
                    .next().hide( 300 )
                    .next().hide( 300 )
                    .next().hide( 300 );
            }
        }

        if ( OButtonSwitcher.length ) {
            OButtonSwitcher.on( 'click', ShowOButtonSwitcherFields );
            ShowOButtonSwitcherFields();
        }

        /** Show/Hide overlay color control */
        let overlaySwitch = $( '#mdp_readabler_modal_popup_settings_popup_overlay' );
        function showOverlayColor() {

            if ( overlaySwitch.prop( 'checked' ) === true ) {
                overlaySwitch.closest( 'tr' ).next().show( 300 );
            } else {
                overlaySwitch.closest( 'tr' ).next().hide( 300 );
            }
        }
        overlaySwitch.on( 'click', showOverlayColor );
        showOverlayColor();

        /** Show/Hide accessibility statement link */
        let $statementTypeSelect = $( '#mdp_readabler_accessibility_statement_settings_statement_type' );
        function statementType() {

            const $urlField = $( '#mdp_readabler_accessibility_statement_settings_statement_link' );

            // Set hide duration for initial load and for changes
            let hideTime = 200;
            if ( window.statementType === 'undefined' ) { hideTime = 0; }
            window.statementType = true;

            if ( 'hide' === $statementTypeSelect.val() ) {

                $statementTypeSelect.closest( 'tr' ).nextAll( 'tr' ).hide( 100 );

            }

            if ( 'link' === $statementTypeSelect.val() ) {

                $urlField.closest( 'tr' ).nextAll( 'tr' ).hide( 100 );
                $urlField.closest( 'tr' ).show( 400 );


            }

            if ( 'inline' === $statementTypeSelect.val() ) {

                $urlField.closest( 'tr' ).hide( 100 );
                $urlField.closest( 'tr' ).nextAll( 'tr' ).show( 400 );

            }

        }

        $statementTypeSelect.on( 'change', statementType );
        statementType();

    } );

} ( jQuery ) );