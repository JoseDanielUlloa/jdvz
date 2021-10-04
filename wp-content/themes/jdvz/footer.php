    <footer class="footer text-center py-2 theme-bg-dark">

        <?php
            wp_nav_menu(
                array(
                    'menu' => 'footer',
                    'container' => '',
                    'theme_location' => 'footer',
                    'items_wrap' => '<ul id="" class="navbar-nav flex-column text-sm-center text-md-left">%3$s</ul>'
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