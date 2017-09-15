<?php snippet('head', array('class' => 'login')) ?>

<div class="ctn-login">
	
	<?php if($error): ?>
		<?php echo $page->alert()->kirbytext() ?>
	<?php else: ?>
		<?php echo $page->message()->kirbytext() ?>
	<?php endif; ?>


	<form method="post">
	    <div>
	    	<input type="text" id="username" name="username" placeholder="<?php echo $page->username() . '...' ?>">
	    </div>
	    <div class="ctn-password">
	    	<input type="password" id="password" name="password" placeholder="<?php echo $page->password() . '...' ?>">
	    </div>
	    <div class="ctn-submit">
	    	<input type="submit" name="login" value="<?php echo $page->button()->html() ?>">
	    </div>
	</form>
</div>

<?php snippet('footer') ?>
