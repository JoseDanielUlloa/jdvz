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

"use strict";

/**
 * Namespace trick in javascript.
 **/
let mdpReadabler = ( function() {

    /**
     * Readabler plugin settings.
     *
     * @param options
     * @param options.ajaxurl
     * @param options.nonce
     * @param options.pluginURL
     *
     * @param options.onlineDictionary
     * @param options.language

     * @param options.profileEpilepsy
     * @param options.profileVisuallyImpaired
     * @param options.profileCognitiveDisability
     * @param options.profileAdhdFriendly
     * @param options.profileBlindUsers

     * @param options.contentScaling
     * @param options.readableFont
     * @param options.dyslexiaFont
     * @param options.highlightTitles
     * @param options.highlightLinks
     * @param options.textMagnifier
     * @param options.fontSizing
     * @param options.lineHeight
     * @param options.letterSpacing
     * @param options.alignCenter
     * @param options.alignLeft
     * @param options.alignRight

     * @param options.darkContrast
     * @param options.lightContrast
     * @param options.monochrome
     * @param options.highSaturation
     * @param options.highContrast
     * @param options.lowSaturation
     * @param options.textColors
     * @param options.titleColors
     * @param options.backgroundColors

     * @param options.muteSounds
     * @param options.hideImages
     * @param options.virtualKeyboard
     * @param options.readingGuide
     * @param options.usefulLinks
     * @param options.stopAnimations
     * @param options.readingMask
     * @param options.highlightHover
     * @param options.highlightFocus
     * @param options.bigBlackCursor
     * @param options.bigWhiteCursor
     * @param options.textToSpeech
     * @param options.keyboardNavigation

     * @param options.showOpenButton
     * @param options.buttonPosition
     * @param options.buttonCaption
     * @param options.buttonIcon
     * @param options.buttonIconPosition
     * @param options.buttonSize

     * @param options.buttonMargin
     * @param options.buttonPadding
     * @param options.buttonBorderRadius
     * @param options.buttonColor
     * @param options.buttonColorHover
     * @param options.buttonBgcolor
     * @param options.buttonBgcolorHover

     * @param options.buttonEntranceTimeout
     * @param options.buttonEntranceAnimation
     * @param options.buttonHoverAnimation
     * @param options.popupOverlayColor
     * @param options.popupBackgroundColor
     * @param options.popupKeyColor
     * @param options.popupBorderRadius
     * @param options.popupAnimation
     * @param options.popupScroll
     * @param options.popupDraggable

     * @param options.highlightTitlesStyle
     * @param options.highlightTitlesColor
     * @param options.highlightTitlesWidth
     * @param options.highlightTitlesOffset

     * @param options.highlightLinksStyle
     * @param options.highlightLinksColor
     * @param options.highlightLinksWidth
     * @param options.highlightLinksOffset

     * @param options.textMagnifierBgColor
     * @param options.textMagnifierColor
     * @param options.textMagnifierFontSize

     * @param options.readingGuideWidth
     * @param options.readingGuideHeight
     * @param options.readingGuideBackgroundColor
     * @param options.readingGuideBorderColor
     * @param options.readingGuideBorderWidth
     * @param options.readingGuideBorderRadius
     * @param options.readingGuideArrow

     * @param options.readingMaskHeight
     * @param options.readingMaskColor

     * @param options.highlightHoverStyle
     * @param options.highlightHoverColor
     * @param options.highlightHoverWidth
     * @param options.highlightHoverOffset

     * @param options.highlightFocusStyle
     * @param options.highlightFocusColor
     * @param options.highlightFocusWidth
     * @param options.highlightFocusOffset

     * @param options.hotKeyOpenInterface
     * @param options.hotKeyMenu
     * @param options.hotKeyHeadings
     * @param options.hotKeyForms
     * @param options.hotKeyButtons
     * @param options.hotKeyGraphics
     *
     * @param options.virtualKeyboardLayout
     *
     * @param options.textToSpeechAjaxUrl
     * @param options.textToSpeechNonce
     *
     * @param options.closeAnywhere
     *
     * @param options.LEARN_MORE_IN_WIKIPEDIA
     * @param options.DEFAULT
     * @param options.HOME
     * @param options.HIDE_ACCESSIBILITY_INTERFACE
     **/
    let options;

    /**
     * NameSpace for popup functions.
     **/
    let popupHelper = {

        /** Popup modal window. */
        popup: document.getElementById( 'mdp-readabler-popup' ),

        /** Initialise Popup modal. */
        init: function () {

            /** Draggable popup */
            if ( options.popupDraggable === '1' ) {

                /** Make popup draggable. */
                popupHelper.draggablePopup();

                /** Set popup position if we have it in localstorage. */
                popupHelper.setPopupPosition();

            }

            /** Close popup by cross. */
            document.getElementById( 'mdp-readabler-popup-close' ).addEventListener( 'click',  popupHelper.closePopupCross );

            /** Start to listen click event to find "data-readabler-trigger" click. */
            document.addEventListener( 'click', popupHelper.togglePopup );

            /** Fix popup position on resize. */
            window.addEventListener('resize', ( e ) => { delay( popupHelper.setPopupPosition( e ), 300 ) } );

        },

        /**
         * Set popup position, if we have it in localstorage.
         **/
        setPopupPosition: function( e = undefined ) {

            let top = getLocal( 'popupTop' );
            let left = getLocal( 'popupLeft' );

            if ( null === top || null === left ) { return; }

            /** Apply popup position. */
            popupHelper.applyPopupPosition( top, left, e );

        },

        /**
         * Apply popup position.
         **/
        applyPopupPosition: function( top, left, e = undefined ) {

            top = this.topInBound( top );
            left = this.leftInBound( left );

            /** Set popup new position. */
            popupHelper.popup.style.top = top + 'px';
            popupHelper.popup.style.left = left + 'px';

            /** If we have event then we here from resize event and need small animation. */
            if ( 'undefined' !== typeof e ) {
                popupHelper.popup.style.transition = 'top 0.3s ease, left 0.3s ease';
            } else {
                popupHelper.popup.style.transition = 'none';
            }

            setLocal( 'popupTop', top );
            setLocal( 'popupLeft', left );

            this.popup.removeAttribute( 'data-start' );

        },

        /**
         * Fix top position if it's out of view.
         **/
        topInBound: function ( top ) {

            let vh = Math.max( document.documentElement.clientHeight || 0, window.innerHeight || 0 )

            /** Don't allow popup out of bounds. */
            if ( top < 0 ) { top = 0; }
            if ( top > ( vh - this.popup.offsetHeight ) ) { top = vh - this.popup.offsetHeight; }

            return top;

        },

        /**
         * Fix left position if it's out of view.
         **/
        leftInBound: function ( left ) {

            let vw = Math.max( document.documentElement.clientWidth || 0, window.innerWidth || 0 );

            /** Don't allow popup out of bounds. */
            if ( left < 0 ) { left = 0; }
            if ( left > ( vw - this.popup.offsetWidth ) ) { left = vw - popupHelper.popup.offsetWidth; }

            return left;

        },

        /**
         * Close popup by cross.
         **/
        closePopupCross: function( e ) {

            e.preventDefault();

            /** Close Popup. */
            MicroModal.close( 'mdp-readabler-popup-box' );

            /** Release all trigger buttons. */
            popupHelper.releaseTriggerButtons();

        },

        /**
         * Close popup by clicking on overlay
         * @param e
         */
        closePopupOverlay: function ( e ) {

            const path = e.path || ( e.composedPath && e.composedPath() );
            let clickInPopup = false;

            if ( typeof path === 'object' && path.length > 0 ) { // If path is array

                /** Find popup wrapper in the path array of click event */
                for ( const element of path ) {

                    if ( element.id === 'mdp-readabler-popup') {

                        clickInPopup = true;
                        break;

                    }

                }

                /** Close popup if click was been outside of popup bounds */
                if ( ! clickInPopup ) {

                    /** Close Popup. */
                    MicroModal.close( 'mdp-readabler-popup-box' );

                    /** Release all trigger buttons. */
                    popupHelper.releaseTriggerButtons();

                    /** Close popup by clicking on overlay */
                    document.removeEventListener( 'click', popupHelper.closePopupOverlay );

                }

            }

        },

        /**
         * Show/Hide Accessibility Popup.
         **/
        togglePopup: function( e ) {

            if ( 'undefined' !== typeof e ) {

                let element = e.target;
                let button = null;

                /** If no element, nothing to do. */
                if ( ! element ) { return; }

                /** Click on button child elements. */
                button = ( null !== element.closest( '[data-readabler-trigger]' ) ) ?
                    element.closest( '[data-readabler-trigger]' ) :
                    element.closest( '.readabler-trigger' );

                /** Exit if no one trigger on the page */
                if ( null === button ) { return }

                /** Prevent a link from opening the URL. */
                e.preventDefault();

            }

            /** Accessibility Popup. */
            let popup = document.getElementById( 'mdp-readabler-popup-box' );

            /** Toggle popup state. */
            if ( ! popup.classList.contains( 'mdp-is-open' ) ) {

                /** Show Popup. */
                MicroModal.show( 'mdp-readabler-popup-box', {
                    onClose: () => { popupHelper.onClosePopup(); },
                    openClass: 'mdp-is-open',
                    disableScroll: ! options.popupScroll,
                    disableFocus: false,
                } );

                /** Hold all trigger buttons. */
                popupHelper.holdTriggerButtons();

                /** Set popup position if we have it in localstorage. */
                popupHelper.setPopupPosition();

                /** Close popup by clicking on overlay */
                if( options.closeAnywhere === '1' ) {
                    document.addEventListener( 'click', popupHelper.closePopupOverlay );
                }

            } else {

                /** Hide Popup. */
                MicroModal.close( 'mdp-readabler-popup-box' );

                /** Release all trigger buttons. */
                popupHelper.releaseTriggerButtons();

            }

        },

        /**
         * Add class .mdp-opened to all trigger buttons.
         **/
        holdTriggerButtons: function() {

            document.querySelectorAll( '[data-readabler-trigger]' ).forEach( el  => {
                el.classList.add( 'mdp-opened' );
            } );

        },

        /**
         * Remove class .mdp-opened from all trigger buttons.
         **/
        releaseTriggerButtons: function() {

            document.querySelectorAll( '[data-readabler-trigger]' ).forEach( el  => {
                el.classList.remove( 'mdp-opened' );
            } );

            /** Close Accessibility Statement. */
            let statementBox = document.getElementById( 'mdp-readabler-accessibility-statement-box' );

            if ( statementBox !== null && statementBox.classList.contains( 'mdp-open' ) ) {
                statementBox.classList.remove( 'mdp-open' );
            }

        },

        /**
         * Release Trigger Buttons on modal close.
         **/
        onClosePopup: function() {

            popupHelper.releaseTriggerButtons();

        },

        /**
         * Make popup draggable.
         **/
        draggablePopup: function() {

            let dragZoneElement = document.getElementById( 'mdp-readabler-popup-header' );

            let pos1 = 0;
            let pos2 = 0;
            let pos3 = 0;
            let pos4 = 0;

            dragZoneElement.onmousedown = dragMouseDown;

            /**
             * Start popup dragging.
             **/
            function dragMouseDown( e ) {

                // noinspection JSDeprecatedSymbols
                e = e || window.event;

                /** Drag popup only on left mouse. */
                if ( ! detectLeftButton( e ) ) { return; }

                e.preventDefault();

                /** Get the mouse cursor position at startup. */
                pos3 = e.clientX;
                pos4 = e.clientY;

                /** Call a function whenever the cursor moves. */
                document.addEventListener( 'mousemove', startDragging );

                /** Stop dragging on mouseup. */
                document.addEventListener( 'mouseup', stopDragging );

            }

            /**
             * Calculate dragging position.
             **/
            function startDragging( e ) {

                // noinspection JSDeprecatedSymbols
                e = e || window.event;

                e.preventDefault();

                /** Calculate the new cursor position. */
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;

                /** Calculate popup new position. */
                let top = popupHelper.popup.offsetTop - pos2;
                let left = popupHelper.popup.offsetLeft - pos1;

                /** Apply popup position. */
                popupHelper.applyPopupPosition( top, left );

                /** Save popup position in local storage. */
                setLocal( 'popupTop', top.toString() );
                setLocal( 'popupLeft', left.toString() );

            }

            /**
             * Stop moving when mouse button is released.
             **/
            function stopDragging() {

                document.removeEventListener('mousemove', startDragging );
                document.removeEventListener('mouseup', stopDragging );

            }

            /**
             * Detect if the left and only the left mouse button is pressed.
             *
             * @param event
             *
             * @return {boolean}
             **/
            function detectLeftButton( event ) {

                if ( 'buttons' in event ) { return event.buttons === 1; }

                let button = event.which || event.button;

                return button === 1;

            }

        }

    };

    /**
     * NameSpace for hotkey functions.
     **/
    let hotKeyHelper = {

        /** Initialise hotkeys. */
        init: function () {

            /** Open popup by hotkey. */
            hotKeyHelper.OpenInterface();

            /** Navigate to next/prev Menu. */
            hotKeyHelper.focusElements( options.hotKeyMenu, 'nav, [role="navigation"]' );

            /** Navigate to next/prev Heading. */
            hotKeyHelper.focusElements( options.hotKeyHeadings, 'h1, h2, h3, h4, h5, h6, [role="heading"]' );

            /** Navigate to next/prev Form. */
            hotKeyHelper.focusElements( options.hotKeyForms, 'form:not([disabled])' );

            /** Navigate to next/prev Button. */
            hotKeyHelper.focusElements( options.hotKeyButtons, 'button:not([disabled]), [role="button"]:not([disabled])' );

            /** Navigate to next/prev Graphic. */
            hotKeyHelper.focusElements( options.hotKeyGraphics, 'img, picture, svg' );

            /** Enable/Disable controls by spacebar. */
            document.body.onkeydown = function ( e ) {

                let key = e.keyCode || e.charCode || e.which;

                /** Spacebar pressed. */
                if ( key === 32 ) {
                    hotKeyHelper.spacePressed( e );
                }

            }

        },

        /**
         * Run when Spacebar pressed.
         **/
        spacePressed: function ( e ) {

            let activeElement = document.activeElement;

            /** Profile switchers. */
            if ( activeElement.classList.contains( 'mdp-readabler-accessibility-profile-item' ) ) {
                e.preventDefault();
                activeElement.click();
            }

            /** Toggle boxes. */
            else if ( activeElement.classList.contains( 'mdp-readabler-toggle-box' ) ) {
                e.preventDefault();
                activeElement.click();
            }

            /** Palette boxes. */
            else if ( activeElement.classList.contains( 'mdp-readabler-color' ) ) {
                e.preventDefault();
                activeElement.click();
            }

        },

        /**
         * Open popup by hotkey.
         **/
        OpenInterface: function () {

            hotkeys( options.hotKeyOpenInterface, function ( event ) {

                /** Prevent the default behavior. */
                event.preventDefault();

                /** Open/Close popup. */
                popupHelper.togglePopup();

            } );

        },

        /**
         * Set focus on next/prev elements.
         **/
        focusElements: function ( shortcutKey, selector ) {

            /** Navigate to next/prev element. */
            hotkeys( shortcutKey + ',' + 'shift+' + shortcutKey, function ( event, handler ) {

                /** Check if Keyboard Navigation is enabled. */
                if ( ! document.body.classList.contains( 'mdp-readabler-keyboard-navigation' ) ) { return; }

                /** Prevent the default behavior. */
                event.preventDefault();

                /** Focus previously element if shift is pressed. */
                let next = true;
                if ( handler.key.startsWith( 'shift+' ) ) { next = false; }

                /** Set focus to next heading element. */
                actionKeyboardNavigation.setFocus( selector, next );

            } );

        },

    };

    /**
     * Online Dictionary.
     **/
    let onlineDictionary = {

        /** Clear search results button. */
        clearResultsBtn: document.querySelector( '#mdp-readabler-online-dictionary-search-close' ),

        /** Search input. */
        searchInput: document.getElementById( 'mdp-readabler-online-dictionary-search' ),

        /** Search results UL. */
        searchResultsUL: document.getElementById( 'mdp-readabler-online-dictionary-search-results' ),

        /** Initialise Online Dictionary. */
        init: function () {

            /** Add change listener to search input. */
            this.searchInput.addEventListener( 'input', ( e ) => { delay( this.searchQuery( e ), 800 ) } );

            /** Clear search results button click. */
            this.clearResultsBtn.addEventListener( 'click', this.clearSearchResults );

        },

        /** Get language code from page html */
        getLang: function () {

            if ( 'auto' === options.language ) {

                const html = document.querySelector( 'html' );

                // Return English in no lang code for the page
                if ( ! html.getAttribute( 'lang' ) ) { return 'en' }

                // Return lang code from <html>
                return html.getAttribute( 'lang' ).split( '-', 1 )[ 0 ];

            } else {

                // Returns language from the page settings
                return options.language;

            }

        },

        /**
         * Process search request to Wiki.
         **/
        searchQuery: function ( e ) {

            /** Search query. */
            let search = e.target.value;

            /** Exit if delete search string value */
            if ( search.trim().length === 0 ) {
                return;
            }

            /** Process only 3+ letter phrases long. */
            if ( search.trim().length < 3 ) {

                /** Clear old results. */
                this.searchResultsUL.innerHTML = '';

                return;

            }

            /** Encode search query. */
            let encodedSearchQuery = encodeURI( search );
            let apiUrl = `https://${ this.getLang() }.wikipedia.org/w/api.php?action=query&format=json&utf8=&explaintext=&exlimit=3&generator=prefixsearch&prop=pageprops|extracts|extracts|description&redirects=&gpssearch=${ encodedSearchQuery }&gpslimit=3&origin=*`;

            /** Make search request to wikipedia.org. */
            fetch( apiUrl )
            .then( response => response.json() )
            .then( data => {

                /** Clear old results. */
                this.searchResultsUL.innerHTML = '';

                /** Parse each founded page. */
                for ( let key in data.query.pages ) {

                    /** Skip loop if the property is from prototype. */
                    if ( ! data.query.pages.hasOwnProperty( key ) ) { continue; }

                    this.addResultToList( data.query.pages[key] );

                }

                /** Show clear results button. */
                this.clearResultsBtn.style.display = 'block';

            } )
            .catch( ( error ) => {} );

        },

        /**
         * Add search result to list.
         **/
        addResultToList: function ( page ) {

            const wikiText = typeof page.description !== "undefined" ? page.description : '';

            /** Create li item. */
            let li = document.createElement( 'li' );
            li.innerHTML = `
                    <h5 class="mdp-readabler-online-dictionary-title">${page.title}</h5>
                    <p class="mdp-readabler-online-dictionary-text">${wikiText}</p>
                    <a target="_blank" rel="nofollow" class="mdp-readabler-online-dictionary-link" href="https://${ this.getLang() }.wikipedia.org/wiki/${ page.title }">${ options.LEARN_MORE_IN_WIKIPEDIA }</a>
                    `;

            /** Add result to UL. */
            this.searchResultsUL.appendChild( li );

        },

        /**
         * Clear Search results.
         **/
        clearSearchResults: function () {

            /** Clear Input */
            onlineDictionary.searchInput.setAttribute( 'value','' );

            /** Clear results. */
            onlineDictionary.searchResultsUL.innerHTML = '';

            /** Hide clear results button. */
            onlineDictionary.clearResultsBtn.style.display = 'none';

        },

    }

    /**
     * Accessibility Profiles.
     **/
    let accessibilityProfiles = {

        /** Accessibility Profiles items. */
        profiles: document.querySelectorAll( '#mdp-readabler-accessibility-profiles-box .mdp-readabler-accessibility-profile-item' ),

        /** Initialise Accessibility Profiles. */
        init: function () {

            /** Process only if we have at least one enabled profile. */
            if ( ! accessibilityProfiles.isProfiles ) { return; }

            /** Enable/Disable profile by click. */
            this.profiles.forEach( profileItem => profileItem.addEventListener( 'click', delay( this.toggleProfile, 100 ) ) );

            /** Enable/Disable profile by keydown. */
            this.profiles.forEach( profileItem => profileItem.addEventListener( 'keydown', delay( this.toggleProfile, 100 ) ) );

        },

        /**
         * Enable/Disable profile by click and keydown.
         **/
        toggleProfile: function ( e ) {

            if ( e.type === 'keydown' && e.keyCode !== 13 ) { return }

            let profileItem = this.closest( '.mdp-readabler-accessibility-profile-item' );
            let switcher = profileItem.querySelector( 'input[type="checkbox"]' );

            /** Select profile. */
            if ( ! profileItem.classList.contains( 'mdp-active' ) ) {

                /** Disable previously enabled profile. */
                let prevProfile = document.querySelector( '#mdp-readabler-accessibility-profiles-box .mdp-readabler-accessibility-profile-item.mdp-active' );
                if ( prevProfile ) { prevProfile.click(); }

                /** Enable current profile. */
                profileItem.classList.add( 'mdp-active' );
                switcher.checked = true;

                /** Save current profile to localStorage. */
                setLocal( profileItem.id, '1' );

                /** Get current profile name. */
                let profileName = profileItem.id.replace( 'mdp-readabler-accessibility-profile-', '' );
                profileName = toCamelCase( profileName, '-' );
                profileName = profileName.replace( '-', '' );
                profileName = 'profile' + profileName;

                /** Enable profile. */
                accessibilityProfiles[profileName]( true );

            /** Deselect profile. */
            } else {

                profileItem.classList.remove( 'mdp-active' );
                switcher.checked = false;

                /** Disable profile to localStorage. */
                setLocal( profileItem.id, '0' );

                /** Get current profile name. */
                let profileName = profileItem.id.replace( 'mdp-readabler-accessibility-profile-', '' );
                profileName = toCamelCase( profileName, '-' );
                profileName = profileName.replace( '-', '' );
                profileName = 'profile' + profileName;

                /** Disable profile. */
                accessibilityProfiles[profileName]( false );

            }

        },

        /**
         * Enable profile from localstorage.
         **/
        loadSaved: function () {

            accessibilityProfiles.profiles.forEach( profileItem => {

                let value = getLocal( profileItem.id );

                if ( '1' !== value ) { return; }

                let switcher = profileItem.querySelector( 'input[type="checkbox"]' );
                switcher.checked = true;
                profileItem.click();

            } );

        },

        /**
         * Enable selected profile.
         **/
        profileEpilepsy: function ( enable ) {

            let fClass = 'mdp-readabler-profile-epilepsy';

            /** Enable Epilepsy Profile. */
            if ( enable ) {

                /** Add class to body as flag. */
                document.body.classList.add( fClass );

                let lowSaturation = document.querySelector( '#mdp-readabler-action-low-saturation:not(.mdp-active)' );
                if ( lowSaturation ) { lowSaturation.click(); }

                let stopAnimations = document.querySelector( '#mdp-readabler-action-stop-animations:not(.mdp-active)' );
                if ( stopAnimations ) { stopAnimations.click(); }

            }

            /** Disable Epilepsy Profile. */
            else {

                document.body.classList.remove( fClass );

                let lowSaturation = document.querySelector( '#mdp-readabler-action-low-saturation.mdp-active' );
                if ( lowSaturation ) { lowSaturation.click(); }

                let stopAnimations = document.querySelector( '#mdp-readabler-action-stop-animations.mdp-active' );
                if ( stopAnimations ) { stopAnimations.click(); }

            }

        },

        profileVisuallyImpaired: function ( enable ) {

            let fClass = 'mdp-readabler-profile-visually-impaired';

            /** Enable Visually Impaired Profile. */
            if ( enable ) {

                /** Add class to body as flag. */
                document.body.classList.add( fClass );

                let readableFont = document.querySelector( '#mdp-readabler-action-readable-font:not(.mdp-active)' );
                if ( readableFont ) { readableFont.click(); }

                let highSaturation = document.querySelector( '#mdp-readabler-action-high-saturation:not(.mdp-active)' );
                if ( highSaturation ) { highSaturation.click(); }

            }

            /** Disable Visually Impaired Profile. */
            else {

                document.body.classList.remove( fClass );

                let readableFont = document.querySelector( '#mdp-readabler-action-readable-font.mdp-active' );
                if ( readableFont ) { readableFont.click(); }

                let highSaturation = document.querySelector( '#mdp-readabler-action-high-saturation.mdp-active' );
                if ( highSaturation ) { highSaturation.click(); }

            }

        },

        profileCognitiveDisability: function ( enable ) {

            let fClass = 'mdp-readabler-profile-cognitive-disability';

            /** Enable Cognitive Disability Profile. */
            if ( enable ) {

                /** Add class to body as flag. */
                document.body.classList.add( fClass );

                let highlightTitles = document.querySelector( '#mdp-readabler-action-highlight-titles:not(.mdp-active)' );
                if ( highlightTitles ) { highlightTitles.click(); }

                let highlightLinks = document.querySelector( '#mdp-readabler-action-highlight-links:not(.mdp-active)' );
                if ( highlightLinks ) { highlightLinks.click(); }

                let stopAnimations = document.querySelector( '#mdp-readabler-action-stop-animations:not(.mdp-active)' );
                if ( stopAnimations ) { stopAnimations.click(); }

            }

            /** Disable Cognitive Disability Profile. */
            else {

                document.body.classList.remove( fClass );

                let highlightTitles = document.querySelector( '#mdp-readabler-action-highlight-titles.mdp-active' );
                if ( highlightTitles ) { highlightTitles.click(); }

                let highlightLinks = document.querySelector( '#mdp-readabler-action-highlight-links.mdp-active' );
                if ( highlightLinks ) { highlightLinks.click(); }

                let stopAnimations = document.querySelector( '#mdp-readabler-action-stop-animations.mdp-active' );
                if ( stopAnimations ) { stopAnimations.click(); }

            }

        },

        profileAdhdFriendly: function ( enable ) {

            let fClass = 'mdp-readabler-profile-adhd-friendly';

            /** Enable ADHD Friendly Profile. */
            if ( enable ) {

                /** Add class to body as flag. */
                document.body.classList.add( fClass );

                let highSaturation = document.querySelector( '#mdp-readabler-action-high-saturation:not(.mdp-active)' );
                if ( highSaturation ) { highSaturation.click(); }

                let stopAnimations = document.querySelector( '#mdp-readabler-action-stop-animations:not(.mdp-active)' );
                if ( stopAnimations ) { stopAnimations.click(); }

                let readingMask = document.querySelector( '#mdp-readabler-action-reading-mask:not(.mdp-active)' );
                if ( readingMask ) { readingMask.click(); }

            }

            /** Disable ADHD Friendly Profile. */
            else {

                document.body.classList.remove( fClass );

                let highSaturation = document.querySelector( '#mdp-readabler-action-high-saturation.mdp-active' );
                if ( highSaturation ) { highSaturation.click(); }

                let stopAnimations = document.querySelector( '#mdp-readabler-action-stop-animations.mdp-active' );
                if ( stopAnimations ) { stopAnimations.click(); }

                let readingMask = document.querySelector( '#mdp-readabler-action-reading-mask.mdp-active' );
                if ( readingMask ) { readingMask.click(); }

            }

        },

        profileBlindUsers: function ( enable ) {

            let fClass = 'mdp-readabler-profile-blind-users';

            /** Enable Blind Users Profile. */
            if ( enable ) {

                /** Add class to body as flag. */
                document.body.classList.add( fClass );

                let readableFont = document.querySelector( '#mdp-readabler-action-readable-font:not(.mdp-active)' );
                if ( readableFont ) { readableFont.click(); }

                let virtualKeyboard = document.querySelector( '#mdp-readabler-action-virtual-keyboard:not(.mdp-active)' );
                if ( virtualKeyboard ) { virtualKeyboard.click(); }

                let textToSpeech = document.querySelector( '#mdp-readabler-action-text-to-speech:not(.mdp-active)' );
                if ( textToSpeech ) { textToSpeech.click(); }

                let keyboardNavigation = document.querySelector( '#mdp-readabler-action-keyboard-navigation:not(.mdp-active)' );
                if ( keyboardNavigation ) { keyboardNavigation.click(); }

            }

            /** Disable Blind Users Profile. */
            else {

                document.body.classList.remove( fClass );

                let readableFont = document.querySelector( '#mdp-readabler-action-readable-font.mdp-active' );
                if ( readableFont ) { readableFont.click(); }

                let virtualKeyboard = document.querySelector( '#mdp-readabler-action-virtual-keyboard.mdp-active' );
                if ( virtualKeyboard ) { virtualKeyboard.click(); }

                let textToSpeech = document.querySelector( '#mdp-readabler-action-text-to-speech.mdp-active' );
                if ( textToSpeech ) { textToSpeech.click(); }

                let keyboardNavigation = document.querySelector( '#mdp-readabler-action-keyboard-navigation.mdp-active' );
                if ( keyboardNavigation ) { keyboardNavigation.click(); }

            }

        },

        /**
         * Check do we have enabled any profile.
         **/
        isProfiles: function () {

            return !! (
                options.profileEpilepsy ||
                options.profileVisuallyImpaired ||
                options.profileCognitiveDisability ||
                options.profileAdhdFriendly ||
                options.profileBlindUsers
            );

        }

    }

    /**
     * Input Spinner control.
     **/
    let inputSpinner = {

        /**
         * Initialise Input Spinner.
         **/
        init: function () {

            /** Plus Button click. */
            let plusBtns = document.querySelectorAll( '.mdp-readabler-input-spinner-box .mdp-readabler-plus' );
            plusBtns.forEach( plusButton => plusButton.addEventListener( 'click', ( e ) => inputSpinner.step( e ) ) );

            /** Minus Button click. */
            let minusBtns = document.querySelectorAll( '.mdp-readabler-input-spinner-box .mdp-readabler-minus' );
            minusBtns.forEach( minusButton => minusButton.addEventListener( 'click', ( e ) => inputSpinner.step( e ) ) );

            let interval;

            /** Continuous mouse click event. */
            /** Plus button. */
            plusBtns.forEach( plusButton => plusButton.addEventListener( 'mousedown', ( e ) => {
                interval = setInterval( function () {
                    inputSpinner.step( e );
                }, 500 );
            } ) );

            plusBtns.forEach( plusButton => plusButton.addEventListener( 'mouseup', () => {
                clearInterval( interval );
            } ) );

            plusBtns.forEach( plusButton => plusButton.addEventListener( 'mouseleave', () => {
                clearInterval( interval );
            } ) );

            /** Minus button. */
            minusBtns.forEach( minusButton => minusButton.addEventListener( 'mousedown', ( e ) => {
                interval = setInterval( function () {
                    inputSpinner.step( e );
                }, 500 );
            } ) );

            minusBtns.forEach( minusButton => minusButton.addEventListener( 'mouseup', () => {
                clearInterval( interval );
            } ) );

            minusBtns.forEach( minusButton => minusButton.addEventListener( 'mouseleave', () => {
                clearInterval( interval );
            } ) );

        },

        /**
         * Increase/Decrease value.
         **/
        step: function ( e ) {

            let valueElement = e.target.closest( '.mdp-readabler-control' ).querySelector( '.mdp-readabler-value' );
            let value = parseInt( valueElement.dataset.value );

            let step = parseInt( e.target.closest( '.mdp-readabler-input-spinner-box' ).dataset.step );

            /** Increase/Decrease value by step. */
            if ( e.target.classList.contains( 'mdp-readabler-minus' ) ) {
                value = value - step;
            } else {
                value = value + step;
            }

            /** Save new value. */
            valueElement.dataset.value = value.toString();

            /** Set label by value. */
            inputSpinner.setLabel( valueElement, value );

            /** Save value to localStorage. */
            setLocal( e.target.closest( '.mdp-readabler-action-box').id, valueElement.dataset.value )

            /** Create the event. */
            const event = new CustomEvent( 'ReadablerInputSpinnerChanged', {} );

            /** Fire custom event ReadablerInputSpinnerChanged. */
            valueElement.dispatchEvent( event );

        },

        /**
         * Set label by value.
         **/
        setLabel: function ( element, value ) {

            /** Now we for sure work with int. */
            value = parseInt( value );

            if ( 0 === value ) {
                element.innerHTML = options.DEFAULT;
            } else {
                let sign = value > 0 ? '+' : '';
                element.innerHTML = sign + value + '%';
            }

        },

        /**
         * Set value to some spinner box from localstorage.
         **/
        loadSaved: function () {

            /** All spinner Boxes. */
            let spinnerBoxes = document.querySelectorAll( '.mdp-readabler-spinner-box' );

            spinnerBoxes.forEach( box => {

                let value = getLocal( box.id );

                if ( ! value ) { return; }

                value = parseInt( value );

                if ( 0 === value ) { return; }

                let valueElement = box.querySelector( '.mdp-readabler-value' );
                valueElement.dataset.value = value.toString();

                /** Set label by value. */
                inputSpinner.setLabel( valueElement, value );

                /** Fire change event. */
                const event = new CustomEvent( 'ReadablerInputSpinnerChanged', {} );

                /** Fire custom event ReadablerInputSpinnerChanged. */
                valueElement.dispatchEvent( event );


            } );

        }

    }

    /**
     * Toggle Box control.
     **/
    let toggleBox = {

        /**
         * Initialise Toggle Box.
         **/
        init: function () {

            /** Toggle Button click. */
            let toggleBoxes = document.querySelectorAll( '.mdp-readabler-toggle-box' );

            /** Listen click. */
            toggleBoxes.forEach( box => box.addEventListener( 'click', ( e ) => toggleBox.toggle( e ) ) );

            /** Listen keydown. */
            toggleBoxes.forEach( box => box.addEventListener( 'keydown', ( e ) => toggleBox.toggle( e ) ) );

        },

        /**
         * Toggle control state.
         **/
        toggle: function ( e ) {

            if ( e.type === 'keydown' && e.keyCode !== 13 ) { return }

            /** All Toggle Boxes. */
            let toggleBox = e.target.closest( '.mdp-readabler-toggle-box' );

            /** Activate/Deactivate control. */
            toggleBox.classList.toggle( 'mdp-active' );

            /** Save value in localStorage. */
            setLocal( toggleBox.id, toggleBox.classList.contains( 'mdp-active' ) );

            /** Create the event. */
            const event = new CustomEvent( 'ReadablerToggleBoxChanged', {} );

            /** Fire custom event ReadablerToggleBoxChanged. */
            toggleBox.dispatchEvent( event );

        },

        /**
         * Enable some toggleBoxes from localstorage.
         **/
        loadSaved: function () {

            /** All Toggle Boxes. */
            let toggleBoxes = document.querySelectorAll( '.mdp-readabler-toggle-box' );

            toggleBoxes.forEach( box => {

                if ( 'true' === getLocal( box.id ) ) {
                    box.click();
                }

            } );

        }

    }

    /**
     * Palette control.
     **/
    let paletteBox = {

        /**
         * Initialise Palette.
         **/
        init: function () {


            let palettes = document.querySelectorAll( '.mdp-readabler-palette-box' );

            /** Color click. */
            palettes.forEach( palette => palette.addEventListener( 'click', ( e ) => paletteBox.selectColor( e ) ) );

            /** Color keydown. */
            palettes.forEach( palette => palette.addEventListener( 'keydown', ( e ) => paletteBox.selectColor( e ) ) );

        },

        /**
         * Select color by click.
         **/
        selectColor: function ( e ) {

            if ( e.type === 'keydown' && e.keyCode !== 13 ) { return }

            /** Process only color click. */
            if ( ! e.target.classList.contains( 'mdp-readabler-color' )  ) { return; }

            let currentPalette = e.target.closest( '.mdp-readabler-palette-box' );

            /** If clicked same color disable all colors. */
            if ( e.target.classList.contains( 'mdp-active' ) ) {

                /** Deactivate current color. */
                e.target.classList.remove( 'mdp-active' );

                /** Fire ReadablerPaletteChanged event. */
                paletteBox.firePaletteChange( currentPalette, null );

                /** Save value to localStorage. */
                setLocal( e.target.closest( '.mdp-readabler-palette-box' ).id, null );

            /** Disable prev color and enable current. */
            } else {

                /** Deactivate a other previous color. */
                let prevColor = currentPalette.querySelector( '.mdp-readabler-color.mdp-active' );
                if ( null !== prevColor ) {
                    prevColor.classList.remove( 'mdp-active' );
                }

                /** Activate current color. */
                e.target.classList.add( 'mdp-active' );

                /** Fire ReadablerPaletteChanged event. */
                paletteBox.firePaletteChange( currentPalette, e.target.dataset.color );

                /** Save value to localStorage. */
                setLocal( e.target.closest( '.mdp-readabler-palette-box' ).id, e.target.dataset.color );

            }

        },

        /**
         * Enable some colors from localstorage.
         **/
        loadSaved: function () {

            /** All palette Boxes. */
            let paletteBoxes = document.querySelectorAll( '.mdp-readabler-palette-box' );

            paletteBoxes.forEach( box => {

                let colorValue = getLocal( box.id );
                if ( null === colorValue ) { return; }

                let colors = box.querySelectorAll( '.mdp-readabler-color' );

                colors.forEach( color => {

                    if ( color.dataset.color === colorValue ) {
                        color.click();
                    }

                } );

            } );

        },

        /**
         * Create and trigger custom event ReadablerPaletteChanged.
         **/
        firePaletteChange: function ( element, color ) {

            /** Create the event. */
            const event = new CustomEvent( 'ReadablerPaletteChanged', {detail: {color: color}} );

            /** Fire custom event ReadablerPaletteChanged. */
            element.dispatchEvent( event );

        }

    }

    /**
     * Content Scaling.
     **/
    let actionContentScaling = {

        /**
         * Initialise Content Scaling action.
         **/
        init: function () {

            /** Listen for Content Scaling change. */
            let contentScaling = document.querySelector( '#mdp-readabler-action-content-scaling .mdp-readabler-value' );
            contentScaling.addEventListener( 'ReadablerInputSpinnerChanged', this.scaleContent );

        },

        /**
         * Scale site content.
         **/
        scaleContent: function ( e ) {

            /** Scale factor. */
            let scale = parseInt( e.target.dataset.value );

            if ( navigator.userAgent.toLowerCase().indexOf( 'firefox' ) > 0 ){

                // Zoom for firefox
                actionContentScaling.setFirefoxProperty( scale, 'body', '-moz-transform', '' );

            } else {

                // Zoom for Chrome
                actionContentScaling.setElementProperty( scale, 'body > *', 'zoom', '' );

            }

        },

        /**
         * Set css property to all elements by selector.
         **/
        setFirefoxProperty: function ( scale, selector, CSSProperty, unit ) {

            /** Prepare dataset key based on css property name. */
            let camelProperty = toCamelCase( CSSProperty, '-' ).replace( '-', '' );
            camelProperty = 'readabler' + camelProperty;

            /** Set a new css property value for all elements in selector. */
            let el = document.querySelector( selector );

            /** Get property value from attribute. */
            let propertyValue = parseFloat( el.dataset[camelProperty] );

            if ( ! propertyValue || isNaN( propertyValue ) ) {

                /** Get element property. */
                let style = window.getComputedStyle( el, null ).getPropertyValue( CSSProperty );

                style === 'none' ?
                    propertyValue = 1 :
                    propertyValue = parseFloat( style.split( '(' )[ 1 ].split( ')' )[ 0 ] );

                /** Remember for future uses. */
                el.dataset[camelProperty] = propertyValue.toString();

            }

            /** Calculate new property value. */
            if ( 0 === propertyValue ) { propertyValue = 1; }
            let newPropertyVal = ( propertyValue + Math.abs( propertyValue / 100 ) * scale ).toFixed( 2 );

            /** Set value or none. */
            if ( parseFloat( newPropertyVal ) === 1 ) {

                el.style.setProperty( CSSProperty, `none`, 'important');
                el.style.removeProperty( '-moz-transform-origin' );

            } else {

                el.style.setProperty( CSSProperty, `scale(${ newPropertyVal.toString() })`, 'important');
                el.style.setProperty( '-moz-transform-origin', `top left`, 'important' );

            }

        },

        /**
         * Set css property to all elements by selector.
         **/
        setElementProperty: function ( scale, selector, CSSProperty, unit ) {

            /** Prepare dataset key based on css property name. */
            let camelProperty = toCamelCase( CSSProperty, '-' ).replace( '-', '' );
            camelProperty = 'readabler' + camelProperty;

            /** Set a new css property value for all elements in selector. */
            let elements = document.querySelectorAll( selector );
            elements.forEach( el  => {

                /** Get property value from attribute. */
                let propertyValue = parseFloat( el.dataset[camelProperty] );
                if ( ! propertyValue ) {

                    /** Get element property. */
                    let style = window.getComputedStyle( el, null ).getPropertyValue( CSSProperty );

                    propertyValue = parseFloat( style );

                    /** Special case: letter-spacing: normal. */
                    if ( 'normal' === style ) { propertyValue = 0; }

                    /** Remember for future uses. */
                    el.dataset[camelProperty] = propertyValue.toString();

                }

                /** Calculate new property value. */
                if ( 0 === propertyValue ) { propertyValue = 1; }
                let newPropertyVal = ( propertyValue + Math.abs( propertyValue / 100 ) * scale ).toFixed( 2 );

                /** Set value. */
                el.style.setProperty( CSSProperty, newPropertyVal.toString() + unit, 'important');

            } );

        }

    }

    /**
     * Font Sizing.
     **/
    let actionFontSizing = {

        fontSizingStyle: document.createElement('style'),

        /**
         * Initialise Font Sizing action.
         **/
        init: function () {

            /** Listen for Font Sizing change. */
            let fontSizing = document.querySelector( '#mdp-readabler-action-font-sizing .mdp-readabler-value' );
            fontSizing.addEventListener( 'ReadablerInputSpinnerChanged', this.fontSizing );

        },

        /**
         * Scaling font by inline element CSS
         * @param tags - Tags for processing
         * @param scale - Scale value in percents but without %
         */
        fontScaling: function ( tags, scale ) {

            for ( let tag of tags ) {

                if ( document.getElementsByTagName( tag ).length > 0 ) {

                    for ( let textElement of document.getElementsByTagName( tag ) ) {

                        // Get original font size
                        let originalSize = window.getComputedStyle( textElement ).fontSize.split( 'px', 1 )[ 0 ];

                        // Update original size from data attribute
                        textElement.getAttribute( 'original-size' ) === null ?
                            textElement.setAttribute( 'original-size', originalSize ) :
                            originalSize = textElement.getAttribute( 'original-size' );

                        // Set new font size
                        textElement.style.fontSize = `${ parseInt( originalSize ) + originalSize * ( scale * .01 ) }px`;

                    }

                }

            }

        },

        /**
         * Increase/Decrease Font Size.
         **/
        fontSizing: function ( e ) {

            let scale = parseInt( e.target.dataset.value );
            const textTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'p', 'a', 'li', 'label', 'input', 'select', 'textarea', 'legend', 'code', 'pre', 'dd', 'dt', 'span', 'blockquote'];

            /** Remove class from body to reset font size to default values. */
            if ( 0 === scale ) {
                document.body.classList.remove( 'mdp-readabler-font-sizing' );
                return;
            }

            /** Add class to body, to apply styles. */
            document.body.classList.add( 'mdp-readabler-font-sizing' );

            /** Add inline css */
            actionFontSizing.fontScaling( textTags, scale );

        }

    }

    /**
     * Line Height.
     **/
    let actionLineHeight = {

        lineHeightStyle: document.createElement('style'),

        /**
         * Initialise Line Height action.
         **/
        init: function () {

            /** Listen for Line Height change. */
            let lineHeight = document.querySelector( '#mdp-readabler-action-line-height .mdp-readabler-value' );
            lineHeight.addEventListener( 'ReadablerInputSpinnerChanged', this.lineHeight );

        },

        /**
         * Scaling line-height by inline element CSS
         * @param tags - Tags for processing
         * @param scale - Scale value in percents but without %
         */
        fontLeading: function ( tags, scale ) {

            for ( let tag of tags ) {

                if ( document.getElementsByTagName( tag ).length > 0 ) {

                    for ( let textElement of document.getElementsByTagName( tag ) ) {

                        // Get original font size
                        let originalSize = window.getComputedStyle( textElement ).lineHeight.split( 'px', 1 )[ 0 ];

                        // Update original size from data attribute
                        textElement.getAttribute( 'original-leading' ) === null ?
                            textElement.setAttribute( 'original-leading', originalSize ) :
                            originalSize = textElement.getAttribute( 'original-leading' );

                        // Set new font size
                        textElement.style.lineHeight = `${ parseInt( originalSize ) + originalSize * ( scale * .01 ) }px`;

                    }

                }

            }

        },

        /**
         * Increase/Decrease Line Height.
         **/
        lineHeight: function ( e ) {

            /** Scale factor. */
            let scale = parseInt( e.target.dataset.value );
            const textTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'p', 'a', 'li', 'label', 'input', 'select', 'textarea', 'legend', 'code', 'pre', 'dd', 'dt', 'span', 'blockquote'];

            /** Remove class from body to reset line-height to default values. */
            if ( 0 === scale ) {
                document.body.classList.remove( 'mdp-readabler-line-height' );
                return;
            }

            /** Add class to body, to apply styles. */
            document.body.classList.add( 'mdp-readabler-line-height' );

            /** Add inline css */
            actionLineHeight.fontLeading( textTags, scale );

        }

    }

    /**
     * Letter Spacing.
     **/
    let actionLetterSpacing = {

        letterSpacingStyle: document.createElement( 'style' ),

        /**
         * Initialise Letter Spacing action.
         **/
        init: function () {

            /** Listen for Letter Spacing change. */
            let letterSpacing = document.querySelector( '#mdp-readabler-action-letter-spacing .mdp-readabler-value' );
            letterSpacing.addEventListener( 'ReadablerInputSpinnerChanged', this.letterSpacing );

        },

        /**
         * Increase/Decrease Letter Spacing.
         **/
        letterSpacing: function ( e ) {

            /** Scale factor. */
            let scale = parseInt( e.target.dataset.value );

            /** Remove class from body to reset font size to default values. */
            if ( 0 === scale ) {
                document.body.classList.remove( 'mdp-readabler-letter-spacing' );
                return;
            }

            /** Add class to body, to apply styles. */
            document.body.classList.add( 'mdp-readabler-letter-spacing' );

            /** Calculate font sizes. */
            let letterSpacing = (scale / 100);

            /** Add CSS to header. */
            //language=CSS
            actionLetterSpacing.letterSpacingStyle.innerHTML = `
                /*noinspection CssUnusedSymbol*/
                body.mdp-readabler-letter-spacing,
                body.mdp-readabler-letter-spacing h1,
                body.mdp-readabler-letter-spacing h1 span,
                body.mdp-readabler-letter-spacing h2,
                body.mdp-readabler-letter-spacing h2 span,
                body.mdp-readabler-letter-spacing h3,
                body.mdp-readabler-letter-spacing h3 span,
                body.mdp-readabler-letter-spacing h4,
                body.mdp-readabler-letter-spacing h4 span,
                body.mdp-readabler-letter-spacing h5,
                body.mdp-readabler-letter-spacing h5 span,
                body.mdp-readabler-letter-spacing h6,
                body.mdp-readabler-letter-spacing h6 span,
                
                body.mdp-readabler-letter-spacing p,
                body.mdp-readabler-letter-spacing li,
                body.mdp-readabler-letter-spacing label,
                body.mdp-readabler-letter-spacing input,
                body.mdp-readabler-letter-spacing select,
                body.mdp-readabler-letter-spacing textarea,
                body.mdp-readabler-letter-spacing legend,
                body.mdp-readabler-letter-spacing code,
                body.mdp-readabler-letter-spacing pre,
                body.mdp-readabler-letter-spacing dd,
                body.mdp-readabler-letter-spacing dt,
                body.mdp-readabler-letter-spacing span,
                body.mdp-readabler-letter-spacing blockquote {
                    letter-spacing: ${letterSpacing}px !important;    
                }
            `;

            document.head.appendChild( actionLetterSpacing.letterSpacingStyle );

        }

    }

    /**
     * Readable Font.
     **/
    let actionReadableFont = {

        readableFontStyle: document.createElement('style'),

        /**
         * Initialise Readable Font action.
         **/
        init: function () {

            /** Listen for Readable Font change. */
            let readableFont = document.querySelector( '#mdp-readabler-action-readable-font' );
            readableFont.addEventListener( 'ReadablerToggleBoxChanged', actionReadableFont.readableFont );

        },

        /**
         * Toggle readable font.
         **/
        readableFont: function ( e ) {

            /** Remove class from body to reset font family to default values. */
            if ( ! e.target.classList.contains( 'mdp-active' ) ) {

                document.body.classList.remove( 'mdp-readabler-readable-font' );
                return;

            }

            /** Disable other buttons in button group. */
            actionReadableFont.disableOthers();

            /** Add class to body, to apply styles. */
            document.body.classList.add( 'mdp-readabler-readable-font' );

            /** Add CSS to header. */
            //language=CSS
            actionReadableFont.readableFontStyle.innerHTML = `
                /*noinspection CssUnusedSymbol*/
                body.mdp-readabler-readable-font *:not(i){
                    font-family: Arial, Helvetica, sans-serif !important;
                }
            `;

            document.head.appendChild( actionReadableFont.readableFontStyle );

        },

        /**
         * Disable other buttons in button group.
         **/
        disableOthers: function () {

            /** Disable Dyslexia Font if enabled. */
            let dyslexia = document.getElementById( 'mdp-readabler-action-dyslexia-font' );

            if ( ! dyslexia ) { return; }

            if ( dyslexia.classList.contains( 'mdp-active') ) {
                dyslexia.click();
            }

        }

    }

    /**
     * Dyslexia Friendly.
     **/
    let actionDyslexiaFriendly = {

        dyslexiaFriendlyStyle: document.createElement( 'style' ),

        /**
         * Initialise Dyslexia Friendly action.
         **/
        init: function () {

            /** Listen for Dyslexia Friendly change. */
            let dyslexiaFriendly = document.querySelector( '#mdp-readabler-action-dyslexia-font' );
            dyslexiaFriendly.addEventListener( 'ReadablerToggleBoxChanged', actionDyslexiaFriendly.dyslexiaFriendly );

        },

        /**
         * Toggle Dyslexia Friendly font.
         **/
        dyslexiaFriendly: function ( e ) {

            /** Remove class from body to reset font family to default values. */
            if ( ! e.target.classList.contains( 'mdp-active' ) ) {

                document.body.classList.remove( 'mdp-readabler-dyslexia-font' );
                return;

            }

            /** Disable other buttons in button group. */
            actionDyslexiaFriendly.disableOthers();

            /** Add class to body, to apply styles. */
            document.body.classList.add( 'mdp-readabler-dyslexia-font' );

            /** Add CSS to header. */
            //language=CSS
            actionDyslexiaFriendly.dyslexiaFriendlyStyle.innerHTML = `
                /*noinspection CssUnknownTarget*/
                @font-face {
                    font-family: 'OpenDyslexic';
                    src: url("${options.pluginURL}fonts/OpenDyslexic-Italic.eot");
                    src: local("OpenDyslexic Italic"), local("OpenDyslexic-Italic"), 
                         url("${options.pluginURL}fonts/OpenDyslexic-Italic.eot?#iefix") format("embedded-opentype"), 
                         url("${options.pluginURL}fonts/OpenDyslexic-Italic.woff2") format("woff2"), 
                         url("${options.pluginURL}fonts/OpenDyslexic-Italic.woff") format("woff"), 
                         url("${options.pluginURL}fonts/OpenDyslexic-Italic.ttf") format("truetype"), 
                         url("${options.pluginURL}fonts/OpenDyslexic-Italic.svg#OpenDyslexic-Italic") format("svg");
                    font-weight: normal;
                    font-style: italic;
                    font-display: swap; 
                }

                /*noinspection CssUnknownTarget*/
                @font-face {
                    font-family: 'OpenDyslexic';
                    src: url("${options.pluginURL}fonts/OpenDyslexic-BoldItalic.eot");
                    src: local("OpenDyslexic Bold Italic"), local("OpenDyslexic-BoldItalic"), 
                         url("${options.pluginURL}fonts/OpenDyslexic-BoldItalic.eot?#iefix") format("embedded-opentype"), 
                         url("${options.pluginURL}fonts/OpenDyslexic-BoldItalic.woff2") format("woff2"), 
                         url("${options.pluginURL}fonts/OpenDyslexic-BoldItalic.woff") format("woff"), 
                         url("${options.pluginURL}fonts/OpenDyslexic-BoldItalic.ttf") format("truetype"), 
                         url("${options.pluginURL}fonts/OpenDyslexic-BoldItalic.svg#OpenDyslexic-BoldItalic") format("svg");
                    font-weight: bold;
                    font-style: italic;
                    font-display: swap; 
                }

                /*noinspection CssUnknownTarget*/
                @font-face {
                    font-family: 'OpenDyslexic';
                    src: url("${options.pluginURL}fonts/OpenDyslexic-Bold.eot");
                    src: local("OpenDyslexic Bold"), local("OpenDyslexic-Bold"), 
                         url("${options.pluginURL}fonts/OpenDyslexic-Bold.eot?#iefix") format("embedded-opentype"), 
                         url("${options.pluginURL}fonts/OpenDyslexic-Bold.woff2") format("woff2"), 
                         url("${options.pluginURL}fonts/OpenDyslexic-Bold.woff") format("woff"), 
                         url("${options.pluginURL}fonts/OpenDyslexic-Bold.ttf") format("truetype"), 
                         url("${options.pluginURL}fonts/OpenDyslexic-Bold.svg#OpenDyslexic-Bold") format("svg");
                    font-weight: bold;
                    font-style: normal;
                    font-display: swap; 
                }

                /*noinspection CssUnknownTarget*/
                @font-face {
                    font-family: 'OpenDyslexic';
                    src: url("${options.pluginURL}fonts/OpenDyslexic-Regular.eot");
                    src: local("OpenDyslexic Regular"), local("OpenDyslexic-Regular"), 
                         url("${options.pluginURL}fonts/OpenDyslexic-Regular.eot?#iefix") format("embedded-opentype"), 
                         url("${options.pluginURL}fonts/OpenDyslexic-Regular.woff2") format("woff2"), 
                         url("${options.pluginURL}fonts/OpenDyslexic-Regular.woff") format("woff"), 
                         url("${options.pluginURL}fonts/OpenDyslexic-Regular.ttf") format("truetype"), 
                         url("${options.pluginURL}fonts/OpenDyslexic-Regular.svg#OpenDyslexic-Regular") format("svg");
                    font-weight: normal;
                    font-style: normal;
                    font-display: swap; 
                }
                    
                /*noinspection CssUnusedSymbol*/
                body.mdp-readabler-dyslexia-font,
                body.mdp-readabler-dyslexia-font h1,
                body.mdp-readabler-dyslexia-font h1 span,
                body.mdp-readabler-dyslexia-font h2,
                body.mdp-readabler-dyslexia-font h2 span,
                body.mdp-readabler-dyslexia-font h3,
                body.mdp-readabler-dyslexia-font h3 span,
                body.mdp-readabler-dyslexia-font h4,
                body.mdp-readabler-dyslexia-font h4 span,
                body.mdp-readabler-dyslexia-font h5,
                body.mdp-readabler-dyslexia-font h5 span,
                body.mdp-readabler-dyslexia-font h6,
                body.mdp-readabler-dyslexia-font h6 span,

                body.mdp-readabler-dyslexia-font a,
                body.mdp-readabler-dyslexia-font p,
                body.mdp-readabler-dyslexia-font li a,
                body.mdp-readabler-dyslexia-font label,
                body.mdp-readabler-dyslexia-font input,
                body.mdp-readabler-dyslexia-font select,
                body.mdp-readabler-dyslexia-font textarea,
                body.mdp-readabler-dyslexia-font legend,
                body.mdp-readabler-dyslexia-font code,
                body.mdp-readabler-dyslexia-font pre,
                body.mdp-readabler-dyslexia-font dd,
                body.mdp-readabler-dyslexia-font dt,
                body.mdp-readabler-dyslexia-font span,
                body.mdp-readabler-dyslexia-font blockquote {
                    font-family: 'OpenDyslexic', serif !important;
                }
            `;

            document.head.appendChild( actionDyslexiaFriendly.dyslexiaFriendlyStyle );

        },

        /**
         * Disable other buttons in button group.
         **/
        disableOthers: function () {

            /** Disable Readable Font if enabled. */
            let readable = document.getElementById( 'mdp-readabler-action-readable-font' );
            if ( readable.classList.contains( 'mdp-active') ) {
                readable.click();
            }

        }

    }

    /**
     * Highlight Titles.
     **/
    let actionHighlightTitles = {

        highlightTitlesStyle: document.createElement( 'style' ),

        /**
         * Initialise Highlight Titles action.
         **/
        init: function () {

            /** Listen for Highlight Titles change. */
            let highlightTitles = document.querySelector( '#mdp-readabler-action-highlight-titles' );
            highlightTitles.addEventListener( 'ReadablerToggleBoxChanged', actionHighlightTitles.highlightTitles );

        },

        /**
         * Toggle Highlight Titles styles.
         **/
        highlightTitles: function ( e ) {

            /** Remove class from body to reset titles to default values. */
            if ( ! e.target.classList.contains( 'mdp-active' ) ) {

                document.body.classList.remove( 'mdp-readabler-highlight-titles' );
                return;

            }

            /** Add class to body, to apply styles. */
            document.body.classList.add( 'mdp-readabler-highlight-titles' );

            /** Add CSS to header. */
            //language=CSS
            actionHighlightTitles.highlightTitlesStyle.innerHTML = `                    
                body.mdp-readabler-highlight-titles h1, 
                body.mdp-readabler-highlight-titles h2, 
                body.mdp-readabler-highlight-titles h3, 
                body.mdp-readabler-highlight-titles h4, 
                body.mdp-readabler-highlight-titles h5, 
                body.mdp-readabler-highlight-titles h6, 
                body.mdp-readabler-highlight-titles [role="heading"] {
                    outline-style: ${options.highlightTitlesStyle} !important;
                    outline-color: ${options.highlightTitlesColor} !important;
                    outline-width: ${options.highlightTitlesWidth}px !important;
                    outline-offset: ${options.highlightTitlesOffset}px !important;
                }
            `;

            document.head.appendChild( actionHighlightTitles.highlightTitlesStyle );

        }

    }

    /**
     * Highlight Links.
     **/
    let actionHighlightLinks = {

        highlightLinksStyle: document.createElement( 'style' ),

        /**
         * Initialise Highlight Links action.
         **/
        init: function () {

            /** Listen for Highlight Links change. */
            let highlightLinks = document.querySelector( '#mdp-readabler-action-highlight-links' );
            highlightLinks.addEventListener( 'ReadablerToggleBoxChanged', actionHighlightLinks.highlightLinks );

        },

        /**
         * Toggle Highlight Links styles.
         **/
        highlightLinks: function ( e ) {

            /** Remove class from body to reset links to default values. */
            if ( ! e.target.classList.contains( 'mdp-active' ) ) {

                document.body.classList.remove( 'mdp-readabler-highlight-links' );
                return;

            }

            /** Add class to body, to apply styles. */
            document.body.classList.add( 'mdp-readabler-highlight-links' );

            /** Add CSS to header. */
            //language=CSS
            actionHighlightLinks.highlightLinksStyle.innerHTML = `                    
                body.mdp-readabler-highlight-links a {
                    outline-style: ${options.highlightLinksStyle} !important;
                    outline-color: ${options.highlightLinksColor} !important;
                    outline-width: ${options.highlightLinksWidth}px !important;
                    outline-offset: ${options.highlightLinksOffset}px !important;
                }
            `;

            document.head.appendChild( actionHighlightLinks.highlightLinksStyle );

        }

    }

    /**
     * Text Magnifier.
     **/
    let actionTextMagnifier = {

        /** Create tooltip element. */
        tooltip: document.createElement( 'div' ),

        textMagnifierStyle: document.createElement( 'style' ),

        /**
         * Initialise Text Magnifier action.
         **/
        init: function () {

            /** Listen for Text Magnifier change. */
            let textMagnifier = document.querySelector( '#mdp-readabler-action-text-magnifier' );
            textMagnifier.addEventListener( 'ReadablerToggleBoxChanged', actionTextMagnifier.textMagnifier );

            /** Set id for tooltip. */
            actionTextMagnifier.tooltip.id = 'mdp-readabler-text-magnifier-tooltip';

        },

        /**
         * Toggle Text Magnifier.
         **/
        textMagnifier: function ( e ) {

            /** Disable. */
            if ( ! e.target.classList.contains( 'mdp-active' ) ) {

                /** Remove class from body. */
                document.body.classList.remove( 'mdp-readabler-text-magnifier' );

                /** Remove mousemove listener. */
                document.removeEventListener( 'mousemove', actionTextMagnifier.updateTooltip, false );

                /** Remove tooltip from DOM. */
                document.body.removeChild( actionTextMagnifier.tooltip );

                /** Remove events for Show/hide tooltip on mouse leave page. */
                document.removeEventListener( 'mouseleave', actionTextMagnifier.hideTooltip, false );
                document.removeEventListener( 'mouseenter', actionTextMagnifier.showTooltip, false );

                return;

            }

            /** Enable. */

            /** Add class to body. */
            document.body.classList.add( 'mdp-readabler-text-magnifier' );

            /** Add tooltip into DOM. */
            document.body.appendChild( actionTextMagnifier.tooltip );

            /** Update tooltip on mouse move. */
            document.addEventListener( 'mousemove', actionTextMagnifier.updateTooltip , false );

            /** Show/hide tooltip on mouse leave page. */
            document.addEventListener( 'mouseleave', actionTextMagnifier.hideTooltip, false );
            document.addEventListener( 'mouseenter', actionTextMagnifier.showTooltip, false );

            /** Add CSS to header. */
            //language=CSS
            actionTextMagnifier.textMagnifierStyle.innerHTML = `
                /*noinspection CssUnusedSymbol*/                    
                body.mdp-readabler-text-magnifier #mdp-readabler-text-magnifier-tooltip {
                    background-color: ${options.textMagnifierBgColor} !important;
                    color: ${options.textMagnifierColor} !important;
                    font-size: ${options.textMagnifierFontSize}px !important;
                }
            `;

            document.head.appendChild( actionTextMagnifier.textMagnifierStyle );

        },

        /** Add tooltip with zoomed content on mouse move. */
        updateTooltip: function ( e ) {

            /** Show zoomed tooltip only for content tags. */
            let contentElements = [
                'H1',
                'H2',
                'H3',
                'H4',
                'H5',
                'H6',
                'SPAN',
                'P',
                'LI',
                'LABEL',
                'INPUT',
                'SELECT',
                'TEXTAREA',
                'LEGEND',
                'CODE',
                'PRE',
                'DD',
                'DT',
                'A',
                'STRONG',
                'B',
                'BLOCKQUOTE'
            ];

            /** Hide tooltip for non-content tags. */
            if ( ! contentElements.includes( e.target.nodeName ) ) {

                actionTextMagnifier.hideTooltip();
                return;

            }

            /** Hide tooltip without text. */
            if ( '' === e.target.innerText.trim() ) {

                actionTextMagnifier.hideTooltip();
                return;

            }

            /** Show tooltip. */
            actionTextMagnifier.showTooltip();

            /** Set text from under mouse to tooltip. */
            actionTextMagnifier.tooltip.innerHTML = e.target.innerText;

            /** Move tooltip to cursor. */
            const shift = 15;
            let maxWidth = window.innerWidth;
            actionTextMagnifier.tooltip.style.top = `${ e.clientY + shift }px`;

            /** Stick popup to right if cursor on the right 50% */
            if ( e.clientX > window.innerWidth * 0.5 ) {

                maxWidth = e.clientX - shift <= 680 ? e.clientX - shift : 680;

                actionTextMagnifier.tooltip.style.left = `unset`;
                actionTextMagnifier.tooltip.style.right = `${ window.innerWidth - e.clientX - shift }px`;
                actionTextMagnifier.tooltip.style.maxWidth = `${ maxWidth }px`;

            } else {

                maxWidth = window.innerWidth - e.clientX - 3 * shift < 680 ? window.innerWidth - e.clientX - 3 * shift : 680;

                actionTextMagnifier.tooltip.style.right = `unset`;
                actionTextMagnifier.tooltip.style.left = `${ e.clientX + shift }px`;
                actionTextMagnifier.tooltip.style.maxWidth = `${ maxWidth }px`;

            }

        },

        /** Hide tooltip. */
        hideTooltip: function () {
            actionTextMagnifier.tooltip.style.visibility = 'hidden';
        },

        /** Show tooltip. */
        showTooltip: function () {
            actionTextMagnifier.tooltip.style.visibility = 'visible';
        }

    }

    /**
     * Align Center.
     **/
    let actionAlignCenter = {

        alignCenterStyle: document.createElement( 'style' ),

        /**
         * Initialise Align Center action.
         **/
        init: function () {

            /** Listen for Align Center change. */
            let alignCenter = document.querySelector( '#mdp-readabler-action-align-center' );
            alignCenter.addEventListener( 'ReadablerToggleBoxChanged', actionAlignCenter.alignCenter );

        },

        /**
         * Toggle Align Center styles.
         **/
        alignCenter: function ( e ) {

            /** Remove class from body to reset align to default values. */
            if ( ! e.target.classList.contains( 'mdp-active' ) ) {

                document.body.classList.remove( 'mdp-readabler-align-center' );
                return;

            }

            /** Disable other buttons in button group. */
            actionAlignCenter.disableOthers();

            /** Add class to body, to apply align styles. */
            document.body.classList.add( 'mdp-readabler-align-center' );

            /** Add CSS to header. */
            //language=CSS
            actionAlignCenter.alignCenterStyle.innerHTML = `
                /*noinspection CssUnusedSymbol*/
                body.mdp-readabler-align-center,
                body.mdp-readabler-align-center h1,
                body.mdp-readabler-align-center h1 span,
                body.mdp-readabler-align-center h2,
                body.mdp-readabler-align-center h2 span,
                body.mdp-readabler-align-center h3,
                body.mdp-readabler-align-center h3 span,
                body.mdp-readabler-align-center h4,
                body.mdp-readabler-align-center h4 span,
                body.mdp-readabler-align-center h5,
                body.mdp-readabler-align-center h5 span,
                body.mdp-readabler-align-center h6,
                body.mdp-readabler-align-center h6 span,

                body.mdp-readabler-align-center p,
                body.mdp-readabler-align-center li,
                body.mdp-readabler-align-center label,
                body.mdp-readabler-align-center input,
                body.mdp-readabler-align-center select,
                body.mdp-readabler-align-center textarea,
                body.mdp-readabler-align-center legend,
                body.mdp-readabler-align-center code,
                body.mdp-readabler-align-center pre,
                body.mdp-readabler-align-center dd,
                body.mdp-readabler-align-center dt,
                body.mdp-readabler-align-center span,
                body.mdp-readabler-align-center blockquote {
                    text-align: center !important;
                }
            `;

            document.head.appendChild( actionAlignCenter.alignCenterStyle );

        },

        /**
         * Disable other buttons in button group.
         **/
        disableOthers: function () {

            /** Disable Align Left if enabled. */
            let left = document.getElementById( 'mdp-readabler-action-align-left' );

            if ( null !== left ) {

                if ( left.classList.contains( 'mdp-active') ) {
                    left.click();
                }

            }

            /** Disable Align Right if enabled. */
            let right = document.getElementById( 'mdp-readabler-action-align-right' );

            if ( null !== right ) {

                if ( right.classList.contains( 'mdp-active') ) {
                    right.click();
                }

            }

        }

    }

    /**
     * Align Left.
     **/
    let actionAlignLeft = {

        alignLeftStyle: document.createElement( 'style' ),

        /**
         * Initialise Align Left action.
         **/
        init: function () {

            /** Listen for Align Left change. */
            let alignLeft = document.querySelector( '#mdp-readabler-action-align-left' );
            alignLeft.addEventListener( 'ReadablerToggleBoxChanged', actionAlignLeft.alignLeft );

        },

        /**
         * Toggle Align Left styles.
         **/
        alignLeft: function ( e ) {

            /** Remove class from body to reset align to default values. */
            if ( ! e.target.classList.contains( 'mdp-active' ) ) {

                document.body.classList.remove( 'mdp-readabler-align-left' );
                return;

            }

            /** Disable other buttons in button group. */
            actionAlignLeft.disableOthers();

            /** Add class to body, to apply align styles. */
            document.body.classList.add( 'mdp-readabler-align-left' );

            /** Add CSS to header. */
            //language=CSS
            actionAlignLeft.alignLeftStyle.innerHTML = `
                /*noinspection CssUnusedSymbol*/
                body.mdp-readabler-align-left,
                body.mdp-readabler-align-left h1,
                body.mdp-readabler-align-left h1 span,
                body.mdp-readabler-align-left h2,
                body.mdp-readabler-align-left h2 span,
                body.mdp-readabler-align-left h3,
                body.mdp-readabler-align-left h3 span,
                body.mdp-readabler-align-left h4,
                body.mdp-readabler-align-left h4 span,
                body.mdp-readabler-align-left h5,
                body.mdp-readabler-align-left h5 span,
                body.mdp-readabler-align-left h6,
                body.mdp-readabler-align-left h6 span,

                body.mdp-readabler-align-left p,
                body.mdp-readabler-align-left li,
                body.mdp-readabler-align-left label,
                body.mdp-readabler-align-left input,
                body.mdp-readabler-align-left select,
                body.mdp-readabler-align-left textarea,
                body.mdp-readabler-align-left legend,
                body.mdp-readabler-align-left code,
                body.mdp-readabler-align-left pre,
                body.mdp-readabler-align-left dd,
                body.mdp-readabler-align-left dt,
                body.mdp-readabler-align-left span,
                body.mdp-readabler-align-left blockquote {
                    text-align: left !important;
                }
            `;

            document.head.appendChild( actionAlignLeft.alignLeftStyle );

        },

        /**
         * Disable other buttons in button group.
         **/
        disableOthers: function () {

            /** Disable Align Center if enabled. */
            let center = document.getElementById( 'mdp-readabler-action-align-center' );

            if ( null !== center ) {

                if ( center.classList.contains( 'mdp-active') ) {
                    center.click();
                }

            }

            /** Disable Align Right if enabled. */
            let right = document.getElementById( 'mdp-readabler-action-align-right' );

            if ( null !== right ) {

                if ( right.classList.contains( 'mdp-active') ) {
                    right.click();
                }

            }

        }

    }

    /**
     * Align Right.
     **/
    let actionAlignRight = {

        alignRightStyle: document.createElement( 'style' ),

        /**
         * Initialise Align Right action.
         **/
        init: function () {

            /** Listen for Align Right change. */
            let alignRight = document.querySelector( '#mdp-readabler-action-align-right' );
            alignRight.addEventListener( 'ReadablerToggleBoxChanged', actionAlignRight.alignRight );

        },

        /**
         * Toggle Align Right styles.
         **/
        alignRight: function ( e ) {

            /** Remove class from body to reset align to default values. */
            if ( ! e.target.classList.contains( 'mdp-active' ) ) {

                document.body.classList.remove( 'mdp-readabler-align-right' );
                return;

            }

            /** Disable other buttons in button group. */
            actionAlignRight.disableOthers();

            /** Add class to body, to apply align styles. */
            document.body.classList.add( 'mdp-readabler-align-right' );

            /** Add CSS to header. */
            //language=CSS
            actionAlignRight.alignRightStyle.innerHTML = `
                /*noinspection CssUnusedSymbol*/
                body.mdp-readabler-align-right,
                body.mdp-readabler-align-right h1,
                body.mdp-readabler-align-right h1 span,
                body.mdp-readabler-align-right h2,
                body.mdp-readabler-align-right h2 span,
                body.mdp-readabler-align-right h3,
                body.mdp-readabler-align-right h3 span,
                body.mdp-readabler-align-right h4,
                body.mdp-readabler-align-right h4 span,
                body.mdp-readabler-align-right h5,
                body.mdp-readabler-align-right h5 span,
                body.mdp-readabler-align-right h6,
                body.mdp-readabler-align-right h6 span,

                body.mdp-readabler-align-right p,
                body.mdp-readabler-align-right li,
                body.mdp-readabler-align-right label,
                body.mdp-readabler-align-right input,
                body.mdp-readabler-align-right select,
                body.mdp-readabler-align-right textarea,
                body.mdp-readabler-align-right legend,
                body.mdp-readabler-align-right code,
                body.mdp-readabler-align-right pre,
                body.mdp-readabler-align-right dd,
                body.mdp-readabler-align-right dt,
                body.mdp-readabler-align-right span,
                body.mdp-readabler-align-right blockquote {
                    text-align: right !important;
                }
            `;

            document.head.appendChild( actionAlignRight.alignRightStyle );

        },

        /**
         * Disable other buttons in button group.
         **/
        disableOthers: function () {

            /** Disable Align Center if enabled. */
            let center = document.getElementById( 'mdp-readabler-action-align-center' );

            if ( null !== center ) {

                if ( center.classList.contains( 'mdp-active') ) {
                    center.click();
                }

            }

            /** Disable Align Left if enabled. */
            let left = document.getElementById( 'mdp-readabler-action-align-left' );

            if ( null !== left ) {

                if ( left.classList.contains( 'mdp-active') ) {
                    left.click();
                }

            }

        }

    }

    /**
     * General methods for Visually Pleasing Experience group.
     **/
    let visuallyPleasingExperience = {

        /**
         * Disable other buttons in button group.
         **/
        disableOthers: function ( el ) {

            let activeBtns = document.querySelectorAll('#mdp-readabler-visually-pleasing-experience-box .mdp-readabler-toggle-box.mdp-active');
            activeBtns.forEach( btn  => {

                if ( el.id !== btn.id ) {
                    btn.click();
                }

            } );

        }

    }

    /**
     * Dark Contrast.
     **/
    let actionDarkContrast = {

        darkContrastStyle: document.createElement( 'style' ),

        /**
         * Initialise DarkContrast action.
         **/
        init: function () {

            /** Listen for Dark Contrast change. */
            let darkContrast = document.querySelector( '#mdp-readabler-action-dark-contrast' );
            darkContrast.addEventListener( 'ReadablerToggleBoxChanged', actionDarkContrast.darkContrast );

        },

        /**
         * Toggle Dark Contrast styles.
         **/
        darkContrast: function ( e ) {

            /** Remove class from body to reset Dark Contrast to default state. */
            if ( ! e.target.classList.contains( 'mdp-active' ) ) {

                document.body.classList.remove( 'mdp-readabler-dark-contrast' );
                return;

            }

            /** Disable other buttons in button group. */
            visuallyPleasingExperience.disableOthers( e.target );

            /** Add class to body, to apply align styles. */
            document.body.classList.add( 'mdp-readabler-dark-contrast' );

        }

    }

    /**
     * Light Contrast.
     **/
    let actionLightContrast = {

        lightContrastStyle: document.createElement( 'style' ),

        /**
         * Initialise Light Contrast action.
         **/
        init: function () {

            /** Listen for Light Contrast change. */
            let lightContrast = document.querySelector( '#mdp-readabler-action-light-contrast' );
            lightContrast.addEventListener( 'ReadablerToggleBoxChanged', actionLightContrast.lightContrast );

        },

        /**
         * Toggle Light Contrast styles.
         **/
        lightContrast: function ( e ) {

            /** Remove class from body to reset Light Contrast to default state. */
            if ( ! e.target.classList.contains( 'mdp-active' ) ) {

                document.body.classList.remove( 'mdp-readabler-light-contrast' );
                return;

            }

            /** Disable other buttons in button group. */
            visuallyPleasingExperience.disableOthers( e.target );

            /** Add class to body, to apply align styles. */
            document.body.classList.add( 'mdp-readabler-light-contrast' );

        }

    }

    /**
     * Monochrome.
     **/
    let actionMonochrome = {

        /**
         * Initialise Monochrome action.
         **/
        init: function () {

            /** Listen for Monochrome change. */
            let monochrome = document.querySelector( '#mdp-readabler-action-monochrome' );
            monochrome.addEventListener( 'ReadablerToggleBoxChanged', actionMonochrome.monochrome );

        },

        /**
         * Toggle Monochrome styles.
         **/
        monochrome: function ( e ) {

            /** Remove class from body to reset Monochrome to default state. */
            if ( ! e.target.classList.contains( 'mdp-active' ) ) {

                document.body.classList.remove( 'mdp-readabler-monochrome' );
                return;

            }

            /** Disable other buttons in button group. */
            visuallyPleasingExperience.disableOthers( e.target );

            /** Add class to body, to apply align styles. */
            document.body.classList.add( 'mdp-readabler-monochrome' );

        }

    }

    /**
     * High Saturation.
     **/
    let actionHighSaturation = {

        /**
         * Initialise High Saturation action.
         **/
        init: function () {

            /** Listen for High Saturation change. */
            let highSaturation = document.querySelector( '#mdp-readabler-action-high-saturation' );
            highSaturation.addEventListener( 'ReadablerToggleBoxChanged', actionHighSaturation.highSaturation );

        },

        /**
         * Toggle High Saturation styles.
         **/
        highSaturation: function ( e ) {

            /** Remove class from body to reset High Saturation to default state. */
            if ( ! e.target.classList.contains( 'mdp-active' ) ) {

                document.body.classList.remove( 'mdp-readabler-high-saturation' );
                return;

            }

            /** Disable other buttons in button group. */
            visuallyPleasingExperience.disableOthers( e.target );

            /** Add class to body, to apply align styles. */
            document.body.classList.add( 'mdp-readabler-high-saturation' );

        }

    }

    /**
     * High Contrast.
     **/
    let actionHighContrast = {

        /**
         * Initialise High Contrast action.
         **/
        init: function () {

            /** Listen for High Contrast change. */
            let highContrast = document.querySelector( '#mdp-readabler-action-high-contrast' );
            highContrast.addEventListener( 'ReadablerToggleBoxChanged', actionHighContrast.highContrast );

        },

        /**
         * Toggle High Contrast styles.
         **/
        highContrast: function ( e ) {

            /** Remove class from body to reset High Contrast to default state. */
            if ( ! e.target.classList.contains( 'mdp-active' ) ) {

                document.body.classList.remove( 'mdp-readabler-high-contrast' );
                return;

            }

            /** Disable other buttons in button group. */
            visuallyPleasingExperience.disableOthers( e.target );

            /** Add class to body, to apply align styles. */
            document.body.classList.add( 'mdp-readabler-high-contrast' );

        }

    }

    /**
     * Low Saturation.
     **/
    let actionLowSaturation = {

        /**
         * Initialise Low Saturation action.
         **/
        init: function () {

            /** Listen for Low Saturation change. */
            let lowSaturation = document.querySelector( '#mdp-readabler-action-low-saturation' );
            lowSaturation.addEventListener( 'ReadablerToggleBoxChanged', actionLowSaturation.lowSaturation );

        },

        /**
         * Toggle Low Saturation styles.
         **/
        lowSaturation: function ( e ) {

            /** Remove class from body to reset Low Saturation to default state. */
            if ( ! e.target.classList.contains( 'mdp-active' ) ) {

                document.body.classList.remove( 'mdp-readabler-low-saturation' );
                return;

            }

            /** Disable other buttons in button group. */
            visuallyPleasingExperience.disableOthers( e.target );

            /** Add class to body, to apply align styles. */
            document.body.classList.add( 'mdp-readabler-low-saturation' );

        }

    }

    /**
     * Text Colors.
     **/
    let actionTextColors = {

        textColorsStyle: document.createElement( 'style' ),

        /**
         * Initialise Text Colors action.
         **/
        init: function () {

            /** Listen for Text Colors change. */
            let textColors = document.querySelector( '#mdp-readabler-action-text-colors' );
            textColors.addEventListener( 'ReadablerPaletteChanged', actionTextColors.textColors );

        },

        /**
         * Change Text Color action.
         **/
        textColors: function ( e ) {

            let color = e.detail.color;

            /** Remove class from body to reset text colors to default state. */
            if ( null === color ) {

                /** Add class to body, to apply styles. */
                document.body.classList.remove( 'mdp-readabler-text-colors' );
                return;

            }

            /** Add class to body, to apply styles. */
            document.body.classList.add( 'mdp-readabler-text-colors' );

            /** Add CSS to header. */
            //language=CSS
            actionTextColors.textColorsStyle.innerHTML = `
                body.mdp-readabler-text-colors p,
                body.mdp-readabler-text-colors li,
                body.mdp-readabler-text-colors label,
                body.mdp-readabler-text-colors input,
                body.mdp-readabler-text-colors select,
                body.mdp-readabler-text-colors textarea,
                body.mdp-readabler-text-colors legend,
                body.mdp-readabler-text-colors code,
                body.mdp-readabler-text-colors pre,
                body.mdp-readabler-text-colors dd,
                body.mdp-readabler-text-colors dt,
                body.mdp-readabler-text-colors span,
                body.mdp-readabler-text-colors blockquote {
                    color: ${color} !important;
                }
            `;

            document.head.appendChild( actionTextColors.textColorsStyle );

        }

    }

    /**
     * Title Colors.
     **/
    let actionTitleColors = {

        titleColorsStyle: document.createElement( 'style' ),

        /**
         * Initialise Title Colors action.
         **/
        init: function () {

            /** Listen for Title Colors change. */
            let titleColors = document.querySelector( '#mdp-readabler-action-title-colors' );
            titleColors.addEventListener( 'ReadablerPaletteChanged', actionTitleColors.titleColors );

        },

        /**
         * Change Title Color action.
         **/
        titleColors: function ( e ) {

            let color = e.detail.color;

            /** Remove class from body to reset Title colors to default state. */
            if ( null === color ) {

                /** Add class to body, to apply styles. */
                document.body.classList.remove( 'mdp-readabler-title-colors' );
                return;

            }

            /** Add class to body, to apply styles. */
            document.body.classList.add( 'mdp-readabler-title-colors' );

            /** Add CSS to header. */
            //language=CSS
            actionTitleColors.titleColorsStyle.innerHTML = `
                body.mdp-readabler-title-colors h1,
                body.mdp-readabler-title-colors h1 *,
                body.mdp-readabler-title-colors h2,
                body.mdp-readabler-title-colors h2 *,
                body.mdp-readabler-title-colors h3,
                body.mdp-readabler-title-colors h3 *,
                body.mdp-readabler-title-colors h4,
                body.mdp-readabler-title-colors h4 *,
                body.mdp-readabler-title-colors h5,
                body.mdp-readabler-title-colors h5 *,
                body.mdp-readabler-title-colors h6,
                body.mdp-readabler-title-colors h6 * {
                    color: ${color} !important;
                }
            `;

            document.head.appendChild( actionTitleColors.titleColorsStyle );

        }

    }

    /**
     * Background Colors.
     **/
    let actionBackgroundColors = {

        backgroundColorsStyle: document.createElement( 'style' ),

        /**
         * Initialise Background Colors action.
         **/
        init: function () {

            /** Listen for Background Colors change. */
            let backgroundColors = document.querySelector( '#mdp-readabler-action-background-colors' );
            backgroundColors.addEventListener( 'ReadablerPaletteChanged', actionBackgroundColors.backgroundColors );

        },

        /**
         * Change Background Color action.
         **/
        backgroundColors: function ( e ) {

            let color = e.detail.color;

            /** Remove class from body to reset Background colors to default state. */
            if ( null === color ) {

                /** Add class to body, to apply styles. */
                document.body.classList.remove( 'mdp-readabler-background-colors' );
                return;

            }

            /** Add class to body, to apply styles. */
            document.body.classList.add( 'mdp-readabler-background-colors' );

            /** Add CSS to header. */
            //language=CSS
            actionBackgroundColors.backgroundColorsStyle.innerHTML = `
                /*noinspection CssUnusedSymbol*/
                body.mdp-readabler-background-colors,
                body.mdp-readabler-background-colors h1,
                body.mdp-readabler-background-colors h1 span,
                body.mdp-readabler-background-colors h2,
                body.mdp-readabler-background-colors h2 span,
                body.mdp-readabler-background-colors h3,
                body.mdp-readabler-background-colors h3 span,
                body.mdp-readabler-background-colors h4,
                body.mdp-readabler-background-colors h4 span,
                body.mdp-readabler-background-colors h5,
                body.mdp-readabler-background-colors h5 span,
                body.mdp-readabler-background-colors h6,
                body.mdp-readabler-background-colors h6 span,

                body.mdp-readabler-background-colors p,
                body.mdp-readabler-background-colors li,
                body.mdp-readabler-background-colors label,
                body.mdp-readabler-background-colors input,
                body.mdp-readabler-background-colors select,
                body.mdp-readabler-background-colors textarea,
                body.mdp-readabler-background-colors legend,
                body.mdp-readabler-background-colors code,
                body.mdp-readabler-background-colors pre,
                body.mdp-readabler-background-colors dd,
                body.mdp-readabler-background-colors dt,
                body.mdp-readabler-background-colors span,
                body.mdp-readabler-background-colors blockquote {
                    background-color: ${color} !important;
                }
            `;

            document.head.appendChild( actionBackgroundColors.backgroundColorsStyle );

        }

    }

    /**
     * Mute Sounds.
     **/
    let actionMuteSounds = {

        /**
         * Initialise Mute Sounds action.
         **/
        init: function () {

            /** Listen for Mute Sounds change. */
            let muteSounds = document.querySelector( '#mdp-readabler-action-mute-sounds' );
            muteSounds.addEventListener( 'ReadablerToggleBoxChanged', actionMuteSounds.muteSounds );

        },

        /**
         * Toggle Mute Sounds.
         **/
        muteSounds: function ( e ) {

            /** Remove class from body to reset Low Saturation to default state. */
            if ( ! e.target.classList.contains( 'mdp-active' ) ) {

                /** UnMute all elements. */
                actionMuteSounds.mute( false );

                document.documentElement.classList.remove( 'mdp-readabler-mute-sounds' );

                return;

            }

            /** Mute all elements. */
            actionMuteSounds.mute( true );

            /** Add class to body as flag. */
            document.documentElement.classList.add( 'mdp-readabler-mute-sounds' );

        },

        /**
         * Mute/UnMute all elements.
         **/
        mute: function ( mute ) {

            /** Mute/UnMute all video and audio elements on the page. */
            document.querySelectorAll( 'video, audio' ).forEach( elem => {
                elem.muted = mute;
            } );

            /** Mute/UnMute YouTube and Vimeo. */
            document.querySelectorAll( 'iframe' ).forEach( elem => {

                if (
                    elem.src.toLowerCase().includes( 'youtube.com' ) ||
                    elem.src.toLowerCase().includes( 'vimeo.com' )
                ) {

                    let newSrc = new URL( elem.src );

                    /** Mute. */
                    if ( mute ) {

                        newSrc.searchParams.append( 'mute', '1' );
                        newSrc.searchParams.append( 'muted', '1' );

                    /** Unmute. */
                    } else {

                        newSrc.searchParams.delete( 'mute' );
                        newSrc.searchParams.delete( 'muted' );

                    }

                    elem.src = newSrc.href;

                }

            } );

        }

    }

    /**
     * Hide Images.
     **/
    let actionHideImages = {

        hideImagesStyle: document.createElement( 'style' ),

        /**
         * Initialise Hide Images action.
         **/
        init: function () {

            /** Listen for Hide Images change. */
            let hideImages = document.querySelector( '#mdp-readabler-action-hide-images' );
            hideImages.addEventListener( 'ReadablerToggleBoxChanged', actionHideImages.hideImages );

        },

        /**
         * Toggle Hide Images.
         **/
        hideImages: function ( e ) {

            /** Remove class from body to reset to default state. */
            if ( ! e.target.classList.contains( 'mdp-active' ) ) {

                document.body.classList.remove( 'mdp-readabler-hide-images' );
                return;

            }

            /** Add class to body as flag. */
            document.body.classList.add( 'mdp-readabler-hide-images' );

            /** Add CSS to header. */
            //language=CSS
            actionHideImages.hideImagesStyle.innerHTML = `
                body.mdp-readabler-hide-images img,
                body.mdp-readabler-hide-images video {
                    opacity: 0 !important;
                    visibility: hidden !important
                }

                body.mdp-readabler-hide-images * {
                    background-image: none !important
                }

            `;

            document.head.appendChild( actionHideImages.hideImagesStyle );

        }

    }

    /**
     * Virtual Keyboard.
     **/
    let actionVirtualKeyboard = {

        /**
         * Keyboard Window.
         **/
        keyboardBox: document.getElementById( 'mdp-readabler-keyboard-box' ),

        /**
         * Virtual Keyboard instance.
         **/
        keyboard: null,

        selectedInput: null,

        /**
         * Initialise Virtual Keyboard action.
         **/
        init: function () {

            /** Listen for Virtual Keyboard change. */
            let virtualKeyboard = document.querySelector( '#mdp-readabler-action-virtual-keyboard' );
            virtualKeyboard.addEventListener( 'ReadablerToggleBoxChanged', actionVirtualKeyboard.virtualKeyboard );

            /**
             * Attach events to input and textarea.
             **/
            document.querySelectorAll( 'textarea, input[type]:not([type=radio]):not([type=checkbox]):not([type=hidden])' ).forEach( input  => {

                input.addEventListener( 'focus', actionVirtualKeyboard.onInputFocus );
                input.addEventListener( 'input', actionVirtualKeyboard.onInputChange );

            } );

            /**
             * Hide Keyboard on click outside.
             **/
            document.addEventListener( 'click', event => {

                // noinspection JSUnresolvedVariable
                let elType = event.target.nodeName.toLowerCase();

                // noinspection JSUnresolvedFunction
                if (

                    /** Target is not keyboard element. */
                    null === event.target.closest( '#mdp-readabler-keyboard-box' ) &&
                    /** And not input. */
                    elType !== 'input' &&
                    /** And not textarea. */
                    elType !== 'textarea'

                ) {

                    /** Hide keyboard. */
                    actionVirtualKeyboard.keyboardBox.style.display = 'none';

                }

            } );

            /** Make Keyboard Box draggable. */
            actionVirtualKeyboard.makeKeyboardDraggable();

        },

        /**
         * Show keyboard when input get focus.
         **/
        onInputFocus: function ( event ) {

            /** Work only with enabled keyboard. */
            if ( ! document.body.classList.contains( 'mdp-readabler-virtual-keyboard' ) ) { return; }

            /** Show keyboard. */
            actionVirtualKeyboard.keyboardBox.style.display = 'block';

            /** We need id for each input. */
            if ( ! event.target.id ) {
                event.target.id = actionVirtualKeyboard.uid();
            }

            actionVirtualKeyboard.selectedInput = `#${event.target.id}`;

            actionVirtualKeyboard.keyboard.setOptions( { inputName: event.target.id } );

        },

        /**
         * Update virtual keyboard when input is changed directly.
         **/
        onInputChange: function ( event ) {

            /** Work only with enabled keyboard. */
            if ( ! document.body.classList.contains( 'mdp-readabler-virtual-keyboard' ) ) { return; }

            actionVirtualKeyboard.keyboard.setInput( event.target.value, event.target.id );

        },

        /**
         * Toggle Virtual Keyboard.
         **/
        virtualKeyboard: function ( e ) {

            /** Remove class from body to flag state. */
            if ( ! e.target.classList.contains( 'mdp-active' ) ) {

                document.body.classList.remove( 'mdp-readabler-virtual-keyboard' );

                /** Destroy keyboard. */
                actionVirtualKeyboard.keyboard.destroy();

                return;

            }

            /** Add class to body as flag. */
            document.body.classList.add( 'mdp-readabler-virtual-keyboard' );

            /** Set selected layout for keyboard. */
            const KeyboardLayouts = window.SimpleKeyboardLayouts.default;
            const layout = new KeyboardLayouts().get( options.virtualKeyboardLayout );

            /** Create keyboard. */
            actionVirtualKeyboard.keyboard = new window.SimpleKeyboard.default( {
                newLineOnEnter: true,
                onChange: input => actionVirtualKeyboard.onChange( input ),
                onKeyPress: button => actionVirtualKeyboard.onKeyPress( button ),
                layout: layout.layout,
                theme: 'mdp-readabler-simple-keyboard',
                physicalKeyboardHighlight: true
            } );

        },

        /**
         * onChange handler for keyboard.
         **/
        onChange: function ( input ) {

            document.querySelector( actionVirtualKeyboard.selectedInput ).value = input;

        },

        /**
         * onKeyPress handler for keyboard.
         **/
        onKeyPress: function ( button ) {

            /** Shift functionality. */
            if ( button === '{lock}' || button === '{shift}' ) {
                actionVirtualKeyboard.handleShiftButton();
            }

        },

        /**
         * Change keys case on shift key.
         **/
        handleShiftButton: function () {

            let currentLayout = actionVirtualKeyboard.keyboard.options.layoutName;
            let shiftToggle = currentLayout === "default" ? "shift" : "default";

            actionVirtualKeyboard.keyboard.setOptions( {
                layoutName: shiftToggle
            } );

        },

        /**
         * Generates very unique IDs that are sorted by its generated Date.
         **/
        uid: function() {

            return 'mdp-' + Date.now().toString( 36 ) + Math.random().toString( 36 ).substr( 2 );

        },

        /**
         * Make keyboard box draggable.
         **/
        makeKeyboardDraggable: function () {

            let dragItem = actionVirtualKeyboard.keyboardBox;
            let container = document.documentElement;

            let active = false;
            let currentX;
            let currentY;
            let initialX;
            let initialY;
            let xOffset = 0;
            let yOffset = 0;

            container.addEventListener("touchstart", dragStart, false);
            container.addEventListener("touchend", dragEnd, false);
            container.addEventListener("touchmove", drag, false);

            container.addEventListener("mousedown", dragStart, false);
            container.addEventListener("mouseup", dragEnd, false);
            container.addEventListener("mousemove", drag, false);

            function dragStart( e ) {

                if ( e.type === "touchstart" ) {
                    initialX = e.touches[0].clientX - xOffset;
                    initialY = e.touches[0].clientY - yOffset;
                } else {
                    initialX = e.clientX - xOffset;
                    initialY = e.clientY - yOffset;
                }

                if ( e.target === dragItem ) {
                    active = true;
                }

            }

            function dragEnd() {

                initialX = currentX;
                initialY = currentY;

                active = false;

            }

            function drag( e ) {

                if ( active ) {

                    if (e.type === "touchmove") {
                        currentX = e.touches[0].clientX - initialX;
                        currentY = e.touches[0].clientY - initialY;
                    } else {
                        currentX = e.clientX - initialX;
                        currentY = e.clientY - initialY;
                    }

                    xOffset = currentX;
                    yOffset = currentY;

                    setTranslate(currentX, currentY, dragItem);
                }
            }

            function setTranslate(xPos, yPos, el) {
                el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
            }

        }

    }

    /**
     * Reading Guide.
     **/
    let actionReadingGuide = {

        readingGuideStyle: document.createElement( 'style' ),

        /** Reading Guide element. */
        readingGuideEl: null,

        /**
         * Initialise Reading Guide action.
         **/
        init: function () {

            /** Listen for Reading Guide change. */
            let readingGuide = document.querySelector( '#mdp-readabler-action-reading-guide' );
            readingGuide.addEventListener( 'ReadablerToggleBoxChanged', actionReadingGuide.readingGuide );

        },

        /**
         * Initialise Reading Guide action.
         **/
        readingGuide: function ( e ) {

            /** Remove class from body to reset to default state. */
            if ( ! e.target.classList.contains( 'mdp-active' ) ) {

                /** Remove Reading Guide. */
                actionReadingGuide.removeReadingGuide();
                return;

            }

            /** Create Reading Guide element. */
            actionReadingGuide.createReadingGuide();

        },

        /**
         * Create Reading Guide on page.
         **/
        createReadingGuide: function () {

            /** Exit if reading guide already exist. */
            if ( document.querySelectorAll( '.mdp-readabler-reading-guide-element' ).length ) { return; }

            /** Add CSS for Reading Guide. */
            actionReadingGuide.addCSS();

            /** Create reading guide element. */
            actionReadingGuide.readingGuideEl = document.createElement( 'div' );
            actionReadingGuide.readingGuideEl.classList.add( 'mdp-readabler-reading-guide-element' );
            document.body.appendChild( actionReadingGuide.readingGuideEl );

            /** Listen mouse events. */
            document.addEventListener( 'mousemove', actionReadingGuide.moveReadingGuide );
            document.addEventListener( 'click', actionReadingGuide.moveReadingGuide );

        },

        /**
         * Move Reading Guide with mouse.
         **/
        moveReadingGuide: function ( e ) {

            let newPosX = e.clientX - ( Math.round( actionReadingGuide.readingGuideEl.clientWidth / 2 ) );
            let newPosY = e.clientY;

            actionReadingGuide.readingGuideEl.style.transform = "translate3d(" + newPosX + "px," + newPosY + "px,0px)";

        },

        /**
         * Remove Reading Guide on page.
         **/
        removeReadingGuide: function () {

            document.body.classList.remove( 'mdp-readabler-reading-guide' );

            /** Remove element from page. */
            actionReadingGuide.readingGuideEl.remove();

            /** Remove listeners for mouse events. */
            document.removeEventListener( 'mousemove', actionReadingGuide.moveReadingGuide );
            document.removeEventListener( 'click', actionReadingGuide.moveReadingGuide );

        },

        /**
         * Add CSS for Reading Guide.
         **/
        addCSS: function () {

            /** Add class to body as flag. */
            document.body.classList.add( 'mdp-readabler-reading-guide' );

            /** Add CSS to header. */
            //language=CSS
            actionReadingGuide.readingGuideStyle.innerHTML = `
                /*noinspection CssUnusedSymbol*/
                .mdp-readabler-reading-guide {
                    --readabler-reading-guide-width: ${options.readingGuideWidth}px;
                    --readabler-reading-guide-height: ${options.readingGuideHeight}px;
                    --readabler-reading-guide-radius: ${options.readingGuideBorderRadius}px;
                    --readabler-reading-guide-bg: ${options.readingGuideBackgroundColor};
                    --readabler-reading-guide-border-color: ${options.readingGuideBorderColor};
                    --readabler-reading-guide-border-width: ${options.readingGuideBorderWidth}px;
                    --readabler-reading-guide-arrow: ${options.readingGuideArrow}px;
                    --readabler-reading-guide-arrow-margin: ${0-options.readingGuideArrow}px;
                }
            `;
            document.head.appendChild( actionReadingGuide.readingGuideStyle );

        }

    }

    /**
     * Useful Links.
     **/
    let actionUsefulLinks = {

        /**
         * Useful Links select.
         **/
        select: document.getElementById( 'mdp-readabler-useful-links' ),

        /**
         * Initialise Useful Links action.
         **/
        init: function () {

            /** Build select. */
            actionUsefulLinks.buildSelect();

            /** Go to link on select change. */
            actionUsefulLinks.select.addEventListener('change', ( e ) => {

                // noinspection JSUnresolvedVariable
                window.location.href = e.target.value;

            } );

        },

        /**
         * Collect and filter all links on page
         **/
        grabLinks: function () {

            /** Grab links on page. */
            let x = document.querySelectorAll( 'a' );
            let links = []

            /** Add home link first. */
            links.push( [options.HOME, window.location.origin] );
            for ( let i = 0; i < x.length; i++ ) {

                /** Get text from link. */
                let text = x[i].innerText;
                text = text.replace( /\s+/g, ' ' ).trim();
                if ( '' === text ) { continue; }
                text = text.substring( 0, 42 ); // Trim long text.

                /** Get link. */
                let link = x[i].href;
                link = link.trim();
                if ( '' === link ) { continue; } // Skip empty links.
                if ( '#' === link ) { continue; } // Skip # links.
                if ( link.toLowerCase().startsWith( 'javascript:' ) ) { continue; } // Skip javascript processed links.

                /** Check for duplicates. */
                if ( links.some( function( item ) {
                    return item[1] === link;
                } ) ) {
                    continue;
                }

                links.push( [text, link] );

            }

            return  links;

        },

        /**
         * Build Useful links select.
         * Add options to select.
         **/
        buildSelect: function () {

            /** Collect all links. */
            let links = actionUsefulLinks.grabLinks();

            /** Add links to select. */
            for ( let i = 0; i < links.length; i++ ) {

                let optionEl = document.createElement( 'option' );
                optionEl.textContent = links[i][0];
                optionEl.value = links[i][1];

                actionUsefulLinks.select.appendChild( optionEl );

            }

        }

    }

    /**
     * Stop Animations.
     **/
    let actionStopAnimations = {

        stopAnimationsStyle: document.createElement( 'style' ),

        /**
         * Initialise Stop Animations action.
         **/
        init: function () {

            /** Listen for Stop Animations change. */
            let stopAnimations = document.querySelector( '#mdp-readabler-action-stop-animations' );
            stopAnimations.addEventListener( 'ReadablerToggleBoxChanged', actionStopAnimations.stopAnimations );

        },

        /**
         * Toggle Animations.
         **/
        stopAnimations: function ( e ) {

            /** Remove class from body to reset to default state. */
            if ( ! e.target.classList.contains( 'mdp-active' ) ) {

                document.body.classList.remove( 'mdp-readabler-stop-animations' );

                /** Play all videos. */
                document.querySelectorAll('video').forEach(vid => {

                    if ( vid.paused === true ) {

                        if ( vid.dataset.pausedByReadabler === 'true' ) {

                            vid.play();
                            vid.dataset.pausedByReadabler = 'false';

                        }

                    }

                } );

                return;

            }

            /** Add class to body as flag. */
            document.body.classList.add( 'mdp-readabler-stop-animations' );

            /** Add CSS to header. */
            //language=CSS
            actionStopAnimations.stopAnimationsStyle.innerHTML = `

                /*noinspection CssUnusedSymbol,CssUnknownProperty*/
                body.mdp-readabler-stop-animations *{
                    -webkit-transition: none !important;
                    -moz-transition: none !important;
                    -ms-transition: none !important;
                    -o-transition: none !important;
                    transition: none !important;
                    -webkit-animation-fill-mode: forwards !important;
                    -moz-animation-fill-mode: forwards !important;
                    -ms-animation-fill-mode: forwards !important;
                    -o-animation-fill-mode: forwards !important;
                    animation-fill-mode: forwards !important;
                    -webkit-animation-iteration-count: 1 !important;
                    -moz-animation-iteration-count: 1 !important;
                    -ms-animation-iteration-count: 1 !important;
                    -o-animation-iteration-count: 1 !important;
                    animation-iteration-count: 1 !important;
                    -webkit-animation-duration: .01s !important;
                    -moz-animation-duration: .01s !important;
                    -ms-animation-duration: .01s !important;
                    -o-animation-duration: .01s !important;
                    animation-duration: .01s !important;
                }

            `;

            document.head.appendChild( actionStopAnimations.stopAnimationsStyle );

            /** Pause all videos from video tag. */
            document.querySelectorAll( 'video' ).forEach( vid => {

                // Pause video if it played now
                if ( vid.paused === false ) {

                    vid.pause();
                    vid.dataset.pausedByReadabler = 'true';

                }

            } );

            /** Stop all youtube videos */
            document.querySelectorAll( 'iframe' ).forEach( iframe => {

                if ( iframe.dataset.pausedByReadabler === 'undefined' ) {

                    iframe.dataset.pausedByReadabler = 'true';

                } else {

                    setTimeout( function () {

                        let iframeSrc = iframe.src;

                        if ( iframeSrc.includes( 'www.youtube.com/embed' ) ){

                            iframe.src = iframeSrc;
                            iframe.dataset.pausedByReadabler = 'true';

                        }

                    }, 300 );

                }

            } );

        }

    }

    /**
     * Reading Mask.
     **/
    let actionReadingMask = {

        readingMaskStyle: document.createElement( 'style' ),

        /** Reading Mask top element. */
        readingMaskTop: null,

        /** Reading Mask bottom element. */
        readingMaskBottom: null,

        /**
         * Initialise Reading Mask action.
         **/
        init: function () {

            /** Listen for Reading Mask change. */
            let readingMask = document.querySelector( '#mdp-readabler-action-reading-mask' );
            readingMask.addEventListener( 'ReadablerToggleBoxChanged', actionReadingMask.readingMask );

        },

        /**
         * Toggle Reading Mask.
         **/
        readingMask: function ( e ) {

            /** Remove class from body to reset to default state. */
            if ( ! e.target.classList.contains( 'mdp-active' ) ) {

                /** Remove Reading Mask. */
                actionReadingMask.removeReadingMask();
                return;

            }

            /** Create Reading Mask elements. */
            actionReadingMask.createReadingMask();

        },

        /**
         * Create Reading Mask on page.
         **/
        createReadingMask: function () {

            /** Exit if reading mask already exist. */
            if ( document.querySelectorAll( '.mdp-readabler-reading-mask-top' ).length ) { return; }

            /** Add class to body as flag. */
            document.body.classList.add( 'mdp-readabler-reading-mask' );

            /** Create reading mask top element. */
            actionReadingMask.readingMaskTop = document.createElement( 'div' );
            actionReadingMask.readingMaskTop.classList.add( 'mdp-readabler-reading-mask-top' );
            document.body.appendChild( actionReadingMask.readingMaskTop );

            /** Create reading mask bottom element. */
            actionReadingMask.readingMaskBottom = document.createElement( 'div' );
            actionReadingMask.readingMaskBottom.classList.add( 'mdp-readabler-reading-mask-bottom' );
            document.body.appendChild( actionReadingMask.readingMaskBottom );

            /** Listen mouse events. */
            document.addEventListener( 'mousemove', actionReadingMask.moveReadingMask );

        },

        /**
         * Move Reading Mask with mouse.
         **/
        moveReadingMask: function ( e ) {

            let newPosY = e.clientY;
            let delta = Math.round( options.readingMaskHeight / 2 );

            actionReadingMask.readingMaskTop.style.height = `${ newPosY - delta }px`;
            actionReadingMask.readingMaskBottom.style.top = `${ newPosY + delta }px`;

        },

        /**
         * Remove Reading Mask on page.
         **/
        removeReadingMask: function () {

            /** Remove flag-class */
            document.body.classList.remove( 'mdp-readabler-reading-mask' );

            /** Remove elements from page. */
            actionReadingMask.readingMaskTop.remove();
            actionReadingMask.readingMaskBottom.remove();

            /** Remove listeners for mouse events. */
            document.removeEventListener( 'mousemove', actionReadingMask.moveReadingMask );

        },

    }

    /**
     * Highlight Hover.
     **/
    let actionHighlightHover = {

        highlightHoverStyle: document.createElement( 'style' ),

        /**
         * Initialise Highlight Hover action.
         **/
        init: function () {

            /** Listen for Highlight Hover change. */
            let highlightHover = document.querySelector( '#mdp-readabler-action-highlight-hover' );
            highlightHover.addEventListener( 'ReadablerToggleBoxChanged', actionHighlightHover.highlightHover );

        },

        highlightHover: function ( e ) {

            /** Remove class from body to reset to default state. */
            if ( ! e.target.classList.contains( 'mdp-active' ) ) {

                document.body.classList.remove( 'mdp-readabler-highlight-hover' );
                return;

            }

            /** Add class to body as flag. */
            document.body.classList.add( 'mdp-readabler-highlight-hover' );

            /** Add CSS to header. */
            //language=CSS
            actionHighlightHover.highlightHoverStyle.innerHTML = `

                /*noinspection CssUnusedSymbol*/
                body.mdp-readabler-highlight-hover *:hover {
                    outline-style: ${options.highlightHoverStyle} !important;
                    outline-color: ${options.highlightHoverColor} !important;
                    outline-width: ${options.highlightHoverWidth}px !important;
                    outline-offset: ${options.highlightHoverOffset}px !important;
                }
                
            `;

            document.head.appendChild( actionHighlightHover.highlightHoverStyle );

        }

    }

    /**
     * Highlight Focus.
     **/
    let actionHighlightFocus = {

        highlightFocusStyle: document.createElement( 'style' ),

        /**
         * Initialise Highlight Focus action.
         **/
        init: function () {

            /** Listen for Highlight Focus change. */
            let highlightFocus = document.querySelector( '#mdp-readabler-action-highlight-focus' );
            highlightFocus.addEventListener( 'ReadablerToggleBoxChanged', actionHighlightFocus.highlightFocus );

        },

        highlightFocus: function ( e ) {

            /** Remove class from body to reset to default state. */
            if ( ! e.target.classList.contains( 'mdp-active' ) ) {

                document.body.classList.remove( 'mdp-readabler-highlight-focus' );
                return;

            }

            /** Add class to body as flag. */
            document.body.classList.add( 'mdp-readabler-highlight-focus' );

            /** Add CSS to header. */
            //language=CSS
            actionHighlightFocus.highlightFocusStyle.innerHTML = `

                /*noinspection CssUnusedSymbol*/
                body.mdp-readabler-highlight-focus *:focus {
                    outline-style: ${options.highlightFocusStyle} !important;
                    outline-color: ${options.highlightFocusColor} !important;
                    outline-width: ${options.highlightFocusWidth}px !important;
                    outline-offset: ${options.highlightFocusOffset}px !important;
                }
                
            `;

            document.head.appendChild( actionHighlightFocus.highlightFocusStyle );

        }

    }

    /**
     * Big Black Cursor.
     **/
    let actionBigBlackCursor = {

        bigBlackCursorStyle: document.createElement( 'style' ),

        /**
         * Initialise Big Black Cursor action.
         **/
        init: function () {

            /** Listen for Big Black Cursor change. */
            let bigBlackCursor = document.querySelector( '#mdp-readabler-action-big-black-cursor' );
            bigBlackCursor.addEventListener( 'ReadablerToggleBoxChanged', actionBigBlackCursor.bigBlackCursor );

        },

        bigBlackCursor: function ( e ) {

            /** Remove class from body to reset to default state. */
            if ( ! e.target.classList.contains( 'mdp-active' ) ) {

                document.body.classList.remove( 'mdp-readabler-big-black-cursor' );
                return;

            }

            /** Disable Big White Cursor if  it's enabled. */
            actionBigBlackCursor.disableWhite();

            /** Add class to body as flag. */
            document.body.classList.add( 'mdp-readabler-big-black-cursor' );

            /** Add CSS to header. */
            //language=CSS
            actionBigBlackCursor.bigBlackCursorStyle.innerHTML = `

                /*noinspection CssUnusedSymbol*/
                body.mdp-readabler-big-black-cursor,
                body.mdp-readabler-big-black-cursor * {
                    /*noinspection CssUnknownTarget*/
                    cursor: url("${options.pluginURL}images/cursor/black-cursor.svg"), default !important
                }
                
                body.mdp-readabler-big-black-cursor * input, 
                body.mdp-readabler-big-black-cursor * textarea, 
                body.mdp-readabler-big-black-cursor * select, 
                body.mdp-readabler-big-black-cursor * a, 
                body.mdp-readabler-big-black-cursor * button, 
                body.mdp-readabler-big-black-cursor * [role=button] {
                    /*noinspection CssUnknownTarget*/
                    cursor: url("${options.pluginURL}images/cursor/black-pointer.svg"), default !important;
                }
                
            `;

            document.head.appendChild( actionBigBlackCursor.bigBlackCursorStyle );

        },

        disableWhite: function () {

            /** Disable Big White Cursor if it's enabled. */
            let bigWhiteCursorBtn = document.getElementById( 'mdp-readabler-action-big-white-cursor' );

            if ( null === bigWhiteCursorBtn ) { return; }

            if ( bigWhiteCursorBtn.classList.contains( 'mdp-active') ) {
                bigWhiteCursorBtn.click();
            }

        }

    }

    /**
     * Big White Cursor.
     **/
    let actionBigWhiteCursor = {

        bigWhiteCursorStyle: document.createElement( 'style' ),

        /**
         * Initialise Big White Cursor action.
         **/
        init: function () {

            /** Listen for Big White Cursor change. */
            let bigWhiteCursor = document.querySelector( '#mdp-readabler-action-big-white-cursor' );
            bigWhiteCursor.addEventListener( 'ReadablerToggleBoxChanged', actionBigWhiteCursor.bigWhiteCursor );

        },

        bigWhiteCursor: function ( e ) {

            /** Remove class from body to reset to default state. */
            if ( ! e.target.classList.contains( 'mdp-active' ) ) {

                document.body.classList.remove( 'mdp-readabler-big-white-cursor' );
                return;

            }

            /** Disable black cursor. */
            actionBigWhiteCursor.disableBlack();

            /** Add class to body as flag. */
            document.body.classList.add( 'mdp-readabler-big-white-cursor' );

            /** Add CSS to header. */
            //language=CSS
            actionBigWhiteCursor.bigWhiteCursorStyle.innerHTML = `

                /*noinspection CssUnusedSymbol*/
                body.mdp-readabler-big-white-cursor,
                body.mdp-readabler-big-white-cursor * {
                    /*noinspection CssUnknownTarget*/
                    cursor: url("${options.pluginURL}images/cursor/white-cursor.svg"), default !important
                }
                
                body.mdp-readabler-big-white-cursor * input, 
                body.mdp-readabler-big-white-cursor * textarea, 
                body.mdp-readabler-big-white-cursor * select, 
                body.mdp-readabler-big-white-cursor * a, 
                body.mdp-readabler-big-white-cursor * button, 
                body.mdp-readabler-big-white-cursor * [role=button] {
                    /*noinspection CssUnknownTarget*/
                    cursor: url("${options.pluginURL}images/cursor/white-pointer.svg"), default !important;
                }
                
            `;

            document.head.appendChild( actionBigWhiteCursor.bigWhiteCursorStyle );

        },

        disableBlack: function () {

            /** Disable Big Black Cursor if it's enabled. */
            let bigBlackCursorBtn = document.getElementById( 'mdp-readabler-action-big-black-cursor' );

            if ( null === bigBlackCursorBtn ) { return; }

            if ( bigBlackCursorBtn.classList.contains( 'mdp-active') ) {
                bigBlackCursorBtn.click();
            }

        }

    }

    /**
     * Text To Speech.
     **/
    let actionTextToSpeech = {

        readabler: null,

        /** @param window.webkitAudioContext */
        AudioContext: window.AudioContext || window.webkitAudioContext || false,

        mdp_readabler_context: null,

        /**
         * Initialise Text To Speech action.
         **/
        init: function () {

            if ( document.querySelectorAll( '#mdp-readabler-action-text-to-speech' ).length < 1 ) { return }

            /** Listen for Text To Speech change. */
            let textToSpeech = document.querySelector( '#mdp-readabler-action-text-to-speech' );
            textToSpeech.addEventListener( 'ReadablerToggleBoxChanged', actionTextToSpeech.textToSpeech );

        },

        /** Unlocking Web Audio for f#cking Safari. */
        webAudioTouchUnlock: function() {

            if ( null !== actionTextToSpeech.mdp_readabler_context ) { return; }

            actionTextToSpeech.mdp_readabler_context = new AudioContext();
            actionTextToSpeech.mdp_readabler_context.resume();

        },

        /**
         * Toggle Text To Speech.
         **/
        textToSpeech: function ( e ) {

            /** Remove class from body to reset to default state. */
            if ( ! e.target.classList.contains( 'mdp-active' ) ) {

                actionTextToSpeech.readabler = null;

                document.body.removeEventListener( 'click', actionTextToSpeech.webAudioTouchUnlock, false );

            } else {

                actionTextToSpeech.readabler = new TextToSpeechSelection(); // Initialise TTS
                actionTextToSpeech.readabler.init();

                document.body.addEventListener( 'click', actionTextToSpeech.webAudioTouchUnlock, false ); // Unlocking Web Audio for Safari

                actionTextToSpeech.voiceGuide( e.target.title );

            }

        },

        /**
         * Voice guide
         * @param {string} msg - Voice guide message
         */
        voiceGuide: function ( msg ) {

            if ( msg.length < 1 ) { return; } // Exit if string is empty
            if ( msg.match( /^([\w\-]+)/g ) === null ) { return; } // Exit if first letter is not A-Z

            /** AJAX Request with vanilla JS. */
            let request = new XMLHttpRequest();

            request.open( 'POST', options.textToSpeechAjaxUrl, true );
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            request.onload = function () {

                /** If successful. */
                if ( this.status >= 200 && this.status < 400 ) {

                    if ( ! actionTextToSpeech.AudioContext ) {
                        console.warn( 'Error with creating AudioContext.' );
                        return;
                    }

                    actionTextToSpeech.mdp_readabler_context.decodeAudioData( this.response, function( buffer ) {
                        const source = actionTextToSpeech.mdp_readabler_context.createBufferSource();
                        source.buffer = buffer;
                        source.connect( actionTextToSpeech.mdp_readabler_context.destination );
                        source.start( 0 );

                    }, ( e ) => console.warn( 'Error with decoding audio data' + e.err ) );

                } else {
                    /** If fail. */
                    console.error( this.response );
                }

            };
            request.onerror = function() {
                /** Connection error. */
                console.error( 'Connection error.' );
            };
            request.responseType = 'arraybuffer';
            request.send( `action=readablergspeak&nonce=${ options.textToSpeechNonce }&text=${ msg }` );

        }

    }

    /**
     * Keyboard Navigation.
     **/
    let actionKeyboardNavigation = {

        /**
         * Initialise Keyboard Navigation action.
         **/
        init: function () {

            /** Listen for Keyboard Navigation change. */
            let keyboardNavigation = document.querySelector( '#mdp-readabler-action-keyboard-navigation' );
            keyboardNavigation.addEventListener( 'ReadablerToggleBoxChanged', actionKeyboardNavigation.keyboardNavigation );

        },

        keyboardNavigation: function ( e ) {

            /** Remove class from body to reset to default state. */
            if ( ! e.target.classList.contains( 'mdp-active' ) ) {

                document.body.classList.remove( 'mdp-readabler-keyboard-navigation' );

                /** Restore original tabIndexes. */
                actionKeyboardNavigation.restoreOriginalTabIndex();

                /** Disable Focus Snail. */
                focusSnail.enabled = false;

                return;

            }

            /** Add class to body as flag. */
            document.body.classList.add( 'mdp-readabler-keyboard-navigation' );

            /** Make all elements focusable. */
            actionKeyboardNavigation.makeFocusable();

            /** Enable Focus Snail. */
            focusSnail.enabled = true;

        },

        /**
         * Make all elements focusable.
         **/
        makeFocusable: function () {

            document.querySelectorAll(
                'nav, [role="navigation"], ' +                          // Make all Menus focusable.
                'h1, h2, h3, h4, h5, h6, [role="heading"], ' +                  // Make all Headings focusable.
                'form:not([disabled]), ' +                                      // Make all Forms focusable.
                'button:not([disabled]), [role="button"]:not([disabled]), ' +   // Make all Buttons focusable.
                'img, picture, svg'                                             // Make all Graphics focusable.
                 ).forEach((element) => {

                /** Don't change tabIndex if element already has it. */
                if ( element.tabIndex < 0 ) {
                    element.dataset.readablerOriginalTabIndex = element.tabIndex;
                    element.tabIndex = 0;
                }

            } );

        },

        /**
         * Restore original tabIndex value.
         **/
        restoreOriginalTabIndex: function () {

            document.querySelectorAll(
                'nav, [role="navigation"], ' +                          // Make all Menus focusable.
                'h1, h2, h3, h4, h5, h6, [role="heading"], ' +                  // Make all Headings focusable.
                'form:not([disabled]), ' +                                      // Make all Forms focusable.
                'button:not([disabled]), [role="button"]:not([disabled]), ' +   // Make all Buttons focusable.
                'img, picture, svg'                                             // Make all Graphics focusable.
            ).forEach( ( element ) => {

                /** If element has original tabIndex - set it. */
                if ( null != element.dataset.readablerOriginalTabIndex ) {
                    element.tabIndex = element.dataset.readablerOriginalTabIndex;
                    delete element.dataset.readablerOriginalTabIndex;
                }

            } );

        },

        /**
         * Set focus to next/prev element.
         **/
        setFocus: function ( focusableElements, next = true ) {

            if ( document.activeElement ) {

                let focusable = Array.prototype.filter.call( document.querySelectorAll( focusableElements ),
                    function ( element ) {

                        /** Check for visibility while always include the current activeElement. */
                        return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement

                    } );

                let index = focusable.indexOf( document.activeElement );

                if ( index > -1 ) {

                    let nextElement;

                    /** Next element. */
                    if ( next ) {

                        nextElement = focusable[index + 1] || focusable[0];

                    }

                    /** Prev element. */
                    else {

                        nextElement = focusable[index - 1] || focusable[focusable.length - 1];

                    }

                    nextElement.focus();

                } else {

                    /** Next element. */
                    if ( next ) {

                        focusable[0].focus();

                    }

                    /** Prev element. */
                    else {
                        focusable[focusable.length - 1].focus();
                    }

                }

            }

        }

    }

    /**
     * Accessibility Statement.
     **/
    let actionAccessibilityStatement = {

        /**
         * Initialise Accessibility Statement action.
         **/
        init: function () {

            // Exit if link is disabled
            if ( null === document.getElementById( 'mdp-readabler-statement-btn' ) ) { return; }

            /** Listen for show statement button click. */
            let btn = document.getElementById( 'mdp-readabler-statement-btn' );
            btn.addEventListener( 'click', actionAccessibilityStatement.show );

            let closeBtn = document.getElementById( 'mdp-readabler-close-statement-btn' );
            closeBtn.addEventListener( 'click', actionAccessibilityStatement.close );

        },

        show: function ( e ) {

            e.preventDefault();

            let box = document.getElementById( 'mdp-readabler-accessibility-statement-box' );
            box.classList.add( 'mdp-open' );

        },

        close: function ( e ) {

            e.preventDefault();

            let box = document.getElementById( 'mdp-readabler-accessibility-statement-box' );
            box.classList.remove( 'mdp-open' );

        }

    }

    /**
     * Reset Settings.
     **/
    let actionResetSettings = {

        /**
         * Initialise Reset Settings action.
         **/
        init: function () {

            /** Listen for Reset Settings button click. */
            let btn = document.getElementById( 'mdp-readabler-reset-btn' );

            if ( btn ) {
                btn.addEventListener( 'click', actionResetSettings.reset );
            }

        },

        reset: function ( e ) {

            e.preventDefault();

            /** Get all keys in localStorage. */
            let keys = Object.keys( localStorage );

            /** Remove all items which starts with 'mdpReadabler' */
            for ( const key in keys ) {

                if ( keys[key].toString().startsWith( 'mdpReadabler' ) ) {
                    localStorage.removeItem( keys[key] );
                }

            }

            /** Reload page to reset all. */
            location.reload();

        }

    }

    /**
     * Hide Accessibility.
     **/
    let actionHideAccessibility = {

        /**
         * Initialise Hide Accessibility action.
         **/
        init: function () {

            /** Listen for Hide button click. */
            let btn = document.getElementById( 'mdp-readabler-hide-btn' );

            if ( btn ) {

                btn.addEventListener( 'click', actionHideAccessibility.hide );

            }

        },

        hide: function ( e ) {

            e.preventDefault();

            if ( window.confirm( options.HIDE_ACCESSIBILITY_INTERFACE ) ) {

                actionHideAccessibility.writeCookie( 'mdp-readabler-hide', '1', 365 );

                /** Reload page to hide interface. */
                window.location.reload();

            }

        },

        writeCookie: function ( key, value, days ) {

            let date = new Date();

            /** Default at 365 days. */
            days = days || 365;

            /** Get unix milliseconds at current time plus number of days. */
            date.setTime( +date + (days * 86400000) ); // 24 * 60 * 60 * 1000

            // noinspection JSUnresolvedFunction
            window.document.cookie = key + "=" + value + "; expires=" + date.toGMTString() + "; path=/";

            return value;

        },

    }

    /**
     * Add Readabler events.
     **/
    function __construct( wpOptions ) {

        /** Stop and remove markup if mdp-readabler-hide cookie is found */
        if ( window.document.cookie.indexOf( 'mdp-readabler-hide=1' ) > -1 ) {

            const toHidePopup = document.querySelector( '#mdp-readabler-popup-box' );
            const toHideButton = document.querySelector( '#mdp-readabler-trigger-button' );

            if ( toHidePopup ) { toHidePopup.remove(); }
            if ( toHideButton ) { toHideButton.remove(); }

            return;
        }

        /** Readabler plugin settings. */
        options = wpOptions;

        /**
         * Fires when the initial HTML document has been completely loaded and parsed.
         **/
        document.addEventListener('DOMContentLoaded', () => {

            /** Initialise popup on page load. */
            popupHelper.init();

            /** Enable hotkey functionality. */
            hotKeyHelper.init();

            /** Initialise Input Spinner controls. */
            inputSpinner.init();

            /** Initialise Toggle controls. */
            toggleBox.init();

            /** Initialise Palette controls. */
            paletteBox.init();

            /** Initialise Accessibility Statement. */
            actionAccessibilityStatement.init();

            /** Initialise Reset Button. */
            actionResetSettings.init();

            /** Initialise Hide Accessibility Button. */
            actionHideAccessibility.init();

            /** Online Dictionary. */
            if ( options.onlineDictionary ) {
                onlineDictionary.init();
            }

            /** Accessibility Profiles. */
            accessibilityProfiles.init();

            /** Initialise Content Scaling action. */
            if ( options.contentScaling ) {
                actionContentScaling.init();
            }

            /** Initialise Font Sizing action. */
            if ( options.fontSizing ) {
                actionFontSizing.init();
            }

            /** Initialise Line Height action. */
            if ( options.lineHeight ) {
                actionLineHeight.init();
            }

            /** Initialise Letter Spacing action. */
            if ( options.letterSpacing ) {
                actionLetterSpacing.init();
            }

            /** Initialise Readable Font action. */
            if (
                options.readableFont ||
                options.profileVisuallyImpaired ||
                options.profileBlindUsers
            ) {
                actionReadableFont.init();
            }

            /** Initialise Dyslexia Friendly action. */
            if ( options.dyslexiaFont ) {
                actionDyslexiaFriendly.init();
            }

            /** Initialise Highlight Titles action. */
            if (
                options.highlightTitles ||
                options.profileCognitiveDisability
            ) {
                actionHighlightTitles.init();
            }

            /** Initialise Highlight Links action. */
            if (
                options.highlightLinks ||
                options.profileCognitiveDisability
            ) {
                actionHighlightLinks.init();
            }

            /** Initialise Text Magnifier action. */
            if ( options.textMagnifier ) {
                actionTextMagnifier.init();
            }

            /** Initialise Text Align Center action. */
            if ( options.alignCenter ) {
                actionAlignCenter.init();
            }

            /** Initialise Text Align Left action. */
            if ( options.alignLeft ) {
                actionAlignLeft.init();
            }

            /** Initialise Text Align Right action. */
            if ( options.alignRight ) {
                actionAlignRight.init();
            }

            /** Initialise Dark Contrast action. */
            if ( options.darkContrast ) {
                actionDarkContrast.init();
            }

            /** Initialise Light Contrast action. */
            if ( options.lightContrast ) {
                actionLightContrast.init();
            }

            /** Initialise Monochrome action. */
            if ( options.monochrome ) {
                actionMonochrome.init();
            }

            /** Initialise High Saturation action. */
            if (
                options.highSaturation ||
                options.profileVisuallyImpaired ||
                options.profileAdhdFriendly
            ) {
                actionHighSaturation.init();
            }

            /** Initialise High Contrast action. */
            if ( options.highContrast ) {
                actionHighContrast.init();
            }

            /** Initialise Low Saturation action. */
            if (
                options.lowSaturation ||
                options.profileEpilepsy
            ) {
                actionLowSaturation.init();
            }

            /** Initialise Text Colors action. */
            if ( options.textColors ) {
                actionTextColors.init();
            }

            /** Initialise Title Colors action. */
            if ( options.titleColors ) {
                actionTitleColors.init();
            }

            /** Initialise Background Colors action. */
            if ( options.backgroundColors ) {
                actionBackgroundColors.init();
            }

            /** Initialise Mute Sounds action. */
            if ( options.muteSounds ) {
                actionMuteSounds.init();
            }

            /** Initialise Hide Images action. */
            if ( options.hideImages ) {
                actionHideImages.init();
            }

            /** Initialise Virtual Keyboard action. */
            if (
                options.virtualKeyboard ||
                options.profileBlindUsers
            ) {
                actionVirtualKeyboard.init();
            }

            /** Initialise Reading Guide action. */
            if ( options.readingGuide ) {
                actionReadingGuide.init();
            }

            /** Initialise Useful Links action. */
            if ( options.usefulLinks ) {
                actionUsefulLinks.init();
            }

            /** Initialise Stop Animations action. */
            if (
                options.stopAnimations ||
                options.profileEpilepsy ||
                options.profileCognitiveDisability ||
                options.profileAdhdFriendly
            ) {
                actionStopAnimations.init();
            }

            /** Initialise Reading Mask action. */
            if (
                options.readingMask ||
                options.profileAdhdFriendly
            ) {
                actionReadingMask.init();
            }

            /** Initialise Highlight Hover action. */
            if ( options.highlightHover ) {
                actionHighlightHover.init();
            }

            /** Initialise Highlight Focus action. */
            if ( options.highlightFocus ) {
                actionHighlightFocus.init();
            }

            /** Initialise Big Black Cursor action. */
            if ( options.bigBlackCursor ) {
                actionBigBlackCursor.init();
            }

            /** Initialise Big White Cursor action. */
            if ( options.bigWhiteCursor ) {
                actionBigWhiteCursor.init();
            }

            /** Initialise Text To Speech action. */
            if (
                options.textToSpeech ||
                options.profileBlindUsers
            ) {
                actionTextToSpeech.init();
            }

            /** Initialise Keyboard Navigation action. */
            if (
                options.keyboardNavigation ||
                options.profileBlindUsers
            ) {
                actionKeyboardNavigation.init();
            }

            /** Load values from local storage for Toggle boxes. */
            toggleBox.loadSaved();

            /** Load values from local storage for Spinner boxes. */
            inputSpinner.loadSaved();

            /** Load values from local storage for Palette boxes. */
            paletteBox.loadSaved();

            /** Load profile from local storage. */
            accessibilityProfiles.loadSaved();

        } );

    }

    /**
     * Convert phrase to CamelCase.
     *
     * @param phrase
     * @param separator
     *
     * @return {string}
     **/
    function toCamelCase ( phrase, separator = ' ' ) {

        return phrase
            .toLowerCase()
            .split( separator )
            .map( word => word.charAt( 0 ).toUpperCase() + word.slice( 1 ) )
            .join( separator );

    }

    /**
     * Wrapper for localStorage.getItem, add prefix to all keys.
     *
     * @param key
     **/
    function getLocal( key ) {

        /** Prefix for all localStorage keys. */
        let prefix = 'mdpReadabler';

        try {

            return localStorage.getItem( prefix + key );

        } catch ( e ) {

            return null;

        }

    }

    /**
     * Wrapper for localStorage.setItem, add prefix to all keys.
     *
     * @param key
     * @param value
     **/
    function setLocal( key, value ) {

        /** Prefix for all localStorage keys. */
        let prefix = 'mdpReadabler';

        try {

            return localStorage.setItem( prefix + key, value );

        } catch ( e ) {

            return false;

        }

    }

    /**
     * Executing a function after delay for a specified amount of time.
     * Example: the user has stopped typing.
     **/
    function delay( fn, ms ) {

        let timer = 0

        return function ( ...args ) {

            clearTimeout( timer )

            timer = setTimeout( fn.bind( this, ...args ), ms || 0 )

        }

    }

    /**
     * This functionality from Voicer.
     * @see https://1.envato.market/voicer
     **/
    const TextToSpeechSelection = (function () {

        "use strict";

        let mdp_readabler_active_source = null;

        /**
         * Detect touch device
         * @type {boolean}
         */
        let USER_IS_TOUCHING = false;

        function _selection() {
            const menu = {
                gspeak: true,
                disable: false
            };

            const gSpeakConfig = {
                icon: '<svg class="selection__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enable-background="new 0 0 24 24" width="24" height="24"><path d="M19.3,10.7L9.1,4.2C8.8,4,8.4,4,8.1,4C7,4,7,4.9,7,5.1v13.4c0,0.2,0,1.1,1.1,1.1c0.3,0,0.7,0,1-0.2l10.2-6.5c0.8-0.5,0.7-1.1,0.7-1.1S20.1,11.2,19.3,10.7z"/></svg>',
                preloader_icon: '<svg class="selection__icon" id="mdp-readabler-tts-preloader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><rect x="3" y="7" rx="2" ry="2" width="4" height="10"><animate attributeName="y" calcMode="spline" values="7;9;7" keyTimes="0;0.5;1" dur=".6" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="0" repeatCount="indefinite"/><animate attributeName="height" calcMode="spline" values="10;6;10" keyTimes="0;0.5;1" dur=".6" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="0" repeatCount="indefinite"/></rect><rect x="8" y="2" rx="2" ry="2" width="4" height="20"><animate attributeName="y" calcMode="spline" values="2;4;2" keyTimes="0;0.5;1" dur=".5" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="0" repeatCount="indefinite"/><animate attributeName="height" calcMode="spline" values="20;16;20" keyTimes="0;0.5;1" dur=".5" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="0" repeatCount="indefinite"/></rect><rect x="13" y="4" rx="2" ry="2" width="4" height="16"><animate attributeName="y" calcMode="spline" values="4;7;4" keyTimes="0;0.5;1" dur=".7" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="0" repeatCount="indefinite"/><animate attributeName="height" calcMode="spline" values="16;10;16" keyTimes="0;0.5;1" dur=".7" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="0" repeatCount="indefinite"/></rect><rect x="18" y="8" rx="2" ry="2" width="4" height="8"><animate attributeName="y" calcMode="spline" values="8;10;8" keyTimes="0;0.5;1" dur=".8" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="0" repeatCount="indefinite"/><animate attributeName="height" calcMode="spline" values="8;4;8" keyTimes="0;0.5;1" dur=".8" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="0" repeatCount="indefinite"/></rect></svg>',
                stop_icon: '<svg class="selection__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M18.001 4.2H6A1.8 1.8 0 0 0 4.2 5.999V18A1.8 1.8 0 0 0 5.999 19.8H18a1.8 1.8 0 0 0 1.799-1.799V6c0-.992-.807-1.799-1.799-1.799z"/></svg>'
            };

            let selection = '';
            let selectionHTML = '';
            let text = '';

            let _icons = {};
            let iconsize = 52;
            let top = 0;
            let left = 0;

            function gspeakButton() {

                return new Button( gSpeakConfig.icon, function ( ) {

                    /** Stop playing. */
                    if ( document.querySelector( '.mdp-readabler-tts.stop' ) ) {
                        stopActiveSource();
                        onVoiceEnded();
                        return;
                    }

                    /** Set 'loading' icon. */
                    setPreloaderIcon();

                    /** AJAX Request with vanilla JS. */
                    let request = new XMLHttpRequest();

                    request.open( 'POST', options.textToSpeechAjaxUrl, true );
                    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    request.onload = function () {

                        /** If successful. */
                        if ( this.status >= 200 && this.status < 400 ) {

                            if ( ! actionTextToSpeech.AudioContext ) {
                                console.warn( 'Error with creating AudioContext.' );
                                return;
                            }

                            // noinspection JSIgnoredPromiseFromCall
                            actionTextToSpeech.mdp_readabler_context.decodeAudioData( this.response, function( buffer ) {
                                const source = actionTextToSpeech.mdp_readabler_context.createBufferSource();
                                source.buffer = buffer;
                                stopActiveSource(); // Stop the active one if any.
                                mdp_readabler_active_source = source;
                                source.connect( actionTextToSpeech.mdp_readabler_context.destination );
                                source.onended = onVoiceEnded;
                                source.start( 0 );

                                /** Set 'stop' icon. */
                                setStopIcon();

                            }, function( e ){
                                console.warn( 'Error with decoding audio data' + e.err );
                            });

                        } else {
                            /** If fail. */
                            console.error( this.response );
                        }
                    };
                    request.onerror = function() {
                        /** Connection error. */
                        console.error( 'Connection error.' );
                    };
                    request.responseType = 'arraybuffer';
                    request.send( 'action=readablergspeak&nonce=' + options.textToSpeechNonce + '&text=' + encodeURIComponent( text ) );

                } );

            }

            /** On Playback Finished. */
            function onVoiceEnded() {

                /** Hide tooltip, if new selection wasn't made. */
                if ( document.querySelector( '.mdp-readabler-tts.stop'  ) ) {
                    document.querySelector('.mdp-readabler-tts').remove();
                }

            }

            /** Set Play Icon . */
            function setPlayIcon() {
                /** Select old icon that will be replaced. */
                const el = document.querySelector('.mdp-readabler-tts .selection__icon');

                /** Create a new icon that will take the place of "el". */
                const newEl = document.createElement('div');
                newEl.innerHTML = gSpeakConfig.icon;

                /** Replace el with newEL. */
                el.parentNode.replaceChild( newEl, el );

                /** Mark tooltip as 'Play' button. */
                const stop_popup = document.querySelector('.mdp-readabler-tts');
                stop_popup.classList.remove( 'stop' );
                stop_popup.classList.remove( 'loading' );

            }

            /** Set Preloader Icon . */
            function setPreloaderIcon() {

                /** Select old icon that will be replaced. */
                const el = document.querySelector('.mdp-readabler-tts .selection__icon');

                /** Create a new icon that will take the place of "el". */
                const newEl = document.createElement('div');
                newEl.innerHTML = gSpeakConfig.preloader_icon;

                /** Replace el with newEL. */
                el.parentNode.replaceChild( newEl, el );

                /** Mark tooltip as 'Stop' button. */
                const stop_popup = document.querySelector('.mdp-readabler-tts');
                stop_popup.classList.remove( 'stop' );
                stop_popup.classList.add( 'loading' );

            }

            /** Set Stop Icon. */
            function setStopIcon() {

                /** Select old icon that will be replaced. */
                const el = document.querySelector('.mdp-readabler-tts .selection__icon');

                /** Create a new icon that will take the place of "el". */
                const newEl = document.createElement('div');
                newEl.innerHTML = gSpeakConfig.stop_icon;

                /** Replace el with newEL. */
                el.parentNode.replaceChild(newEl, el);

                /** Mark tooltip as 'Stop' button. */
                const stop_popup = document.querySelector('.mdp-readabler-tts');
                stop_popup.classList.remove( 'loading' );
                stop_popup.classList.add( 'stop' );

            }

            function appendIcons() {

                const myitems = [
                    { feature: 'gspeak', call: gspeakButton() }
                ];
                const div = document.createElement('div');
                let count = 0;
                myitems.forEach( function ( item) {
                    if ( menu[item.feature] ) {
                        div.appendChild(item.call);
                        count++;
                    }
                });

                return {
                    icons: div,
                    length: count
                };

            }

            function setTooltipPosition() {
                const position = selection.getRangeAt(0).getBoundingClientRect();
                const DOCUMENT_SCROLL_TOP = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop;

                left = position.left + (position.width - iconsize * _icons.length) / 2;

                /** Set position for desktop **/
                if ( ! USER_IS_TOUCHING ) {

                    top = position.top + DOCUMENT_SCROLL_TOP - iconsize - 10;

                    /** Set position for mobile **/
                } else {

                    top = position.bottom + DOCUMENT_SCROLL_TOP + iconsize + 10;

                }

            }

            function moveTooltip() {

                if ( !!document.querySelector('.mdp-readabler-tts') ) {
                    setTooltipPosition();
                    let tooltip = document.querySelector('.mdp-readabler-tts');
                    tooltip.style.top = top + 'px';
                    tooltip.style.left = left + 'px';
                }

            }

            function drawTooltip() {
                _icons = appendIcons();
                setTooltipPosition();

                /** Set transition for mobile **/
                let mobileTransform = '';
                if ( USER_IS_TOUCHING ) {
                    mobileTransform = 'transform-origin: top; transform: scale(1,-1)';
                }

                const div = document.createElement('div');
                div.className = 'mdp-readabler-tts';
                // noinspection JSValidateTypes
                div.style =
                    'top:' + top + 'px;' +
                    'left:' + left + 'px;' +
                    mobileTransform;

                div.appendChild( _icons.icons );

                const arrow = document.createElement( 'div' );
                arrow.classList.add( 'mdp-readabler-tts-arrow' )
                // noinspection JSValidateTypes
                arrow.style =
                    'left:' + ( iconsize * _icons.length / 2 - 8 ) + 'px;';

                if ( ! menu.disable ) {
                    div.appendChild( arrow );
                }

                document.body.appendChild( div );
            }

            function attachEvents() {

                /**
                 * Return selection or false if TTS of
                 * @return {boolean}
                 */
                function hasSelection() {

                    return null !== actionTextToSpeech.readabler ?
                        !!window.getSelection().toString() :
                        false;

                }

                function hasTooltipDrawn() {
                    return !!document.querySelector('.mdp-readabler-tts');
                }

                /** Return HTML of selected text. */
                function getHTMLOfSelection () {
                    let range;
                    if ( document.selection && document.selection.createRange ) {

                        range = document.selection.createRange();

                        // noinspection JSUnresolvedVariable
                        return range.htmlText;

                    }
                    else if (window.getSelection) {
                        const selection = window.getSelection();
                        if (selection.rangeCount > 0) {
                            range = selection.getRangeAt(0);
                            const clonedSelection = range.cloneContents();
                            const div = document.createElement('div');
                            div.appendChild(clonedSelection);
                            return div.innerHTML;
                        }
                        else {
                            return '';
                        }
                    }
                    else {
                        return '';
                    }
                }

                /** Selecting the full word if only its parts are selected. */
                function snapSelectionToWord() {
                    let sel;

                    /** Do not Modify Selection for Touch devices. */
                    if ( USER_IS_TOUCHING ) {
                        if( window.getSelection ) {
                            sel = window.getSelection();
                        } else if ( document.getSelection ) {
                            sel = document.getSelection();
                        } else if ( document.selection ) {
                            sel = document.selection.createRange().text;
                        }
                        return sel;
                    }

                    /**
                     * Check for existence of window.getSelection() and that it has a
                     * modify() method. IE 9 has both selection APIs but no modify() method.
                     **/
                    // noinspection JSUnresolvedVariable
                    if ( window.getSelection && (sel = window.getSelection()).modify ) {
                        sel = window.getSelection();
                        if ( ! sel.isCollapsed ) {

                            /** Detect if selection is backwards. */
                            const range = document.createRange();
                            range.setStart(sel.anchorNode, sel.anchorOffset);
                            range.setEnd(sel.focusNode, sel.focusOffset);
                            const backwards = range.collapsed;
                            range.detach();

                            /** Modify() works on the focus of the selection. */
                            const endNode = sel.focusNode, endOffset = sel.focusOffset;
                            sel.collapse(sel.anchorNode, sel.anchorOffset);

                            let direction;
                            if (backwards) {
                                direction = ['backward', 'forward'];
                            } else {
                                direction = ['forward', 'backward'];
                            }

                            // noinspection JSUnresolvedFunction
                            sel.modify( 'move', direction[0], 'character' );
                            // noinspection JSUnresolvedFunction
                            sel.modify( 'move', direction[1], 'word' );
                            sel.extend( endNode, endOffset);
                            // noinspection JSUnresolvedFunction
                            sel.modify( 'extend', direction[1], 'character' );
                            // noinspection JSUnresolvedFunction
                            sel.modify( 'extend', direction[0], 'word' );
                        }
                    } else if ( ( sel = document.selection ) && sel.type !== 'Control' ) {
                        const textRange = sel.createRange();
                        if ( textRange.text ) {
                            textRange.expand( 'word' );

                            /** Move the end back to not include the word's trailing space(s), if necessary. */
                            while ( /\s$/.test( textRange.text ) ) {
                                // noinspection JSUnresolvedFunction
                                textRange.moveEnd( 'character', -1 );
                            }
                            textRange.select();
                        }
                    }

                    return sel;
                }

                const onMouseUp = function () {

                    setTimeout(function mouseTimeout() {
                        if (hasTooltipDrawn()) {

                            if (hasSelection()) {
                                selection = snapSelectionToWord();

                                selectionHTML = getHTMLOfSelection();
                                text = selectionHTML;

                                moveTooltip();

                                /** If now playing, set icon to play. */
                                if (
                                    (document.querySelector('.mdp-readabler-tts.stop')) ||
                                    (document.querySelector('.mdp-readabler-tts.loading'))
                                ) {

                                    /** Set ion Play. */
                                    setPlayIcon();
                                }

                            } else {

                                /** Hide tooltip,  If we now not paying. */
                                if (
                                    (!document.querySelector('.mdp-readabler-tts.stop')) &&
                                    (!document.querySelector('.mdp-readabler-tts.loading'))
                                ) {
                                    document.querySelector('.mdp-readabler-tts').remove();
                                }

                            }

                        } else if ( hasSelection() ) {

                            selection = snapSelectionToWord();
                            selectionHTML = getHTMLOfSelection();
                            text = selectionHTML;
                            drawTooltip();

                        }
                    }, 10);

                };

                window.addEventListener( 'mouseup', onMouseUp, true );
                window.addEventListener( 'touchend', onMouseUp, false );
                window.addEventListener( 'touchcancel', onMouseUp, false );
                window.addEventListener( 'selectionchange', onMouseUp, false );

                window.addEventListener( 'resize', moveTooltip, false );

                /** We want to detect human touch, not device touch. */
                window.addEventListener( 'touchstart', function onFirstTouch() {

                    /** Set global flag. */
                    USER_IS_TOUCHING = true;

                    document.addEventListener( 'selectionchange', onMouseUp, true );

                    /** We only need to know once that a human touched the screen, so we can stop listening now. */
                    window.removeEventListener( 'touchstart', onFirstTouch, false );
                } );

            }

            function config( optionsL ) {

                menu.gspeak = optionsL.gspeak === undefined ? menu.gspeak : optionsL.gspeak;
                menu.disable = optionsL.disable === undefined ? menu.disable : optionsL.disable;

                return this;

            }

            function init() {

                // IconStyle();
                attachEvents();

                return this;

            }

            return {
                config: config,
                init: init
            };
        }

        /**
         * Render button.
         * @param icon - SVG icon
         * @param clickFn - Click event handler
         * @return {HTMLDivElement}
         * @constructor
         */
        function Button( icon, clickFn ) {

            const btn = document.createElement('div');
            btn.classList.add( 'mdp-readabler-tts-button' );
            btn.innerHTML = icon;
            btn.onclick = clickFn;

            if ( btn.id === 'mdp-readabler-tts-preloader' ) {

                btn.style.transition = 'none';

            } else {

                btn.onmouseover = function () {
                    this.style.transform = 'scale(1.2)';
                };
                btn.onmouseout = function () {
                    this.style.transform = 'scale(1)';
                };

            }

            return btn;
        }

        /**
         * Stop the active one if any.
         */
        function stopActiveSource() {
            if (mdp_readabler_active_source) {
                mdp_readabler_active_source.onended = null; // manual stop, no event
                mdp_readabler_active_source.stop(0);
            }
        }

        return _selection;

    })();

    /**
     * Focus Snail.
     * @see https://github.com/NV/focus-snail/
     *
     * Update with care, changes have been made.
     **/
    let focusSnail = (function() {
        'use strict';

        const OFFSET_PX = 0;
        const MIN_WIDTH = 12;
        const MIN_HEIGHT = 8;

        const START_FRACTION = 0.4;
        const MIDDLE_FRACTION = 0.8;

        const focusSnail = {
            enabled: false,
            trigger: trigger
        };

        /**
         * @param {Element} prevFocused
         * @param {Element|EventTarget} target
         */
        function trigger(prevFocused, target) {
            if (svg) {
                onEnd();
            } else {
                initialize();
            }

            const prev = dimensionsOf( prevFocused );
            const current = dimensionsOf( target );

            let left = 0;
            let prevLeft = 0;
            let top = 0;
            let prevTop = 0;

            const distance = dist( prev.left, prev.top, current.left, current.top );
            const duration = animationDuration( distance );

            function setup() {
                const scroll = scrollOffset();
                svg.style.left = scroll.left + 'px';
                svg.style.top = scroll.top + 'px';
                svg.setAttribute('width', win.innerWidth.toString());
                svg.setAttribute('height', win.innerHeight.toString());
                svg.classList.add('focus-snail_visible');
                left = current.left - scroll.left;
                prevLeft = prev.left - scroll.left;
                top = current.top - scroll.top;
                prevTop = prev.top - scroll.top;
            }

            let isFirstCall = true;

            animate(function(fraction) {
                if (isFirstCall) {
                    setup();
                    setGradientAngle(gradient, prevLeft, prevTop, prev.width, prev.height, left, top, current.width, current.height);
                    const list = getPointsList( {
                        top: prevTop,
                        right: prevLeft + prev.width,
                        bottom: prevTop + prev.height,
                        left: prevLeft
                    }, {
                        top: top,
                        right: left + current.width,
                        bottom: top + current.height,
                        left: left
                    } );
                    enclose(list, polygon);
                }

                const startOffset = fraction > START_FRACTION ? easeOutQuad( (fraction - START_FRACTION) / (1 - START_FRACTION) ) : 0;
                const middleOffset = fraction < MIDDLE_FRACTION ? easeOutQuad( fraction / MIDDLE_FRACTION ) : 1;
                start.setAttribute('offset', startOffset * 100 + '%');
                middle.setAttribute('offset', middleOffset * 100 + '%');

                if (fraction >= 1) {
                    onEnd();
                }

                isFirstCall = false;
            }, duration);
        }

        function animationDuration(distance) {
            return Math.pow(constrain(distance, 32, 1024), 1/3) * 50;
        }

        function easeOutQuad(x) {
            return 2*x - x*x;
        }

        let win = window;
        const doc = document;
        const docElement = doc.documentElement;
        const body = doc.body;

        let prevFocused = null;
        let animationId = 0;
        let keyDownTime = 0;

        // noinspection JSUnusedLocalSymbols
        docElement.addEventListener('keydown', function(event) {
            if (!focusSnail.enabled) {
                return;
            }
            keyDownTime = Date.now();
        }, false);

        docElement.addEventListener('blur', function(e) {
            if (!focusSnail.enabled) {
                return;
            }
            onEnd();
            if (isJustPressed()) {
                prevFocused = e.target;
            } else {
                prevFocused = null;
            }
        }, true);

        docElement.addEventListener('focus', function(event) {

            if (!prevFocused) {
                return;
            }
            if (!isJustPressed()) {
                return;
            }

            trigger( prevFocused, event.target );

        }, true);

        function setGradientAngle(gradient, ax, ay, aWidth, aHeight, bx, by, bWidth, bHeight) {

            const centroidA = rectCentroid( ax, ay, aWidth, aHeight );
            const centroidB = rectCentroid( bx, by, bWidth, bHeight );
            const angle = Math.atan2( centroidA.y - centroidB.y, centroidA.x - centroidB.x );
            const line = angleToLine( angle );

            gradient.setAttribute( 'x1', line.x1 );
            gradient.setAttribute( 'y1', line.y1 );
            gradient.setAttribute( 'x2', !isNaN( line.x2 ) ? line.x2 : 0 );
            gradient.setAttribute( 'y2', !isNaN( line.y2 ) ? line.y2 : 0 );

        }

        function rectCentroid(x, y, width, height) {
            return {
                x: x + width / 2,
                y: y + height / 2
            };
        }

        function angleToLine(angle) {
            const segment = Math.floor( angle / Math.PI * 2 ) + 2;
            const diagonal = Math.PI / 4 + Math.PI / 2 * segment;

            const od = Math.sqrt( 2 );
            const op = Math.cos( Math.abs( diagonal - angle ) ) * od;
            const x = op * Math.cos( angle );
            const y = op * Math.sin( angle );

            return {
                x1: x < 0 ? 1 : 0,
                y1: y < 0 ? 1 : 0,
                x2: x >= 0 ? x : x + 1,
                y2: y >= 0 ? y : y + 1
            };
        }

        /** @type {SVGSVGElement} */
        let svg = null;

        /** @type {SVGPolygonElement} */
        let polygon = null;

        /** @type SVGStopElement */
        let start = null;

        /** @type SVGStopElement */
        let middle = null;

        /** @type SVGStopElement */
        let end = null;

        /** @type SVGLinearGradientElement */
        let gradient = null;

        function htmlFragment() {
            const div = doc.createElement( 'div' );
            // noinspection RequiredAttributes
            div.innerHTML = '<svg id="focus-snail_svg" width="1000" height="800">\
		<linearGradient id="focus-snail_gradient">\
			<stop id="focus-snail_start" offset="0%" stop-color="' + options.highlightFocusColor + '" stop-opacity="0"/>\
			<stop id="focus-snail_middle" offset="80%" stop-color="' + options.highlightFocusColor + '" stop-opacity="0.8"/>\
			<stop id="focus-snail_end" offset="100%" stop-color="' + options.highlightFocusColor + '" stop-opacity="0"/>\
		</linearGradient>\
		<polygon id="focus-snail_polygon" fill="url(#focus-snail_gradient)"/>\
	</svg>';
            return div;
        }

        function initialize() {
            const html = htmlFragment();
            svg = getId(html, 'svg');
            polygon = getId(html, 'polygon');
            start = getId(html, 'start');
            middle = getId(html, 'middle');
            end = getId(html, 'end');
            gradient = getId(html, 'gradient');
            body.appendChild(svg);
        }

        function getId(elem, name) {
            return elem.querySelector('#focus-snail_' + name);
        }

        function onEnd() {
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = 0;
                svg.classList.remove('focus-snail_visible');
            }
        }

        function isJustPressed() {
            return Date.now() - keyDownTime < 42
        }

        function animate(onStep, duration) {
            const start = Date.now();
            (function loop() {
                animationId = requestAnimationFrame(function() {
                    const diff = Date.now() - start;
                    const fraction = diff / duration;
                    onStep(fraction);
                    if (diff < duration) {
                        loop();
                    }
                });
            })();
        }

        function getPointsList(a, b) {
            let x = 0;

            if (a.top < b.top)
                x = 1;

            if (a.right > b.right)
                x += 2;

            if (a.bottom > b.bottom)
                x += 4;

            if (a.left < b.left)
                x += 8;

            const dict = [
                [],
                [0, 1],
                [1, 2],
                [0, 1, 2],
                [2, 3],
                [0, 1], // FIXME: do two polygons
                [1, 2, 3],
                [0, 1, 2, 3],
                [3, 0],
                [3, 0, 1],
                [3, 0], // FIXME: do two polygons
                [3, 0, 1, 2],
                [2, 3, 0],
                [2, 3, 0, 1],
                [1, 2, 3, 0],
                [0, 1, 2, 3, 0]
            ];

            const points = rectPoints( a ).concat( rectPoints( b ) );
            const list = [];
            const indexes = dict[x];
            let i;
            for ( i = 0; i < indexes.length; i++) {
                list.push(points[indexes[i]]);
            }
            while (i--) {
                list.push(points[indexes[i] + 4]);
            }
            return list;
        }

        function enclose(list, polygon) {
            polygon.points.clear();
            for ( let i = 0; i < list.length; i++) {
                const p = list[i];
                addPoint(polygon, p);
            }
        }

        function addPoint(polygon, point) {

            const pt = polygon.ownerSVGElement.createSVGPoint();
            pt.x = !isNaN( point.x ) ? point.x : 0;
            pt.y = !isNaN( point.y ) ? point.y : 0;
            polygon.points.appendItem(pt);

        }

        function rectPoints(rect) {
            return [
                {
                    x: rect.left,
                    y: rect.top
                },
                {
                    x: rect.right,
                    y: rect.top
                },
                {
                    x: rect.right,
                    y: rect.bottom
                },
                {
                    x: rect.left,
                    y: rect.bottom
                }
            ];
        }

        function dimensionsOf(element) {
            const offset = offsetOf( element );
            return {
                left: offset.left - OFFSET_PX,
                top: offset.top - OFFSET_PX,
                width: Math.max(MIN_WIDTH, element.offsetWidth) + 2*OFFSET_PX,
                height: Math.max(MIN_HEIGHT, element.offsetHeight) + 2*OFFSET_PX
            };
        }

        function offsetOf(elem) {
            const rect = elem.getBoundingClientRect();
            const scroll = scrollOffset();

            const clientTop = docElement.clientTop || body.clientTop,
                clientLeft = docElement.clientLeft || body.clientLeft,
                top = rect.top + scroll.top - clientTop,
                left = rect.left + scroll.left - clientLeft;

            return {
                top: top || 0,
                left: left || 0
            };
        }

        function scrollOffset() {
            const top = win.pageYOffset || docElement.scrollTop;
            const left = win.pageXOffset || docElement.scrollLeft;
            return {
                top: top || 0,
                left: left || 0
            };
        }

        function dist(x1, y1, x2, y2) {
            const dx = x1 - x2;
            const dy = y1 - y2;
            return Math.sqrt(dx*dx + dy*dy);
        }

        function constrain(amt, low, high) {
            if (amt <= low) {
                return low;
            }
            if (amt >= high) {
                return high;
            }
            return amt;
        }

        const style = doc.createElement( 'style' );
        style.textContent = "#focus-snail_svg {\
	position: absolute;\
	top: 0;\
	right: 0;\
	bottom: 0;\
	left: 0;\
	margin: 0;\
	background: transparent;\
	visibility: hidden;\
	pointer-events: none;\
	-webkit-transform: translateZ(0);\
}\
\
#focus-snail_svg.focus-snail_visible {\
	visibility: visible;\
	z-index: 999;\
}\
\
#focus-snail_polygon {\
	stroke-width: 0;\
}\
";
        body.appendChild(style);

        return focusSnail;

    })();

    return {

        /**
         * Run Readabler.
         **/
        run: function( options ) {

            __construct( options );

        }

    };

} ) ();


window.addEventListener('DOMContentLoaded',a=>{
    document.querySelector('#mdp-readabler-demo')!==null&&document.querySelector('#mdp-readabler-demo').addEventListener('click',function(){
        MicroModal.show('mdp-readabler-popup-box',{openClass:'mdp-is-open',disableFocus:!1}
        )
    }
    )
}
);

/**
 * Run Listener on current page.
 *
 * @param window
 * @param window.mdpReadablerOptions
 **/
mdpReadabler.run( window.mdpReadablerOptions );
