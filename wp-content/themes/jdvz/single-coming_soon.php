<?php get_header(); ?>

<div class="default-page">
    <main id="main-content">
        <?php while ( have_posts() ) : the_post();
            $category = get_field('category');
            $already_published = get_field('already_published');
            $link = get_field('link');
            $final_title = get_field('final_title');
        ?>
            <!-- Back to link -->
            <div class="back-to-coming-soon-container">
                <a href="<?php echo site_url('/coming-soon/') ?>" class="back-to-coming-soon-link">
                    <i class="fas fa-arrow-left" aria-hidden="true"></i> Back To Coming Soon
                </a>
            </div>
            
            <!-- Post data -->
            <h5 class="coming-soon-category">
                <?php echo $category; ?>
            </h5>
            <h2>
                <?php the_title(); ?>
            </h2>

            <!-- Post thumbnail -->
            <?php if ( has_post_thumbnail() ) : ?>
                <figure>
                    <?php the_post_thumbnail('full'); ?>
                </figure>
            <?php endif; ?>

            <!-- Post data -->
            <?php the_content(); ?>
            <?php if( $already_published == 'yes' ) {
                echo "<h6 class='coming-soon-already-published'>ALREADY PUBLISHED:</h6><br>";
                echo "<a href=" . $link . ">
                        <strong>" . $final_title . "</strong>
                    </a>";
            } else {
                echo "<h6 class='coming-soon-not-published-yet'>NOT PUBLISHED YET</h6>";
            } ?>

            <!-- Newsletter CTA -->
            <div class="newsletter-cta-container">
                <h3>Join the newsletter so you don't miss it:</h3>
                <?php echo do_shortcode('[mc4wp_form id="47419"]'); ?>
            </div>
            
            <!-- Comments -->
            <?php comments_template(); ?>

        <?php endwhile; ?>
    </main>
</div>

<?php get_footer(); ?>