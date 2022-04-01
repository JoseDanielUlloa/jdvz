<?php get_header(); ?>

<div class="default-page">
    <main id="main-content">
        <?php
            if( have_posts() ) {
                while( have_posts() ) {
                    the_post();
                    get_template_part('template-parts/content', 'article');
                }
            }
        ?>
    </main>
</div>

<?php get_footer(); ?>