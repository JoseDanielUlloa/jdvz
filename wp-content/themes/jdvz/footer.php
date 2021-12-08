    <footer>
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
    </footer>
    </div>

    <?php
        wp_footer();
    ?>

</body>
</html>