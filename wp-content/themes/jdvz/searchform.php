<form role="search" method="get" id="searchform" class="searchform" action="<?php echo esc_url( home_url( '/' ) ); ?>">
    <label class="screen-reader-text" for="s">Search for:</label>
    <input type="text" value="<?php echo get_search_query(); ?>" name="s" id="s" placeholder="Search for something" />
    <button type="submit">
        <i aria-hidden="true" class="fas fa-search" title="Submit button"></i>
        <span class="sr-only">Submit button</span>
    </button>
</form>