<article>
    <!-- Post thumbnail -->
    <?php if ( has_post_thumbnail() ) : ?>
        <figure>
            <?php the_post_thumbnail('full'); ?>
        </figure>
    <?php endif; ?>

    <!-- Post meta data -->
    <h2><?php the_title(); ?></h2>
    Posted by <?php the_author_posts_link(); ?>
    on <?php the_date(); ?>
    in <?php the_category(' '); ?>
    with the tags <?php the_tags('<span class="tag">', '</span> <span class="tag">', '</span>.'); ?>

    <!-- Content -->
    <?php the_content(); ?>

    <!-- Comments -->
    <?php comments_template(); ?>
</article>