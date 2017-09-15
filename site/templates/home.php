<?php if($site->login()->toString() == 'true' && !$site->user()) go('login') ?>

<?php $intro = $intro ?? 'show'; $openClass = $openClass ?? ''; ?>

<?php snippet('head', array('class' => 'website')); ?>
	
	<?php if($intro == 'show'): ?>

        <?php snippet('intro/intro') ?>
	    
	<?php endif; ?>

    <section id="pages" class="pages <?php e($intro, 'out', ''); ?> <?php echo $openClass ?>" data-lang="<?php echo $site->language()->code() ?>" data-intro="<?php echo $intro ?>" data-baseurl="<?php echo $page->url($site->defaultLanguage()->code()) ?>">

        <?php snippet('menu/watch', array('open' => $openClass)) ?>

        <?php snippet('menu/about', array('open' => $openClass)) ?>

        <?php snippet('menu/informations', array('open' => $openClass)) ?>

    </section>

<?php snippet('footer', array('page' => 'home'));  ?>