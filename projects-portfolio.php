<?php require_once('tacs/tacs.php'); ?>

<!-- page setup variables -->
[[PAGETITLE = 'Loft conversion, house extensions, kitchen installations and building project photographs']]
[[PAGEDESC = 'A selection of photographs from successful loft conversion, home extensions, new kitchen installations and other building projects completed by CP Conversions in Exeter, Devon.']]
[[PAGEKEYS = 'project, work, example, success, successful, photo, photograph, gallery, slide, image']]
[[PAGETOPIC = 'Exeter construction projects']]
[[LOGOSTRAP = 'successful construction &amp; conversion projects']]
[[MENUACTIVE = 'projects']]
[[TITLE = 'CP Conversions building project gallery']]

<!-- include header -->
[["template/pagebegin.php"]]

<p>This is a selection of photographs from recent extensions, conversions, building, carpentry work we have completed. Please <a href="contact-us.php">contact us</a> for a competitive quote.</p>

<?php
// lightbox images
$lb = array(

	'extension1' => 'Exeter house extension',
	'extension2' => 'Exeter house extension',
	'loft4' => 'Exeter loft conversion',
	'house9' => 'Exeter house construction',
	'house10' => 'Exeter house construction',
	'house11' => 'Exeter house construction',
	'house1' => 'Exeter house extension',
	'house2' => 'Exeter house extension',
	'house3' => 'Exeter loft conversion',
	'house4' => 'Exeter house extension and loft conversion',
	'house5' => 'Exeter loft conversion',
	'house6' => 'Exeter loft conversion',
	'house7' => 'Exeter loft conversion',
	'house8' => 'Exeter loft conversion',
	'kitchen1' => 'Exeter fitted kitchen',
	'loft1' => 'Exeter loft conversion',
	'loft2' => 'Exeter loft conversion',
	'loft3' => 'Exeter loft conversion'

);

$ps = '';
$p = 0;
foreach ($lb as $img => $desc) {
	$p++;
	$ps .= '<li><a href="images/photos/' . $img . '.jpg"><img src="images/photos/' . $img . '_t.jpg" width="120" height="112" alt="CP Conversions, Exeter, Devon photograph ' . $p . ': ' . $desc . '" /><strong>' . $desc . '</strong><span>Building/conversion photograph ' . $p . ' of #</span></a></li>' . "\n";
}

if ($ps != '') echo "<ul class=\"lightbox\">\n", str_replace('#', $p, $ps), "</ul>\n";
?>

<!-- include separator -->
[["template/pageside.php"]]

<h2>Our services</h2>

<p>Our professional building services include:</p>

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

<p>Our professional builders serve private and business customers in Exeter, Devon and throughout the South West of England.</p>

<p><a href="about-services.php">Why you should consider CP Conversions for your next building, improvement or carpentry project in Exeter or Devon&hellip;</a></p>

<!-- include footer -->
[["template/pageend.php"]]