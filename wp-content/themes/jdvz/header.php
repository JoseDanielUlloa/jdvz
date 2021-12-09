<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Meta -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@1,700&family=Roboto:ital,wght@0,400;0,700;1,700&display=swap" rel="stylesheet">
    <meta name="description" content="Boost your well-being and learn coding and arts.">
    <meta name="author" content="https://youtube.com/c/jdvznet">

    <?php
    wp_head();
    ?>

</head>

<body>
    <header class="a11y-nav main-header">
        <!-- Skip links -->
        <a href="#main-content" class="skip-link">Skip to content</a>

        <!-- Left side menu toggle -->
        <button id="nav-main-toggle" class="left-nav-toggle" aria-label="Toggle left side site navigation">
            <i class="fas fa-bars"></i>
            <i class="fas fa-times"></i>
            <span>Menu</span>
        </button>

        <!-- Left side nav -->
        <div class="left-nav-wrapper">
            <nav id="left-nav" class="left-nav" aria-label="Left side site navigation">
                <h2 id="left-nav-heading" class="sr-only">Left side site navigation</h2>
                <?php
                    wp_nav_menu(
                        array(
                            'menu' => 'left',
                            'container' => '',
                            'theme_location' => 'left',
                            'items_wrap' => '<ul aria-labelledby="left-nav-heading" class="list-reset">%3$s</ul>'
                        )
                    );
                ?>
            </nav>
        </div>

        <!-- Logo -->
        <?php               
            if(function_exists('the_custom_logo')) {
                $custom_logo_id = get_theme_mod('custom_logo');
                $logo = wp_get_attachment_image_src($custom_logo_id);
            }
        ?>
        <div class="logo">
            <a href="<?php echo site_url(); ?>" arial-label="Homepage">
                <img src="<?php echo $logo[0] ?>" alt="Logo with JDVz initials in yellow on a black background."
                    title="Homepage">
            </a>
        </div>

        <!-- Right side nav -->
        <div class="right-nav-wrapper">
            <nav id="right-nav" class="right-nav" aria-label="Right side site navigation">
                <h2 id="right-nav-heading" class="sr-only">Right side site navigation</h2>
                 <ul aria-labelledby="right-nav-heading" class="list-reset">
                    <li>
                        <a href="#" class="readabler-trigger">
                            <i aria-hidden="true" class="fas fa-universal-access" title="Accessibility tools"></i>
                            <span class="sr-only">Accessibility tools</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i aria-hidden="true" class="far fa-user-circle" title="My account"></i>
                            <span class="sr-only">My account</span>
                        </a>
                    </li>
                    <li class="right-nav-has-subnav show-on-desktop">
                        <button href="#" class="button-reset right-nav-dropdown-trigger" aria-controls="language-switcher-dropdown">
                            <i aria-hidden="true" class="fas fa-language" title="Language switcher"></i>
                            <span class="sr-only">Language switcher</span>
                        </button>
                        <ul class="list-reset menu-dropdown" id="language-switcher-dropdown">
                            <li>
                                <?php echo do_shortcode('[language-switcher]'); ?>
                            </li>
                        </ul>
                    </li>
                    <li class="show-on-desktop">
                        <a href="<?php echo site_url('/contact/') ?>">
                            <i aria-hidden="true" class="far fa-envelope" title="Contact form"></i>
                            <span class="sr-only">Contact form</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>