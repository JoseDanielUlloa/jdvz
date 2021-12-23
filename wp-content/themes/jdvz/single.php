<?php get_header(); ?>

<div class="default-page">
    <div id="main-content" role="main">
        <?php
            if( have_posts() ) {
                while( have_posts() ) {
                    the_post();
                    get_template_part('template-parts/content', 'article');
                }
            }
        ?>
    </div>
</div>

<?php get_footer(); ?>