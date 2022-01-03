<article>
    <!-- Post thumbnail -->
    <?php if ( has_post_thumbnail() ) : ?>
        <figure>
            <?php the_post_thumbnail('full'); ?>
        </figure>
    <?php endif; ?>

    <!-- Post meta data -->
    <h1><?php the_title(); ?></h1>
    <p class="post-meta-data">
        Posted by <?php the_author_posts_link(); ?>
        on <?php the_date(); ?>
        in <?php the_category(' '); ?>
        with the tags <?php the_tags('', ' ', '.'); ?>
    </p>
    
    <!-- Content -->
    <div class="post-content">
        <?php the_content(); ?>
    </div>

    <!-- Previous & Next posts -->
    <nav id="posts-nav" class="posts-nav" aria-label="Posts navigation">
        <h2 id="prev-next-posts" class="sr-only">Posts navigation</h2>
        <ul aria-labelledby="prev-next-posts" class="list-reset">
            <li>
                <?php previous_post_link('%link', '<i class="fas fa-arrow-left" aria-hidden="true"></i> Previous post: %title'); ?>
            </li>
            <li>
                <?php next_post_link('%link', 'Next post: %title <i class="fas fa-arrow-right" aria-hidden="true"></i>'); ?>
            </li>
        </ul>
    </nav>

    <!-- Comments -->
    <?php comments_template(); ?>
</article>