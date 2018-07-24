<?php require_once('tacs/tacs.php'); ?>

<!-- page setup variables -->
[[PAGETITLE = 'Loft conversions, extensions, building, kitchen fitting, carpenters']]
[[PAGEDESC = 'We provide loft, garage, kitchen, basement, bedroom, general home conversion, carpentry and building services throughout Exeter and Devon']]
[[PAGEKEYS = 'home, professional, service, details']]
[[PAGETOPIC = 'Exeter building, conversions and extensions']]
[[LOGOSTRAP = 'Exeter loft conversion and building specialists']]
[[MENUACTIVE = 'home']]
[[TITLE = 'CP Conversions: Loft Conversions &amp; Extensions Exeter, Devon']]

<!-- include header -->
[["template/pagebegin.php"]]

<p>CP Conversions are a specialist building company providing services to the public and commercial sectors throughout Exeter, Devon and the UK.</p>

<p>We undertake a variety of building work including home extensions, loft conversions, kitchen fitting, carpentry and more.</p>

<h2>About us</h2>

<p><a href="http://www.guildmc.com/" title="visit the Guild of Master Craftsmen website"><img src="images/guild.png" width="173" height="173" alt="Guild of Master Craftsmen" /></a>We are a family-run professional builders and construction business with almost 30 years experience and many satisfied customers.</p>

<p>We are members of the Guild of Master Craftsmen; an organisation that ensures the highest standards of professional workmanship for all building work.</p>

<p>Refer to our <a href="about-services.php">about us page</a> for more information.</p>


<h2>Our building projects</h2>

<p>We can help you with any building, construction, conversion, carpentry, alteration and extension projects. Our full service includes complete project management from surveying and design, through to specification and installation.</p>

<?php
// lightbox images
$lb = array(

	'extension1' => 'Exeter house extension',
	'loft3' => 'Exeter loft conversion',
	'kitchen1' => 'Exeter fitted kitchen'

);

$ps = '';
$p = 0;
foreach ($lb as $img => $desc) {
	$p++;
	$ps .= '<li><a href="images/photos/' . $img . '.jpg"><img src="images/photos/' . $img . '_t.jpg" width="120" height="112" alt="CP Conversions, Exeter photograph ' . $p . ': ' . $desc . '" /><strong>' . $desc . '</strong><span>Building/conversion photograph ' . $p . ' of #</span></a></li>' . "\n";
}

if ($ps != '') echo "<ul class=\"lightbox\">\n", str_replace('#', $p, $ps), "</ul>\n";
?>

<p>Visit our <a href="projects-portfolio.php">projects page</a> for a portfolio of building, extension and carpentry photographs.</p>


<!-- include separator -->
[["template/pageside.php"]]

<h2>Building services</h2>

<p>Our professional building and construction services include:</p>

<ul>
<li>loft conversions</li>
<li>garage conversions</li>
<li>basement conversions</li>
<li>house extensions</li>
<li>kitchen fitting</li>
<li>carpentry</li>
<li>general home alterations</li>
<li>all building work</li>
</ul>

<p><a href="contact-us.php">Contact us</a> for more information and a free estimate.</p>

<!-- include footer -->
[["template/pageend.php"]]