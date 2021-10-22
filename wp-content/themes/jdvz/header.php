<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Meta -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Boost your well-being and learn coding and arts.">
    <meta name="author" content="https://youtube.com/c/jdvznet">

    <?php
    wp_head();
    ?>

</head>

<body>
    <header>
        <nav class="navbar navbar-expand-sm fixed-top navbar-light">
            <div class="container">
                <?php               
                    if(function_exists('the_custom_logo')) {
                        $custom_logo_id = get_theme_mod('custom_logo');
                        $logo = wp_get_attachment_image_src($custom_logo_id);
                    }
                ?>
                <img class="navbar-brand" src="<?php echo $logo[0] ?>" alt="Logo with the initials JDVz in yellow color and black background">
        
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div id="navigation" class="collapse navbar-collapse justify-content-end">

                    <?php
                        wp_nav_menu(
                            array(
                                'menu' => 'header',
                                'container' => '',
                                'theme_location' => 'header',
                                'items_wrap' => '<ul id="" class="navbar-nav ms-auto">%3$s</ul>'
                            )
                        );
                    ?>

                </div>
            </div>
        </nav>
    </header>