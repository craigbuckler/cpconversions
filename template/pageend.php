	</div>
	<div class="end"><div>&nbsp;</div></div>
</div>
<!-- /sidebar -->

<!-- footer -->
<div id="footer">

	[[<?php ShowMenu(); ?>]]

	<p>&copy;<?php echo date('Y'); ?> CP Conversions | free phone 0800 357 9909 | mobile 07813 989 909</p>
	
	<p>email <a href="contact-us.php" class="email">contact {at} cpconversions dot co dot uk</a></p>

	<p class="valid"><a href="http://www.optimalworks.net/" title="Exmouth web design">developed by OptimalWorks Ltd</a></p>

</div>

</div>
<!-- /content -->

</div>
<!-- /page -->

<!-- JavaScript -->
[[<?php
$local = (strpos($_SERVER['HTTP_HOST'] , '.co') === false);
if ($local) {
	$script = array('owl', 'owl_css', 'owl_dom', 'owl_xml', 'owl_innerhtml', 'owl_event', 'owl_timer', 'owl_image', 'owl_screen', 'owl_overlay', 'owl_emailparse', 'owl_lightbox', 'main');
}
else {
	$script = array('script');
}
foreach ($script as $js) echo "<script type=\"text/javascript\" src=\"script/$js.js\"></script>\n";
?>]]
</body>
</html>