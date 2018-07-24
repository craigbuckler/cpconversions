/*	---------------------------------------------

	owl.EmailParse

	--------------------------------------------- */
if (owl.Dom && owl.Event && !owl.EmailParse) {
	
	owl.EmailParse = function(node) {
		owl.Each(owl.Dom.Get(node), function(e) {
			if (e.firstChild) {
				var es = e.firstChild.nodeValue;
				es = es.replace(/dot/ig, ".");
				es = es.replace(/\{at\}/ig, "@");
				es = es.replace(/\s/g, "");
				e.href="mai"+'lto:'+es;
				owl.Dom.Text(e, es);
			}
		});
	};
	

	/* ---------------------------------------------
	owl.EmailParse.Config
	--------------------------------------------- */
	owl.EmailParse.Config = {
		AutoStart: true,
		EmailNode: "a.email"
	};
	
	// auto-start fader
	if (owl.EmailParse.Config.AutoStart) new owl.Event(window, "load", function (e) {
		owl.EmailParse(owl.EmailParse.Config.EmailNode);
	}, 99999);
	
}