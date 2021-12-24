<article>
    <!-- Post thumbnail -->
    <?php if ( has_post_thumbnail() ) : ?>
    <figure>
        <?php the_post_thumbnail('full'); ?>
    </figure>
    <?php endif; ?>

    <!-- Post meta data -->
    <h2><?php the_title(); ?></h2>
    <i class="fas fa-user-edit" aria-hidden="true"></i> Written by <?php the_author_posts_link(); ?>
    <i class="fas fa-list-ul" aria-hidden="true"></i> Posted in <?php the_category(' '); ?>
    <i class="far fa-calendar-alt" aria-hidden="true"></i> Published on <?php the_date(); ?>
    <i class="fa fa-tag" aria-hidden="true"></i> Tags: <?php the_tags('<span class="tag">', '</span> <span class="tag">', '</span>'); ?>
    <i class="fa fa-comment" aria-hidden="true"></i> <a href="#comments"><?php comments_number(); ?></a>

    <!-- Content -->
    <?php the_content(); ?>

    <!-- Comments -->
    <?php comments_template(); ?>
</article>