    <?php if(strpos($_SERVER['SERVER_NAME'], "localhost") === false && strpos($_SERVER['SERVER_NAME'], ".onlinehome.fr") === false): ?>
    <!-- Piwik -->
	<script type="text/javascript">
		var _paq = _paq || [];
		/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
		_paq.push(['trackPageView']);
		_paq.push(['enableLinkTracking']);
		(function() {
		var u="//ethicsfordesign.com/_analytics/";
		_paq.push(['setTrackerUrl', u+'piwik.php']);
		_paq.push(['setSiteId', '1']);
		var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
		g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
		})();
	</script>
	<!-- End Piwik Code -->
	<?php endif; ?>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>

    <?php

    if ($page == 'player') {
		echo js(array(
	    	'assets/js/dist/vendors/history.min.js',
	    	'assets/js/dist/player.min.js'
	    ));
	}
	else {
    	echo js(array(
	    	'assets/js/dist/vendors/history.min.js',
	    	'assets/js/dist/vendors/bez.min.js',
	    	'assets/js/dist/scripts.min.js'
	    ));
	} 

	?>

</body>
</html>