[[<?php
// display the menu
function ShowMenu($id = '') {

	global $MENUACTIVE;

	$menu = array(
		'home' => 'index.php',
		'about us' => 'about-services.php',
		'projects' => 'projects-portfolio.php',
		'contact us' => 'contact-us.php'
	);

	$menulist = '<ol'.($id != '' ? " id=\"$id\"" : '').">\n";
	$m = 0;
	foreach($menu as $text => $url) {
		$menulist .= '<li'.($MENUACTIVE == $text ? ' class="active"' : '')."><a href=\"$url\"><strong>$text</strong></a></li>\n";
		$m++;
	}
	$menulist .= "</ol>\n";
	echo $menulist;
}

ShowMenu('menu');
?>]]