// CP Conversion JavaScript, (c) Optimalworks Ltd, http://www.optimalworks.net/

// startup function
function Main() {

	// enquiry form
	if (DOM.Id("enquiry")) new FormValidator("enquiry");

}

// startup event
new Event(window, "load", Main);