<article>
    <?php the_date(); ?>
    <?php the_tags('<span class="tag"><i class="fa fa-tag"></i> ', '</span> <span class="tag"><i class="fa fa-tag"></i> ', '</span>'); ?>
    <a href="#comments">
        <i class="fa fa-comment"></i> <?php comments_number(); ?>
    </a>
    <?php the_content(); ?>
</article>