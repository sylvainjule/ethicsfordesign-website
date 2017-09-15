<?php $about = $site->index()->findBy('autoid', 'about');
      $why = $about->children()->findBy('autoid', 'why');
      $further = $about->children()->findBy('autoid', 'further');
      $participants = $about->children()->findBy('autoid', 'participants');
      $code = $about->children()->findBy('autoid', 'code-medium');
      $budget = $about->children()->findBy('autoid', 'budget'); 

	if ($open == '') {
		$secondClass = '';
	}
	elseif ($open == 'second-open') {
		$secondClass = ' open';
	}
	elseif ($open == 'first-open' || $open == 'third-open') {
		$secondClass = ' close';
	}
?>

<div class="ctn-page<?php echo $secondClass ?>" data-uid="<?php echo $about->urlKey() ?>">
    <div class="page">

        <div class="page-proper-width">
        	<div class="page-close">&times;</div>
        	<h2><?php echo $about->title() ?></h2>

        	<ul class="page-tabslist">
        	    <li class="page-tabslist-tab"><?php echo $why->title() ?></li>
        	    <li class="page-tabslist-tab-content closed">
        	    	<div class="height-container">
        	    		<img src="<?php echo $why->heroimage()->toFile()->url() ?>" alt="">
        	    		<?php echo $why->text()->kirbytext() ?>
        	    	</div>
        	    </li>
        	    <li class="page-tabslist-tab"><?php echo $further->title() ?></li>
        	    <li class="page-tabslist-tab-content closed">
        	        <div class="height-container">
        	        	<?php echo $further->introduction() ?>
        	        	
        	        	<ul class="tab-content-links">
        	        	    <?php foreach($further->links()->toStructure() as $link): ?>
        	        	    <li class="tab-content-link">
        	        	        <a href="<?php echo $link->link() ?>" target="_blank"><?php echo $link->description()->kirbytextRaw() ?></a> 
        	        	        <span class="lang">(<?php echo $link->langcode()->upper() ?>)</span>
        	        	    </li>
        	        	    <?php endforeach; ?>
        	        	</ul>
        	        </div>
        	    </li>
        	
        	    <li class="page-tabslist-tab"><?php echo $participants->title() ?></li>
        	    <li class="page-tabslist-tab-content closed">
        	    	<div class="height-container">
        	    		<img class="img-participants" src="<?php echo $participants->heroimage()->toFile()->url() ?>" alt="">
		                <ul class="tab-content-participants">
		                    <?php foreach($participants->participants()->toStructure() as $participant): ?>
		                    <li class="tab-content-participant"><?php echo $participant->name()->apostrophe() ?></li>
		                    <li class="tab-content-participant-links closed">
		                        <div class="height-container">
		                        	<?php echo $participant->bio()->kirbytext() ?>
		                        	
		                        	<?php $links = explode(',', $participant->links()); foreach($links as $link): ?>
		                        	<a href="<?php echo $link ?>" target="_blank"><?php echo stripProtocol($link) ?></a>
		                        	<?php endforeach ?>
		                        </div>
		                    </li>
		                    <?php endforeach; ?>
		                </ul>
        	    	</div>
        	    </li>
        	
        	    <li class="page-tabslist-tab"><?php echo $code->title() ?></li>
        	    <li class="page-tabslist-tab-content closed">
        	        <div class="height-container">
        	        	<?php echo $code->text()->kirbytext() ?>
        	        </div>
        	    </li>
        	
        	    <li class="page-tabslist-tab"><?php echo $budget->title() ?></li>
        	    <li class="page-tabslist-tab-content closed">
        	        <div class="height-container">
        	        	<?php echo $budget->text()->kirbytext() ?>

        	        	<?php $entrees = $budget->entreesbudget()->toStructure();
			        		  $arr = array();

				        	  foreach($entrees as $entree) {
				        	  	  $arr[] = ['name' => $entree->name()->value(), 'value' => $entree->amount()->value()];
				        	  } 

				        	  $json = json_encode($arr);
			        	?>

        	        	<div id="svg-budget" data-json="<?php echo htmlentities($json, ENT_QUOTES, 'UTF-8'); ?>"></div>
        	        </div>
        	    </li>
        	</ul>
        </div>
    </div>
</div>