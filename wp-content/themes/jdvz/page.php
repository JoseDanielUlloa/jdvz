<?php get_header(); ?>

<div class="default-page">
    <main id="main-content">
        <?php while ( have_posts() ) : the_post(); ?>
            <!-- Post meta data -->
            <h2><?php the_title(); ?></h2>
            <!-- Content -->
            <div class="post-content">
                <?php the_content(); ?>
            </div>
        <?php endwhile; ?>
    </main>
</div>

<?php get_footer(); ?>