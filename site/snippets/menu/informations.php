<?php $infos = $site->index()->findBy('autoid', 'infos');
      $credits = $infos->children()->findBy('autoid', 'credits');
      $contact = $infos->children()->findBy('autoid', 'contact');
      $thanks = $infos->children()->findBy('autoid', 'thanks');
      $videocredits = $infos->children()->findBy('autoid', 'videocredits');
      $partners = $infos->children()->findBy('autoid', 'partners'); 
      $legalmentions = $infos->children()->findBy('autoid', 'legal-mentions'); 

	if ($open == '') {
		$thirdClass = '';
	}
	elseif ($open == 'third-open') {
		$thirdClass = ' open';
	}
	elseif ($open == 'first-open' || $open == 'second-open') {
		$thirdClass = ' close';
	}
?>

<div class="ctn-page<?php echo $thirdClass ?>" data-uid="<?php echo $infos->urlKey() ?>">
    <div class="page">

        <div class="page-proper-width">
        	<div class="page-close">&times;</div>
        	<h2><?php echo $infos->title() ?></h2>
        	    
        	<ul class="page-tabslist">
        	    <li class="page-tabslist-tab"><?php echo $credits->title() ?></li>
        	    <li class="page-tabslist-tab-content closed">
        	        <div class="height-container">
        	        	<ul class="tab-content-credits">
        	        	    <?php foreach($credits->credits()->toStructure() as $author): ?>
        	        	    <li class="tab-content-credit"><?php echo $author->name() ?></li>
        	        	    <li class="tab-content-credit-details closed">
        	        	        <div class="height-container">
        		                	        <div class="role"><?php echo $author->role()->kirbytextRaw() ?></div>
        		                	        <?php if($author->links()->isNotEmpty()): ?>
        		                	            <?php $links = explode(',', $author->links()); foreach($links as $link): ?>
        		                	            <a href="<?php echo $link ?>" target="_blank"><?php echo stripProtocol($link) ?></a>
        		                	            <?php endforeach ?>  
        		                	        <?php endif; ?>
        	        	        </div>
        	        	    </li>
        	        	    <?php endforeach; ?>
        	        	</ul>
        	        </div>
        	    </li>
        	    <li class="page-tabslist-tab"><?php echo $contact->title() ?></li>
        	    <li class="page-tabslist-tab-content closed">
        	        <div class="height-container">
        	        	<?php echo $contact->text()->kirbytext() ?>
        	        </div>
        	    </li>
        	    <li class="page-tabslist-tab"><?php echo $thanks->title() ?></li>
        	    <li class="page-tabslist-tab-content closed">
        	        <div class="height-container">
        	        	<?php echo $thanks->text()->kirbytext() ?>
        	        </div>
        	    </li>
        	    <li class="page-tabslist-tab"><?php echo $videocredits->title() ?></li>
        	    <li class="page-tabslist-tab-content closed">
        	        <div class="height-container">
        	        	<ul class="tab-content-links no-padding">
        	        	    <?php foreach($videocredits->credits()->toStructure() as $credit): ?>
        	        	    <li class="tab-content-link">
        	        	        <?php $links = explode(',', $credit->links()); foreach($links as $link): ?>
        	        	            <a href="<?php echo $link ?>" target="_blank"><?php echo $credit->description()->kirbytextRaw(); ?></a>
        	        	        <?php endforeach ?>
        	        	    </li>
        	        	    <?php endforeach; ?>                        
        	        	</ul>
        	        </div>
        	    </li>
        	    <li class="page-tabslist-tab"><?php echo $partners->title() ?></li>
        	    <li class="page-tabslist-tab-content closed">
        	        <div class="height-container">
        	        	<ul class="tab-content-partners">
        	        	    <?php foreach($partners->partners()->toStructure() as $partner): ?>
        	        	    <li class="tab-content-partner">
        	        	        <a class="no-background" href="<?php echo $partner->link() ?>" target="_blank"><img src="<?php echo $partner->logo()->toFile()->url() ?>" alt=""></a>
        	        	    </li>   
        	        	    <?php endforeach; ?>            
        	        	</ul>
        	        </div>
        	    </li>
        	    <li class="page-tabslist-tab"><?php echo $legalmentions->title() ?></li>
        	    <li class="page-tabslist-tab-content page-tabslist-tab-legalmentions closed">
        	        <div class="height-container">
        	        	<?php echo $legalmentions->text()->kirbytext() ?>
        	        </div>
        	    </li>
        	
        	
        	</ul>
        </div>

    </div>
</div>