<?php
// CP Conversions contact form

// ________________________________________________________
// fetches a GET form variable
function post($var, $default='', $maxlen=9999) {
	if (isset($_POST[$var])) {
		$ret=$_POST[$var];
		if (get_magic_quotes_gpc()) $ret=stripslashes($ret);
	}
	else $ret=$default;
	$ret = trim($ret);
	if ($ret == '' || strlen($ret) > $maxlen) $ret=$default;
	$ret=str_replace('<', '&lt;', $ret);
	$ret=str_replace('>', '&gt;', $ret);
	return $ret;
}

// get microtime (seconds integer)
function microtime_int() {
   list($usec, $sec) = explode(" ", microtime());
   return ((int) $sec);
}

// encode
function encode($value) {
	$value = (string) $value;
	$ip = $_SERVER["REMOTE_ADDR"];
	$ip = preg_replace('/\D/', '', $ip);
	$ret = '';
	for ($i = 0; $i < strlen($value); $i++) {
		$c = ord(substr($value, $i, 1));
		$ic = (substr($ip, $i % strlen($ip), 1)) + $i;
		$ret .= chr($c ^ $ic);
	}
	return $ret;
}

// ________________________________________________________
// parse form
$local = (strpos($_SERVER['HTTP_HOST'] , '.co') === false);
$success = false;
$salesemail = ($local ? 'craig@optimalworks.net' : 'contact@cpconversions.co.uk');
$name = post('name', '', 30);
$telephone = post('telephone', '', 20);
$email = post('email', '', 50);
if ($email != '' && (preg_match('/^.+@[a-z0-9]+([_\.\-]{0,1}[a-z0-9]+)*([\.]{1}[a-z0-9]+)+$/', $email) != 1 || strpos($email, '\r') !== false || strpos($email, '\n') !== false || strpos($email, 'cc:') !== false)) $email = ''; // spam check
$contact = post('contact', '', 8);
$details = post('details');
$details = str_replace("\r", '', $details);
do {
	$oc = $details;
	$details = str_replace("\n\n", "\n", $details);
} while ($details != $oc);

$error = '';
if (post('submit') != '') {

	// spam validation
	$spam_error = 'your details again. A technical error occurred';
	
	// rogue GET values
	if (count($_GET) > 0) $error = $spam_error;
	
	// rogue POST values
	if ($error == '') {
		$valid = '[submit][key][name][telephone][email][contact][details]';
		foreach ($_POST as $key => $value) if (strpos($valid, "[$key]") === false) $error = $spam_error;
	}
	
	// user agent, referrer, and key check
	if ($error == '') {
		if (!isset($_SERVER['HTTP_USER_AGENT']) || trim($_SERVER['HTTP_USER_AGENT']) == '') $error = $spam_error;
		if (!isset($_SERVER['HTTP_REFERER']) || $_SERVER['HTTP_REFERER'] != 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF']) $error = $spam_error;
		$key = post('key', '', 30);
		if ($key == '' || (microtime_int() - (int) preg_replace('/\D/', '', encode($key))) < 10) $error = $spam_error;
	}
	
	// data validation
	if ($error == '') {
		if ($name == '') $error .= ($error == '' ? '' : ', ') . 'your name';
		if ($telephone == '') $error .= ($error == '' ? '' : ', ') . 'your telephone number';
	}
	
	if ($error != '') {
		// show error
		$p = strrpos($error, ',');
		if ($p !== false) $error = substr($error, 0, $p+1) . ' and ' . substr($error, $p+2);
		echo "<p class=\"error\">Please enter $error.</p>\n";
	}
	else {
		if ($email != '') $header = "From: $name <$email>\n";
		else $header = "From: CP Conversions <$salesemail>\n";
		$subject = 'CP Conversions website enquiry';
		$body = 'enquiry date: ' . gmdate('l j F Y, H:i')." GMT\n\n";
		$body = "name: $name\n";
		if ($telephone != '') $body .= "phone: $telephone\n";
		if ($email != '') $body .= "email: <$email>\n";
		if ($contact != '') $body .= "contact: $contact\n";
		if ($details != '') $body .= "\ndetails:\n$details\n";
		
		$success = @mail($salesemail, $subject, $body, $header);
		if ($success) echo "<p>Thank you for your enquiry - we will contact you shortly.</p>\n<p>Should you need to contact us, please call <strong>07813 989 909</strong> or email <a href=\"mailto:$salesemail\">$salesemail</a>.</p>\n";
		else echo "<p class=\"error\">Your enquiry could not be sent at this time. Please try again later, or contact us on <strong>07813 989 909</strong> or email <a href=\"mailto:$salesemail\">$salesemail</a>.</p>\n";

		// write to log
		$eflog='logs/enquiries.log';
		$res = 'Date: '.gmdate('l j F Y, H:i')." GMT\n";
		$res .= 'The following email '.($success ? 'was successfully' : 'could NOT be')." sent\nto: $salesemail\n\nsubject: $subject\n$body\n\n";
		$res .= str_repeat('_', 60)."\n\n";

		if ($fp=@fopen($eflog, 'a')) {
			fwrite($fp, $res);
			fclose($fp);
		}
	}

}

// show form
if (!$success) {
	if ($error == '') echo "<p>To discuss your building requirements and obtain a <strong>free estimate</strong>, please contact us:</p><ul><li>free phone <strong>0800 357 9909</strong></li><li>mobile <strong>07813 989 909</strong>, or</li><li>email <a href=\"contact-us.php\" class=\"email\">contact {at} cpconversions dot co dot uk</a></li></ul></p>\n<p>Alternatively, please complete the form below and we will contact you.</p>\n";
?>

<form id="enquiry" action="<?php echo $thispage; ?>" method="post">

<div>
	<label for="name" title="your name">your name:</label>
	<input id="name" name="name" value="<?php echo $name; ?>" />
</div>

<div>
	<label for="telephone" title="your telephone number">telephone:</label>
	<input  id="telephone" name="telephone" type="text" value="<?php echo $telephone; ?>" />
</div>

<div>
	<label for="email" title="your email address">email:</label>
	<input  id="email" name="email" type="text" value="<?php echo $email; ?>" />
</div>

<div>
	<label for="contact" title="preferred contact time">contact me:</label>
	<select id="contact" name="contact" class="inputmed">
		<option value="any time"<?php if ($contact == 'any time') echo ' selected="selected"'; ?>>any time</option>
		<option value="day"<?php if ($contact == 'day') echo ' selected="selected"'; ?>>day time only</option>
		<option value="evening"<?php if ($contact == 'evening') echo ' selected="selected"'; ?>>evenings only</option>
		<option value="weekend"<?php if ($contact == 'weekend') echo ' selected="selected"'; ?>>weekends only</option>
	</select>
</div>

<div>
	<label for="details" title="your details, comments or questions">details:</label>
	<textarea  id="details" name="details" rows="5" cols="10"><?php echo $details; ?></textarea>
</div>

<div class="button">
	<input type="hidden" name="key" value="<?php echo encode(microtime_int()); ?>" />
	<input type="submit" name="submit" value="send" />
</div>

</form>
<?php } ?>