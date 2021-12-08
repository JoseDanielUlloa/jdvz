    <footer>
        <div class="social-nav-wrapper">
            <nav id="social-nav" class="social-nav" aria-label="JDVz's Social Media">
                <h2 id="social-nav-heading" class="sr-only">JDVz's Social Media</h2>
                <?php
                    wp_nav_menu(
                        array(
                            'menu' => 'social',
                            'container' => '',
                            'theme_location' => 'social',
                            'items_wrap' => '<ul aria-labelledby="social-nav-heading" class="list-reset">%3$s</ul>'
                        )
                    );
                ?>
            </nav>
        </div>
    </footer>
    </div>

    <?php
        wp_footer();
    ?>

    </body>

    </html>