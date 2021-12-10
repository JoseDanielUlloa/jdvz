    <footer>
        <!-- Social Media Links -->
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

        <?php if ( is_front_page() ) {?>
            <!-- Credits -->
            <div class="credits">
                <p>Credits:</p>
                <p>
                    Illustration of happy girl based on a <a href="https://unsplash.com/photos/khewjy5l4Zo" target="blank_">picture</a> by 
                    <a href="https://unsplash.com/@suadkamardeen" target="blank_">Suad Kamardeen</a> from 
                    <a href="https://unsplash.com/" target="blank_">unsplash.com</a>.
                </p>
                <p>
                    <a href="https://www.flaticon.com/free-icon/brush_3453371?term=brush&related_id=3453371" target="blank_">Brush icon</a> by 
                    <a href="https://www.flaticon.com/authors/icongeek26" target="blank_">Icongeek26</a>, 
                    <a href="https://www.flaticon.com/free-icon/browser_541510?term=html&related_id=541510" target="blank_">HTML icon</a> by 
                    <a href="https://www.flaticon.com/authors/smashicons" target="blank_">Smashicons</a>, 
                    <a href="https://www.flaticon.com/free-icon/github_270798?term=github%20logo&related_id=270798" target="blank_">Git icon</a> by 
                    <a href="https://www.flaticon.com/authors/roundicons" target="blank_">Roundicons</a>, 
                    <a href="https://www.flaticon.com/free-icon/paper-plane_5375507?term=paper%20plane&related_id=5375507" target="blank_">Paper plane</a>, 
                    <a href="https://www.flaticon.com/search?author_id=1&style_id=&type=standard&word=diet" target="blank_">Diet</a>, 
                    <a href="https://www.flaticon.com/premium-icon/css_3368042?term=css&related_id=3368042" target="blank_">CSS</a>, 
                    <a href="https://www.flaticon.com/free-icon/react_919851?term=react&related_id=919851" target="blank_">React</a> and 
                    <a href="https://www.flaticon.com/free-icon/cardiogram_3004458?term=heart&related_id=3004458" target="blank_">Heart icons</a> by 
                    <a href="https://www.flaticon.com/authors/freepik" target="blank_">Freepik</a> from 
                    <a href="https://www.flaticon.com/" target="blank_">Flaticon</a>.
                </p>
            </div>
        <?php } ?>
    </footer>

    <?php
        wp_footer();
    ?>

</body>
</html>